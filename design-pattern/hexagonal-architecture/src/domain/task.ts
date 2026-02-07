export type TaskId = string;

export interface Task {
  id: TaskId;
  title: string;
  completed: boolean;
  createdAt: Date;
  completedAt?: Date;
}

export function createTask(props: {
  id: TaskId;
  title: string;
  createdAt: Date;
}): Task {
  const title = props.title.trim();
  if (title.length === 0) {
    throw new Error("Title must not be empty");
  }

  return {
    id: props.id,
    title,
    completed: false,
    createdAt: props.createdAt
  };
}

export function completeTask(task: Task, completedAt: Date): Task {
  if (task.completed) return task;
  return { ...task, completed: true, completedAt };
}
