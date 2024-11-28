<template>
    <div class="container mx-auto px-4">
        <TodoForm />
        <FilterRow @updateSearch="updateSearch" @updateCategories="updateCategories" />
        <TodoList :search="search" :selectedCategories="selectedCategories" />
    </div>
</template>

<script setup>
import TodoForm from '~/components/ToDoForm.vue'
import FilterRow from '~/components/FilterRow.vue'
import TodoList from '~/components/ToDoList.vue'
import { ref } from 'vue'

const search = ref('')
const selectedCategories = ref([])

const updateSearch = (newSearch) => {
    search.value = newSearch
}

const updateCategories = (newCategories) => {
    selectedCategories.value = newCategories
}
</script>

<style>
@import '~/assets/css/animations.css';

.container{ max-width: 800px !important; }
</style>