import React from "react";
import "./Footer.css";
import { assets } from "../../assets/frontend_assets/assets";
function Footer() {
  return (
    <div className="footer" id="footer">
      {/* main div  */}
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo} alt="logo" />
          <p>
            © 2025 [Sunil Patel]. All rights reserved. Fresh food delivered to
            your doorstep. Serving happiness one meal at a time.
          </p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="facebook" />
            <img src={assets.twitter_icon} alt="twitter" />
            <img src={assets.linkedin_icon} alt="instagram" />
          </div>
        </div>
        <div className="footer-content-center">
            <h2>COMPANY</h2>
            <ul>
                <li>Home</li>
                <li>About Us</li>
                <li>Delivery</li>
                <li>Privacy Policy</li>
            </ul>
        </div>
        <div className="footer-content-right">
            <h2>GET IN TOUCH</h2>
            <ul>
                <li>Created by <span className="footer-name">Sunil Patel</span></li>
                <li>+91 123456789</li>
                <li>sunil123@gmail.com</li>
            </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        © 2025 [Sunil Patel]. All rights reserved.
      </p>
      {/* main div  */}
    </div>
  );
}

export default Footer;
