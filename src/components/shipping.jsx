import Footer from "./Footer";


const Shipping = () => {
    return ( 
        <>

        <style>
            {`
            .policy-list {
                list-style: disc;
                padding-left: 1.5rem;
            }
            `}
        </style>
        <div className="  p-2 sm:p-[5vh] mt-[14vh]">
            
            <h1 className="edu-title m-t text-[30px] sm:text-[30px] font-bold">Shipping and Delivery Policy</h1>
            <hr className="w-full" /> <br />
            <br />
           <p>You hereby agree that the delivery dates are estimates, unless a fixed date for the delivery has been expressly agreed in writing. The cost for delivery shall be calculated at the time of initiation of Transaction based on the shipping address and will be collected from you as a part of the Transaction Amount paid for the products and/or services. In the event that you do not receive the delivery even after seven days have passed from the estimated date of delivery, you must promptly reach out to us at contact@thailash.com or 9597266083.</p>
        </div>
        
    <Footer width={100} />
        </>
     );
}
 
export default Shipping;