<template>
    <div class="flex items-center justify-between max-w-lg mx-auto my-2">
        <!-- Search Input -->
        <span class="search__icon">
            <client-only> 
                <font-awesome-icon class="text-gray-500 mr-2" :icon="['fas', 'search']" />
            </client-only>
        </span>
        <input type="text" v-model="search" placeholder="Search tasks..." class="flex-1 search__input" />

        <!-- Filter Button -->
        <button @click="togglePopover" class="filter__button p-2">
            <client-only>
                <font-awesome-icon :icon="['fas', 'filter']" />
            </client-only>    
        </button>

        <!-- Popover -->
        <div v-if="popoverOpen" class="popover absolute mt-36 bg-white shadow-lg rounded p-4 border border-gray-300 z-10">
            <label class="flex items-center space-x-2 mb-2">
                <input type="checkbox" :checked="allSelected" @change="toggleAll" />
                <span>All</span>
            </label>
            <div v-for="(category, index) in categories" :key="index" class="flex items-center space-x-2">
                <input type="checkbox" v-model="selectedCategories" :value="category" />
                <span>
                    <nuxt-link :to="`/categories/${category.toLowerCase()}`" class="hover:underline">
                        {{ category }}
                    </nuxt-link>
                </span>
            </div>

        </div>
    </div>
</template>

<script setup>
    import { ref, watch, onMounted } from 'vue'

    const search = ref('')
    const popoverOpen = ref(false)
    const categories = ref(['Personal', 'Work'])
    const selectedCategories = ref([...categories.value]) // All categories selected by start
    const allSelected = ref(true)

    const emit = defineEmits(['updateSearch', 'updateCategories'])

    // Emit initial values on mounted
    onMounted(() => {
        emit('updateCategories', [...categories.value]) // Emit all categories on load
        console.log('Initial Selected Categories Emitted:', [...categories.value])
    })

    // Toggle popover visibility
    const togglePopover = () => {
        popoverOpen.value = !popoverOpen.value
    }

    // Watch selected categories to sync "All" checkbox state
    watch(selectedCategories, (newVal) => {
        allSelected.value = newVal.length === categories.value.length
        emit('updateCategories', [...newVal]) // Emit the updated categories
    })

    // Toggle all categories
    const toggleAll = () => {
        if (allSelected.value) {
            selectedCategories.value = [] // Deselect all
        } else {
            selectedCategories.value = [...categories.value] // Select all
        }
        emit('updateCategories', [...selectedCategories.value]) // Immediate emit
    }

    // Emit search term updates
    watch(search, (newSearch) => {
        emit('updateSearch', newSearch)
    })
</script>

<style scoped>
    .search__icon {
        padding: 10px;
        border-bottom: 2px solid;
        border-color: rgb(209 213 219);
    }
    .search__input {
        border: none;
        border-bottom: 2px solid;
        outline: none;
        box-shadow: none;
        background: transparent;
        border-radius: 0 !important;
        padding: 10px;
        border-color: rgb(209 213 219);
        transition: ease-in-out .3s;
    }
    .search__input:hover,
    .search__input:focus{
        border-color: black;
    }

    /* Filter Button Style */
    .filter__button {
        background: transparent;
        border-radius: 0 !important;
        outline: none;
        box-shadow: none;
        padding: 0.5rem;
    }

    /* Popover Style */
    .popover {
        min-width: 200px;
        right: calc(100% - 64% - -12px) !important;
    }

    @media screen and (max-width: 776px) {
        .popover {
            right: calc(100% - 83%) !important;
        }
    }

    @media screen and (max-width: 412px) {
        .popover {
            right: 10px !important;
        }
    }

    input[type="checkbox"] {
        accent-color: #FFED00; /* Sets the main color for the checkbox */
        width: 1.2rem; /* Adjust size */
        height: 1.2rem;
        border: 1px solid #FFED00;
        border-radius: 0.25rem;
        cursor: pointer;
        transition: transform 0.2s ease-in-out;
    }

    /* Add hover effect for the checkbox */
    input[type="checkbox"]:hover {
        transform: scale(1.1);
    }

    /* Focus effect for better accessibility */
    input[type="checkbox"]:focus {
        outline: none;
        box-shadow: 0 0 3px #FFED00;
    }
</style>
