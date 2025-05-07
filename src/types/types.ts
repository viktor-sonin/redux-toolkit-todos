export const TodoStatus = {
	IDLE: "idle",
	LOADING: "loading",
	FAILED: "failed"
} as const;

export type TodoStatus = typeof TodoStatus;

export interface ITodo {
	id: string;
	title: string;
	completed: boolean;
	createdAt: number;
}

export const FilterType = {
	ALL: "all",
	COMPLETED: "completed",
	ACTIVE: "active"
} as const;

export type FilterType = (typeof FilterType)[keyof typeof FilterType];

export const SortType = {
	NEWEST: "newest",
	OLDEST: "oldest"
} as const;

export type SortType = (typeof SortType)[keyof typeof SortType];
