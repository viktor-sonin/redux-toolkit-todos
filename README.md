# 📝ToDo приложение на React с использованием стейт менеджера Redux Toolkit

🌐 Превью проекта: [https://viktor-sonin.github.io/redux-toolkit-todos/](https://viktor-sonin.github.io/redux-toolkit-todos/)


## Тестовое задание: «Управление состоянием с Redux Toolkit: To-Do с таблицей и сохранением»

🎯 Цель:
Освоить принципы работы с Redux: создание хранилища, actions, reducers, взаимодействие с UI. Понять отличия Redux от MobX и Context API. Научиться отображать данные в таблице, добавлять и редактировать элементы через форму и сохранять состояние между сессиями.

🧾 Технические требования:

- React + Redux Toolkit
- TypeScript
- Tailwind / CSS Modules / Styled Components — по желанию
- Структура проекта: features, components, store
- Функциональность:
  - Добавление задачи
  - Редактирование задачи
  - Отображение в таблице
  - Сортировка, фильтрация, пагинация
  - Сохранение в localStorage


## 🛠 Структура проекта:

### Стек технологий

- Vite
- React 18
- Redux Toolkit
- TypeScript
- localStorage
- Material UI

### Файловая структура

```tsx
src/
├── App.tsx              # Прослойка между Todo и index.tsx
├── index.tsx            # Точка входа, тут подключил store и ThemeProvider
├── app/
│  ├── reduxHooks.ts     # Типизированные хуки
│  └── store.ts          # Redux Store с сохранением в localStorage
├── components/
│  ├── Pagination/       # Компонент пагинации для таблицы
│  ├── TodoForm/         # Компонент модальной формы для создания/изменения Todo-шек
│  └── TodoTable/        # Компонент таблицы
├── features/
│  ├── todoSelectors.ts  # Кастомные селекторы для фильтрации таблицы
│  └── todosSlice.ts     # Слайс для стора
└── pages/
  └── Todo.tsx           # Основной компонент с состоянием
```

### 🚀 Установка

1. Клонируйте репозиторий:
```bash
git clone https://github.com/viktor-sonin/redux-toolkit-todos.git
```

2. Установите зависимости:

```bash
npm install
# или
bun install
```

3. Запустите приложение:

```bash
npm run dev
# или
bun run dev
```


## 🔧 Реализованные функции

### Управление состоянием
- Создан store с использованием Redux Toolkit
- Реализован слайс для todos с actions:
    - Добавление Todo
    - Редактирование Todo
    - Переключение состояния Todo
    - Удаление Todo
- Использованы кастомные селекторы для фильтрации и сортировки

### Работа с данными
- Сохранение состояния в localStorage
- Восстановление состояния при загрузке
- Фильтрация по статусу (все/активные/завершенные)
- Сортировка по дате создания
- Пагинация данных

### UI компоненты
- Фильтры и сортировка
- Форма добавления/редактирования
- Таблица с Todo-шками
- Пагинация


## 📚 Основные моменты

### Сохранение состояния между сессиями с помощью localStorage

**hydrateStore** - функция, которая при создании стора достает данные из localStorage.
Если в localStorage данных не будет найдено, то функция возвращает пустой объект.

```ts
function hydrateStore(): TodosState | object {
  try {
    const serialisedState = localStorage.getItem(REDUX_LOCAL_STORAGE_KEY);
    if (serialisedState) {
      return JSON.parse(serialisedState);
    }
  } catch (e) {
    console.warn(e);
  }

  return {};
}
```

Данные устанавливаются в **preloadedState** при создании стора

```ts
export const store = configureStore({
  ...,
  preloadedState: hydrateStore()
});
```

Сохранение реализовано с помощью подписки на событие изменения стора

```ts
store.subscribe(() => saveToLocalStorage(store.getState()));
```

**saveToLocalStorage** - функция, которая сохраняет изменения в сторе в localStorage

```ts
export const saveToLocalStorage = (state: { todo: TodosState }) => {
  try {
    const serializedState = JSON.stringify(state);
      localStorage.setItem(REDUX_LOCAL_STORAGE_KEY, serializedState);
    } catch (e) {
      console.warn("Could not save state to localStorage", e);
    }
};
```

[исходный код](https://github.com/viktor-sonin/redux-toolkit-todos/blob/master/src/app/store.ts)

---

### Кастомные селекторы для фильтрации

Селектор для фильтрации Todo-шек по завершенности задачи

```ts
export const selectFilteredTodos = createSelector(
  [selectTodos, (_state: TodosState, filterType: FilterType) => filterType],
  (list, filterType) => {
    if (filterType !== FilterType.ALL) {
      return list.filter((todo) => todo.completed === (filterType === FilterType.COMPLETED));
    }
    return list;
  }
);
```

Селектор для сортировки Todo-шек по дате, тут воспользовался деструктуризацией, чтобы не писать `a.createdAt - b.createdAt`

```ts
export const selectSortedAndFilteredTodos = createSelector(
  [selectFilteredTodos, (_state: TodosState, _filter: FilterType, sortBy: SortType) => sortBy],
  (filteredTodos, sortBy) => {
    return [...filteredTodos].sort(({ createdAt: a }, { createdAt: b }) => {
      return sortBy === SortType.OLDEST ? a - b : b - a;
    });
  }
);
```

Селектор для пагинации таблицы

```ts
export const selectPaginatedTodos = createSelector(
  [
    selectSortedAndFilteredTodos,
    (_state: TodosState, _filter: FilterType, _sortBy: SortType, page: number) => page,
    (_state: TodosState, _filter: FilterType, _sortBy: SortType, _page: number, pageSize: number) =>
      pageSize
  ],
  (sortedTodos, page, pageSize) => {
    const startIndex = (page - 1) * pageSize;
    return sortedTodos.slice(startIndex, startIndex + pageSize);
  }
);
```

[исходный код](https://github.com/viktor-sonin/redux-toolkit-todos/blob/master/src/features/todos/todoSelectors.ts)


## 📊 Сравнение использования Redux Toolkit, Zustand, MobX и Effector для управления состоянием в приложении:

Все реализации сохраняют одинаковую функциональность, но различаются по объему кода и работой с состоянием.

### Сравнение в коде

В данном проекте различия между этими технологиями будут не сильно большие, поэтому разберем самую важную логику приложения - она сосредоточена в [сторе](https://github.com/viktor-sonin/redux-toolkit-todos/blob/master/src/app/store.ts) и [селекторах](https://github.com/viktor-sonin/redux-toolkit-todos/blob/master/src/features/todos/todoSelectors.ts), сравним как можно было бы написать их на разных стейт менеджерах:

#### **Zustand**

```ts
const useTodoStore = create<ITodosStore, TPersist<ITodosStore>>(
  persist((set, get) => ({
    // ... state, actions(add, edit, delete)

    // Фильтрация
    filteredTodos: () => {
      const { todos, filter } = get();
      if (filter !== FilterType.ALL) {
        return todos.filter(todo =>
          todo.completed === (filter === FilterType.COMPLETED)
        );
      }
      return todos;
    },

    // Сортировка
    sortedTodos: () => {
      const { filteredTodos, sort } = get();
      return [...filteredTodos()].sort(({ createdAt: a }, { createdAt: b }) =>
        sort === SortType.OLDEST ? a - b : b - a;
      );
    },

    // Пагинация
    paginatedTodos: () => {
      const { sortedTodos, page, pageSize } = get();
      const start = (page - 1) * pageSize;
      return sortedTodos().slice(start, start + pageSize);
    }
  }),
  { name: "todos-store", version: 20250426 }
));
```

Плюсы:

- Сохранение в localStorage с помощью middleware "persist"
- Нет boilerplate-кода
- Все вычисления в одном месте
- Автоматическая мемоизация

---

#### **MobX**

```ts
class TodoStore {
  // ... state, actions(add, edit, delete)

  constructor() {
    makeAutoObservable(this, {
      filteredTodos: computed,
      sortedTodos: computed,
      paginatedTodos: computed
    });
  }

  // Фильтрация
  get filteredTodos() {
    if (this.filter !== FilterType.ALL) {
      return this.todos.filter((todo) => todo.completed === (this.filter === FilterType.COMPLETED));
    }
    return this.todos;
  }

  // Сортировка
  get sortedTodos() {
    return [...this.filteredTodos].sort(({ createdAt: a }, { createdAt: b }) =>
      this.sort === SortType.OLDEST ? a - b : b - a;
    );
  }

  // Пагинация
  get paginatedTodos() {
    const start = (this.page - 1) * this.pageSize;
    return this.sortedTodos.slice(start, start + this.pageSize);
  }
}
```

Плюсы:

- Очень лаконичный синтаксис
- Автоматическая реактивность
- Лучшая производительность при частых обновлениях

Минусы:

- Необходимо вручную писать сохранение в localStorage

---

#### **Effector**

```ts
// ... state, actions(add, edit, delete)

// Фильтрация
const $filteredTodos = combine($todos, $filter, (todos, filter) => {
  if (filter !== FilterType.ALL) {
    return todos.filter((todo) => todo.completed === (filter === FilterType.COMPLETED));
  }
  return todos;
});

// Сортировка
const $sortedTodos = combine($filteredTodos, $sort, (todos, sort) => {
  return [...todos].sort(({ createdAt: a }, { createdAt: b }) =>
    sort === SortType.OLDEST ? a - b : b - a;
  );
});

// Пагинация
const $paginatedTodos = combine($sortedTodos, $page, $pageSize, (todos, page, pageSize) => {
  const start = (page - 1) * pageSize;
  return todos.slice(start, start + pageSize);
});
```

Плюсы:

- Четкое разделение логики
- Легко тестируется
- Оптимальные перерисовки

Минусы:

- Необходимо вручную писать сохранение в localStorage

---

### Сравнение в таблицах

#### Критерии сравнения

| Критерий         | Описание                      |
| ---------------- | ----------------------------- |
| Простота         | Легкость начальной интеграции |
| Boilerplate      | Количество boilerplate-кода   |
| Перформанс       | Скорость работы и оптимизация |
| DevTools         | Наличие инструментов отладки  |
| Масштабируемость | Удобство для роста приложения |
| Сообщество       | Популярность и экосистема     |

#### Сравнительная таблица

| Библиотека       | Redux Toolkit                     | Zustand                   | MobX                          | Effector                      |
| ---------------- | --------------------------------- | ------------------------- | ----------------------------- | ----------------------------- |
| Простота         | Средняя (требует настройки store) | Очень простая             | Простая (декораторы optional) | Средняя (концепции доменов)   |
| Boilerplate      | Умеренный (`slices`, `actions`)   | Минимальный               | Минимальный (с observer)      | Умеренный (эффекты, события)  |
| Перформанс       | Хороший                           | Отличный                  | Хороший (с mobx-react-lite)   | Отличный                      |
| DevTools         | Отличные (Redux DevTools)         | Базовые (Redux DevTools)  | Хорошие                       | Хорошие (effector-logger)     |
| Масштабируемость | Отличная (для больших проектов)   | Хорошая                   | Хорошая                       | Отличная (доменная структура) |
| Сообщество       | Очень большое                     | Растущее                  | Большое                       | Среднее (но активное)         |
| Лучший сценарий  | Крупные проекты с командой        | Небольшие/средние проекты | Реактивные вычисления         | Сложная бизнес-логика         |

## 🏁 Итоги

1. **Zustand** - лучший выбор для этого проекта:

   - Минимальный boilerplate
   - Простая интеграция с React
   - Достаточно мощи для функционала приложения

2. **Redux Toolkit** - избыточен, но хорош если:

   - Планируется сильно расширять функционал
   - В команде есть опыт работы с Redux

3. **MobX** - хорош для реактивных вычислений:

   - Если нужно автоматически выводить сложные производные состояния

4. **Effector** - для сложной бизнес-логики:

   - Если приложение будет частью большой системы
   - Нужны сложные цепочки событий

Все варианты работоспособны, но Zustand предлагает лучший баланс простоты и функциональности для такого проекта. (~~а еще он нравится мне больше других~~)
