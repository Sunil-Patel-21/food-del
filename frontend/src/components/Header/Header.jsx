import "./Header.css";

function Header() {
  return (
    <div className="header">
      {/* Background Video */}
      <video className="header-video" autoPlay muted loop playsInline>
        <source src="/FoodDelHeroVideo.mp4" type="video/mp4" />
      </video>

      {/* ----- main div  */}
      <div className="header-contents">
        <h2>Order Your favorite food here.</h2>
        <p>
          Choose from diverse menu featuring a delectable array of dishes crafted
          with finest ingredients and taste. Our mission is to satisfy your
          cravings and elevate your dining experience.
        </p>
        <button>View Menu</button>
      </div>
    </div>
  );
}

export default Header;
