import React, { useState, useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import product1 from '../assets/product/product-1.png'
import product2 from '../assets/product/product-2.png'
import product3 from '../assets/product/product-3.png'
import product4 from '../assets/product/product-4.png'
import product5 from '../assets/product/product-5.png'
import grandpa from '../assets/logo/grandpa.png'
import title from '../assets/text/home-title.png'
import tagline from '../assets/text/tagline.png'
import tick from '../assets/icons/verified-tick.svg'
import { AiOutlineMenu, AiOutlineClose, AiOutlineRight } from 'react-icons/ai';
import { Link } from 'react-scroll';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';


const Home = () => {
  const mainSliderRef = useRef(null);
  const navigate = useNavigate();
  const [navIndex, setNavIndex] = useState(0);

  const mainSettings = {
    asNavFor: null, // Placeholder, this will be set later
    ref: mainSliderRef,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    autoplay: true,
    arrows: false,
    beforeChange: (current, next) => setNavIndex(next),
  };

  const thumbnailSettings = {
    slidesToShow: carouselItems.length,
    slidesToScroll: 0,
    focusOnSelect: true,
    arrows: false,
    afterChange: (index) => mainSliderRef.current.slickGoTo(index),
    centerMode: false, // Disable center mode for a stable view
    infinite: false,
  };

  const handleCheckoutClick = () => {
    navigate('/checkout');
  };
    return ( 
      <div id='home' className='w-[85%]' >
        <div className='price-container h-[86vh] w-[15%] shadow-md border-l border-[#046E3D40]  fixed bottom-0 right-0 z-[200] bg-[#E9FFF3]'>
          <p className='font-semibold text-lg p-2 mt-[5vh]'>FREE delivery Wed, 25 Dec on ₹499 of items fulfilled by Amazon.</p>
          <p className=' text  p-2 '>Thailash Thennamarakudi Oil From Original Thennamarakudi Origin Ayurvedic Pain Relief Oil for Joint, Muscular Pain 100ML (pack of 2)</p>
          <p className=' font-semibold text-lg  px-2 mt-4 '>Now at <span className='text-red-600 '>{`-${17}%`}</span></p>
          <p className=' text  px-2 '><span className=' text mr-2' style={{textDecoration: 'line-through'}}>₹{300}</span><span className='text-2xl font-semibold'>₹{249}</span></p>  
            <div className="mt-8 flex flex-col justify-center items-center">
              {/* <button className='mr-4 py-[7px] w-[90%] rounded-[25px] border-2 border-[#056E3D] text-[#056E3D] cursor-pointer font-bold'>More Info</button> */}
              <button className=' py-[7px] w-[90%] rounded-[25px] text-[#B65402] cursor-pointer font-bold bg-gradient-to-r from-[#EBAC0A] to-[#FFDE47]' onClick={handleCheckoutClick}>Buy Now</button>
            </div>

        </div>
        
        <div className="h-[100vh] flex items-end justify-evenly">
          <div className="container-fluid w-[33%] p-0 pb-5 mb-6">
            <Slider {...mainSettings}>
              {carouselItems.map((item, index) => (
                <div key={index} className="position-relative ">
                  <img className="w-[100%] h-[60vh] mx-auto " src={item.imgSrc} alt="" />
                </div>
              ))}
            </Slider>
      
            <div className="thumbnail-carousel w-[100%] mx-auto">
              <Slider {...thumbnailSettings}>
                {carouselItems.map((item, index) => (
                  <div
                    key={index}
                    className={`thumbnail-item h-20 ${navIndex === index ? 'active' : ''} mx-auto`}
                    style={{
                      padding: '5px',
                      border: navIndex === index ? '2px solid #6200ed' : 'none', // Highlight active thumbnail
                    }}
                  >
                    <img src={item.imgSrc} className="mx-auto" alt="" />
                  </div>
                ))}
              </Slider>
            </div>
          </div>
          <div className="w-[55%] h-[70vh] pb-5 pl-[5vw]">
            <img src={title} className='w-[90%]' alt="" />
            <p className='text-[#056E3D] w-[90%] font-semibold'>We offer a natural solution for sprains, muscle stiffness, back pain, neck pain, arthritis, rheumatism, ligament tears, frozen shoulder, blood clots, and swelling.
            Thailash Thennamarakudi Oil has been trusted by generations for complete bone and nerve-related issues
            </p>
            <div className="mt-8 flex items-center">
              <button className='mr-4 py-[7px] w-[10vw] rounded-[25px] border-2 border-[#056E3D] text-[#056E3D] cursor-pointer font-bold'>More Info</button>
              {/* <button className='mr-4 py-[7px] w-[10vw] rounded-[25px] text-[#B65402] cursor-pointer font-bold bg-gradient-to-r from-[#EBAC0A] to-[#FFDE47]'>Buy Now</button> */}
              <button to="/shop" className='p-[14px] rounded-full border-2 bg-[#056E3D] cursor-pointer m-0'>
                  <AiOutlineRight size={20} style={{ strokeWidth: '2', color: 'white' }} />
              </button>
            </div>
          </div>

        </div>
        <div className="overflow-hidden">
          <div className="infinite-scroll-container py-1 bg-[#056E3D] flex items-center animate-scroll">
            <div className="flex items-center space-x-2">
              <div>
                <img src={tick} className="w-20" alt="Tick icon" />
              </div>
              <div className="text-center p-2 bg-[#40916C] rounded-md">
                <h3 className="text-white font-semibold ">
                  Original Thennamarakudi Oil Straight from the Nature
                </h3>
              </div>
              <div>
                <img src={tick} className="w-20" alt="Tick icon" />
              </div>
              <div className="text-center p-2 bg-[#40916C] rounded-md">
                <h3 className="text-white font-semibold">
                  Original Thennamarakudi Oil Straight from the Nature
                </h3>
              </div>
              <div>
                <img src={tick} className="w-20" alt="Tick icon" />
              </div>
              {/* Repeat the items to create a smooth scroll */}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center h-[100vh]">
          <div className=" w-[45%]">
          <img src={tagline} alt="" />
            
          <p className='text-[#056E3D] w-[85%] font-semibold mt-6'>The legacy of Thailash Original down through his ancestors, this ancient remedy remedy The legacy of Thailash Original down through his ancestors, this ancient remedy remedy The legacy of Thailash Original down through his ancestors, this ancient remedy remedy The legacy of Thailash Original down through his ancestors, this ancient remedy remedy The 
            </p>
          </div>
          <div className=" w-[45%] flex items-center justify-end">
            <img src={grandpa} className='w-[85%]' alt="" />
          </div>
        </div>

      </div>
        
    );
  };

  const carouselItems = [
    {
      imgSrc: product1,
      title: 'Retail & in-store marketing',
      description: 'YOUR ONE-STOP SOLUTION FOR A FRESH MARKETING EXPERIENCE',
      link: '#',
    },
    {
      imgSrc: product2,
      title: 'Logistics & warehousing',
      description: 'WE WILL STORE, DELIVER, AND SET UP FOR YOU WITH TIMELINESS AND CARE',
      link: '#',
    },
    {
      imgSrc: product3,
      title: 'IMPROVE EFFECTIVENESS',
      description: 'ACHIEVE YOUR BUSINESS OBJECTIVES WITH WELL-EQUIPPED MANPOWER',
      link: '#',
    },
    {
      imgSrc: product4,
      title: 'DIGITAL SALES & PROMOTIONS',
      description: 'MAKING PROMOTIONAL ACTIVITIES MORE CONVINCING AND EFFECTIVE',
      link: '#',
    },
    {
      imgSrc: product5,
      title: 'GROW YOUR BRAND',
      description: 'GAIN A COMPETITIVE EDGE AND PENETRATE THE MARKET WITH US',
      link: '#',
    },
  ];
  
  
  
 
export default Home;