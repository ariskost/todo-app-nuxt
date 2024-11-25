<template>
    <div class="max-w-lg mx-auto mt-10">
        <form @submit.prevent="addNewTask" class="flex flex-col">
            <label class="block text-gray-900 mb-0">
                <span class="newTask">New Task</span>
                <div class="newTaskLine bg-black h-1 mt-2 mb-0"></div>
            </label>
            <div class="flex items-center">
                <input type="text" v-model="title" placeholder="Type Task Name" class="flex-1 p-3 mt-1 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:border-black italic placeholder-gray-400" />
                <input type="text" v-model="category" placeholder="Category" class="w-1/3 p-3 mt-1 bg-transparent border-l-2 border-0 border-b-2 border-gray-300 focus:outline-none focus:border-black italic placeholder-gray-400" />
                <button type="submit" class="bg-black text-white py-4 px-6">Add</button>
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { eventBus } from './eventBus'
import { useRuntimeConfig } from '#app'

const config = useRuntimeConfig()
const appBaseUrl = config.public.appBaseUrl // Get the base URL from .env

const title = ref('')
const category = ref('')

const addNewTask = async () => {
    if (title.value.trim() && category.value.trim()) {
        try {
            const response = await fetch(`${appBaseUrl}/todos`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title: title.value, category: category.value })
            });

            if (!response.ok) throw new Error('Failed to create task');

            const newTask = await response.json();
            title.value = '';
            category.value = '';

            // Emit the new task directly
            eventBus.emit('task-added', newTask);

        } catch (error) {
            console.error('Error adding task:', error);
        }
    }
};
</script>



<style scoped>
.newTaskLine{ margin-top: 10px; }
</style>