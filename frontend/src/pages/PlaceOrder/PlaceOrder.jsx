import React, { useContext, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import "./PlaceOrder.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"; // 👈 import navigate

function PlaceOrder() {
  const { getTotalCartAmount } = useContext(StoreContext);
  const navigate = useNavigate(); // 👈 initialize navigate

  // State to store form values
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    phone: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validation function
  const validateForm = () => {
    const { firstName, email, phone } = formData;

    if (!firstName.trim()) {
      toast.error("First Name is required");
      return false;
    }

    if (!email.includes("@")) {
      toast.error("Enter a valid email address");
      return false;
    }

    if (phone.length < 10) {
      toast.error("Phone number must be at least 10 digits");
      return false;
    }

    return true;
  };

  // Handle form submit
  const handlePayment = (e) => {
    e.preventDefault();
    if (validateForm()) {
      toast.success("Order Placed Successfully ✅");

      // 👇 Redirect after short delay (so toast is visible)
      setTimeout(() => {
        navigate("/");
      }, 3500);
    }
  };

  return (
    <form className="place-order" onSubmit={handlePayment}>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input
            name="firstName"
            type="text"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
          />
          <input
            name="lastName"
            type="text"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>
        <input
          name="email"
          type="email"
          placeholder="Email address"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          name="street"
          type="text"
          placeholder="Street"
          value={formData.street}
          onChange={handleChange}
        />
        <div className="multi-fields">
          <input
            name="city"
            type="text"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
          />
          <input
            name="state"
            type="text"
            placeholder="State"
            value={formData.state}
            onChange={handleChange}
          />
        </div>
        <div className="multi-fields">
          <input
            name="zip"
            type="text"
            placeholder="Zip Code"
            value={formData.zip}
            onChange={handleChange}
          />
          <input
            name="country"
            type="text"
            placeholder="Country"
            value={formData.country}
            onChange={handleChange}
          />
        </div>
        <input
          name="phone"
          type="text"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
        />
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>SubTotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery fee</p>
              <p>₹{getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
            </div>
          </div>
          <button type="submit">PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
}

export default PlaceOrder;
