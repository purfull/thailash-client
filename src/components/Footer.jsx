

const Footer = (width) => {
    
    return (
        <div id="contact" className={`h-auto bg-[#056E3D] text-white py-12 px-6 md:px-20 sm:w-[${width.width}%] `}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {/* Address, Phone, Email Section */}
                <div>
                    <h3 className="text-xl font-bold mb-6 pb-2">Contact Us</h3>
                    <p className="mb-3 ">3/127, Plot No 144, Sirangudi Puliyur, Nagapattinam - 611108</p>
                    <p className="mb-3">+91 9597266083, +91 9003857938</p>
                    <p>contact@thailash.com</p>
                </div>

                {/* Quick Links Section */}
                <div className="flex md:justify-center">
                    <div className="w-fit">
                    <h3 className="text-xl font-bold mb-6 pb-2">Quick Links</h3>
                    <ul className="space-y-3">
                        <li><a href="#about" className="hover:underline hover:text-yellow-300 transition">Home</a></li>
                        <li><a href="#services" className="hover:underline hover:text-yellow-300 transition">Review</a></li>
                        <li><a href="#contact" className="hover:underline hover:text-yellow-300 transition">Contact</a></li>
                    </ul>
                    </div>
                </div>

                {/* Privacy Policy and Terms Section */}
                <div className="flex md:justify-center">
                    <div className="w-fit">
                        <h3 className="text-xl font-bold mb-6 pb-2">Legal</h3>
                        <ul className="space-y-3">
                            <li><a href="privacy-policy" className="hover:underline hover:text-yellow-300 transition">Privacy Policy</a></li>
                            <li><a href="terms" className="hover:underline hover:text-yellow-300 transition">Terms & Conditions</a></li>
                        </ul>

                    </div>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="mt-12 text-center border-t border-white pt-6">
                <p className="text-sm">&copy; 2024 Thailash. All rights reserved.</p>
            </div>
        </div>
    );
}

export default Footer;
