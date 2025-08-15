import React from "react";
import "./ExploreMenu.css";
import { menu_list } from "../../assets/frontend_assets/assets";

function ExploreMenu({category,setCategory}) {
    
  return (
    <div className="explore-menu" id="explore-menu">
      {/* main div  */}

      <h1>Explore Menu</h1>
      <p className="explore-menu-text">
        Choose from a diverse menu features a delectable array of dish. Our
        mission is to satisfy your cravings and elevate your dining experience
      </p>
      <div className="explore-menu-list">
        {menu_list.map((item, index) => {
          return (
            <div
           onClick={()=>setCategory(prev =>prev===item.menu_name?"All":item.menu_name)}
             className="explore-menu-list-item" key={index}>
              <img className={category===item.menu_name?"active":""} src={item.menu_image} alt={item.menu_name} />
              <p>{item.menu_name}</p>
            </div>
          );
        })}
      </div>

      <hr />

      {/* main div  */}
    </div>
  );
}

export default ExploreMenu;
