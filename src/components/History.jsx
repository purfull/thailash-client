import React,  { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import brand from '../assets/text/brand.png'
import history1 from '../assets/history/history-1.png'
import history2 from '../assets/history/history-2.jpg'
import history3 from '../assets/history/history-3.jpg'
import "./History.css";

const History = () => {
     const data = [
        { 
            id: 1, 
           
            message: "In the late 1850s, a foreseen event set the stage for a remarkable journey. Mr. Palaniyappa Nadar, while purchasing meat, found himself without a bag to carry his purchase. Resourceful, he gathered leaves from nearby bushes and trees to bundle the meat pieces. Upon returning home, he discovered a magical transformation. The meat pieces had fused together, seemingly inseparable. Intrigued, he identified the leaves as Nuna, Nochi, Tamarind, and Vadanarayana. Recognizing the potential of these leaves.", 
           
            image: history1 
        },
        { 
            id: 2, 
           
            message: " Mr. Palaniyappa Nadar dedicated himself to developing. A formula that could harness their healing properties. Through months of tireless research and experimentation, he created an oil product designed to alleviate muscle-related issues. This innovative formula became the foundation of Thailash Original Thennamarakudi Oil.Beyond its ability to treat muscle problems, Thailash also proved effective in addressing a range of other ailments. Its traditional ayurveda method offered relief for bone fractures,", 
             
            image: history2
        },
        { 
            id: 3, 
           
            message: "joint displacement, back pain, neck pain, sprains, gas formation, and paralysis. For over five generations, Thailash has been a beacon of hope for countless individuals seeking natural remedies. Although the brand has evolved over time, its commitment to the ancient wisdom of ayurveda medicine remains unchanged. Thailash continues to stand with pride, serving as a testament to tradition and the enduring benefits of natural healing.", 
             
            image: history3 
        },
    ]
    const [slidePercentage, setSlidePercentage] = useState(33.33);
    
        useEffect(() => {
          const handleResize = () => {
            if (window.innerWidth < 768) {
              setSlidePercentage(90); // Mobile view
            } else {
              setSlidePercentage(70); // Larger devices
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
        <div id="history" className="h-[100vh] md:w-[85%] mt-[10vh]">
            
          <img src={brand} className='w-[80%] md:w-1/2 ml-[5vw]' alt="" />

          <Carousel
                showThumbs={false}
                showStatus={false}
                autoFocus={false}
                infiniteLoop
                centerMode
                centerSlidePercentage={slidePercentage}
                emulateTouch
                swipeable
                useKeyboardArrows
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
                renderIndicator={false}
            >
                {data.map((item) => (
                    <div key={item.id} className="testimonial-item h-[55vh]  flex flex-col items-center ">
                        <div className="history-carousal">
                            <img
                                src={item.image}
                                // alt={item.name}
                                className="history-carousal-image"
                                // className='w-full !sm:w-[100%] rounded-[10px] h-auto object-cover history-carousal-img'
                            />
                            <div className="history-para-container">
                                <p className=" history-paragraph">{item.message}</p>
                            </div>
                        </div>
                    </div>

                ))}
            </Carousel>
        </div>
     );
}
 
export default History;