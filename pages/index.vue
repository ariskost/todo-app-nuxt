<template>
    <div class="container mx-auto px-4">
        <TodoForm />
        <TodoList />
    </div>
</template>
  
<script setup>
import TodoForm from '~/components/ToDoForm.vue'
import TodoList from '~/components/ToDoList.vue'
</script>
<style>
@import '~/assets/css/animations.css';

.container{
    max-width: 800px !important;
}
</style>