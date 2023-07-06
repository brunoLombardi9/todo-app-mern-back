import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const taskSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  title: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    default: "",
  },
  content: {
    type: String,
    default: "",
  },
});

taskSchema.plugin(mongoosePaginate);

const taskModel = model("tasks", taskSchema);

export default taskModel;
