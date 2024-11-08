import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    name:{type: String, required:true},
    email:{type: String, required:true, unique:true},
    datetime:{type: String, required:true},
    select1:{type: String, required:true},
    message:{type: String, required:true}
})

const bookingModel =mongoose.models.booking || mongoose.model("booking", bookingSchema);
export default bookingModel;