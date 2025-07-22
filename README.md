# todo-list

## Стек технологий
- **Vue 3** (Composition API)
- **TypeScript**
- **Vuex 4**
- **SCSS**
- **ESLint**
- **Lodash** (debounce)

## Project start
```
npm install
```
```
npm run serve
```

### Lints and fixes files
```
npm run lint
```
## Структура проекта
- `src/components/` — Vue-компоненты (TodoList)
- `src/store/` — Vuex store
- `src/types/` — глобальные типы TypeScript
- `src/assets/` — глобальные стили SCSS
- `src/App.vue` — корневой компонент

## О компоненте TodoList

Компонент `TodoList.vue` реализован как переиспользуемый и изолированный:
- Принимает задачи (`tasks`), состояние загрузки (`loading`), блокировку (`disable`) и колбэки (`onAdd`, `onDelete`, `onToggle`) через пропсы.
- Не зависит от конкретной реализации хранилища (store).
- Вся логика, добавления, удаления и переключения задач инкапсулирована внутри компонента.
