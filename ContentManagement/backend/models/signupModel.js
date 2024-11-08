import mongoose from "mongoose";

const signupSchema = new mongoose.Schema({
    email:{type: String, required:true}
})

const signupModel =mongoose.models.signup || mongoose.model("signup", signupSchema);
export default signupModel;