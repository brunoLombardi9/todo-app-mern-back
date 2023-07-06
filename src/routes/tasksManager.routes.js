import { Router } from "express";
import taskModel from "../storage/models/taskModel.js";

const tasksManagerRouter = Router();

tasksManagerRouter.get("/", async (req, res) => {
  try {
    const { userId } = req.query;
    const tasks = await taskModel.find({ userId });
    res.status(200).json(tasks);
  } catch (error) {
    console.log(error);
  }
});

tasksManagerRouter.post("/", async (req, res) => {
  try {
    const taskData = req.body;
    const tasks = await taskModel.create(taskData);
    res.status(200).json(tasks);
  } catch (error) {
    console.log(error);
  }
});

export default tasksManagerRouter;
