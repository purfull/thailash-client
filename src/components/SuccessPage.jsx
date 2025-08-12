import React, { useEffect, useState } from "react";
import successimg from "../assets/hooks/success.svg";
import "./SuccessPage.css";
import { useLocation, useNavigate, useParams } from "react-router-dom"; // Import useNavigate
import Footer from "./Footer";
import { AppEnv } from "../../config";


const SuccessPage = () => {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const orderId = queryParams.get("orderId");
  
  const [data, setData] = useState()

    const navigate = useNavigate(); // Initialize the navigate function
    
  // const waybill = location.state?.order;
  // const orderCost = location.state?.invoiceAmount

  useEffect(() => {
    // if (!orderId) {
    //   navigate('/');
    // }
    console.log("orderId",orderId);
    
    const fetchData = async () => {
          try {
            const response = await fetch(`${AppEnv.baseUrl}/order/get-customer-order/${orderId}`);
            const result = await response.json();
    
            if (result) {
              setData(result.data);
            }
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
        fetchData();

  }, [orderId]);

  // if (!waybill) return null;
    const handleContinueShopping = () => {
      navigate("/"); // Redirects to the home page
    };
  return (
    <>
    <div className="success-page-container h-[70vh]">
      <img src={successimg} alt="check" className="success-image" />
      <h1 className="success-title">Your order has been created successfully! 🎉</h1>
      <h3 className="text-lg font-semibold">Total Cost: <button className="cursor-auto">₹{data?.invoiceAmount || ""} </button> </h3>
      <h3 className="text-lg font-semibold">order Id: {data?.order || ""}  </h3>
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