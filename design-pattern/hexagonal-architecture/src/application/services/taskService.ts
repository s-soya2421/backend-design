import { completeTask, createTask, Task } from "../../domain/task";
import { NotFoundError, ValidationError } from "../errors/errors";
import { Clock } from "../ports/clock";
import { IdGenerator } from "../ports/idGenerator";
import { TaskRepository } from "../ports/taskRepository";

export interface CreateTaskInput {
  title: string;
}

export class TaskService {
  constructor(
    private readonly repo: TaskRepository,
    private readonly idGenerator: IdGenerator,
    private readonly clock: Clock
  ) {}

  async createTask(input: CreateTaskInput): Promise<Task> {
    const title = input.title?.trim();
    if (!title) {
      throw new ValidationError("Title is required");
    }

    const task = createTask({
      id: this.idGenerator.generate(),
      title,
      createdAt: this.clock.now()
    });

    await this.repo.save(task);
    return task;
  }

  async listTasks(): Promise<Task[]> {
    return this.repo.list();
  }

  async completeTask(id: string): Promise<Task> {
    if (!id) {
      throw new ValidationError("Task id is required");
    }

    const task = await this.repo.findById(id);
    if (!task) {
      throw new NotFoundError("Task not found");
    }

    const updated = completeTask(task, this.clock.now());
    await this.repo.update(updated);
    return updated;
  }
}
