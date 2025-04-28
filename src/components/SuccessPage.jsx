import React from "react";
import successimg from "../assets/hooks/success.svg";
import "./SuccessPage.css";
import { useNavigate } from "react-router-dom"; // Import useNavigate


const SuccessPage = () => {
    const navigate = useNavigate(); // Initialize the navigate function

    const handleContinueShopping = () => {
      navigate("/"); // Redirects to the home page
    };
  return (
    <div className="success-page-container">
      <img src={successimg} alt="check" className="success-image" />
      <h1 className="success-title">Your order has been created successfully! 🎉</h1>
      <h3 className="text-lg">Your OrderId: serdfh1235656  </h3>
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