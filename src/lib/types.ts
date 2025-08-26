export type Priority = "low" | "medium" | "high";

export interface Task {
  id: string;
  listId: string;
  title: string;
  description?: string;
  dueDate?: Date;
  priority: Priority;
  completed: boolean;
}

export interface TaskList {
  id: string;
  title: string;
}
