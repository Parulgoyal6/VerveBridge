import restaurantModel from "../models/restaurantModel.js";
import fs from 'fs';


//add food item

const addFood = async(req, res) =>{

    let image_filename = `${req.file.filename}`;

    const food = new restaurantModel({
        name:req.body.name,
        description:req.body.description,
        price: req.body.price,
        // category: req.body.category,
        image: image_filename
    })

    try{
        await food.save();
        res.json({success: true, message:"food added"})

    }catch(error){
        console.log(error);
        res.json({success:false, message:"Error"})
    }
}


//all food list
const listFood = async(req, res)=>{
    try{
    const foods = await restaurantModel.find({});
    res.json({success: true, data: foods})
    }catch(error){
        console.log({success:false, message:"Error"})
    }
}

//remove food items
const removeFood = async(req, res)=>{
    try{

        const food = await restaurantModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`,()=>{})


        await restaurantModel.findByIdAndDelete(req.body.id);
        res.json({success: true, message:"Food Removed"})
    }catch(error){

        console.log(error);
        res.json({success:false, message:"Error"})

    }
}


export {addFood, listFood, removeFood}