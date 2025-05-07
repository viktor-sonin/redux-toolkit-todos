import { useState, useEffect, FormEvent } from "react";
import { useTodoActions } from "~app/reduxHooks";
import { ITodo } from "~types/types";
import {
	Button,
	TextField,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle
} from "@mui/material";

interface TodoFormProps {
	todo?: ITodo;
	onCancel?: () => void;
}

export const TodoForm = ({ todo, onCancel }: TodoFormProps) => {
	const { addTodo, editTodo } = useTodoActions();

	const [title, setTitle] = useState(todo?.title || "");
	const [open, setOpen] = useState(true);

	useEffect(() => {
		if (todo) {
			setTitle(todo.title);
		}
	}, [todo]);

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		if (!title.trim()) return;

		if (todo) {
			editTodo({ ...todo, title });
		} else {
			addTodo(title);
		}

		setTitle("");
		handleClose();
	};

	const handleClose = () => {
		setOpen(false);
		if (onCancel) onCancel();
	};

	return (
		<Dialog open={open} onClose={handleClose} fullWidth>
			<DialogTitle>{todo ? "Edit todo" : "Add new todo"}</DialogTitle>
			<form onSubmit={handleSubmit}>
				<DialogContent>
					<TextField
						autoFocus
						margin="dense"
						label="Todo Title"
						type="text"
						fullWidth
						variant="outlined"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						required
					/>
				</DialogContent>
				<DialogActions sx={{ padding: "0 24px 16px 0" }}>
					<Button onClick={handleClose}>Cancel</Button>
					<Button type="submit" variant="contained" color="primary">
						{todo ? "Update" : "Add"}
					</Button>
				</DialogActions>
			</form>
		</Dialog>
	);
};
