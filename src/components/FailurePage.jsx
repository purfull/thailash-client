import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import cancel from "../assets/hooks/error.svg";
import "./FailurePage.css";

const FailurePage = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  const handleContinueShopping = () => {
    navigate("/"); // Redirects to the home page
  };

  return (
    <div className="FailurePage-container">
      <img src={cancel} alt="cancel" className="failure-image" />
      <h1 className="failure-title">
        Cannot process order at this time. Please try again later or contact
        support.
      </h1>
      {/* Button to continue shopping */}
      <button
        onClick={handleContinueShopping}
        className="continue-shopping-btn"
      >
        Continue Shopping
      </button>
    </div>
  );
};

export default FailurePage;