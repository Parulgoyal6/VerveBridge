import express from "express"
import { sendEmail } from "../controllers/signupController.js"

const signupRouter = express.Router()

signupRouter.post("/signup",sendEmail);

export default signupRouter;