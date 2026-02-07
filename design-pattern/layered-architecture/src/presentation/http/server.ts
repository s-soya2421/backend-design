import express from "express";

import { TaskService } from "../../application/taskService";
import { createTaskRouter } from "./taskRoutes";

export function createServer(service: TaskService) {
  const app = express();

  app.use(express.json());

  app.get("/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  app.use(createTaskRouter(service));

  return app;
}
