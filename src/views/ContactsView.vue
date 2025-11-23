<template>
  <div class="flex justify-content-center">
    <div class="shadow-3" style="min-width: 10rem">
      <DataTable
        :value="contacts"
        :paginator="true"
        :rows="lazyParams.rows"
        :totalRecords="totalItems"
        :lazy="true"
        :loading="loading"
        :first="lazyParams.first"
        @page="onPage"
      >
        <Column field="name" header="Nome" style="min-width: 200px; max-width: 300px"></Column>
        <Column
          class="break-text-word"
          field="email"
          header="Email"
          style="min-width: 200px; max-width: 300px"
        ></Column>
        <Column header="Telefone" style="min-width: 120px">
          <template #body="slotProps">
            {{ formatPhone(slotProps.data.phoneNumber) }}
          </template>
        </Column>
        <Column header="Nascimento" style="min-width: 120px">
          <template #body="slotProps">
            {{ formatDate(slotProps.data.birthDate) }}
          </template>
        </Column>
        <Column header="Ações" style="width: 190px">
          <template #body="slotProps">
            <div class="flex gap-3">
              <AppButton label="Editar" @click="editContact(slotProps.data)" />
              <AppButton label="Excluir" severity="danger" @click="deleteContact(slotProps.data)" />
            </div>
          </template>
        </Column>

        <template #loading> Carregando contatos. Por favor, aguarde... </template>
        <template #empty> Nenhum contato encontrado. </template>
      </DataTable>
    </div>
  </div>

  <UpdateContactModal ref="updateContactModalRef" @contact-updated="onContactChange" />
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import AppButton from '@/components/common/AppButton.vue'
import { contactService } from '@/services/contact.service'
import type UpdateContactModal from '@/components/common/UpdateContactModal.vue'
import { formatPhone } from '@/util/format-phone'
import { formatDate } from '@/util/format-date'
import { emitter } from '@/util/eventBus'

const updateContactModalRef = ref<InstanceType<typeof UpdateContactModal>>()
const contacts = ref([])
const totalItems = ref(0)
const loading = ref(false)

const lazyParams = ref({
  first: 0,
  rows: 10,
})

const onContactChange = () => {
  lazyParams.value.first = 0
  loadLazyData()
}

const loadLazyData = async () => {
  loading.value = true

  const page = lazyParams.value.first / lazyParams.value.rows + 1
  const pageSize = lazyParams.value.rows

  try {
    const response = (await contactService.getUserContacts(page, pageSize)).data
    contacts.value = response.items
    totalItems.value = response.totalItems
  } catch (error) {
    contacts.value = []
    totalItems.value = 0
  } finally {
    loading.value = false
  }
}

const onPage = (event: any) => {
  lazyParams.value = event
  loadLazyData()
}

onMounted(() => {
  loadLazyData()
})

function editContact(contact: any) {
  updateContactModalRef.value?.openModal(contact.id)
}
onMounted(() => {
  emitter.on('contact-created-globally', onContactChange)
  loadLazyData()
})

onUnmounted(() => {
  emitter.off('contact-created-globally', onContactChange)
})

async function deleteContact(contact: any) {
  await contactService.deactivateContact(contact.id)
  onContactChange()
}
</script>
