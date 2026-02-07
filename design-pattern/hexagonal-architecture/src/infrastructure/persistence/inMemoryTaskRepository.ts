import { Task, TaskId } from "../../domain/task";
import { TaskRepository } from "../../application/ports/taskRepository";

export class InMemoryTaskRepository implements TaskRepository {
  private readonly store = new Map<TaskId, Task>();

  async save(task: Task): Promise<void> {
    this.store.set(task.id, task);
  }

  async update(task: Task): Promise<void> {
    this.store.set(task.id, task);
  }

  async findById(id: TaskId): Promise<Task | null> {
    return this.store.get(id) ?? null;
  }

  async list(): Promise<Task[]> {
    return Array.from(this.store.values());
  }
}
