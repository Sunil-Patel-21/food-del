import { useContext, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/frontend_assets/assets.js";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext.jsx";

function Navbar({ setShowLogin }) {
  const [menu, setMenu] = useState("mobile-app");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  // 🔊 Function to speak a message
  const speak = (message) => {
    const utterance = new SpeechSynthesisUtterance(message);
    utterance.rate = 1; // speed (0.5 - 2)
    utterance.pitch = 1; // voice pitch
    speechSynthesis.speak(utterance);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
    speak("You have logged out");
  };

  return (
    <div className="navbar">
      {/* Logo */}
      <Link to={"/"}>
        <img src={assets.logo} alt="logo" className="logo" />
      </Link>

      {/* Hamburger Toggle (Mobile only) */}
      <div
        className="menu-toggle"
        onClick={() => setIsMenuOpen((prev) => !prev)}
      >
        ☰
      </div>

      {/* Menu */}
      <ul className={`navbar-menu ${isMenuOpen ? "show" : ""}`}>
        <Link
          to="/"
          onClick={() => {
            setMenu("home");
            setIsMenuOpen(false);
            speak("Going to Home Page");
          }}
          className={menu === "home" ? "active" : ""}
        >
          home
        </Link>
        <a
          href="#explore-menu"
          onClick={() => {
            setMenu("menu");
            setIsMenuOpen(false);
            speak("Going to Menu Section");
          }}
          className={menu === "menu" ? "active" : ""}
        >
          menu
        </a>
        <a
          href="#app-download"
          onClick={() => {
            setMenu("mobile-app");
            setIsMenuOpen(false);
            speak("Going to Mobile App Section");
          }}
          className={menu === "mobile-app" ? "active" : ""}
        >
          mobile-app
        </a>
        <Link
          to="/contactus"
          onClick={() => {
            setMenu("contact-us");
            setIsMenuOpen(false);
            speak("Going to Contact Us Page");
          }}
          className={menu === "contact-us" ? "active" : ""}
        >
          contact us
        </Link>
        <Link
          to="/about"
          onClick={() => {
            setMenu("about us");
            setIsMenuOpen(false);
            speak("Going to About Us Page");
          }}
          className={menu === "about us" ? "active" : ""}
        >
          about us
        </Link>
      </ul>

      {/* Right side */}
      <div className="navbar-right">
        <img src={assets.search_icon} alt="search" />
        <div className="navbar-search-icon">
          <Link to={"/cart"} onClick={() => speak("Going to Cart Page")}>
            <img src={assets.basket_icon} alt="basket" />
          </Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>

        {!token ? (
          <button
            onClick={() => {
              setShowLogin(true);
              speak("Opening login form");
            }}
          >
            sign in
          </button>
        ) : (
          <div className="navbar-profile">
            <img src={assets.profile_icon} alt="profile-icon" />
            <ul className="nav-profile-dropdown">
              <li
                onClick={() => {
                  speak("Going to Orders Page");
                }}
              >
                <img src={assets.bag_icon} alt="orders" />
                <p>Orders</p>
              </li>
              <hr />
              <li onClick={logout}>
                <img src={assets.logout_icon} alt="logout" />
                <p>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
