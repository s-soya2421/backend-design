import { Router, Request, Response } from "express";
import { TaskService } from "../../application/services/taskService";
import { NotFoundError, ValidationError } from "../../application/errors/errors";

export function taskRoutes(service: TaskService): Router {
  const router = Router();

  router.get("/tasks", async (_req: Request, res: Response) => {
    const tasks = await service.listTasks();
    res.json({ tasks });
  });

  router.post("/tasks", async (req: Request, res: Response) => {
    try {
      const task = await service.createTask({ title: req.body?.title });
      res.status(201).json({ task });
    } catch (err) {
      handleError(err, res);
    }
  });

  router.post("/tasks/:id/complete", async (req: Request, res: Response) => {
    try {
      const task = await service.completeTask(req.params.id);
      res.json({ task });
    } catch (err) {
      handleError(err, res);
    }
  });

  return router;
}

function handleError(err: unknown, res: Response): void {
  if (err instanceof ValidationError) {
    res.status(400).json({ error: err.message });
    return;
  }
  if (err instanceof NotFoundError) {
    res.status(404).json({ error: err.message });
    return;
  }

  res.status(500).json({ error: "Unexpected error" });
}
