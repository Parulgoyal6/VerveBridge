import teamModel from "../models/teamModel.js";
import fs from 'fs';


//add team workers

const addTeam = async(req, res) =>{

    let image_filename = `${req.file.filename}`;

    const team = new teamModel({
        name:req.body.name,
        designation:req.body.designation,
        image: image_filename
    })

    try{
        await team.save();
        res.json({success: true, message:"members added"})

    }catch(error){
        console.log(error);
        res.json({success:false, message:"Error"})
    }
}


//all food list
const listTeam = async(req, res)=>{
    try{
    const teams = await teamModel.find({});
    res.json({success: true, data: teams})
    }catch(error){
        console.log({success:false, message:"Error"})
    }
}

//remove food items
const removeTeam = async(req, res)=>{
    try{

        const team = await teamModel.findById(req.body.id);
        fs.unlink(`uploads/${team.image}`,()=>{})


        await teamModel.findByIdAndDelete(req.body.id);
        res.json({success: true, message:"Team Removed"})
    }catch(error){

        console.log(error);
        res.json({success:false, message:"Error"})

    }
}


export {addTeam, listTeam, removeTeam}