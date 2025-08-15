import userModel from "../models/userModel.js";

// add to cart
const addToCart = async (req, res) => {
    try {
        // let userData = await userModel.findOne({_id:req.body.userId});
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1;
        } else {
            cartData[req.body.itemId] += 1;
        }
        await userModel.findOneAndUpdate({ _id: req.body.userId }, { cartData });
        return res.json({ success: true, message: "Item added to cart" });
    } catch (error) {
        console.log("add to cart error : ", error);
        return res.json({ success: false, message: "Error in adding to cart" });
    }
}

// remove items from user cart
const removeFromCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        if (cartData[req.body.itemId] > 0) {
            cartData[req.body.itemId] -= 1;
        }
        await userModel.findOneAndUpdate({ _id: req.body.userId }, { cartData });
        return res.json({ success: true, message: "Item removed from cart" });
    } catch (error) {
        console.log("remove from cart error : ", error);
        return res.json({ success: false, message: "Error in removing from cart" });
    }
}

// fetch user cart data
// const getCart = async (req, res) => {
//     try {
//         let userData = await userModel.findById(req.body.userId);
//         let cartData = await userData.cartData;
//         return res.json({ success: true, cartData });
//     } catch (error) {
//         console.log("get cart error : ", error);
//         return res.json({ success: false, message: "Error in getting cart" });
//     }
// }


export { addToCart, removeFromCart };