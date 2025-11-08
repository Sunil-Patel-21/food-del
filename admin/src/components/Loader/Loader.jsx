import React from "react";
import "./Loader.css";

function Loader({ size = 35 }) {
  return (
    <div
      className="loader"
      style={{ width: size, height: size, borderWidth: size / 7 }}
    ></div>
  );
}

export default Loader;
