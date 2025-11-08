import React, { useContext } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";
import Loader from "../Loader/Loader";

function FoodDisplay({ category }) {
  const { food_list, loading } = useContext(StoreContext);

  if (loading) {
    return <Loader />; // ✅ show full screen loader
  }

  return (
    <div className="food-display" id="food-display">
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {food_list.map((item, index) =>
          category === "All" || category === item.category ? (
            <FoodItem
              key={index}
              id={item._id}
              name={item.name}
              price={item.price}
              description={item.description}
              image={item.image}
            />
          ) : null
        )}
      </div>
    </div>
  );
}

export default FoodDisplay;
