import React, { useState, useEffect } from 'react';
import { AiOutlineMenu, AiOutlineClose, AiOutlineRight } from 'react-icons/ai';
import logo from '../assets/logo/logo.svg';
import { Link } from 'react-scroll';

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    // Update active section on scroll
    const handleScroll = () => {
        const sections = document.querySelectorAll('div[id]');
        const scrollPosition = window.scrollY;

        sections.forEach((section) => {
            const sectionTop = section.offsetTop - 150;

            const sectionHeight = section.clientHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                setActiveSection(section.id);
            }
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className="p-4 w-full fixed top-0 z-50 ">
            <div className="container mx-auto flex justify-between items-center text-[#056E3D]">
                {/* Logo */}
                <div className="text-[#056E3D] text-xl font-bold w-[26vw] md:w-[12vw]">
                    <img src={logo} className='w-full' alt="" />
                </div>

                {/* Burger menu icon for mobile */}
                <div className="md:hidden text-[#056E3D] relative z-50" onClick={toggleMenu}>
                    {isOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
                </div>

                {isOpen && (
                    <div
                        className="fixed inset-0 bg-black opacity-50 z-30"
                        onClick={toggleMenu}
                    ></div>
                )}

                <ul className={`fixed top-0 right-0 h-full w-2/3 z-40 transform transition-transform rounded-[25px] border border-[#046E3D40] duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'} md:static md:flex md:flex-row md:items-center md:space-x-6 md:translate-x-0 md:w-auto px-4 font-bold`}>
                    <li>
                        <Link 
                            to="home" 
                            smooth={true} 
                            duration={500} 
                            className={`py-2 my-1 rounded-[25px] px-6 border-b md:border-none ${activeSection === 'home' ? 'bg-[#056E3D] text-white' : 'bg-[#FFFFFF87] text-[#056E3D]'} cursor-pointer`}>
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to="reviews" 
                            smooth={true} 
                            duration={500} 
                            className={`py-2 my-1 rounded-[25px] px-6 border-b md:border-none ${activeSection === 'reviews' ? 'bg-[#056E3D] text-white' : 'bg-[#FFFFFF87] text-[#056E3D]'} cursor-pointer`}>
                            Reviews
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to="history" 
                            smooth={true} 
                            duration={500} 
                            className={`py-2 my-1 rounded-[25px] px-6 border-b md:border-none ${activeSection === 'history' ? 'bg-[#056E3D] text-white' : 'bg-[#FFFFFF87] text-[#056E3D]'} cursor-pointer`}>
                            History
                        </Link>
                    </li>
                    <li className="flex">
                        <Link 
                            to="contact" 
                            smooth={true} 
                            duration={500} 
                            className={`py-2 my-1 rounded-[25px] px-6 border-b md:border-none ${activeSection === 'contact' ? 'bg-[#056E3D] text-white' : 'bg-[#FFFFFF87] text-[#056E3D]'} cursor-pointer whitespace-nowrap`}>
                            Contact Us
                        </Link>
                    </li>
                </ul>

                <div className=" justify-between items-center font-bold hidden md:flex">
                    <Link to="/shop" className='mr-4 px-5 py-2 rounded-[25px] border-2 border-[#056E3D] cursor-pointer'>
                        Shop Now
                    </Link>
                    <Link to="/shop" className='p-3 rounded-full border-2 border-[#056E3D] cursor-pointer'>
                        <AiOutlineRight size={20} style={{ strokeWidth: '2' }} />
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
