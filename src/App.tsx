import { Todo } from "~pages/todo/Todo";
import { Box } from "@mui/material";

export const App = () => {
	return (
		<>
			<Box
				sx={{
					height: "100vh",
					minWidth: "100vw",
					bgcolor: "background.default",
					color: "text.primary"
				}}
			>
				<Todo />
			</Box>
		</>
	);
};
