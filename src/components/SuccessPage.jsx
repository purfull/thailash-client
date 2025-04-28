import React from "react";
import check from "../assets/checked.png";
import "./SuccessPage.css";

const SuccessPage = () => {
  return (
    <div className="container">
      <img src={check} alt="check" className="success-image" />
      <h1 className="success-title">Your order has been created successfully! 🎉</h1>
    </div>
  );
};

export default SuccessPage;
