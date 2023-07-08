import { Router } from "express";
import userModel from "../storage/models/userModel.js";
import { compareData } from "../utils/hash.js";

const loginRouter = Router();

loginRouter.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExist = await userModel.findOne({ email });
    const dehashedPassword = await compareData(password, userExist?.password);

    if (!userExist || !dehashedPassword) {
      return res
        .status(409)
        .json({ error: "El email o la contraseña son incorrectos." });
    }

    const userData = {
      userId: userExist._id,
      email,
    };
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json({ error: "El email ingresado no existe." });
  }
});

export default loginRouter;
