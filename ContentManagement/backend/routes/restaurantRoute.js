import express from "express"
import { addFood , listFood, removeFood} from "../controllers/restaurantController.js"
import multer from "multer"

const restaurantRouter = express.Router();

//Image Storage Engine

const storage = multer.diskStorage({
    destination:"uploads",
    filename:(req,file, cb)=>{
        return cb(null, `${Date.now()}${file.originalname}`)
    }
})

const upload = multer({storage:storage})

restaurantRouter.post("/add",upload.single("image"),addFood)
restaurantRouter.get("/list",listFood)
restaurantRouter.post("/remove", removeFood);


export default restaurantRouter;