import React from "react";
import successimg from "../assets/hooks/success.svg";
import "./SuccessPage.css";
import { useNavigate } from "react-router-dom"; // Import useNavigate


const SuccessPage = ({waybill}) => {
    const navigate = useNavigate(); // Initialize the navigate function

    const handleContinueShopping = () => {
      navigate("/"); // Redirects to the home page
    };
  return (
    <div className="success-page-container h-[70vh]">
      <img src={successimg} alt="check" className="success-image" />
      <h1 className="success-title">Your order has been created successfully! 🎉</h1>
      <h3 className="text-lg font-semibold">Your AWB No: {waybill || ""}  </h3>
      <button
        onClick={handleContinueShopping}
        className="continue-shopping-btn"
      >
        Continue Shopping
      </button>
    </div>
  );
};

export default SuccessPage;