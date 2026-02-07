import { NextFunction, Request, Response, Router } from "express";

import { NotFoundError, ValidationError } from "../../application/errors";
import { TaskService } from "../../application/taskService";

const asyncHandler =
  (handler: (req: Request, res: Response, next: NextFunction) => Promise<void>) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(handler(req, res, next)).catch(next);
  };

export function createTaskRouter(service: TaskService): Router {
  const router = Router();

  router.get(
    "/tasks",
    asyncHandler(async (_req, res) => {
      const tasks = await service.listTasks();
      res.json({ tasks });
    })
  );

  router.post(
    "/tasks",
    asyncHandler(async (req, res) => {
      const title = typeof req.body?.title === "string" ? req.body.title : "";
      const task = await service.createTask(title);
      res.status(201).json({ task });
    })
  );

  router.post(
    "/tasks/:id/complete",
    asyncHandler(async (req, res) => {
      const task = await service.completeTask(req.params.id);
      res.json({ task });
    })
  );

  router.use(
    (err: unknown, _req: Request, res: Response, _next: NextFunction) => {
      if (err instanceof ValidationError) {
        res.status(400).json({ error: err.message });
        return;
      }

      if (err instanceof NotFoundError) {
        res.status(404).json({ error: err.message });
        return;
      }

      res.status(500).json({ error: "unexpected error" });
    }
  );

  return router;
}
