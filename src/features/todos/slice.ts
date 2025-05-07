import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITodo } from "~types/types";

export interface TodosState {
	todos: ITodo[];
}

const initialState: TodosState = {
	todos: [
		{
			id: "0",
			title: "Изучить React",
			completed: true,
			createdAt: 1745583586569
		},
		{
			id: "1",
			title: "Изучить Redux-Toolkit",
			completed: false,
			createdAt: 1745583930921
		}
	]
};

export const todosSlice = createSlice({
	name: "todo",
	initialState,
	reducers: {
		addTask: (state, action: PayloadAction<string>) => {
			console.log("add", action.payload);
			const newTask: ITodo = {
				id: String(Date.now()),
				title: action.payload,
				completed: false,
				createdAt: Date.now()
			};
			state.todos.push(newTask);
		},
		editTask: (state, action: PayloadAction<Pick<ITodo, "id" | "title">>) => {
			const index = state.todos.findIndex((task) => task.id === action.payload.id);
			if (index !== -1) {
				state.todos[index].title = action.payload.title;
			}
		},
		toggleTask: (state, action: PayloadAction<string>) => {
			const index = state.todos.findIndex((task) => task.id === action.payload);
			if (index !== -1) {
				const task = state.todos[index];
				task.completed = !task.completed;
			}
		},
		deleteTask: (state, action: PayloadAction<string>) => {
			state.todos = state.todos.filter((task) => task.id !== action.payload);
		}
	}
});

export const { addTask, editTask, toggleTask, deleteTask } = todosSlice.actions;
