import { Router } from "express";
import { hashData } from "../utils/hash.js";
import userModel from "../storage/models/userModel.js";

const signupRouter = Router();

signupRouter.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExist = await userModel.findOne({ email });
    if (userExist) {
      return res.status(409).json({ error: "User Already exists." });
    }

    const hashedPassword = await hashData(password);
    const newUser = await userModel.create({ email, password: hashedPassword });
    const userData = {
      userId: newUser._id,
      email,
    };
    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ error: "Error on the server, try later." });
  }
});

export default signupRouter;
