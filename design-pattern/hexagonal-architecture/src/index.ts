import { buildTaskService } from "./config/container";
import { createServer } from "./adapters/http/server";

const taskService = buildTaskService();
const app = createServer(taskService);

const port = process.env.PORT ? Number(process.env.PORT) : 3000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
