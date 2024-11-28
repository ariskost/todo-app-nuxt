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

        <!-- Task List -->
        <transition-group name="fade-down" tag="ul">
            <li
                v-for="task in filteredTasks"
                :key="task.id"
                class="flex items-center p-3 mb-1 bg-white shadow rounded-lg"
            >
                <span class="flex-1 text-left">{{ task.title }}</span>
                <span
                    :class="{ 'line-through': task.completed, 'italic': task.completed }"
                    class="category__span text-right mr-4"
                >
                    {{ task.category }}
                </span>
                <button
                    @click="removeTask(task.id)"
                    class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                >
                    x
                </button>
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

const removeTask = async id => {
    try {
        isRefreshing.value = true
        await fetch(`${appBaseUrl}/todos/${id}`, { method: 'DELETE' })
        await refresh()
        syncTasks()
        isRefreshing.value = false
    } catch (err) {
        console.error('Failed to delete task:', err)
        isRefreshing.value = false
    }
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
</style>
