import React, { useContext, useState } from "react";
import "./FoodItem.css";
import { assets } from "../../assets/frontend_assets/assets";
import { StoreContext } from "../../context/StoreContext";

function FoodItem({ id, name, price, description, image }) {
  const [readMore, setReadMore] = useState(false);
  const shortDescription = readMore ? ` ${description}` : `${description.slice(0, 50)}...`;

  const toggleReadMore = () => {
    setReadMore(!readMore);
  };

  const { cartItems, addToCart, removeFromCart, url } =
    useContext(StoreContext);

  const handleSpeak = () => {
    let speech = new SpeechSynthesisUtterance(); // create a new speech object which will store , language, pitch,etc
    speech.text = description; // the text to be read from description
    // speech.lang = "en-US";  // language will be english
    speech.lang = "hi-IN"; // language will be hindi
    speech.volume = 1; // volume of speech
    speech.rate = 1; // speed of speech
    speech.pitch = 1; // pitch of voice or tone
    window.speechSynthesis.speak(speech); //triggers the system's
  };

  return (
    <div className="food-item">
      {/* main div  */}
      <div className="food-item-img-container">
        <img
          className="food-item-image"
          src={url + "/images/" + image}
          alt="food-item-image"
        />
        {!cartItems[id] ? (
          <img
            className="add"
            onClick={() => addToCart(id)}
            src={assets.add_icon_white}
            alt="add-icon-white"
          />
        ) : (
          <div className="food-item-counter">
            <img
              onClick={() => removeFromCart(id)}
              src={assets.remove_icon_red}
              alt="remove-icon-red"
            />
            <p>{cartItems[id]}</p>
            <img
              onClick={() => addToCart(id)}
              src={assets.add_icon_green}
              alt="add-icon-green"
            />
          </div>
        )}
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="ratings" />
        </div>
        <p onClick={toggleReadMore} className="food-item-desc">
          <span>{shortDescription}</span>{" "}
          <span className="read-more">
            {readMore ? "Read Less" : "Read More"}
          </span>
        </p>
        <p className="food-item-price">₹{price}</p>
        <div className="speak">
          <button className="speak-btn" onClick={handleSpeak}>
            Speak Desc
          </button>
        </div>
      </div>
    </div>
  );
}

export default FoodItem;
