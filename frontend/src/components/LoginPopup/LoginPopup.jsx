import React, { useContext, useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/frontend_assets/assets";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import ButtonLoader from "../ButtonLoader/ButtonLoader"; // ✅ import loader

function LoginPopup({ setShowLogin }) {
  const [currentState, setCurrentState] = useState("Login");
  const { url, setToken } = useContext(StoreContext);
  const [loading, setLoading] = useState(false); // ✅ loading state

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // ✅ start loader

    let newUrl = url;
    newUrl += currentState === "Login" ? `/api/user/login` : `/api/user/register`;

    try {
      const response = await axios.post(newUrl, data);

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        alert("✔️ Login Successful!"); // ✅ success message
        setShowLogin(false);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      alert("Something went wrong. Try again!",error);
    }

    setLoading(false); // ✅ stop loader
  };

  const onchangeHandler = (e) => {
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="login-popup">
      <form className="login-popup-container" onSubmit={onLogin}>
        <div className="login-popup-title">
          <h2>{currentState}</h2>
          <img src={assets.cross_icon} alt="" onClick={() => setShowLogin(false)} />
        </div>

        <div className="login-popup-inputs">
          {currentState === "Signup" && (
            <input
              name="name"
              onChange={onchangeHandler}
              value={data.name}
              type="text"
              placeholder="Your name"
              required
            />
          )}

          <input
            name="email"
            onChange={onchangeHandler}
            value={data.email}
            type="email"
            placeholder="Your email"
            required
          />

          <input
            name="password"
            onChange={onchangeHandler}
            value={data.password}
            type="password"
            placeholder="Your password"
            required
          />
        </div>
        
                <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms and conditions.</p>
        </div>

        {/* ✅ Show loader inside button while submitting */}
        <button type="submit" disabled={loading} style={{ opacity: loading ? 0.7 : 1 }}>
          {loading ? <ButtonLoader /> : currentState === "Signup" ? "Create Account" : "Login"}
        </button>



        {currentState === "Login" ? (
          <p>
            Create a new account?{" "}
            <span onClick={() => setCurrentState("Signup")}>Signup here</span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span onClick={() => setCurrentState("Login")}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
}

export default LoginPopup;
