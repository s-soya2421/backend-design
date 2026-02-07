import express from "express";
import { TaskService } from "../../application/services/taskService";
import { taskRoutes } from "./taskRoutes";

export function createServer(taskService: TaskService) {
  const app = express();
  app.use(express.json());

  app.get("/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  app.use(taskRoutes(taskService));

  return app;
}
