import { defineStore } from 'pinia'

export const useTodoStore = defineStore('todo', {
  state: () => ({
    tasks: []
  }),
  actions: {
    addTask(newTask) {
        this.tasks.push(newTask);
    },
    removeTask(index) {
      this.tasks.splice(index, 1);
    }
  }
});