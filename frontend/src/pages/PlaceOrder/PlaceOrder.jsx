import React, { useContext } from "react";
import {  StoreContext } from "../../context/StoreContext";
import "./PlaceOrder.css";
import { toast } from "react-toastify";


function PlaceOrder() {
  const {getTotalCartAmount} = useContext(StoreContext);
  const handlePayment = (e) => {
    e.preventDefault();
    toast.success("Order Placed Successfully");
  }
  return (
    <form className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input required type="text" placeholder="First Name" />
          <input type="text" placeholder="Last Name" required/>
        </div>
        <input type="email" placeholder="Email address" required/>
        <input type="text" placeholder="Street" required/>
        <div className="multi-fields">
          <input type="text" placeholder="City" required/>
          <input type="text" placeholder="State" required/>
        </div>
        <div className="multi-fields">
          <input type="text"  placeholder=' Zip Code' required/>
          <input type="text" placeholder='Country' required/>
        </div>
        <input type="text" placeholder="Phone" required/>
      </div>
      <div className="place-order-right">
                <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>SubTotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery fee</p>
              <p>${getTotalCartAmount()===0?0:2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount()===0?0:getTotalCartAmount() +2}</b>
            </div>
          </div>
          <button type="submit" onClick={handlePayment}>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
}

export default PlaceOrder;
