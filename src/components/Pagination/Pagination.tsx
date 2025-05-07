import { Box, Pagination as MuiPagination, PaginationItem } from "@mui/material";

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}

export const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
	return (
		<Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
			<MuiPagination
				count={totalPages}
				page={currentPage}
				onChange={(_, page) => onPageChange(page)}
				color="primary"
				renderItem={(item) => <PaginationItem {...item} />}
			/>
		</Box>
	);
};
