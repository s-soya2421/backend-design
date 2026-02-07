import { randomUUID } from "crypto";

import { NotFoundError, ValidationError } from "./errors";
import { completeTask, newTask, Task } from "../domain/task";
import { TaskRepository } from "../domain/taskRepository";

export class TaskService {
  constructor(private readonly repository: TaskRepository) {}

  async listTasks(): Promise<Task[]> {
    return this.repository.findAll();
  }

  async createTask(title: string): Promise<Task> {
    const trimmed = title.trim();
    if (!trimmed) {
      throw new ValidationError("title is required");
    }

    const task = newTask(randomUUID(), trimmed, new Date());
    await this.repository.save(task);
    return task;
  }

  async completeTask(id: string): Promise<Task> {
    const task = await this.repository.findById(id);
    if (!task) {
      throw new NotFoundError("task not found");
    }

    const updated = completeTask(task, new Date());
    await this.repository.update(updated);
    return updated;
  }
}
