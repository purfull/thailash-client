import React,  { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import testimonial from '../assets/text/testimonial.png'
import { AppEnv } from '../../config';

const Testimonials = () => {
    const [data,setData] = useState([])
    const [slidePercentage, setSlidePercentage] = useState(33.33);

     
     useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${AppEnv.baseUrl}/testimonial`);
                const result = await response.json();
    
                if (result) {
    
                  setData(result.data);
    
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, []);
    useEffect(() => {
      const handleResize = () => {
        if (window.innerWidth < 768) {
          setSlidePercentage(90); // Mobile view
        } else {
          setSlidePercentage(33.33); // Larger devices
        }
      };
  
      // Set initial percentage
      handleResize();
  
      // Add event listener for resize
      window.addEventListener("resize", handleResize);
  
      // Clean up event listener
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div id="reviews" className="w-full md:w-[85%] flex flex-col justify-center items-center overflow-hidden pb-[8vh]">
            <div className="text-center text-[#056E3D]">
                {/* <h1 className="text-4xl font-bold">Testimonials</h1> */}
                <img src={testimonial} className="w-[65%] mx-auto" alt="" />
                <h3 className="text-lg font-semibold">What People Think About Us</h3>
            </div>

            <Carousel
                showThumbs={false}
                showStatus={false}
                infiniteLoop
                centerMode = {slidePercentage == 90 ? false : true}
                centerSlidePercentage={slidePercentage}
                emulateTouch
                swipeable = {false}
                useKeyboardArrows
    autoPlay // Enable auto-slide
    interval={2000} // Time in milliseconds (3000ms = 3 seconds)
    className="w-full"
                renderArrowPrev={(onClickHandler, hasPrev, label) =>
                    hasPrev && (
                        <button
                            type="button"
                            onClick={onClickHandler}
                            className="absolute left-[5vw] top-1/2 transform -translate-y-1/2 bg-[#056E3D] text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg z-30"
                            aria-label={label}
                        >
                            &#10094;
                        </button>
                    )
                }
                renderArrowNext={(onClickHandler, hasNext, label) =>
                    hasNext && (
                        <button
                            type="button"
                            onClick={onClickHandler}
                            className="absolute right-[5vw] top-1/2 transform -translate-y-1/2 bg-[#056E3D] text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg z-30"
                            aria-label={label}
                        >
                            &#10095;
                        </button>
                    )
                }
                renderIndicator={(onClickHandler, isSelected, index, label) => (
                    <li
                        className={`inline-block mx-1 w-3 h-3 rounded-full cursor-pointer ${
                            isSelected ? 'bg-[#056E3D]' : 'bg-gray-300'
                        }`}
                        onClick={onClickHandler}
                        onKeyDown={onClickHandler}
                        value={index}
                        role="button"
                        tabIndex={0}
                        aria-label={`${label} ${index + 1}`}
                    ></li>
                )}
            >
                {data.map((item) => (
                    <div key={item.id} className="testimonial-item h-[44vh] md:h-auto border border-[#056E3D] p-[4vh] flex flex-col items-center ">
                        <div className="flex items-center justify-start w-[80%] mb-4">
                            <img
                                src={item.image}
                                // alt={item.name}
                                className="!w-20 !h-20 rounded-full object-cover mr-4"
                            />
                            <div className="text-left">
                                <h4 className="text-lg font-bold">{item.name}</h4>
                                <p className=" text-yellow-500 text-xl">{'★'.repeat(item.retting)}</p>
                            </div>
                        </div>
                        <p className="text-sm mt-2 text-left w-[90%]">{item.message}</p>
                    </div>

                ))}
            </Carousel>
        </div>
    );
};

export default Testimonials;
