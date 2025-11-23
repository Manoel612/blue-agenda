import mitt from 'mitt'
import type { Emitter } from 'mitt'

type ApplicationEvents = {
  'contact-created-globally': void
}

export const emitter: Emitter<ApplicationEvents> = mitt<ApplicationEvents>()
