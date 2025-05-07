import { addTask, editTask, toggleTask, deleteTask } from "~features/todos/slice";
import { useDispatch, UseDispatch, useSelector, UseSelector } from "react-redux";
import { AppDispatch, RootState } from "~app/store";

export const useAppDipatch: UseDispatch<AppDispatch> = useDispatch.withTypes<AppDispatch>();
export const useAppSelector: UseSelector<RootState> = useSelector.withTypes<RootState>();

export const useTodoActions = () => {
	const dispatch = useAppDipatch();

	const addTodo = (title: string) => dispatch(addTask(title));
	const editTodo = (todo: { id: string; title: string }) => dispatch(editTask(todo));
	const toggleTodo = (id: string) => dispatch(toggleTask(id));
	const deleteTodo = (id: string) => dispatch(deleteTask(id));

	return {
		addTodo,
		editTodo,
		toggleTodo,
		deleteTodo
	};
};
