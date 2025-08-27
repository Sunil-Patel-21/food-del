import { deleteUser, getAllUsers, loginUser, registerUser } from "../controllers/userControllers.js";
import express from "express";

const userRouter = express.Router();

userRouter.post("/register",registerUser);
userRouter.post("/login",loginUser);
userRouter.get("/getAllUsers",getAllUsers)
userRouter.delete("/deleteUser/:id",deleteUser)
export default userRouter;