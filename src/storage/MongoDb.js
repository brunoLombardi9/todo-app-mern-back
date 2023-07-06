import mongoose from "mongoose";
import "./models/userModel.js";
import "./models/taskModel.js";

mongoose
  .connect(process.env.MONGODB_ATLAS)
  .then((res) => console.log("conectado a mongo"))
  .catch((err) => console.log(err));
