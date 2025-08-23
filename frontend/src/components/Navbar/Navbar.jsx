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

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
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
          <Link to={"/cart"}>
            <img src={assets.basket_icon} alt="basket" />
          </Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>

        {!token ? (
          <button onClick={() => setShowLogin(true)}>sign in</button>
        ) : (
          <div className="navbar-profile">
            <img src={assets.profile_icon} alt="profile-icon" />
            <ul className="nav-profile-dropdown">
              <li>
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
