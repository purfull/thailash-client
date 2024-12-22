import React, { useState } from 'react';
import { AiOutlineRight, AiOutlineDown } from 'react-icons/ai'; // Import icons from react-icons
import faq from '../assets/text/faq.png'

const Faq = () => {
    const [openIndex, setOpenIndex] = useState(null); // State to track the currently opened FAQ

    const faqData = [
        {
            question: "Who can benefit from using Thailash Thennamarakudi Oil?",
            answer: "Thailash Thennamarakudi Oil is ideal for two groups of people:\n\n Accident Survivors: Those who have met with accidents and are dealing with bone or nerve-related issues such as joint displacements, bone fractures, blood clots, cramps, and sprains. \n\n  Elderly Individuals: Elderly people facing age-related conditions such as rheumatism, arthritis, muscle stiffness, back pain, neck pain, and joint pain."
        },
        {
            question: "Is there any dietary restriction?",
            answer: "Elderly individuals are suggested to follow specific dietary restrictions for the best results. However, others using the oil, such as those recovering from accidents, do not need to follow any dietary restrictions.\n\n Yes, one should avoid poovan bananas, paneer grapes, raw bananas, potatoes, pumpkins, cluster beans, curd, leftover rice (pazhaya saadham), broiler chicken, eggs, prawns, chickpeas, toor dal, moong dal, kidney beans, green peas, sweet potato, and tapioca.\n\nYou can add the following food items to your diet to get better results: figs, pomegranates, red bananas, hill bananas, honey, dates, beetroots, carrots, saber beans, radishes, lady's finger, moringa leaves, spinach, balloon vine (mudakathan), pirandai, fish, mutton, country chicken, and eggs."
        },
        {
            question: "Who else can use this oil?",
            answer: "Thailash Thennamarakudi oil can benefit a wide range of individuals, including: \n\n IT professionals and others who experience neck pain due to prolonged sitting or poor posture. \n\n Gym enthusiasts dealing with muscle soreness, stiffness, or sprains after intense workouts. \n\n Professionals who spend long hours standing and often experience knee or leg pain, as well as general soreness.\n\n Applying the oil gently to the affected areas can help relieve discomfort and ease pain effectively."
        },
        {
            question: "What conditions does this oil treat?",
            answer: "Thailash Thennamarakudi Oil can be used for sprains, muscle stiffness, back pain, neck pain, arthritis, rheumatism, ligament tears, frozen shoulder, blood clots, and swelling."
        },
        {
            question: "What is the direction to use?",
            answer: "1. Shake the bottle well before usage.\n\n 2. Gently apply the oil to the wounded area.\n\n 3. Let it rest for two hours. (No need to massage after applying.) \n\n 4. Wash the area with lukewarm water added with two tablespoons of rock salt or turmeric."
        },
        {
            question: "How many times should I apply the oil for better results?",
            answer: "Apply the oil twice a day—once in the morning and once at night."
        },
        {
            question: "How long should I use the oil to see results?",
            answer: "Results may start to appear after one week of consistent use. For best outcomes, continue using it for up to 15 days."
        },
        {
            question: "Are there any side effects?",
            answer: "No, the oil is made from natural ingredients, so there are no known side effects."
        },
        {
            question: "Is it suitable for children?",
            answer: "Yes, children can use it. However, it’s recommended to wash off the oil after 30 minutes of application."
        },
        {
            question: "Can this oil relieve muscle stiffness?",
            answer: "Yes, apply the oil twice a day and leave them for a maximum of two hours."
        },
        {
            question: "Will this oil cause a skin allergy?",
            answer: "Thailash Thennamarakudi Oil does not cause skin allergies. For those with sensitive skin, it’s advised to apply vibuthi (holy ash) after rinsing off the oil."
        },
    ];

    const toggleFaq = (index) => {
        setOpenIndex(openIndex === index ? null : index); // Toggle the open index
    };

    return (
        <div className="md:w-[85%]">
        <div className="faq-section md:w-[80%]">
            <h2 className='text-center text-[#056E3D] font-bold'>FAQ</h2>
            <img src={faq} className=' md:w-[60%] mx-auto mb-[6vh]' alt="" />
            {faqData.map((item, index) => (
                <div key={index} className="faq-item ">
                    <div className={`faq-question border-2 border-[#056E3D] text-[#056E3D] ${openIndex === index ? 'border-b-0' : ''} rounded-md `} onClick={() => toggleFaq(index)}>
                        <span className='font-bold text-lg  '>{item.question}</span>
                        {openIndex === index ? (
                            <AiOutlineDown size={30} /> // Minus icon when expanded
                        ) : (
                            <AiOutlineRight size={30} /> // Plus icon when collapsed
                        )}
                    </div>
                    {openIndex === index && (
                        <div className="faq-answer border-2 border-[#056E3D] text-[#056E3D] border-t-0">
                        {item.answer.split('\n\n').map((paragraph, i) => (
                                <p key={i} className="font-semibold">{paragraph}<br /></p>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
        </div>
    );
};

export default Faq;
