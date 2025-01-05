import Footer from "./Footer";


const Refund = () => {
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
            
            <h1 className="edu-title m-t text-[30px] sm:text-[30px] font-bold">Cancellation and Refund Policy</h1>
            <hr className="w-full" /> <br />
            <br />
            <p>Thailash believes in helping its customers as far as possible,
            and has therefore a liberal cancellation policy. Under this policy:</p>
            <br />
            <ul className="policy-list">
                <li>Cancellations will be considered only if the request is made immediately after placing the order.
However, the cancellation request may not be entertained if the orders have been communicated to the
vendors/merchants and they have initiated the process of shipping them.</li>
                <li>Thailash does not accept cancellation requests for perishable items
like flowers, eatables etc. However, refund/replacement can be made if the customer establishes
that the quality of product delivered is not good.</li>
                <li>In case of receipt of damaged or defective items please report the same to our Customer Service team.
The request will, however, be entertained once the merchant has checked and determined the same at his
own end. This should be reported within Only same day days of receipt of the products. In case you feel
that the product received is not as shown on the site or as per your expectations, you must bring it to the
notice of our customer service within Only same day days of receiving the product. The Customer
Service Team after looking into your complaint will take an appropriate decision.</li>
                <li> In case of complaints regarding products that come with a warranty from manufacturers, please refer the issue to them. In case of any Refunds approved by the Thailash, it’ll take 3-5 Days days for the refund to be processed to the end customer</li>
            </ul>
        </div>
        
    <Footer width={100} />
        </>
     );
}
 
export default Refund;