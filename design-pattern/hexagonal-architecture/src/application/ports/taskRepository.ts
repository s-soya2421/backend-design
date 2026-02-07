import { Task, TaskId } from "../../domain/task";

export interface TaskRepository {
  save(task: Task): Promise<void>;
  update(task: Task): Promise<void>;
  findById(id: TaskId): Promise<Task | null>;
  list(): Promise<Task[]>;
}
