
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import brand from '../assets/text/brand.png'
import history1 from '../assets/history/history-1.jpg'
import history2 from '../assets/history/history-2.jpg'
import history3 from '../assets/history/history-3.jpg'

const History = () => {
     const data = [
        { 
            id: 1, 
           
            message: "In the late 1850s, a foreseen event set the stage for a remarkable journey. Mr. Palaniyappa Nadar, while purchasing meat, found himself without a bag to carry his purchase. Resourceful, he gathered leaves from nearby bushes and trees to bundle the meat pieces. Upon returning home, he discovered a magical transformation. The meat pieces had fused together, seemingly inseparable. Intrigued, he identified the leaves as Nuna, Nochi, Tamarind, and Vadanarayana. Recognizing the potential of these leaves, Mr. Palaniyappa Nadar dedicated himself to developing.", 
           
            image: history1 
        },
        { 
            id: 2, 
           
            message: "A formula that could harness their healing properties. Through months of tireless research and experimentation, he created an oil product designed to alleviate muscle-related issues. This innovative formula became the foundation of Thailash Original Thennamarakudi Oil.Beyond its ability to treat muscle problems, Thailash also proved effective in addressing a range of other ailments. Its traditional ayurveda method offered relief for bone fractures, joint displacement, back pain, neck pain, sprains, gas formation, and paralysis", 
             
            image: history2
        },
        { 
            id: 3, 
           
            message: "For over five generations, Thailash has been a beacon of hope for countless individuals seeking natural remedies. Although the brand has evolved over time, its commitment to the ancient wisdom of ayurveda medicine remains unchanged. Thailash continues to stand with pride, serving as a testament to tradition and the enduring benefits of natural healing.", 
             
            image: history3 
        },
    ]
    return ( 
        <div id="history" className="h-[100vh] mt-[10vh]">
            
          <img src={brand} className='w-1/2 ml-[5vw]' alt="" />

          <Carousel
                showThumbs={false}
                showStatus={false}
                autoFocus={false}
                infiniteLoop
                centerMode
                centerSlidePercentage={70}
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
                        <div className="flex items-center justify-start w-[100%] h-full ">
                            <img
                                src={item.image}
                                // alt={item.name}
                                className="!w-[45%] rounded-[10px] !h-full object-cover"
                            />
                            <div className="text-left !w-[55%]">
                                <p className="text-sm mt-2 history-para w-[70%] mx-auto font-semibold text-[#056E3D]">{item.message}</p>
                            </div>
                        </div>
                    </div>

                ))}
            </Carousel>
        </div>
     );
}
 
export default History;