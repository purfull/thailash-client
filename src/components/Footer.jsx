import { AiOutlineMail, AiOutlinePhone, AiOutlineRight } from "react-icons/ai";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";


const Footer = (width) => {
    const handleHomeClick = () => {
      window.scrollTo(0, 0);
    };
    const handleReviewClick = () => {
        window.scrollTo(0, 1300);

    }
    
    return (
        <div id="contact" className={`h-auto bg-[#046E3D40] text-[#056E3D] py-12 px-6 md:px-20 sm:w-[${width.width}%] `}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {/* Address, Phone, Email Section */}
                <div>
  <h3 className="text-xl font-bold md:mb-6 pb-2">Contact Us</h3>
  <p className="mb-3 flex items-start">
    <FaMapMarkerAlt size={16} className="mr-2 mt-1 text-[#056E3D] " />
    THAILASH ORIGINAL THENNAMARAKDI OIL, <br />
    3/127, Plot No 144, Sirangudi Puliyur, Nagapattinam - 611108
  </p>
  <p className="mb-3 flex items-center">
    <FaPhoneAlt size={16} className="mr-2 text-[#056E3D] " />
    +91 9597266083, +91 9003857938
  </p>
  <p className="flex items-center">
    <FaEnvelope size={16} className="mr-2 text-[#056E3D] " />
    contact@thailash.com
  </p>
</div>

                {/* Quick Links Section */}
                <div className="flex md:justify-center">
                    <div className="w-fit">
                    <h3 className="text-xl font-bold md:mb-6 pb-2">Quick Links</h3>
                    <ul className="space-y-3">
                        <li><a href="#about" className="hover:underline  transition" onClick={handleHomeClick}><AiOutlineRight size={14} style={{ strokeWidth: '2',verticalAlign: 'middle', display: 'inline-block' }} />Home</a></li>
                        <li><a href="#services" className="hover:underline  transition" onClick={handleReviewClick}><AiOutlineRight size={14} style={{ strokeWidth: '2',verticalAlign: 'middle', display: 'inline-block' }} />Review</a></li>
                        <li><a href="#contact" className="hover:underline  transition" onClick={handleHomeClick}><AiOutlineRight size={14} style={{ strokeWidth: '2',verticalAlign: 'middle', display: 'inline-block' }} />Contact</a></li>
                    </ul>
                    </div>
                </div>

                {/* Privacy Policy and Terms Section */}
                <div className="flex md:justify-center">
                    <div className="w-fit">
                        <h3 className="text-xl font-bold md:mb-6 pb-2">Legal</h3>
                        <ul className="space-y-3">
                            <li><a href="privacy-policy" className="hover:underline  transition"><AiOutlineRight size={14} style={{ strokeWidth: '2',verticalAlign: 'middle', display: 'inline-block' }} />Privacy Policy</a></li>
                            <li><a href="terms" className="hover:underline  transition"><AiOutlineRight size={14} style={{ strokeWidth: '2',verticalAlign: 'middle', display: 'inline-block' }} />Terms & Conditions</a></li>
                            <li><a href="refund-policy" className="hover:underline  transition"><AiOutlineRight size={14} style={{ strokeWidth: '2',verticalAlign: 'middle', display: 'inline-block' }} />Cancellation & Refund Policy</a></li>
                            <li><a href="shipping-policy" className="hover:underline  transition"><AiOutlineRight size={14} style={{ strokeWidth: '2',verticalAlign: 'middle', display: 'inline-block' }} />Shipping and Delivery Policy</a></li>
                        </ul>

                    </div>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="mt-12 text-center border-t border-[#056E3D] pt-6">
                <p className="text-sm">&copy; 2024 Thailash. All rights reserved.</p>
            </div>
        </div>
    );
}

export default Footer;
