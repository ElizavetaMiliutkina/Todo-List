<template>
  <div v-if="visible" class="modal-overlay" @click.self="$emit('cancel')">
    <div class="modal">
      <div v-if="props.updating">Сохранение...</div>
      <div v-else>
        <h3>Редактировать задачу</h3>
        <input v-model="localTitle" class="edit-input" />
        <div class="modal-buttons">
          <button @click="$emit('cancel')">Отмена</button>
          <button @click="save" :disabled="props.updating">Сохранить</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from 'vue';
import type { Task } from '@/types/task';

const props = defineProps<{
  visible: boolean;
  task: Task | null;
  updating?: boolean;
}>();

const emit = defineEmits(['save', 'cancel']);

const localTitle = ref('');

watch(() => props.task, (newTask) => {
  localTitle.value = newTask?.title || '';
});

const save = () => {
  if (props.task && localTitle.value.trim()) {
    emit('save', { ...props.task, title: localTitle.value.trim() });
  }
};
</script>

<style lang="scss" scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 300px;
  z-index: 1000;
  .modal {
    background: white;
    padding: 20px;
    border-radius: 8px;
    min-width: 300px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  }
}
</style>
