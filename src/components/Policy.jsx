import Footer from "./Footer";

const Policy = () => {
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
            
            <h1 className="edu-title m-t text-[30px] sm:text-[30px] font-bold">Privacy and Policy</h1>
            <hr className="w-full" /> <br />
            <p>Thailash values your privacy and is committed to protecting your personal data. This Privacy Policy outlines how we collect, use, share, and safeguard your information when you visit our website ("Website") or make a purchase. By using our Website, you consent to the practices described in this policy.</p>
            <br />
            <p className="font-bold">Information We Collect</p>
            <br />
            <p className="font-semibold">a) Personal Information</p>
            <br />
            <p>We may collect the following personal information when you interact with our Website:</p>
            <ul className="policy-list">
                <li>Name</li>
                <li>Email Address</li>
                <li>Phone Number</li>
                <li>Billing and shipping address</li>
                <li>Payment information (processed securely by third-party payment gateways)</li>
            </ul>
            <br />
            <p className="font-semibold">b) Non-Personal Information</p>
            <br />
           
            <p>We may also collect non-personal data, including:</p>
            <ul className="policy-list">
                <li>Pages visited and time spent on the Website</li>
                <li>Cookies and other tracking technologies</li>
            </ul>
            <br />
            <p className="font-bold">How We Use Your Information</p>
            <br />
            
            <p>We use your information for the following purposes:</p>
            <ul className="policy-list">
                <li>To process and fulfill orders</li>
                <li>To communicate with you regarding your purchase or inquiries.</li>
                <li>To improve our Website and services.</li>
                <li>To send promotional emails and offers (only with your explicit consent).</li>
                <li>To comply with legal obligations</li>
            </ul>
            <br />
            <p className="font-bold">Sharing of Information</p>
            <br />
            <p>We do not sell or rent your personal information. However, we may share your data with:</p>
            <br />
            <ul className="policy-list">
                <li>Third-party service providers who assist in fulfilling orders, processing payments, or managing marketing campaigns.</li>
                <li>Law enforcement or regulatory authorities if required by law or to protect our legal rights.</li>
                <li>Business partners in the event of a merger, acquisition, or sale of assets (subject to confidentiality agreements).</li>
            </ul>
            <br />
            <p className="font-bold">Third-Party Interactions.</p>
            <br />
            <p>While using our Website, you may encounter pop-ups, advertisements, or redirections. Please note that such activities are not under our control, and we are not responsible for the privacy practices or content of third-party websites.</p>
            <br />
            <br />
            <p className="font-bold">Cookies and Tracking Technologies.</p>
            <br />
            <p>Our Website uses cookies to enhance your browsing experience. You can manage or disable cookies through your browser settings. Disabling cookies may impact your ability to use certain features of the Website.</p>
            <br />
            <p className="font-bold">Data Retention</p>
            <br />
            <p>We retain your personal information only for as long as necessary to:</p>
            <br />
            <ul className="policy-list">
                <li>Fulfill the purposes outlined in this policy.</li>
                <li>Comply with legal obligations.</li>
                <li>Resolve disputes.</li>
            </ul>
            <br />
            <p className="font-bold">Security Measures</p>
            <br />
            <p>We implement industry-standard security measures to protect your data, including:</p>
            <br />
            <ul className="policy-list">
                <li>SSL encryption for transactions.</li>
                <li>Restricted access to personal information.</li>
                <li>Regular monitoring of our systems for vulnerabilities.</li>
            </ul>
            <br />
            <p>Despite our efforts, no system is completely secure.</p>
            <br />
            <p>By using our Website, you acknowledge and accept the inherent risks of online transactions.</p>
            
            <br />
            <p className="font-bold">Limitations of Liability</p>
            <br />
            <p>We are not liable for any damages, including direct, indirect, incidental, or consequential damages, arising from or related to your use of our Website and services. Our liabilities are limited to the maximum extent permitted by applicable laws, including the Digital Personal Data Protection Act, 2023.</p>
            <br />
            <p className="font-bold">Your Rights</p>
            <br />
            <p>Under applicable laws in India, you have the following rights:</p>
            <br />
            <ul className="policy-list">
                <li>Access: Request access to your personal information.</li>
                <li>Correction: Request correction of inaccurate or incomplete data.</li>
                <li>Deletion: Request deletion of your data (subject to legal retention requirements).</li>
                <li>Opt-Out: Opt-out of marketing communications by following the unsubscribe link in our emails.</li>
            </ul>
            <br />
            <p>To exercise these rights, contact us at contact@thailash.com</p>
            <br />
            <p className="font-bold">Termination</p>
            <br />
            <p>We reserve the right to terminate your access to our Website and services at any time without prior notice. Upon termination, you must immediately cease using our Website and services.</p>
            <br />
            <br />
            <p className="font-bold">Governing Law and Dispute Resolution</p>
            <br />
            <p>This Privacy Policy is governed by the laws of India. Any disputes arising out of or related to this policy shall be resolved through an appropriate dispute resolution mechanism, as defined under applicable laws.</p>
            <br />
            <br />
            <p className="font-bold">Children’s Privacy</p>
            <br />
            <p>Our Website is not intended for children under the age of 18. We do not knowingly collect personal information from children. If you believe we have collected such data, please contact us immediately.</p>
            <br />
            <br />
            <p className="font-bold">Updates to This Policy</p>
            <br />
            <p>We reserve the right to modify this Privacy Policy at any time without prior notice. Changes will be effective immediately upon posting on this page. Continued use of our Website and services constitutes your acceptance of the revised Privacy Policy.</p>
            <br />
            <p className="font-bold">Declaration</p>
            <br />
            <p>By using our Website and services, you declare that:</p>
            <br />
            <ul className="policy-list">
                <li>You have read, understood, and agreed to the terms outlined in this Privacy Policy.</li>
                <li>You accept the obligations and responsibilities described herein.</li>
            </ul>
            <br />
            <p className="font-bold">Contact Us</p>
            <br />
            <p>For questions or concerns about this Privacy Policy, please contact us at:</p>
            <br />
            <ul className="policy-list">
                <li>Address: 3/127, Plot No 144, Sirangudi Puliyur, Nagapattinam - 611108 </li>
                <li>Email: contact@thailash.com</li>
            </ul>
        </div>
        
    <Footer width={100} />
        </>
     );
}
 
export default Policy;