<template>
    <div class="max-w-lg mx-auto mt-5">
        <!-- Loading States, Error States & No Values Message -->
        <div v-if="pending" class="text-gray-500"> Loading tasks... </div>
        <div v-else-if="error" class="text-red-500">An error occurred: {{ error.message }}</div>
        <div v-else-if="!tasks || tasks.length === 0" class="text-gray-500"> No Tasks </div>
        <!-- Loading States, Error States & No Values Message End-->
        <ul v-else class="space-y-2">
            <li v-for="task in tasks" :key="task.id" class="flex items-center p-3 bg-white shadow rounded-lg">
                <span class="flex-1 text-left">{{ task.title }}</span>
                <span :class="{'line-through': task.completed, 'italic': task.completed}" class="category__span text-right mr-4">{{ task.category }}</span>
                <button @click="removeTask(task.id)" class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded">x</button>
            </li>
        </ul>
    </div>
</template>
  
<script setup>
    import { ref, onMounted } from 'vue'
    import { useFetch } from 'nuxt/app'
    import { eventBus } from './eventBus'

    const { data: tasks, error, pending, refresh } = useFetch('https://to-do-kostidis.titlos.com/todos', {
        autoFetch: false
    })

    const splitCategories = (categories) => {
        if (!categories) return [];
        return categories.split(',').map(cat => cat.trim()); // Split and trim
    }

    onMounted(async () => {
        await refresh();

        eventBus.on('task-added', async () => {
            await refresh(); // Listen for the `task-added` event and refresh tasks
        });
    });

    const removeTask = async (id) => {
        try {
            await fetch(`https://to-do-kostidis.titlos.com/todos/${id}`, {
                method: 'DELETE'
            });
            await refresh();
        } catch (err) {
            console.error('Failed to delete task:', err);
        }
    };
</script>
<style scoped>
.category__span{
    padding: 4px 8px;
    background: #FFED00;
    border-radius: 5px;
    font-weight: 600;
}
</style>
  