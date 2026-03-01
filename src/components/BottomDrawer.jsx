import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineDown } from "react-icons/ai";

const BottomDrawer = ({ getPorductData }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => setIsOpen(!isOpen);

  const handleCheckoutClick = () => {
    navigate("/checkout");
    window.scrollTo(0, 0);
  };

  return (
    <>
      {/* Bottom Buy Bar */}
      <div className="fixed bottom-1 left-1/2 -translate-x-1/2 w-[90%] flex justify-between items-center z-[999] sm:hidden">
        <div className="text-[#056E3D] text-2xl font-semibold">
          <span className="mr-2">Now at</span>
          <span>₹{getPorductData?.offer_price}</span>
        </div>

        <button
          onClick={handleCheckoutClick}
          className="w-[40%] py-2 rounded-xl font-bold text-[#B65402] bg-gradient-to-r from-[#EBAC0A] to-[#FFDE47]"
        >
          Buy Now
        </button>
      </div>

      {/* Drawer */}
      <div
        className={`fixed bottom-0 left-0 w-full items-center sm:hidden justify-center bg-white border-2 border-[#056E3D] shadow-lg transition-all duration-300 ${
          isOpen ? "h-[30vh] rounded-t-xl" : "h-[70px] rounded-t-[30px]"
        }`}
      >
        {isOpen && (
          <div className="p-4">
            <p className="font-semibold text-lg mt-4">
              {getPorductData?.title}
            </p>
            <p className="mt-2 text-sm text-gray-600">
              {getPorductData?.description}
            </p>
          </div>
        )}
      </div>

      {/* Toggle Button */}
      {/* <div
        className={`fixed right-2 transition-all duration-200 z-[1000] lg:hidden ${
          isOpen ? "bottom-[235px]" : "bottom-[75px]"
        }`}
      >
        <button
          onClick={toggleDrawer}
          className={`bg-[#056E3D] text-white px-3 py-1 rounded-lg ${
            !isOpen ? "rotate-180" : ""
          }`}
        >
          <AiOutlineDown size={20} />
        </button>
      </div> */}

      {/* Backdrop */}
      {/* {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-[998]"
          onClick={toggleDrawer}
        />
      )} */}
    </>
  );
};

export default BottomDrawer;