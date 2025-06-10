'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

// --- INLINE SVG ICONS ---
const IconPhone = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
);
const IconMapPin = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
);
const IconInstagram = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
);
const IconFacebook = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
);
const IconSparkles = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3L9.27 9.27L3 12l6.27 2.73L12 21l2.73-6.27L21 12l-6.27-2.73L12 3zM21 3L19 8l-5-2 2-5 5 2zM3 21l2-5-5-2 5 2-2 5z"/></svg>
);
const IconX = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
);


// --- MOCK DATA ---
const menu = {
    "Tandoori Starters": [
        { name: "Tandoori Chicken", price: "35 QR", desc: "The king of kebabs, marinated in yogurt and spices, char-grilled in the tandoor.", image: "https://images.pexels.com/photos/2611917/pexels-photo-2611917.jpeg?auto=compress&cs=tinysrgb&w=600" },
        { name: "Chicken Tikka Kebab", price: "30 QR", desc: "Boneless chicken chunks marinated in our special masala, grilled to perfection.", image: "https://images.pexels.com/photos/12842232/pexels-photo-12842232.jpeg?auto=compress&cs=tinysrgb&w=600" },
        { name: "Paneer Tikka Shashlik", price: "28 QR", desc: "Cubes of paneer, peppers, and onions in a spiced yogurt marinade.", image: "https://images.pexels.com/photos/9609835/pexels-photo-9609835.jpeg?auto=compress&cs=tinysrgb&w=600" },
    ],
    "Curries": [
        { name: "Butter Chicken", price: "40 QR", desc: "A crowd favorite! Grilled chicken simmered in a creamy, buttery tomato gravy.", image: "https://images.pexels.com/photos/1058277/pexels-photo-1058277.jpeg?auto=compress&cs=tinysrgb&w=600" },
        { name: "Dal Makhani", price: "25 QR", desc: "Black lentils and kidney beans slow-cooked overnight with butter and cream.", image: "https://images.pexels.com/photos/5410401/pexels-photo-5410401.jpeg?auto=compress&cs=tinysrgb&w=600" },
        { name: "Paneer Butter Masala", price: "35 QR", desc: "Soft paneer cubes in a rich and creamy tomato-based sauce.", image: "https://images.pexels.com/photos/14737750/pexels-photo-14737750.jpeg?auto=compress&cs=tinysrgb&w=600" },
    ],
    "Breads & Rice": [
        { name: "Garlic Naan", price: "5 QR", desc: "Soft, fluffy bread from the tandoor, topped with garlic and butter.", image: "https://images.pexels.com/photos/11467035/pexels-photo-11467035.jpeg?auto=compress&cs=tinysrgb&w=600" },
        { name: "Plain Roti", price: "3 QR", desc: "Whole wheat flatbread, a perfect companion for any curry.", image: "https://images.pexels.com/photos/9551307/pexels-photo-9551307.jpeg?auto=compress&cs=tinysrgb&w=600" },
        { name: "Jeera Rice", price: "15 QR", desc: "Fragrant basmati rice tempered with cumin seeds.", image: "https://images.pexels.com/photos/11352496/pexels-photo-11352496.jpeg?auto=compress&cs=tinysrgb&w=600" },
    ]
};

const testimonials = [
    { quote: "This is the most authentic Punjabi food I've had in Doha! Tastes just like home. The 5-star rating is well-deserved.", name: "A. Khan" },
    { quote: "Amazing value for money. The portions are huge and the flavors are incredible. The Butter Chicken is a must-try!", name: "F. Jacob" },
    { quote: "Finally, a real Dhaba experience in the Industrial Area. The staff are friendly and the food is simply delicious.", name: "S. Kumar" },
    { quote: "I bring all my clients here. It's consistently good, and the service is always with a smile. Highly recommended!", name: "M. Al-Thani" },
    { quote: "The Tandoori Chicken is out of this world. Perfectly spiced and so juicy. I could eat here every day!", name: "J. Fernandez" },
    { quote: "A hidden gem! Don't let the location fool you, this place serves some of the best Indian food in Qatar.", name: "R. Singh" }
];

const socialFeedImages = [
    { src: "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=600", alt: "A spread of Indian dishes" },
    { src: "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=600", alt: "A person eating naan bread" },
    { src: "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=600", alt: "Colorful spices" },
    { src: "https://images.pexels.com/photos/2679501/pexels-photo-2679501.jpeg?auto=compress&cs=tinysrgb&w=600", alt: "A glass of lassi" },
    { src: "https://images.pexels.com/photos/3754269/pexels-photo-3754269.jpeg?auto=compress&cs=tinysrgb&w=600", alt: "Tandoori chicken skewers" },
    { src: "https://images.pexels.com/photos/674574/pexels-photo-674574.jpeg?auto=compress&cs=tinysrgb&w=600", alt: "A delicious plate of dal" },
];

// --- COMPONENTS ---

const Preloader = () => (
    <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-[#121212] z-[100] flex flex-col items-center justify-center"
    >
        <div className="relative w-32 h-32">
            <motion.div 
                className="w-full h-full border-4 border-[#FF9F1C] rounded-full"
                animate={{ rotate: 360 }}
                transition={{ loop: Infinity, duration: 1.5, ease: "linear" }}
            />
            <Image src="https://i.ibb.co/6yVwVjG/dhaba-logo-simple.png" alt="Dhaba Logo" width={80} height={80} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"/>
        </div>
        <p className="text-white mt-4 text-lg font-semibold">Loading Flavors...</p>
    </motion.div>
);

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = ["Home", "Menu", "Our Story", "Contact"];
    const scrollTo = (id) => document.getElementById(id.toLowerCase().replace(' ', '-'))?.scrollIntoView({ behavior: 'smooth' });
    const phoneNumber = "+97430951313";

    return (
        <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-[#2E282A]/90 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
            <div className="container mx-auto px-6 py-3 flex justify-between items-center">
                <div className="flex items-center">
                    <Image src="https://i.ibb.co/6yVwVjG/dhaba-logo-simple.png" alt="Dhaba Logo" width={48} height={48} className="mr-2"/>
                    <div className="text-white font-bold text-xl leading-tight">
                        <span className="block" style={{ fontFamily: "Anek Devanagari, sans-serif" }}>Punjabi</span>
                        <span className="block text-[#FF9F1C]" style={{ fontFamily: "Anek Devanagari, sans-serif" }}>Dhaba</span>
                    </div>
                </div>
                <nav className="hidden md:flex space-x-8">
                    {navLinks.map(link => (
                        <button key={link} onClick={() => scrollTo(link)} className="text-white hover:text-[#FF9F1C] font-semibold transition-colors">{link}</button>
                    ))}
                </nav>
                <motion.a 
                    href={`tel:${phoneNumber}`}
                    whileHover={{ scale: 1.05 }} 
                    whileTap={{ scale: 0.95 }}
                    className="hidden md:block bg-[#FF9F1C] text-black font-bold px-6 py-2 rounded-md"
                >
                    Call us now!
                </motion.a>
            </div>
        </header>
    );
};

const Hero = () => {
    const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    const heroTitle = "Authentic Punjabi Flavors,";
    const heroSubtitle = "Straight from the Tandoor.";

    const titleVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.05, delayChildren: 0.2 },
        },
    };

    const letterVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 100 },
        },
    };

    return (
        <section id="home" className="h-screen bg-cover bg-center flex items-center relative" style={{ backgroundImage: "url('https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')" }}>
            <div className="absolute inset-0 bg-black/60"></div>
            <div className="container mx-auto px-6 text-center text-white relative z-10">
                <motion.h1 
                    variants={titleVariants}
                    initial="hidden"
                    animate="visible"
                    className="text-5xl md:text-7xl font-extrabold leading-tight" style={{ fontFamily: "Anek Devanagari, sans-serif" }}>
                    {heroTitle.split("").map((char, index) => (
                        <motion.span key={index} variants={letterVariants} className="inline-block">{char === " " ? "\u00A0" : char}</motion.span>
                    ))}
                    <br/>
                    <span className="text-[#FF9F1C]">
                        {heroSubtitle.split("").map((char, index) => (
                            <motion.span key={index} variants={letterVariants} className="inline-block">{char === " " ? "\u00A0" : char}</motion.span>
                        ))}
                    </span>
                </motion.h1>
                <motion.p 
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 1.5 }}
                    className="mt-4 text-lg md:text-xl max-w-2xl mx-auto"
                >
                    Rated 5 Stars for a reason. Experience the true taste of Punjab right here in the heart of Doha&apos;s Industrial Area.
                </motion.p>
                <motion.div 
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 1.7 }}
                    className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4"
                >
                    <motion.button whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px #FF9F1C" }} whileTap={{ scale: 0.95 }} onClick={() => scrollTo('menu')} className="bg-[#FF9F1C] text-black font-bold px-10 py-4 rounded-lg text-lg w-full sm:w-auto">
                        View Our Dastarkhwan
                    </motion.button>
                    <motion.a href="https://www.talabat.com/qatar" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-gray-700/50 border border-white/50 text-white font-bold px-10 py-4 rounded-lg text-lg w-full sm:w-auto">
                        Order on Talabat
                    </motion.a>
                </motion.div>
            </div>
        </section>
    );
};

const Story = () => (
    <section id="our-story" className="py-20 bg-[#2E282A]">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.6 }}>
                <Image src="https://images.pexels.com/photos/2773940/pexels-photo-2773940.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="A bustling Indian market scene" width={600} height={750} className="rounded-lg shadow-2xl w-full h-auto"/>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.6 }} className="text-white">
                <h2 className="text-4xl font-bold text-[#FF9F1C] mb-4" style={{ fontFamily: "Anek Devanagari, sans-serif" }}>From Punjab to Doha</h2>
                <p className="mb-4 text-lg text-gray-300">
                    Our journey began with a simple mission: to bring the heart and soul of Punjabi roadside dhabas to Qatar. We believe in honest, hearty food that comforts and delights.
                </p>
                <p className="text-lg text-gray-300">
                    Every dish is prepared with fresh ingredients and traditional recipes passed down through generations. It&apos;s more than just a meal; it&apos;s a celebration of our culture.
                </p>
            </motion.div>
        </div>
    </section>
);

const LoadingSpinner = () => (
    <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FF9F1C]"></div>
    </div>
);

const DescriptionModal = ({ dish, onClose }) => {
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchDescription = async () => {
            setLoading(true);
            setError('');
            const prompt = `You are a food critic for a top culinary magazine. Describe the classic Punjabi dish '${dish.name}' in two poetic, mouth-watering sentences. Focus on the aroma, texture, and authentic flavors. Here is a brief description for context: '${dish.desc}'.`;
            
            try {
                let chatHistory = [];
                chatHistory.push({ role: "user", parts: [{ text: prompt }] });
                const payload = { contents: chatHistory };
                const apiKey = ""; 
                const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
                
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                if (!response.ok) {
                    throw new Error(`API error: ${response.statusText}`);
                }
                
                const result = await response.json();
                
                if (result.candidates?.[0]?.content?.parts?.[0]?.text) {
                    const text = result.candidates[0].content.parts[0].text;
                    setDescription(text);
                } else {
                    throw new Error("Unexpected API response structure.");
                }
            } catch (err) {
                console.error("Gemini API call failed:", err);
                setError("Sorry, we couldn't whip up a description right now. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchDescription();
    }, [dish]);

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[100] p-4" onClick={onClose}>
            <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-[#2E282A] p-6 rounded-lg max-w-xl w-full text-white border border-[#FF9F1C]/30 shadow-2xl flex flex-col md:flex-row gap-6"
            >
                <Image src={dish.image} alt={dish.name} width={200} height={200} className="w-full md:w-1/3 h-48 md:h-auto object-cover rounded-md"/>
                <div className="flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="text-3xl font-bold text-[#FF9F1C]" style={{ fontFamily: "Anek Devanagari, sans-serif" }}>{dish.name}</h3>
                        <button onClick={onClose} className="text-gray-400 hover:text-white"><IconX className="w-6 h-6"/></button>
                    </div>
                    {loading ? <LoadingSpinner /> : (
                        error ? <p className="text-red-400">{error}</p> : <p className="text-lg text-gray-300">{description}</p>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

const Menu = () => {
    const [selectedDish, setSelectedDish] = useState(null);

    const formatPrice = (priceString) => {
        const numberPart = parseFloat(priceString);
        if (isNaN(numberPart)) return priceString;
        return `${numberPart.toFixed(2)} QR`;
    };

    return (
        <>
        <section id="menu" className="py-20 bg-[#121212]">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-5xl font-extrabold text-white mb-2" style={{ fontFamily: "Anek Devanagari, sans-serif" }}>Our Dastarkhwan</h2>
                <p className="text-gray-400 mb-12 text-lg">A feast of authentic flavors, crafted with passion.</p>
                <div className="grid lg:grid-cols-3 gap-8 text-left">
                    {Object.entries(menu).map(([category, items]) => (
                        <motion.div key={category} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6 }} className="bg-[#2E282A]/50 p-6 rounded-lg">
                            <h3 className="text-3xl font-bold text-[#FF9F1C] mb-6 border-b-2 border-[#FF9F1C]/30 pb-3" style={{ fontFamily: "Anek Devanagari, sans-serif" }}>{category}</h3>
                            <div className="space-y-6">
                                {items.map(item => (
                                    <div key={item.name} className="flex items-start gap-4">
                                        <Image src={item.image} alt={item.name} width={64} height={64} className="w-16 h-16 rounded-full object-cover border-2 border-[#FF9F1C]/50"/>
                                        <div className="flex-grow">
                                            <div className="flex justify-between items-center">
                                                <h4 className="text-xl font-semibold text-white">{item.name}</h4>
                                                <div className="flex items-center gap-2 flex-shrink-0">
                                                    <div className="bg-[#121212] px-3 py-1 rounded-md border border-[#FF9F1C]/30">
                                                        <p className="text-md font-bold text-[#FF9F1C] whitespace-nowrap">{formatPrice(item.price)}</p>
                                                    </div>
                                                    <motion.button 
                                                        onClick={() => setSelectedDish(item)}
                                                        className="text-[#FF9F1C]/70 hover:text-[#FF9F1C]"
                                                        title="Describe this dish"
                                                        whileHover={{scale: 1.2, rotate: 15}}
                                                        whileTap={{scale: 0.9}}
                                                    >
                                                        <IconSparkles className="w-5 h-5"/>
                                                    </motion.button>
                                                </div>
                                            </div>
                                            <p className="text-gray-400 text-sm pr-12">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
        <AnimatePresence>
            {selectedDish && <DescriptionModal dish={selectedDish} onClose={() => setSelectedDish(null)} />}
        </AnimatePresence>
        </>
    );
};

const MealRecommender = () => {
    const [prefs, setPrefs] = useState('');
    const [recommendation, setRecommendation] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const getRecommendation = async () => {
        if (!prefs) return;
        setLoading(true);
        setError('');
        setRecommendation('');

        const menuString = JSON.stringify(menu, null, 2);
        const prompt = `You are a friendly and knowledgeable host at an authentic Punjabi Dhaba restaurant. A customer has the following preferences: "${prefs}". Based on our menu below, suggest a complete and delicious meal for them (a starter, a main course, and bread). Explain your choices briefly in a warm, inviting tone. \n\nMenu:\n${menuString}`;

        try {
            let chatHistory = [];
            chatHistory.push({ role: "user", parts: [{ text: prompt }] });
            const payload = { contents: chatHistory };
            const apiKey = "";
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
            
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) throw new Error("API request failed");
            
            const result = await response.json();

            if (result.candidates?.[0]?.content?.parts?.[0]?.text) {
                const text = result.candidates[0].content.parts[0].text;
                setRecommendation(text);
            } else {
                throw new Error("Invalid API response format");
            }

        } catch (err) {
            console.error("Gemini meal recommender error:", err);
            setError("Our chef is thinking... but having a little trouble. Please try again!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="recommender" className="py-20 bg-[#2E282A]">
            <div className="container mx-auto px-6 text-center text-white">
                <IconSparkles className="w-12 h-12 mx-auto text-[#FF9F1C] mb-4" />
                <h2 className="text-4xl font-bold mb-4" style={{ fontFamily: "Anek Devanagari, sans-serif" }}>Don&apos;t Know What to Order?</h2>
                <p className="text-gray-300 mb-8 max-w-2xl mx-auto">Tell us what you&apos;re in the mood for, and our AI assistant will suggest the perfect Punjabi feast for you!</p>
                <div className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-2">
                    <input
                        type="text"
                        value={prefs}
                        onChange={(e) => setPrefs(e.target.value)}
                        placeholder="e.g., 'something spicy and vegetarian'"
                        className="w-full p-4 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#FF9F1C]"
                    />
                    <motion.button
                        onClick={getRecommendation}
                        disabled={loading}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-[#FF9F1C] text-black font-bold p-4 rounded-lg text-lg flex-shrink-0"
                    >
                        {loading ? 'Thinking...' : 'Get Recommendation ✨'}
                    </motion.button>
                </div>
                <AnimatePresence>
                    {(loading || recommendation || error) && (
                        <motion.div 
                            initial={{ opacity: 0, height: 0, marginTop: 0 }}
                            animate={{ opacity: 1, height: 'auto', marginTop: '2rem' }}
                            exit={{ opacity: 0, height: 0, marginTop: 0 }}
                            className="mt-8 p-6 bg-[#121212]/50 rounded-lg border border-gray-700 text-left max-w-2xl mx-auto"
                        >
                            {loading && <LoadingSpinner />}
                            {error && <p className="text-red-400">{error}</p>}
                            {recommendation && <p className="whitespace-pre-wrap">{recommendation}</p>}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};

const ParallaxSection = ({ children, bgImage }) => {
    const ref = React.useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });
    const y = useTransform(scrollYProgress, [0, 1], ["-25%", "25%"]);

    return (
        <section ref={ref} className="py-20 bg-black relative overflow-hidden">
            <motion.div className="absolute inset-0 z-0 bg-cover bg-center" style={{ backgroundImage: `url(${bgImage})`, y }} />
            <div className="absolute inset-0 bg-black/70 z-0"></div>
            <div className="container mx-auto px-6 text-center relative z-10">
                {children}
            </div>
        </section>
    );
};

const Testimonials = () => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex(prevIndex => (prevIndex + 1) % testimonials.length);
        }, 5000); // Change testimonial every 5 seconds
        return () => clearInterval(timer);
    }, []);

    return (
        <ParallaxSection bgImage="https://images.pexels.com/photos/326281/pexels-photo-326281.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2">
            <h2 className="text-4xl font-bold text-white mb-10">What Our Customers Say</h2>
            <div className="relative h-48 max-w-3xl mx-auto">
                <AnimatePresence mode="wait">
                    <motion.div 
                        key={index}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0 flex flex-col items-center justify-center bg-[#2E282A]/80 backdrop-blur-sm p-8 rounded-lg text-white"
                    >
                        <p className="text-lg md:text-xl italic mb-6">&quot;{testimonials[index].quote}&quot;</p>
                        <p className="font-bold text-xl text-[#FF9F1C]">- {testimonials[index].name}</p>
                    </motion.div>
                </AnimatePresence>
            </div>
            <div className="flex justify-center mt-6 space-x-2">
                {testimonials.map((_, i) => (
                    <button key={i} onClick={() => setIndex(i)} className={`w-3 h-3 rounded-full transition-colors ${i === index ? 'bg-[#FF9F1C]' : 'bg-gray-500'}`}></button>
                ))}
            </div>
        </ParallaxSection>
    );
};

const InfiniteScroller = ({ children }) => {
    const scrollerRef = React.useRef(null);

    useEffect(() => {
        const scroller = scrollerRef.current;
        if (!scroller) return;
        
        if (scroller.children.length > socialFeedImages.length) return;

        const scrollerContent = Array.from(scroller.children);
        scrollerContent.forEach(item => {
            const duplicatedItem = item.cloneNode(true);
            scroller.appendChild(duplicatedItem);
        });
    }, []);

    return (
        <div className="w-full overflow-hidden" style={{ maskImage: "linear-gradient(to right, transparent, black 20%, black 80%, transparent)" }}>
            <div ref={scrollerRef} className="flex min-w-max animate-infinite-scroll">
                {children}
            </div>
        </div>
    )
};

const SocialFeed = () => (
    <section id="gallery" className="py-20 bg-[#121212]">
        <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold text-white mb-4">Join Our Community</h2>
            <p className="text-gray-400 mb-10">Follow us on social media for the latest updates and delicious sights!</p>
            <InfiniteScroller>
                {socialFeedImages.map((img, i) => (
                    <div key={i} className="w-64 h-64 mx-2 flex-shrink-0">
                         <Image src={img.src} alt={img.alt} width={256} height={256} className="w-full h-full object-cover rounded-lg"/>
                    </div>
                ))}
            </InfiniteScroller>
        </div>
    </section>
);

const ReservationsSection = () => (
    <section id="reservations" className="py-20 bg-[#2E282A]">
        <div className="container mx-auto px-6 text-center text-white">
            <h2 className="text-4xl font-bold mb-4">Book Your Table</h2>
            <p className="text-gray-300 mb-8">For group bookings or special requests, please give us a call.</p>
            <div className="max-w-md mx-auto">
                <form className="space-y-4">
                    <input type="text" placeholder="Your Name" className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#FF9F1C]"/>
                    <input type="text" placeholder="Phone Number" className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#FF9F1C]"/>
                    <div className="grid grid-cols-2 gap-4">
                        <input type="number" placeholder="No. of Guests" className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#FF9F1C]"/>
                        <input type="date" className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#FF9F1C] text-gray-500"/>
                    </div>
                    <motion.button type="submit" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full bg-[#FF9F1C] text-black font-bold p-4 rounded-lg text-lg">
                        Request Booking
                    </motion.button>
                </form>
            </div>
        </div>
    </section>
);

const Contact = () => (
    <section id="contact" className="bg-[#121212] text-white">
        <div className="grid md:grid-cols-2">
            <div className="p-8 md:p-16">
                <h2 className="text-4xl font-bold mb-6">Find Us & Get In Touch</h2>
                <div className="space-y-6 text-lg">
                    <div className="flex items-start gap-4">
                        <IconMapPin className="text-[#FF9F1C] w-8 h-8 flex-shrink-0 mt-1"/>
                        <div>
                            <h3 className="font-bold">Address</h3>
                            <p className="text-gray-400">19 Al Wakalat Street, Industrial Area, Doha, Qatar</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <IconPhone className="text-[#FF9F1C] w-7 h-7 flex-shrink-0 mt-1"/>
                        <div>
                            <h3 className="font-bold">Call Us</h3>
                            <a href="tel:+97430951313" className="text-gray-400 hover:text-[#FF9F1C] transition-colors">+974 3095 1313</a>
                        </div>
                    </div>
                    <div>
                        <h3 className="font-bold mb-2">Operating Hours</h3>
                        <p className="text-gray-400">Saturday - Thursday: 4:00 AM – 12:30 AM</p>
                        <p className="text-gray-400">Friday: 4:00 AM – 2:00 AM</p>
                    </div>
                </div>
            </div>
            <div className="min-h-[400px] md:h-full">
                <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3611.8385202868953!2d51.4411800149098!3d25.20361208392198!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e45d18fc573f027%3A0xc6a1e435882edf6f!2s19%20Al%2dWakalat%20St%2C%20Doha%2C%20Qatar!5e0!3m2!1sen!2sus!4v1686333790123!5m2!1sen!2sus"
                    width="100%" 
                    height="100%" 
                    style={{ border: 0, filter: 'invert(90%) grayscale(80%)' }} 
                    allowFullScreen="" 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Google Map of Punjabi Dhaba Restaurant"
                ></iframe>
            </div>
        </div>
    </section>
);

const Footer = () => (
    <footer className="bg-[#2E282A] py-8 text-center text-gray-400">
        <div className="container mx-auto px-6">
            <div className="flex justify-center items-center mb-4">
                <Image src="https://i.ibb.co/6yVwVjG/dhaba-logo-simple.png" alt="Dhaba Logo" width={48} height={48} className="mr-2"/>
                <div className="text-white font-bold text-xl leading-tight text-left">
                    <span className="block" style={{ fontFamily: "Anek Devanagari, sans-serif" }}>Punjabi</span>
                    <span className="block text-[#FF9F1C]" style={{ fontFamily: "Anek Devanagari, sans-serif" }}>Dhaba</span>
                </div>
            </div>
            <div className="flex justify-center space-x-6 mb-6">
                <a href="#" className="hover:text-white"><IconInstagram className="w-6 h-6"/></a>
                <a href="#" className="hover:text-white"><IconFacebook className="w-6 h-6"/></a>
            </div>
            <p>&copy; {new Date().getFullYear()} Punjabi Dhaba Restaurant. All Rights Reserved.</p>
            <p className="text-xs mt-2">This is a concept website. <a href="#" className="underline">Privacy Policy</a></p>
        </div>
    </footer>
);


// Main App Component
export default function Page() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 2000); // Simulate loading time
        
        return () => {
            clearTimeout(timer);
        };
    }, []);

    return (
        <div className="bg-[#121212]">
            <AnimatePresence>
                {isLoading && <Preloader />}
            </AnimatePresence>
            
            <AnimatePresence>
                {!isLoading && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                        <Header />
                        <main>
                            <Hero />
                            <Story />
                            <Menu />
                            <MealRecommender />
                            <Testimonials />
                            <SocialFeed />
                            <ReservationsSection />
                            <Contact />
                        </main>
                        <Footer />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
