import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type:String, required: true},
    price: {type: Number, required: true},
    image: {type: String , required: true},
    // category:{type: String, required: true}
})

const restaurantModel =mongoose.models.restaurant || mongoose.model("restaurant", restaurantSchema)

export default restaurantModel;

