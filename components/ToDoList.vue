<template>
    <div class="max-w-lg mx-auto mt-5">
        <!-- Loading State -->
        <div v-if="pending || isRefreshing" class="flex justify-center items-center h-16">
            <div class="loader"></div>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="text-red-500">An error occurred: {{ error.message }}</div>

        <!-- No Tasks Message -->
        <div v-else-if="!filteredTasks.length" class="text-gray-500">No Tasks</div>

        <transition name="fade">
            <div v-if="showDeleteModal" class="modal bg-white text-black p-4 rounded shadow-md flex flex-col items-center">
                <p>Are you sure you want to delete "{{ taskToDelete.title }}"?</p>
                <div class="flex mt-4">
                    <button @click="confirmDelete" class="bg-red-500 text-white py-2 px-4 rounded mr-2">Yes</button>
                    <button @click="cancelDelete" class="bg-gray-300 py-2 px-4 rounded">No</button>
                </div>
            </div>
        </transition>

        <!-- Task List -->
        <transition-group name="fade-down" tag="ul">
            <li v-for="task in filteredTasks" :key="task.id" class="flex items-center p-3 mb-1 bg-white shadow rounded-lg">
                <span class="flex-1 text-left">{{ task.title }}</span>
                <span :class="{ 'line-through': task.completed, 'italic': task.completed }" class="category__span text-right mr-4">
                    {{ task.category }}
                </span>
                <button @click="openDeleteModal(task)" class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"> x </button>
            </li>
        </transition-group>
    </div>
</template>

<script setup>
    import { ref, onMounted, computed, watch } from 'vue'
    import { useFetch } from 'nuxt/app'
    import { eventBus } from './eventBus'
    import { useRuntimeConfig } from '#app'

    const props = defineProps({
        search: String,
        selectedCategories: Array
    })

    const config = useRuntimeConfig()
    const appBaseUrl = config.public.appBaseUrl

    const { data: tasks, error, pending, refresh } = useFetch(`${appBaseUrl}/todos`, {
        autoFetch: false
    })

    const safeTasks = ref([])
    const isRefreshing = ref(false)

    const showDeleteModal = ref(false)
    const taskToDelete = ref(null)

    const syncTasks = () => {
        safeTasks.value = tasks.value || []
    }

    // Filter tasks based on categories and search
    const filteredTasks = computed(() => {
        const normalizedCategories = props.selectedCategories.map(c => c.toLowerCase().trim())
        console.log('Selected Categories:', normalizedCategories)

        return safeTasks.value.filter(task => {
            const taskCategory = task.category.toLowerCase().trim()
            const matchesCategory =
                normalizedCategories.length === 0 ? false : normalizedCategories.includes(taskCategory)
            const matchesSearch = task.title.toLowerCase().includes(props.search.toLowerCase())
            console.log(
                `Task: ${task.title}, Matches Category: ${matchesCategory}, Matches Search: ${matchesSearch}`
            )
            return matchesCategory && matchesSearch
        })
    })

    onMounted(async () => {
        isRefreshing.value = true
        await refresh()
        syncTasks()
        isRefreshing.value = false

        eventBus.on('task-added', async () => {
            isRefreshing.value = true
            await refresh()
            syncTasks()
            isRefreshing.value = false
        })
    })

    const openDeleteModal = (task) => {
        taskToDelete.value = task
        showDeleteModal.value = true
    }

    const confirmDelete = async () => {
        try {
            await fetch(`${appBaseUrl}/todos/${taskToDelete.value.id}`, { method: 'DELETE' })
            await refresh()
            syncTasks()
            showDeleteModal.value = false
            taskToDelete.value = null
        } catch (err) {
            console.error('Failed to delete task:', err)
        }
    }

    const cancelDelete = () => {
        showDeleteModal.value = false
        taskToDelete.value = null
    }

    watch(() => props.selectedCategories, (newVal) => {
        console.log('Updated Selected Categories:', newVal)
    })
</script>


<style>
    @import '~/assets/css/animations.css';

    .category__span {
        padding: 4px 8px;
        background: #FFED00;
        border-radius: 5px;
        font-weight: 600;
    }

    .loader {
        width: 15px;
        aspect-ratio: 1;
        border-radius: 50%;
        animation: l5 1s infinite linear alternate;
    }
    @keyframes l5 {
        0% { box-shadow: 20px 0 #000, -20px 0 #0002; background: #000; }
        33% { box-shadow: 20px 0 #000, -20px 0 #0002; background: #0002; }
        66% { box-shadow: 20px 0 #0002, -20px 0 #000; background: #0002; }
        100% { box-shadow: 20px 0 #0002, -20px 0 #000; background: #000; }
    }

    .modal {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        z-index: 1000;
    }

    /* Fade Animation for Modal */
    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.3s ease;
    }
    .fade-enter-from,
    .fade-leave-to {
        opacity: 0;
    }
</style>
