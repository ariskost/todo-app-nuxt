import { defineNuxtPlugin } from '#app'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faSearch, faMagnifyingGlass, faFilter, faTimes, faArrowLeft, faSignOutAlt} from '@fortawesome/free-solid-svg-icons'

// Add icons to the library
library.add(faSearch, faMagnifyingGlass, faFilter, faTimes, faArrowLeft, faSignOutAlt)

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.component('FontAwesomeIcon', FontAwesomeIcon)
})
