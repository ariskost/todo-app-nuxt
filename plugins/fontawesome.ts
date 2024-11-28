import { defineNuxtPlugin } from '#app'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faSearch, faMagnifyingGlass, faFilter, faTimes } from '@fortawesome/free-solid-svg-icons'

// Add icons to the library
library.add(faSearch, faMagnifyingGlass, faFilter, faTimes)

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.component('FontAwesomeIcon', FontAwesomeIcon)
})
