<template>
    <div class="max-w-lg mx-auto mt-5">
        <!-- Loading States, Error States & No Values Message -->
        <div v-if="pending || isRefreshing" class="text-gray-500"> Loading tasks... </div>
        <div v-else-if="error" class="text-red-500">An error occurred: {{ error.message }}</div>
        <div v-else-if="!safeTasks.length" class="text-gray-500"> No Tasks </div>
        <!-- Tasks List -->
        <transition-group name="fade-down" tag="ul">
            <li v-for="task in safeTasks" :key="task.id" class="flex items-center p-3 mb-1 bg-white shadow rounded-lg">
                <span class="flex-1 text-left">{{ task.title }}</span>
                <span :class="{'line-through': task.completed, 'italic': task.completed}" class="category__span text-right mr-4">{{ task.category }}</span>
                <button @click="removeTask(task.id)" class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded">x</button>
            </li>
        </transition-group>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useFetch } from 'nuxt/app'
import { eventBus } from './eventBus'
import { useRuntimeConfig } from '#app'

const config = useRuntimeConfig()
const appBaseUrl = config.public.appBaseUrl // Get the base URL from .env

// Fetch tasks data
const { data: tasks, error, pending, refresh } = useFetch(`${appBaseUrl}/todos`, {
    autoFetch: false // Manually control fetch
});

// Local reactive array to track tasks
const safeTasks = ref([]);
const isRefreshing = ref(false);

// Sync `tasks` with `safeTasks` after fetch
const syncTasks = () => {
    safeTasks.value = tasks.value || [];
};

// Initial fetch and event handling
onMounted(async () => {
    isRefreshing.value = true;
    await refresh();
    syncTasks();
    isRefreshing.value = false;

    eventBus.on('task-added', async () => {
        isRefreshing.value = true;
        await refresh();
        syncTasks();
        isRefreshing.value = false;
    });
});

// Remove a task
const removeTask = async (id) => {
    try {
        isRefreshing.value = true;
        await fetch(`${appBaseUrl}/todos/${id}`, { method: 'DELETE' });
        await refresh();
        syncTasks();
        isRefreshing.value = false;
    } catch (err) {
        console.error('Failed to delete task:', err);
        isRefreshing.value = false;
    }
};
</script>

<style>
@import '~/assets/css/animations.css';

.category__span {
    padding: 4px 8px;
    background: #FFED00;
    border-radius: 5px;
    font-weight: 600;
}
</style>
