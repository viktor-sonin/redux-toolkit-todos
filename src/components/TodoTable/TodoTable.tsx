import { TodoTableCell } from "~components/TodoTable/styles";
import { selectPaginatedTodos } from "~features/todos/selectors";
import { useTodoActions, useAppSelector } from "~app/reduxHooks";
import { Pagination } from "~components/Pagination/Pagination";
import { FilterType, ITodo, SortType } from "~types/types";
import { Edit, Delete } from "@mui/icons-material";
import { RootState } from "~app/store";
import { useState } from "react";
import {
	Box,
	Checkbox,
	Paper,
	Table,
	TableBody,
	TableContainer,
	TableHead,
	TableRow,
	IconButton
} from "@mui/material";

interface Props {
	filter: FilterType;
	sort: SortType;
	setEditingTodo: (todo: ITodo) => void;
}

export const TodoTable = ({ filter, sort, setEditingTodo }: Props) => {
	const { toggleTodo, deleteTodo } = useTodoActions();

	const isMobile = window.innerWidth < 767;
	const [page, setPage] = useState(1);
	const pageSize = 5;

	const tableTitles = ["Title", "Created At", "Status", "Actions"];
	const todos = useAppSelector((state) =>
		selectPaginatedTodos(state.todo, filter, sort, page, pageSize)
	);

	const totalTodos = useAppSelector((state: RootState) => state.todo.todos.length);
	const totalPages = Math.ceil(totalTodos / pageSize);

	const handleToggle = (id: string) => toggleTodo(id);
	const handleDelete = (id: string) => deleteTodo(id);
	const handleEdit = (todo: ITodo) => setEditingTodo(todo);

	return (
		<Box>
			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							{tableTitles.map((title) => {
								if (isMobile && title === "Created At") return "";
								return <TodoTableCell key={title}>{title}</TodoTableCell>;
							})}
						</TableRow>
					</TableHead>
					<TableBody>
						{todos.map((todo) => (
							<TableRow key={todo.id}>
								<TodoTableCell>{todo.title}</TodoTableCell>
								{!isMobile && (
									<TodoTableCell>{new Date(todo.createdAt).toUTCString()}</TodoTableCell>
								)}
								<TodoTableCell width={"15%"}>
									<label style={{ display: "block" }}>
										<Checkbox
											checked={todo.completed}
											onChange={() => handleToggle(todo.id)}
											color="primary"
										/>
										{isMobile ? "" : todo.completed ? "Completed" : "Active"}
									</label>
								</TodoTableCell>
								<TodoTableCell width={"10%"}>
									<IconButton onClick={() => handleEdit(todo)} color="primary" aria-label="edit">
										<Edit />
									</IconButton>
									<IconButton
										onClick={() => handleDelete(todo.id)}
										color="error"
										aria-label="delete"
									>
										<Delete />
									</IconButton>
								</TodoTableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			<Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
		</Box>
	);
};
