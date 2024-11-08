import express from "express"
import { sendbookingMessage } from "../controllers/bookingController.js"

const bookingRouter = express.Router()

bookingRouter.post("/booking",sendbookingMessage);

export default bookingRouter;