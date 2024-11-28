<template>
    <div class="container mt-10">
        <div class="max-w-lg mx-auto">
        <div class="flex items-center justify-between mb-4">
            <button @click="goBack" class="goBack_button flex items-center text-blue-500 hover:text-blue-700 focus:outline-none">
                <client-only>
                    <font-awesome-icon :icon="['fas', 'arrow-left']" />
                </client-only>
            </button>
            
            <h1 class="text-2xl font-bold text-center flex-1">{{ categoryName }}</h1>
        </div>

        <!-- Task List -->
        <TodoList :search="search" :selectedCategories="[categoryName]" />
        </div>
    </div>
</template>
  

<script setup>
import { ref, computed } from 'vue'
import TodoList from '~/components/ToDoList.vue'
import { useRouter, useRoute } from 'vue-router'

const route = useRoute() // Access the dynamic route parameter
const router = useRouter() // Access the router instance

const categoryName = computed(() => route.params.category.toLowerCase())
const search = ref('')

// Navigate back to home
const goBack = () => {
    router.push('/')
}
</script>



<style scoped>
h1 {
    text-transform: capitalize;
}
.container{ max-width: 800px !important; }
.goBack_button{
    justify-content: center;
    align-content: center;
    align-items: center;
    align-self: center;
    padding: 10px;
    color: black;
    border: 2px solid;
    border-color: black;
}
</style>
