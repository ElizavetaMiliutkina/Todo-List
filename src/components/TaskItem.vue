<template>
  <div
      class="task"
      :class="{ done: task.completed }"
      :draggable="!updating"
      @dragstart="() => onDragStart(task.id)"
      @drop="() => onDrop(completed)"
  >
    <span class="task-info">{{ task.title }}</span>
    <div class="button-block">
      <button @click="onDelete(task.id)" :disabled="updating" title="Удалить">&#128465;</button>
      <button @click="() => onEdit(task)" :disabled="updating" title="Редактировать">🖉</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import type { Task } from '@/types/task';

defineProps<{
  task: Task;
  updating?: boolean;
  completed: boolean;
  onDelete: (id: number) => void;
  onEdit: (task: Task) => void;
  onDragStart: (id: number) => void;
  onDrop: (completed: boolean) => void;
}>();
</script>

<style lang="scss" scoped>
.task {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  margin-bottom: 6px;
  background: #368dd43b;
  cursor: grab;
  border-radius: 5px;
  .task-info {
    text-align: left;
    flex: 1;
    word-break: break-word;
    white-space: normal;
  }
  .button-block{
    width: 60px;
    gap: 5px;
    display: flex;
    justify-content: space-between;
  }
}
.task.done {
  .task-info {
    text-decoration: line-through;
  }
}
</style>
