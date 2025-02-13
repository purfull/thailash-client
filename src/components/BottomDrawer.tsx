import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineMenu, AiOutlineClose, AiOutlineRight, AiOutlineDown } from 'react-icons/ai';

const BottomDrawer = ({ getPorductData }) => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    // console.log(getPorductData);
    

    const toggleDrawer = () => {
        setIsOpen(!isOpen);
    };

    const handleCheckoutClick = () => {
        navigate('/checkout');
        
    window.scrollTo(0, 0); 
    };

    // {
    //     "id": 1,
    //     "sku": "id123",
    //     "name": "100ml",
    //     "bottle_size": "100",
    //     "title": "100ml-bottle",
    //     "description": "aaaaa",
    //     "actual_price": 200,
    //     "offer_price": 150,
    //     "stock_quantity": 200,
    //     "image": "/src/assets/images/no-images/no-image.png",
    //     "isActive": 1,
    //     "isFeatured": 0,
    //     "createdAt": "2025-01-13T09:47:23.000Z",
    //     "updatedAt": "2025-01-13T09:47:23.000Z"
    // }
    return (
        <>
            <div className="relative block lg:hidden z-[999]">
                {/* Button to open the drawer */}
                <div
                    onClick={toggleDrawer}
                    className="text-white p-0 rounded-md fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50"
                    style={{
                        display: 'flex', alignItems: 'center', justifyContent: "space-between", width: '90%', bottom: '5px',
                    }}
                >
                    <div style={{ color: "rgb(5 110 61 / var(--tw-text-opacity, 1))", fontSize: '34px', fontWeight: "500" }}>
                    <p className=' font-semibold text-lg  px-2 mt-4 '>Now at <span className='text-red-600 '>{`-${Math.round(((getPorductData?.actual_price - getPorductData?.offer_price) / getPorductData?.actual_price) * 100)}%`}</span> </p>
                    <p><span className=' text-[24px] mr-2' style={{ textDecoration: 'line-through' }}>₹{getPorductData?.actual_price}</span><span className=' text mr-2'> ₹{getPorductData?.offer_price}</span></p>
                   </div>

                    <button className="py-[7px] w-[90%] rounded-[25px] text-[#B65402] cursor-pointer font-bold bg-gradient-to-r from-[#EBAC0A] to-[#FFDE47]" style={{
                        width: "40%", borderRadius: "10px", padding: "10px"
                    }} onClick={handleCheckoutClick}>Buy Now</button>
                </div>

                {/* Bottom Drawer */}
                <div
                    className={`fixed bottom-0 left-0 w-full bg-white shadow-lg transition-all duration-300 transform ${isOpen ? "h-[60vh] rounded-t-xl" : "h-16 rounded-t-[30px]"
                        }`}  // Adjust height and curve based on state
                    style={{ height: isOpen ? "30vh" : "100px", border: "2px solid rgb(5 110 61 / var(--tw-text-opacity, 1))" }}  // Control the height
                >

                    {/* Drawer Content */}
                    {isOpen && (
                        
                        <div className="p-4">
                            <p className='font-semibold text-lg p-2 mt-[5vh]'>{getPorductData?.title}</p>
                            <p className=' text  p-2 '>{getPorductData?.description}</p>
                            {/* <p className=' font-semibold text-lg  px-2 mt-4 '>Now at <span className='text-red-600 '>{`-${Math.round(((getPorductData?.actual_price - getPorductData?.offer_price) / getPorductData?.actual_price) * 100)}%`}</span></p> */}
                            {/* <p className=' text  px-2 '><span className=' text mr-2' style={{ textDecoration: 'line-through' }}>₹{getPorductData?.actual_price}</span><span className='text-2xl font-semibold'>₹{getPorductData?.offer_price}</span></p> */}
                        </div>
                    )}
                </div>

                {/* Backdrop when drawer is open */}
                {isOpen && (
                    <div
                        className="fixed"
                        onClick={toggleDrawer}
                    />
                )}
            </div>
            <div className="flex justify-between items-center p-4 lg:hidden" style={!isOpen ? {
                position: 'fixed', justifyContent: "flex-end", bottom: 75, transition: "all 0.2s ease-in", transform: "none", left: 0,zIndex: '1000',
                right: '5px'
            } :
                { position: 'fixed', justifyContent: "flex-end", bottom: 235, left: 0, right: "5px", transition: "all 0.2s ease-in", transform: "none", zIndex: '1000' }}>
                {/* <div className="text-lg font-semibold">Quick Info</div> */}
                {/* <button
                        onClick={toggleDrawer}
                        className="text-gray-500 text-xl">
                        {isOpen ? "Close" : "Expand"}
                    </button> */}
                <div onClick={toggleDrawer} style={!isOpen ? {
                    borderRadius: "10px", padding: "2px 15px", color: "white",
                    background: '#056E3D', transform: "rotate(180deg)", textAlign: "center", fontSize: "16px", fontWeight: "500"
                } : {
                    borderRadius: "10px", padding: "2px 15px", color: "white",
                    background: '#056E3D', textAlign: "center", fontSize: "16px", fontWeight: "500"
                }

                }>
              <AiOutlineDown size={20} style={{ width: 'auto', color: 'white' }} /></div>
            </div>
        </>
    );
};

export default BottomDrawer;
