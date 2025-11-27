import express from "express";
import { addFood, listFood, removeFood, updateFood } from "../controllers/foodController.js";
import multer from "multer"; // for image storage

const foodRouter = express.Router();

// image storage 
const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`); // this will store the image in the uploads folder with unique name
    }
})

const upload = multer({storage:storage}); // middleware

foodRouter.post("/add",upload.single("image"), addFood);
foodRouter.get("/list",listFood);
foodRouter.post("/remove",removeFood);
foodRouter.put("/update-food/:id", updateFood);

export default foodRouter;