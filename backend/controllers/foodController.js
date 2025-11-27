import foodModel from "../models/foodModel.js";
import fs from "fs";

// ADD FOOD
const addFood = async (req, res) => {
  try {
    const food = new foodModel({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      image: req.file.filename,
    });

    await food.save();

    res.json({ success: true, message: "Food added successfully" });
  } catch (err) {
    console.log("add error:", err);
    res.json({ success: false, message: "Error adding food" });
  }
};

// LIST FOOD
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (err) {
    console.log("list error:", err);
    res.json({ success: false, message: "Error listing food" });
  }
};

// UPDATE FOOD
const updateFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.params.id);

    if (!food) {
      return res.json({ success: false, message: "Food not found" });
    }

    let updatedData = {
      name: req.body.name || food.name,
      description: req.body.description || food.description,
      category: req.body.category || food.category,
      price: req.body.price || food.price,
    };

    // if image updated
    if (req.file) {
      fs.unlink(`./uploads/${food.image}`, (err) =>
        err && console.log("delete image error:", err)
      );
      updatedData.image = req.file.filename;
    }

    await foodModel.findByIdAndUpdate(req.params.id, updatedData, {
      new: true,
    });

    res.json({ success: true, message: "Food updated successfully" });
  } catch (err) {
    console.log("update error:", err);
    res.json({ success: false, message: "Error updating food" });
  }
};

// REMOVE FOOD
const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);

    fs.unlink(`./uploads/${food.image}`, async () => {
      await foodModel.findByIdAndDelete(req.body.id);
    });

    res.json({ success: true, message: "Food removed successfully" });
  } catch (err) {
    console.log("remove error:", err);
    res.json({ success: false, message: "Error removing food" });
  }
};

export { addFood, listFood, removeFood, updateFood };
