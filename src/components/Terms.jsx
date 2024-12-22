import Footer from "./Footer";

const Terms = () => {
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
            
            <h1 className="edu-title m-t text-[30px] sm:text-[30px] font-bold">Terms and Conditions</h1>
            <hr className="w-full" /> <br />
            <p>Welcome to Thailash! These Terms and Conditions ("Terms") govern your use of our website ("Website") and any services or products provided through it. By accessing or using our Website, you agree to comply with and be bound by these Terms. If you do not agree, please refrain from using our Website.</p>
            <br />
            <p className="font-bold">Acceptance of Terms</p>
            <br />
            <p>By using this Website, you confirm that:</p>
            <ul className="policy-list">
                <li>You are at least 18 years old or accessing the Website under the supervision of a parent or legal guardian.</li>
                <li>You have read, understood, and accepted these Terms in full.</li>
            </ul>
            <br />
            <p className="font-bold">Modifications to the Terms</p>
            <br />
            
            <p>We reserve the right to update or modify these Terms at any time without prior notice. Changes will be effective immediately upon posting. Continued use of our Website constitutes your acceptance of the updated Terms.</p>
            <br />
            <p className="font-bold">Use of the Website</p>
            <br />
            <p>You agree to use the Website for lawful purposes only.</p>
            <br />
            <p>You shall not engage in activities that:</p>
            <br />
            <ul className="policy-list">
                <li>Violate any applicable laws or regulations.</li>
                <li>Infringe on the rights of others.</li>
                <li>Disrupt or interfere with the security, functionality, or integrity of the Website.</li>
                <li>Unauthorized use, such as data scraping, hacking, or the introduction of malicious code, is strictly prohibited.</li>
            </ul>
            <br />
            <p className="font-bold">Product Information and Pricing.</p>
            <br />
            <p>We strive to ensure the accuracy of product descriptions, pricing, and availability on our Website. However, errors may occur.</p>
            <br />
            <p>Prices are subject to change without notice.</p>
            <br />
            <p>In case of discrepancies, we reserve the right to correct errors and cancel orders affected by such inaccuracies.</p>
            <br />
            <p className="font-bold">Orders and Payments.</p>
            <br />
            <p>All orders are subject to acceptance and availability.</p>
            <br />
            <p>Payment information is securely processed by third-party payment gateways. Thailash does not store your payment details.</p>
            <br />
            <p>We reserve the right to cancel orders that:</p>
            <ul className="policy-list">
                <li>Appear fraudulent.</li>
                <li>Cannot be fulfilled due to stock unavailability.</li>
                <li>Violate our Terms or policies.</li>
                
            </ul>
            <br />
            <p className="font-bold">Shipping and Delivery.</p>
            <br />
            <p>Delivery timelines are approximate and may vary based on location and circumstances beyond our control.</p>
            <br />
            <p>We are not liable for delays caused by courier services or unforeseen events. Please review our Shipping Policy for more details.</p>
            <br />
            <p className="font-bold">Returns and Refunds.</p>
            <br />
            <p>Returns and refunds are subject to our [Return and Refund Policy].</p>
            <br />
            <p>Products must be returned in their original condition with proof of purchase.</p>
            <br />
            <p>Refunds will be processed within the timeframe outlined in our policy.</p>
            <br />
            <p className="font-bold">Intellectual Property</p>
            <br />
            <p>All content on the Website, including text, images, graphics, logos, and software, is the property of Thailash or its licensors and is protected by applicable intellectual property laws.</p>
            <br />
            <p>Unauthorized use, reproduction, or distribution of any content is prohibited.</p>
            <br />
            <p className="font-bold">User-Generated Content.</p>
            <br />
            <p>If you submit reviews, comments, or other content ("User Content") to our Website:</p>
            <ul className="policy-list">
                <li>You grant us a non-exclusive, royalty-free, perpetual, and irrevocable license to use, reproduce, and display your User Content.</li>
                <li>You warrant that your User Content does not infringe on the rights of others or violate any laws.</li>
                <li>We reserve the right to remove or edit User Content at our discretion.</li>
                
            </ul>
            <br />
            <p className="font-bold">Third-Party Links.</p>
            <br />
            <p>Our Website may include links to third-party websites for your convenience. We are not responsible for the content, accuracy, or practices of these external sites. Visiting third-party links is at your own risk.</p>
            <br />
            <p className="font-bold">Limitation of Liability.</p>
            <br />
            <p>To the maximum extent permitted by law:</p>
            <ul className="policy-list">
                <li>Thailash shall not be liable for any direct, indirect, incidental, or consequential damages arising from your use of the Website or our products/services.</li>
                <li>Our total liability for any claims shall not exceed the amount you paid for the relevant product or service.</li>
                
            </ul>
            <br />
            <p className="font-bold"> Disclaimer of Warranties</p>
            <br />
            <p>The Website and its content are provided on an "as is" and "as available" basis.
            We make no guarantees regarding the accuracy, completeness, or reliability of the Website's content.
            To the extent permitted by law, we disclaim all warranties, express or implied.
            </p>
            <br />
            
            <p className="font-bold">Indemnification.</p>
            <br />
            <p>You agree to indemnify and hold harmless Thailash, its affiliates, and employees from any claims, damages, or expenses arising out of your:</p>
            <ul className="policy-list">
                <li>Breach of these Terms.</li>
                <li>Violation of applicable laws.</li>
                <li>Misuse of our Website or products.</li>
                
            </ul>
            <br />
            
            <p className="font-bold">Termination.</p>
            <br />
            <p>We reserve the right to terminate your access to the Website without prior notice for violations of these Terms or any applicable laws.</p>
            <br />
            <p>Upon termination, you must immediately cease using the Website and any associated services.</p>
            <br />
            
            <p className="font-bold">Governing Law and Dispute Resolution.</p>
            <br />
            <p>These Terms are governed by the laws of India.</p>
            <br />
            <p>Any disputes arising out of or related to these Terms shall be resolved through arbitration in accordance with the Arbitration and Conciliation Act, 1996.</p>
            <br />
            <p>The place of arbitration shall be [Jurisdiction], and the language of arbitration shall be English.</p>
            <br />
            
            <p className="font-bold">Privacy Policy.</p>
            <br />
            <p>Your use of the Website is also governed by our [Privacy Policy], which outlines how we collect, use, and protect your personal data.</p>
            <br />
            
            <p className="font-bold"> Force Majeure.</p>
            <br />
            <p>We are not liable for delays or failures caused by events beyond our control, including natural disasters, strikes, or technical issues.</p>
            <br />
            
            <p className="font-bold"> Severability.</p>
            <br />
            <p>If any provision of these Terms is found to be unenforceable or invalid, the remaining provisions shall remain in full force and effect.</p>
            <br />
            <p className="font-bold">Contact Us</p>
            <br />
            <p>For questions, concerns, or complaints regarding these Terms, please contact us at:</p>
            <br />
            <ul className="policy-list">
                <li>Address: 3/127, Plot No 144, Sirangudi Puliyur, Nagapattinam - 611108 </li>
                <li>Email: contact@thailash.com</li>
            </ul>
            <br />
            <p className="font-bold">Declaration</p>
            <br />
            <p>By accessing or using our Website, you confirm that you have read, understood, and agreed to these Terms and Conditions.</p>
          
        </div>
        
    <Footer width={100} />
        </>
     );
}
 
export default Terms;