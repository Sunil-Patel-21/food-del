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

// -----------------------------------------
// UPDATE FOOD
// -----------------------------------------
const updateFood = async (req, res) => {
    try {
        const foodId = req.params.id;
        const existingFood = await foodModel.findById(foodId);

        if (!existingFood) {
            return res.json({
                success: false,
                message: "Food item not found",
            });
        }

        let updatedData = {
            name: req.body.name || existingFood.name,
            description: req.body.description || existingFood.description,
            price: req.body.price || existingFood.price,
            category: req.body.category || existingFood.category,
        };

        // If user uploads a new image
        if (req.file) {
            const newImage = req.file.filename;

            // delete old image
            fs.unlink(`./uploads/${existingFood.image}`, (err) => {
                if (err) console.log("Error deleting old image:", err);
            });

            updatedData.image = newImage;
        }

        await foodModel.findByIdAndUpdate(foodId, updatedData, { new: true });

        return res.json({
            success: true,
            message: "Food updated successfully",
        });
    } catch (error) {
        console.log("update food error :", error);
        return res.json({
            success: false,
            message: "Error in updating food",
        });
    }
};

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
    removeFood,
    updateFood
 }