import { TaskService } from "../application/services/taskService";
import { InMemoryTaskRepository } from "../infrastructure/persistence/inMemoryTaskRepository";
import { SystemClock } from "../infrastructure/clock/systemClock";
import { CryptoIdGenerator } from "../infrastructure/id/cryptoIdGenerator";

export function buildTaskService(): TaskService {
  const repo = new InMemoryTaskRepository();
  const clock = new SystemClock();
  const idGenerator = new CryptoIdGenerator();
  return new TaskService(repo, idGenerator, clock);
}
