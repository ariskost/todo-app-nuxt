<template>
    <div class="container mx-auto px-4">
        <TodoForm />
        <TodoList />
    </div>
</template>
  
<script setup>
import TodoForm from '~/components/TodoForm.vue'
import TodoList from '~/components/TodoList.vue'
</script>
<style scoped>
.container{
    max-width: 800px !important;
}
</style>