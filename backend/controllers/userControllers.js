
import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";


// jwt token
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}


const registerUser = async (req, res) => {
    const { name, password, email } = req.body;
    try {
        const exists = await userModel.find({ email });
        if (exists.length > 0) {
            return res.json({ success: false, message: "User already exists" });
        }
        // validating email format using validator
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Invalid email" });
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "Password must be at least 8 characters long" });
        }
        // hashing password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new userModel({ name, email, password: hashedPassword });
        const user = await newUser.save();
        const token = createToken(user._id);
        return res.json({ success: true, token, message: "User registered successfully" });
    } catch (error) {
        console.log("register user error : ", error);
        return res.json({ success: false, message: "Error in registering user" });
    }
}


// login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Incorrect credentials" });
        }
        const token = createToken(user._id);
        return res.json({ success: true, token, message: "User logged in successfully" });
    } catch (error) {
        console.log("login user error : ", error);
        return res.json({ success: false, message: "Error in logging in user" });
    }

}


const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find({}).populate("cartData");
        const totalUsers = await userModel.countDocuments();

        // console.log("user", users);
        return res.json({
            success: true,
            totalUsers,
            users
        });

    } catch (error) {
        console.log("Error fetching users: ", error);
        return res.json({ success: false, message: "Error fetching users" });
    }
}

// Delete user by ID
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if user exists
        const user = await userModel.findById(id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Delete user
        await userModel.findByIdAndDelete(id);

        return res.json({ success: true, message: "User deleted successfully" });
    } catch (error) {
        console.error("Error deleting user: ", error);
        return res.status(500).json({ success: false, message: "Error deleting user" });
    }
};



export { loginUser, registerUser, getAllUsers, deleteUser };

