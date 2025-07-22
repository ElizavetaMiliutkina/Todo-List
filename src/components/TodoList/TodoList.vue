<template>
  <div class="todo-list">
    <div v-if="!loading">
      <input
          v-model="newTask"
          @keyup.enter="addTask"
          placeholder="Добавить задачу по нажатию на Enter"
      />
      <div v-if=tasks.length class="container">
        <div
            class="container__column"
            @dragover.prevent
            @drop="() => onDrop( false)"
        >
          <h3>Задачи</h3>
          <TaskItem
              v-for="task in pendingTasks"
              :key="task.id"
              :task="task"
              :updating="props.updating"
              :completed="false"
              :onDelete="onDelete"
              :onEdit="openEditModal"
              :onDragStart="onDragStart"
              :onDrop="onDrop"
          />
        </div>

        <div
            class="container__column"
            @dragover.prevent
            @drop="() => onDrop(true)"
        >
          <h3>Выполнено</h3>
          <TaskItem
              v-for="task in completedTasks"
              :key="task.id"
              :task="task"
              :updating="props.updating"
              :completed="true"
              :onDelete="onDelete"
              :onEdit="openEditModal"
              :onDragStart="onDragStart"
              :onDrop="onDrop"
          />
        </div>
      </div>
      <div v-else>
        Нет задач
      </div>
    </div>
    <div v-else>
       Загрузка...
    </div>
    <teleport to="body">
      <EditTaskModal
          :visible="isModalOpen"
          :task="taskToEdit"
          :updating="props.updating"
          @save="saveEdit"
          @cancel="closeModal"
      />
    </teleport>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed, ref, watch } from "vue";
import EditTaskModal from './EditTaskModal.vue';
import TaskItem from './TaskItem.vue';
import type { Task } from '@/types/task';

const props = defineProps<{
  tasks: Task[];
  loading: boolean;
  updating?: boolean;
  onAdd: (title: string) => void;
  onDelete: (id: number) => void;
  onEdit: (updatedTask: Task) => void;
  onToggle: (task: Task, completed: boolean) => void;
}>();

const draggedTaskId = ref<number | null>(null);
const newTask = ref<string | ''>('');
const isModalOpen = ref(false);
const taskToEdit = ref<Task | null>(null);

const openEditModal = (task: Task) => {
  taskToEdit.value = task;
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
  taskToEdit.value = null;
};

const saveEdit = (updatedTask: Task) => {
  props.onEdit?.(updatedTask);
};

watch(() => props.updating, (newVal) => {
  if (!newVal && isModalOpen.value) {
    closeModal();
  }
});

const pendingTasks = computed(() =>
    props.tasks.filter(task => !task.completed)
);
const completedTasks = computed(() =>
    props.tasks.filter(task => task.completed)
);

const onDragStart = (id: number) => {
  draggedTaskId.value = id;
};

const onDrop = (completed: boolean) => {
  if (draggedTaskId.value === null) return;

  const task = props.tasks.find(t => t.id === draggedTaskId.value);
  if (!task || task.completed === completed) {
    draggedTaskId.value = null;
    return;
  }

  props.onToggle?.(task, completed);
  draggedTaskId.value = null;
};

const onDelete = (id: number) => {
  props.onDelete?.(id);
};

const addTask = () => {
  if (newTask.value.trim()) {
    props.onAdd(newTask.value.trim());
    newTask.value = '';
  }
};
</script>

<style scoped lang="scss">
.todo-list{
  .container {
    display: flex;
    gap: 20px;

    &__column {
      flex: 1;
      padding: 10px;
      border: 1px solid #368dd4;
      border-radius: 12px;
      min-height: 200px;
    }
  }
}
</style>
