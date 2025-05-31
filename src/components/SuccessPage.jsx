import React, { useEffect } from "react";
import successimg from "../assets/hooks/success.svg";
import "./SuccessPage.css";
import { useLocation, useNavigate } from "react-router-dom"; // Import useNavigate
import Footer from "./Footer";


const SuccessPage = () => {
  const location = useLocation();

    const navigate = useNavigate(); // Initialize the navigate function
    
  const waybill = location.state?.waybill;

  useEffect(() => {
    if (!waybill) {
      navigate('/');
    }
  }, [waybill, navigate]);

  if (!waybill) return null;
    const handleContinueShopping = () => {
      navigate("/"); // Redirects to the home page
    };
  return (
    <>
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
      
                <Footer width={100} />
    </>
  );
};

export default SuccessPage;