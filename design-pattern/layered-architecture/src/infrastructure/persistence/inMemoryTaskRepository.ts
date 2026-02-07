import { TaskRepository } from "../../domain/taskRepository";
import { Task } from "../../domain/task";

export class InMemoryTaskRepository implements TaskRepository {
  private readonly tasks = new Map<string, Task>();

  async findAll(): Promise<Task[]> {
    return Array.from(this.tasks.values()).sort(
      (a, b) => a.createdAt.getTime() - b.createdAt.getTime()
    );
  }

  async findById(id: string): Promise<Task | null> {
    return this.tasks.get(id) ?? null;
  }

  async save(task: Task): Promise<void> {
    this.tasks.set(task.id, task);
  }

  async update(task: Task): Promise<void> {
    this.tasks.set(task.id, task);
  }
}
