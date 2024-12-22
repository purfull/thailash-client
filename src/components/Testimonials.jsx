import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import testimonial from '../assets/text/testimonial.png'

const Testimonials = () => {
    const data = [
        { 
            id: 1, 
            name: "Sanjay", 
            message: `Had muscle tear due to badminton and consulted few doctors. All advised to go for surgery.Luckily got to know abt this wonderful oil and started applying regularly with some recommended food items.To my surprise and shock, I m out of that muscle tear issue now. Can sense that at least 90% is recovered.  Luckily got to know abt this wonderful oil and started applying regularly with some recommended food items.`, 
            rating: 5, 
            image: "https://i.pinimg.com/236x/07/33/ba/0733ba760b29378474dea0fdbcb97107.jpg" 
        },
        { 
            id: 2, 
            name: "Harish", 
            message: "Had muscle tear due to badminton and consulted few doctors. All advised to go for surgery.Luckily got to know abt this wonderful oil and started applying regularly with some recommended food items.To my surprise and shock, I m out of that muscle tear issue now. Can sense that at least 90% is recovered. ", 
            rating: 4, 
            image: "https://i.pinimg.com/236x/36/a2/e2/36a2e242bfe3ac039e0618fbaaef7596.jpg" 
        },
        { 
            id: 3, 
            name: "Satish", 
            message: "Had muscle tear due to badminton and consulted few doctors. All advised to go for surgery.Luckily got to know abt this wonderful oil and started applying regularly with some recommended food items.To my surprise and shock, I m out of that muscle tear issue now. Can sense that at least 90% is recovered. ", 
            rating: 3, 
            image: "https://i.pinimg.com/564x/43/71/0f/43710f32c6fc09258dc246870064ace3.jpg" 
        },
        { 
            id: 4, 
            name: "Venkat", 
            message: "Had muscle tear due to badminton and consulted few doctors. All advised to go for surgery.Luckily got to know abt this wonderful oil and started applying regularly with some recommended food items.To my surprise and shock, I m out of that muscle tear issue now. Can sense that at least 90% is recovered. ", 
            rating: 4, 
            image: "https://i.pinimg.com/236x/9b/93/62/9b9362e4b998a73745da74cdc3adb4a9.jpg" 
        },
    ]

    return (
        <div id="reviews" className="h-[100vh] w-[85%] flex flex-col justify-center items-center">
            <div className="text-center text-[#056E3D]">
                {/* <h1 className="text-4xl font-bold">Testimonials</h1> */}
                <img src={testimonial} className="w-[65%] mx-auto" alt="" />
                <h3 className="text-lg font-semibold">What People Think About Us</h3>
            </div>

            <Carousel
                showThumbs={false}
                showStatus={false}
                infiniteLoop
                centerMode
                centerSlidePercentage={33.33}
                emulateTouch
                swipeable
                useKeyboardArrows
    autoPlay // Enable auto-slide
    interval={2000} // Time in milliseconds (3000ms = 3 seconds)
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
                    <div key={item.id} className="testimonial-item h-[55vh] border border-[#056E3D] p-[4vh] flex flex-col items-center ">
                        <div className="flex items-center justify-start w-[80%] mb-4">
                            <img
                                src={item.image}
                                // alt={item.name}
                                className="!w-20 !h-20 rounded-full object-cover mr-4"
                            />
                            <div className="text-left">
                                <h4 className="text-lg font-bold">{item.name}</h4>
                                <p className=" text-yellow-500 text-xl">{'★'.repeat(item.rating)}</p>
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
