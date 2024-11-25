import { reactive } from 'vue'

export const eventBus = reactive({
    listeners: {},

    on(event, callback) {
        if (!this.listeners[event]) {
          this.listeners[event] = []
        }
        this.listeners[event].push(callback)
    },

    emit(event, ...args) {
        if (this.listeners[event]) {
          this.listeners[event].forEach(callback => callback(...args))
        }
    },

    off(event, callback) {
        if (this.listeners[event]) {
          this.listeners[event] = this.listeners[event].filter(cb => cb !== callback)
        }
    }
})
