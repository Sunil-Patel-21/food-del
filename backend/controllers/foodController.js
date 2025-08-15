import foodModel from "../models/foodModel.js";
import fs from "fs";

// add food items

const addFood = async (req,res)=>{
    let image_filename = `${req.file.filename}`;

    const food = new foodModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        image:image_filename,
        category:req.body.category,
    })
    try {
        await food.save(); 
        return res.json({
            success:true,
            message:"Food added successfully"
        })
    } catch (error) {
        console.log("add post error : ",error);
        res.json({
            success:false,
            message:"error in adding post"
        })
    }
}

// all food list
const listFood = async (req,res)=>{
    try {
        const foods = await foodModel.find({});
        return res.json({
            success:true,
            data:foods
        })
    } catch (error) {
        console.log("list food error : ",error);
        return res.json({
            success:false,
            message:"error in listing food"
        })
    }
}

// remove food item
const removeFood = async(req,res)=>{
    try {
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`./uploads/${food.image}`,async ()=>{
            await foodModel.findByIdAndDelete(req.body.id);
        });
        return res.json({
            success:true,
            message:"food removed successfully"
        })
    } catch (error) {
        console.log("remove food error : ",error);
        return res.json({
            success:false,
            message:"error in removing food"
        })
    }
}

 export {
    addFood,
    listFood,
    removeFood
 }