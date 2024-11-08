import express from "express"
import { addTeam , listTeam, removeTeam} from "../controllers/teamController.js"
import multer from "multer"

const teamRouter = express.Router();

//Image Storage Engine

const storage = multer.diskStorage({
    destination:"uploads",
    filename:(req,file, cb)=>{
        return cb(null, `${Date.now()}${file.originalname}`)
    }
})

const upload = multer({storage:storage})

teamRouter.post("/add",upload.single("image"),addTeam)
teamRouter.get("/list",listTeam)
teamRouter.post("/remove", removeTeam);


export default teamRouter;