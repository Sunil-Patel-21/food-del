import 'dotenv/config'
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';


// app config
const app = express();
const port = process.env.PORT || 4000;

// middlewares
app.use(express.json());
app.use(cors({ origin: "*" }));
// app.use(express.urlencoded({extended:true}));

// DB config
connectDB();

// api routes
app.use("/api/food",foodRouter);
app.use("/images",express.static("uploads")); // for serving images from uploads folder to frontend
app.use("/api/user",userRouter);
app.use("/api/cart",cartRouter);
app.use("/api/order",orderRouter);



app.get("/",(req,res)=>{
    res.status(200).send("API Working");
})

app.listen(port,()=>{
    console.log(`Listening to requests on ${port}`);
})