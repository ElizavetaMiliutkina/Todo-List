<template>
  <div class="app">
    <h1>ToDo List</h1>
    <TodoList
        :tasks="tasks"
        :loading="isLoading"
        :updating="isUpdating"
        :on-add="addTask"
        :on-delete="deleteTask"
        :on-edit="editTask"
        :on-toggle="toggleTask"
    />
    <div v-if="error" class="error-block">{{error}}</div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import TodoList from '@/components/TodoList.vue';

import type { Task } from '@/types/task';

const store = useStore();
const tasks = computed(() => store.state.tasks);
const isLoading = computed(() => store.state.isLoading);
const isUpdating = computed(() => store.state.isUpdating);
const error = computed(() => store.state.error);

onMounted(() => {
  store.dispatch('fetchTodos');
});

const addTask = (title: string) => {
  store.dispatch('createTask', title);
};

const deleteTask = (id: number) => {
  store.dispatch('removeTask', id);
};

const editTask = (updatedTask: Task) => {
  store.dispatch('editTask', updatedTask);
};

const toggleTask = (task: Task) => {
  const updatedTask: Task = { ...task, completed: !task.completed };
  store.dispatch('editTodo', updatedTask);
};

</script>

<style lang="scss" scoped>
.app {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}
</style>
