import express from "express"
import { sendMessage } from "../controllers/userController.js"

const userRouter = express.Router()

userRouter.post("/contact",sendMessage);

export default userRouter;