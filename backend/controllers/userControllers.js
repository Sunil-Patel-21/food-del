
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
    // 1. Required fields
    if (!name || !email || !password) {
      return res.json({ success: false, message: "All fields are required" });
    }

    // 2. Normalize email
    const normalizedEmail = email.toLowerCase();

    // 3. Check if user exists
    const exists = await userModel.findOne({ email: normalizedEmail });
    if (exists) {
      return res.json({ success: false, message: "User already exists" });
    }

    // 4. Validate email format
    if (!validator.isEmail(normalizedEmail)) {
      return res.json({ success: false, message: "Invalid email" });
    }

    // 5. Password strength
    if (password.length < 8) {
      return res.json({ success: false, message: "Password must be at least 8 characters long" });
    }

    // 6. Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 7. Save new user
    const newUser = new userModel({ name, email: normalizedEmail, password: hashedPassword });
    const user = await newUser.save();

    // 8. Create token
    const token = createToken(user._id);

    return res.json({ success: true, token, message: "User registered successfully" });

  } catch (error) {
    console.log("register user error : ", error.message);
    return res.json({ success: false, message: "Error in registering user", error: error.message });
  }
};


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


export { loginUser, registerUser, getAllUsers };

