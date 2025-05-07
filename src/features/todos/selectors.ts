import { FilterType, SortType } from "~types/types";
import { TodosState } from "~features/todos/slice";
import { createSelector } from "@reduxjs/toolkit";

const selectTodos = (state: TodosState) => state.todos;

export const selectFilteredTodos = createSelector(
	[selectTodos, (_state: TodosState, filterType: FilterType) => filterType],
	(todos, filterType) => {
		if (filterType !== FilterType.ALL) {
			return todos.filter((todo) => todo.completed === (filterType === FilterType.COMPLETED));
		}
		return todos;
	}
);

export const selectSortedAndFilteredTodos = createSelector(
	[selectFilteredTodos, (_state: TodosState, _filter: FilterType, sortBy: SortType) => sortBy],
	(filteredTodos, sortBy) => {
		return [...filteredTodos].sort(({ createdAt: a }, { createdAt: b }) => {
			return sortBy === SortType.OLDEST ? a - b : b - a;
		});
	}
);

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
