import express, { urlencoded } from "express";
import "dotenv/config";
import "./storage/MongoDb.js";

import cors from "cors";
import tasksManagerRouter from "./routes/tasksManager.routes.js";
import loginRouter from "./routes/login.routes.js";
import taskRouter from "./routes/task.routes.js";
import signupRouter from "./routes/signup.routes.js";
import { __dirname } from "../path.js";

const app = express();

app.listen(process.env.PORT);

// MIDDLEWARES
app.use(urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use("/", express.static(__dirname + "/public"));

// ROUTES

app.use("/login", loginRouter);
app.use("/signup", signupRouter);
app.use("/tasksmanager", tasksManagerRouter);
app.use("/task", taskRouter);
app.get("*", (req, res) => {
  res.sendFile(`${__dirname}/public/index.html`);
});
