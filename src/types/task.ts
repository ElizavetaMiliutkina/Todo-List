export interface Task {
    id: number;
    title: string;
    completed: boolean;
}

export interface TaskState {
    tasks: Task[];
    isLoading: boolean;
    isUpdating: boolean;
    error: string | null,
}
