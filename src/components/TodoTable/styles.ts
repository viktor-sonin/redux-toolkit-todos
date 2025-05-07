import { styled, TableCell } from "@mui/material";

export const TodoTableCell = styled(TableCell)(({ theme }) => ({
	padding: "8px 0 8px 16px",
	"&:last-child": {
		paddingRight: "16px"
	},
	[theme.breakpoints.up("sm")]: {
		padding: "16px"
	}
}));
