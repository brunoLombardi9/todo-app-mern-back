import { Router } from "express";
import taskModel from "../storage/models/taskModel.js";
import userModel from "../storage/models/userModel.js";

const taskRouter = Router();

taskRouter.get("/:taskId", async (req, res) => {
  try {
    const { taskId } = req.params;
    const task = await taskModel.findById(taskId);
    console.log(task);
    res.status(200).json(task);
  } catch (error) {
    console.log(error);
    res.redirect("/tasksManager");
  }
});

taskRouter.put("/:taskId", async (req, res) => {
  try {
    const { taskId } = req.params;
    const { title, date, content } = req.body;
    const task = await taskModel.findById(taskId);
    task.title = title;
    task.date = date;
    task.content = content;
    await task.save();
    res.status(200).json(task);
  } catch (error) {
    console.log(error);
    res.redirect("/tasksManager");
  }
});

taskRouter.delete("/", async (req, res) => {
  try {
    const { userId, taskId } = req.query;
    const user = await userModel.findById(userId);
    const task = await taskModel.findById(taskId);

    if (task.userId.equals(user._id)) {
      await taskModel.findByIdAndRemove(taskId);
      res.status(200).json({ message: "Tarea eliminada" });
    } else {
      res.status(409).json({
        message: "El usuario no está autorizado a borrar esta tarea.",
      });
    }
  } catch (error) {
    console.log(error);
  }
});

export default taskRouter;
