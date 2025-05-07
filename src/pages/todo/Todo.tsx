import { TodoTable } from "~components/TodoTable/TodoTable";
import { FilterType, ITodo, SortType } from "~types/types";
import { TodoForm } from "~components/TodoForm/TodoForm";
import { TodoRoot } from "~pages/todo/styles";
import { useState } from "react";
import {
	Box,
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	SelectChangeEvent,
	Typography
} from "@mui/material";

export const Todo = () => {
	const [addingTodo, setAddingTodo] = useState<boolean>(false);
	const [editingTodo, setEditingTodo] = useState<ITodo | null>(null);

	const [filter, setFilter] = useState<FilterType>(FilterType.ALL);
	const [sort, setSort] = useState<SortType>(SortType.NEWEST);

	const handleFilterChange = (event: SelectChangeEvent) => {
		setFilter(event.target.value as FilterType);
	};

	const handleSortChange = (event: SelectChangeEvent) => {
		setSort(event.target.value as SortType);
	};

	return (
		<Box sx={{ width: "auto", p: 3 }}>
			{addingTodo && <TodoForm onCancel={() => setAddingTodo(false)} />}
			{editingTodo && <TodoForm todo={editingTodo} onCancel={() => setEditingTodo(null)} />}
			<Typography variant="h4" component="h1" gutterBottom>
				Todo List
			</Typography>
			<TodoRoot>
				<Box sx={{ display: "flex", gap: 2 }}>
					<FormControl sx={{ minWidth: 120 }}>
						<InputLabel>Filter</InputLabel>
						<Select value={filter} onChange={handleFilterChange} label="Filter">
							<MenuItem value="all">All</MenuItem>
							<MenuItem value="completed">Completed</MenuItem>
							<MenuItem value="active">Active</MenuItem>
						</Select>
					</FormControl>
					<FormControl sx={{ minWidth: 120 }}>
						<InputLabel>Sort by</InputLabel>
						<Select value={sort} onChange={handleSortChange} label="Sort by">
							<MenuItem value="newest">Newest first</MenuItem>
							<MenuItem value="oldest">Oldest first</MenuItem>
						</Select>
					</FormControl>
				</Box>
				<Button variant="contained" onClick={() => setAddingTodo(true)}>
					Add Todo
				</Button>
			</TodoRoot>
			<TodoTable filter={filter} sort={sort} setEditingTodo={setEditingTodo} />
		</Box>
	);
};
