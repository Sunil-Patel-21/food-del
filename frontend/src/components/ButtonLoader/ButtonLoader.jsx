import React from "react";

export default function ButtonLoader() {
  return (
    <div
      style={{
        width: "20px",
        height: "20px",
        border: "3px solid #fff",
        borderTopColor: "transparent",
        borderRadius: "50%",
        animation: "spin 0.7s linear infinite",
      }}
    />
  );
}
