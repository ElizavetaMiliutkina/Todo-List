import { createStore } from 'vuex';
import { Task, TaskState} from '@/types/task';
import debounce from 'lodash/debounce';

export default createStore<TaskState>({
    state: () => ({
        tasks: [],
        isLoading: false,
        isUpdating: false,
        error: null
    }),
    mutations: {
        setTasks(state: TaskState, tasks: TaskState['tasks']) {
            state.tasks = tasks;
        },
        setLoading(state: TaskState, isLoading: TaskState['isLoading']) {
            state.isLoading = isLoading;
        },
        setUpdating(state: TaskState, isUpdating: TaskState['isUpdating']) {
            state.isUpdating = isUpdating;
        },
        updateTask(state: TaskState, updatedTask: Task) {
            const index = state.tasks.findIndex(t => t.id === updatedTask.id);
            if (index !== -1) {
                state.tasks[index] = updatedTask;
            }
        },
        deleteTask(state: TaskState, id: number) {
            state.tasks = state.tasks.filter(task => task.id !== id);
        },
        setError(state: TaskState, error: string | null) {
            state.error = error;
        },
    },
    actions: {
        async fetchTodos({ commit }) {
            commit('setLoading', true);
            try {
                //GET — получение списка задач;
                await new Promise(resolve => setTimeout(resolve, 1000));
                commit('setTasks', [
                    { id: 1, title: 'Созвон 11:00 МСК', completed: false },
                    { id: 2, title: 'Исправить хлебные крошки в разделе Отчетов', completed: true },
                    { id: 3, title: 'Написание Jest тестов на компонент таблицы', completed: false },
                    { id: 4, title: 'Выкатка проекта', completed: false },
                    { id: 5, title: 'Оценка задач по новому релизу', completed: false },
                    { id: 6, title: 'Обновить зависимости в package.json', completed: true },
                    { id: 7, title: 'Добавить skeleton-загрузку для Dashboard', completed: false },
                    { id: 8, title: 'Проверить кроссбраузерность в Safari', completed: false },
                ]);
            } catch (e) {
                commit('setError', 'Ошибка получения списка');
            }
            commit('setLoading', false);
        },
        editTodo({ commit, dispatch }, updatedTask: Task) {
            commit('updateTask', updatedTask);
            dispatch('debouncedSendEdit', updatedTask);
        },
        //Обновляем задачи на сервере при перетаскивании из одной колонки в другую
        debouncedSendEdit: debounce(async function (commit, updatedTask: Task) {
            try {
                console.log('Обновляем задачу на сервере', updatedTask.id);
                await new Promise(resolve => setTimeout(resolve, 500));
            } catch (e) {
                commit('setError', 'Ошибка при обновлении списка задач');
            }
        }, 300),
        async removeTask({ commit }, id: number) {
            commit('setUpdating', true);
            try {
                //DELETE — удаление задачи;
                await new Promise(resolve => setTimeout(resolve, 500));
                commit('deleteTask', id);
            } catch (e) {
                commit('setError', 'Ошибка удаления задачи');
            }
            commit('setUpdating', false);
        },
        async editTask({ commit }, updatedTask: Task) {
            commit('setUpdating', true);
            try {
                //PUT — редактирование существующей задачи;
                await new Promise(resolve => setTimeout(resolve, 500));
                commit('updateTask', updatedTask);
            } catch (e) {
                commit('setError', 'Ошибка редактирования задичи');
            }
            commit('setUpdating', false);
        },
        async createTask({ commit, state }, title: string) {
            commit('setUpdating', true);
            try {
                //POST — добавление новой задачи;
                await new Promise(resolve => setTimeout(resolve, 500));
                const newTask: Task = {
                    id: Math.max(0, ...state.tasks.map(t => t.id)) + 1,
                    title,
                    completed: false,
                };

                commit('setTasks', [...state.tasks, newTask]);
            } catch (e) {
                commit('setError', 'Ошибка создание задачи');
            }
            commit('setUpdating', false);
        },
    },
});
