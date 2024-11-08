import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import restaurantRouter from "./routes/restaurantRoute.js"
import userRouter from "./routes/userRoute.js"
import 'dotenv/config'
import bookingRouter from "./routes/bookingRoute.js"
import teamRouter from "./routes/teamRoute.js"
import signupRouter from "./routes/signupRoute.js"

//app config
const app = express()
const port = 4000

// middleware
app.use(express.json())
app.use(cors())

// db connection
connectDB();


//api endpoints
app.use("/api/restaurant", restaurantRouter);

app.use("/img", express.static('uploads'));
app.use("/",userRouter)
app.use("/api",bookingRouter)
app.use("/team",teamRouter);
app.use("/signup",signupRouter)
app.get("/",(req, res)=>{
    res.send("API working")
})

app.listen(port, ()=>{
    console.log(`Server started on http://localhost:${port}`)
})

//mongodb+srv://goyalparul:<db_password>@cluster0.98sxo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0