import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
    name:{type: String, required:true},
    designation:{type: String, required:true},
    image:{type: String, required:true},
})

const teamModel =mongoose.models.team || mongoose.model("team", teamSchema);
export default teamModel;