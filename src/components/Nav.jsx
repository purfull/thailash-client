import React, { useState, useEffect } from 'react';
import { AiOutlineMenu, AiOutlineClose, AiOutlineRight } from 'react-icons/ai';
import logo from '../assets/logo/logo.svg';
import { Link } from 'react-scroll';
import { Navigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';


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

    const handleCheckoutClick = () => {
        Navigate('/checkout');
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation" onClick={() => setIsOpen(false)} style={{ display: 'flex', flexDirection: "column" }}>
            {/* Burger menu icon for mobile */}
            <div className="md:hidden text-[#056E3D] relative z-50" onClick={toggleMenu} style={{display:'flex',justifyContent:'end', height:'8vh',marginTop:"10px",marginRight:"14px",alignItems:'center',}}>
                {isOpen && <AiOutlineClose size={24} />}
            </div>
            <a
                href="#home"
                onClick={() => setActiveSection('home')}
                className={`py-2 my-1 px-6 border-b md:border-none ${activeSection === 'home' ? 'bg-[#056E3D] text-white' : 'bg-[#FFFFFF87] text-[#056E3D]'} cursor-pointer whitespace-nowrap`}
            >{"Home"}</a>
            <a
                href="#reviews"
                onClick={() => setActiveSection('reviews')}
                className={`py-2 my-1 px-6 border-b md:border-none ${activeSection === 'reviews' ? 'bg-[#056E3D] text-white' : 'bg-[#FFFFFF87] text-[#056E3D]'} cursor-pointer whitespace-nowrap`}
            >{"Reviews"}</a>
            <a
                href="#history"
                onClick={() => setActiveSection('history')}
                className={`py-2 my-1 px-6 border-b md:border-none ${activeSection === 'history' ? 'bg-[#056E3D] text-white' : 'bg-[#FFFFFF87] text-[#056E3D]'} cursor-pointer whitespace-nowrap`}
            >{"History"}</a>
            <a
                href="#contact"
                onClick={() => setActiveSection('contact')}
                className={`py-2 my-1 px-6 border-b md:border-none ${activeSection === 'contact' ? 'bg-[#056E3D] text-white' : 'bg-[#FFFFFF87] text-[#056E3D]'} cursor-pointer whitespace-nowrap`}
            >{"Contact"}</a>
        </Box>
    );
    console.log("isOpen==>", isOpen)
    return (
        <nav className="px-4 h-[8vh] md:h-[14vh] flex items-center w-full fixed top-0 z-50 border-b border-[#046E3D40] bg-[#E9FFF3] ">
            <div className="container mx-auto flex justify-between items-center text-[#056E3D]">
                {/* Logo */}
                <div className="text-[#056E3D] text-xl font-bold w-[26vw] md:w-[12vw]">
                    <img src={logo} className='w-full' alt="" />
                </div>

                {/* Burger menu icon for mobile */}
                <div className="md:hidden text-[#056E3D] relative z-50" onClick={toggleMenu}>
                    {isOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
                </div>

                {/* Drawer/Sidebar Menu */}
                {isOpen && (
                    <div
                        className="fixed inset-0 bg-black opacity-50 z-30"
                        onClick={toggleMenu}
                    ></div>
                )}

                {/* Drawer Content */}
                <ul
                    // className={`fixed top-0 right-0 h-full w-2/3 z-40 transform transition-transform rounded-[25px] border border-[#046E3D40] duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'} md:static md:flex md:flex-row md:items-center md:space-x-6 md:translate-x-0 md:w-auto px-4 font-bold`}
                    className="fixed top-0 right-0 h-full w-2/3 z-40 transform rounded-[25px] border border-[#046E3D40] md:static md:flex md:flex-row md:items-center md:space-x-6 md:translate-x-0 md:w-auto px-4 font-bold hidden sm:flex"
                >
                    <li>
                        <a
                            href="#home"
                            onClick={() => setActiveSection('home')}
                            className={`py-2 my-1 rounded-[25px] px-6 border-b md:border-none ${activeSection === 'home' ? 'bg-[#056E3D] text-white' : 'bg-[#FFFFFF87] text-[#056E3D]'} cursor-pointer`}
                        >
                            Home
                        </a>
                    </li>
                    <li>
                        <a
                            href="#reviews"
                            onClick={() => setActiveSection('reviews')}
                            className={`py-2 my-1 rounded-[25px] px-6 border-b md:border-none ${activeSection === 'reviews' ? 'bg-[#056E3D] text-white' : 'bg-[#FFFFFF87] text-[#056E3D]'} cursor-pointer`}
                        >
                            Reviews
                        </a>
                    </li>
                    <li>
                        <a
                            href="#history"
                            onClick={() => setActiveSection('history')}
                            className={`py-2 my-1 rounded-[25px] px-6 border-b md:border-none ${activeSection === 'history' ? 'bg-[#056E3D] text-white' : 'bg-[#FFFFFF87] text-[#056E3D]'} cursor-pointer`}
                        >
                            History
                        </a>
                    </li>
                    <li className="flex">
                        <a
                            href="#contact"
                            onClick={() => setActiveSection('contact')}
                            className={`py-2 my-1 rounded-[25px] px-6 border-b md:border-none ${activeSection === 'contact' ? 'bg-[#056E3D] text-white' : 'bg-[#FFFFFF87] text-[#056E3D]'} cursor-pointer whitespace-nowrap`}
                        >
                            Contact Us
                        </a>
                    </li>
                </ul>
                {isOpen && <Drawer open={isOpen} onClose={() => setIsOpen(false)} anchor={"right"} >
                    {DrawerList}
                </Drawer>}

                {/* Desktop Navigation */}
                <div className="justify-between items-center font-bold hidden md:flex">
                    <a href="/checkout" className='mr-4 px-5 py-2 rounded-[25px] border-2 border-[#056E3D] cursor-pointer'>
                        Shop Now
                    </a>
                    <a href="/checkout" className='p-3 rounded-full border-2 border-[#056E3D] cursor-pointer'>
                        <AiOutlineRight size={20} style={{ strokeWidth: '2' }} />
                    </a>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
