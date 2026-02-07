export type TaskStatus = "todo" | "done";

export type Task = {
  id: string;
  title: string;
  status: TaskStatus;
  createdAt: Date;
  completedAt?: Date;
};

export function newTask(id: string, title: string, createdAt: Date): Task {
  return {
    id,
    title,
    status: "todo",
    createdAt
  };
}

export function completeTask(task: Task, completedAt: Date): Task {
  if (task.status === "done") {
    return task;
  }

  return {
    ...task,
    status: "done",
    completedAt
  };
}
