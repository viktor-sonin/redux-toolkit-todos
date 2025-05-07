import { TodosState, todosSlice } from "~features/todos/slice";
import { configureStore } from "@reduxjs/toolkit";

export const REDUX_LOCAL_STORAGE_KEY = "todoState";

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

export const saveToLocalStorage = (state: { todo: TodosState }) => {
	try {
		const serializedState = JSON.stringify(state);
		localStorage.setItem(REDUX_LOCAL_STORAGE_KEY, serializedState);
	} catch (e) {
		console.warn("Could not save state to localStorage", e);
	}
};

export const store = configureStore({
	reducer: {
		[todosSlice.name]: todosSlice.reducer
	},
	preloadedState: hydrateStore()
});

store.subscribe(() => saveToLocalStorage(store.getState()));

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
