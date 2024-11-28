<template>
    <div class="max-w-lg mx-auto mt-10">
        
        <form @submit.prevent="addNewTask" class="flex flex-col">
            
            <label class="block text-gray-900 mb-0">
                <span class="newTask">New Task</span>
                <div class="newTaskLine bg-black h-1 mt-2 mb-0"></div>
            </label>

            <div class="flex items-center">
                <input type="text" v-model="title" placeholder="Type Task Name" class="flex-1 p-3 mt-1 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:border-black italic placeholder-gray-400" />
                <select v-model="category" class="w-1/3 p-4  bg-transparent border-l-2 border-0 border-b-2 border-gray-300 focus:outline-none focus:border-black italic" >
                    <option value="" disabled selected>Select Category</option>
                    <option v-for="(cat, index) in categories" :key="index" :value="cat">{{ cat }}</option>
                </select>
                <button type="submit" class="bg-black text-white py-4 px-6">Add</button>
            </div>

            <!-- Validation Error Messages -->
            <transition class="error_messages" name="slide-down">
                <div v-if="errorMessage" class="error-message text-red-500 mt-2 flex justify-between items-center">
                    <span>{{ errorMessage }}</span>
                    <button @click="clearError" class="text-red-500 focus:outline-none">
                        <font-awesome-icon :icon="['fas', 'times']" />
                    </button>
                </div>
            </transition>

            <!-- Task Created Modal -->
            <transition name="fade">
                <div v-if="taskCreated" class="modal bg-green-100 text-green-900 p-4 rounded shadow-md">
                    Task "{{ createdTaskTitle }}" was successfully created!
                </div>
            </transition>
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
    const errorMessage = ref('')
    const categories = ref(['Personal', 'Work']) 
    const taskCreated = ref(false)
    const createdTaskTitle = ref('')

    // Clear error function and message
    const clearError = () => {
        errorMessage.value = ''
    }

    const addNewTask = async () => {
        // Validation
        if (!title.value.trim() && !category.value.trim()) {
            errorMessage.value = 'Please Fill the Inputs.'
            setTimeout(clearError, 3000)
            return
        }
        if (!title.value.trim()) {
            errorMessage.value = 'Task title is required.'
            setTimeout(clearError, 3000)
            return
        }
        if (!category.value.trim()) {
            errorMessage.value = 'Category is required.'
            setTimeout(clearError, 3000)
            return
        }
        errorMessage.value = ''

        try {
            const response = await fetch(`${appBaseUrl}/todos`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title: title.value, category: category.value })
            })

            if (!response.ok) throw new Error('Failed to create task')

            const newTask = await response.json()

            createdTaskTitle.value = title.value
            title.value = ''
            category.value = ''
            taskCreated.value = true

            setTimeout(() => {
                taskCreated.value = false
            }, 3000)
            
            eventBus.emit('task-added', newTask) // Emit the new task directly
        } catch (error) {
            errorMessage.value = 'Error adding task. Please try again.'
            setTimeout(clearError, 3000)
            console.error('Error adding task:', error)
        }
    }
</script>

<style scoped>
    .newTaskLine {
        margin-top: 10px;
    }

    /* Slide-Down Animation */

    .slide-down-enter-active,
    .slide-down-leave-active {
        transition: transform 0.3s ease, opacity 0.3s ease;
    }

    .slide-down-enter-from {
        transform: translateY(-20px);
        opacity: 0;
    }

    .slide-down-enter-to {
        transform: translateY(0);
        opacity: 1;
    }

    .slide-down-leave-from {
        transform: translateY(0);
        opacity: 1;
    }

    .slide-down-leave-to {
        transform: translateY(-20px);
        opacity: 0;
    }

    /* Slide-Down Animation */

    .slide-down-enter-active,
    .slide-down-leave-active {
        transition: all 0.3s ease-in-out;
    }
    
    .slide-down-enter-from {
        transform: translateY(-20px);
        opacity: 0;
    }

    .slide-down-leave-to {
        transform: translateY(-20px);
        opacity: 0;
    }

    /* Error Message Style */
    .error-message {
        position: relative;
    }
    
    .error_messages{
        padding: 12px 10px;
        background: white;
        border-radius: 5px;
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

    .modal {
        margin-top: 10px;
    }
</style>
