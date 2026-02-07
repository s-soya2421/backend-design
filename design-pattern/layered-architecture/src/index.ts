import { createServer } from "./presentation/http/server";
import { TaskService } from "./application/taskService";
import { InMemoryTaskRepository } from "./infrastructure/persistence/inMemoryTaskRepository";

const repository = new InMemoryTaskRepository();
const service = new TaskService(repository);
const app = createServer(service);

const port = Number(process.env.PORT) || 3000;
app.listen(port, () => {
  console.log(`Layered server listening on port ${port}`);
});
