import nodemailer from "nodemailer";
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
        // check if user exists
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User already exists" });
        }

        // validate email
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Invalid email" });
        }

        // validate password length
        if (password.length < 8) {
            return res.json({ success: false, message: "Password must be at least 8 characters long" });
        }

        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // create and save user
        const newUser = new userModel({ name, email, password: hashedPassword });
        const user = await newUser.save();

        // send email
        let transporter = nodemailer.createTransport({
            service: "gmail",
            host: process.env.MAIL_HOST,
            port: 465,          // or 587 depending on your provider
            secure: true,       // true for 465, false for 587
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });

        await transporter.sendMail({
            from: `"Tomato By Sunil Patel" <${process.env.MAIL_USER}>`,
            to: user.email,
            subject: "Signup Successful",
            html: `<h2>Hello ${user.name}</h2><p>Your account has been created successfully!</p>`,
        });

        // generate token
        const token = createToken(user._id);
        return res.json({ success: true, token, message: "User registered successfully, email sent" });

    } catch (error) {
        console.log("register user error:", error);
        return res.json({ success: false, message: "Error in registering user" });
    }
};

export default registerUser;


// login user
const loginUser = async (req, res) => {
    const {email,password} = req.body;
    try {
        const user = await userModel.findOne({email});
        if(!user){
            return res.json({success:false,message:"User not found"});
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.json({success:false,message:"Incorrect credentials"});
        }
        const token = createToken(user._id);
        return res.json({success:true,token,message:"User logged in successfully"});
    } catch (error) {
        console.log("login user error : ",error);
        return res.json({success:false,message:"Error in logging in user"}); 
    }

}



export { loginUser, registerUser };