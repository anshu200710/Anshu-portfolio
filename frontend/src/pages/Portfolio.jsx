import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
// Assuming 'assets' and 'Contact' are defined and imported correctly
import { assets } from '../assets/assets';
import Contact from './Contact';
import '../index.css'; // Assuming you will add the marquee CSS here

// NOTE: Please replace this placeholder with your actual image path: assets.avtar
const PLACEHOLDER_IMAGE = "https://placehold.co/450x600/18181b/ffffff?text=3D+Portrait";


// --- FRAMER MOTION VARIANTS ---
const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut",
            staggerChildren: 0.2,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const ServiceCardVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 50 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};
// --------------------------------


// Helper Component for the Gradient Hover Card
const ServiceCard = ({ icon, title, description }) => {
    const [visible, setVisible] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const divRef = useRef(null);

    const handleMouseMove = (e) => {
        if (!divRef.current) return;
        const bounds = divRef.current.getBoundingClientRect();
        // Calculate mouse position relative to the top-left of the div
        setPosition({ x: e.clientX - bounds.left, y: e.clientY - bounds.top });
    };


    return (
        <motion.div
            variants={ServiceCardVariants}
            ref={divRef} onMouseMove={handleMouseMove} onMouseEnter={() => setVisible(true)} onMouseLeave={() => setVisible(false)}
            className="relative w-full max-w-sm h-full min-h-80 rounded-xl p-px bg-gradient-to-br from-indigo-500/50 via-gray-900 to-purple-500/50 backdrop-blur-md text-gray-800 overflow-hidden shadow-xl cursor-pointer transition-all duration-300 hover:scale-[1.02]"
        >
            {/* 2. Gradient Glow Effect */}
            <div className={`pointer-events-none blur-3xl rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-300 size-60 absolute z-0 transition-opacity duration-500 ${visible ? 'opacity-100' : 'opacity-0'}`}
                style={{ top: position.y - 120, left: position.x - 120, }}
            />

            {/* 3. Card Content (Inner Background adjusted for better contrast) */}
            <div className="relative z-10 bg-gray-800/80 p-8 h-full w-full rounded-[11px] flex flex-col items-start text-left font-['Inter']">
                {/* Icon Placeholder - Adjusted color to strong indigo */}
                <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-indigo-600 text-white shadow-lg shadow-indigo-600/50 mb-6">
                    {icon}
                </div>
                {/* Title Styling is cohesive with the main header */}
                <h2 className="text-xl font-bold uppercase tracking-wider text-gray-200 mb-3">{title}</h2>
                <p className="text-sm text-slate-400">
                    {description}
                </p>
            </div>
        </motion.div>
    );
}


// Updated Project Card component for the "OUR PROJECTS" section
const ProjectCard = ({ name, img, alt, link }) => (
    <motion.div
        variants={itemVariants}
        className="relative flex items-center justify-center text-sm text-white/80 rounded-xl shadow-lg max-w-xs mx-auto overflow-hidden group"
    >
        <img
            className="rounded-xl object-cover w-full h-60 transition duration-500 group-hover:scale-105"
            src={img}
            alt={alt}
        />
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition duration-300 flex items-end justify-center p-4">
            <div className="flex flex-col items-center justify-center backdrop-blur-sm w-full rounded-xl bg-white/10 border border-white/20 py-3 px-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                <p className="text-center font-bold text-lg mb-2">{name}</p>
                <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-purple-600/80 text-white rounded-full px-6 py-1.5 text-xs font-semibold uppercase hover:bg-purple-700 transition"
                >
                    Visit Site
                </a>
            </div>
        </div>
    </motion.div>
);


// Testimonial Card Component
const CreateCard = ({ card }) => (
    <motion.div variants={itemVariants} className="p-4 rounded-xl text-white mx-4 bg-gray-800 shadow-xl hover:shadow-2xl transition-all duration-200 w-72 shrink-0 border border-gray-700">
        <div className="flex gap-3 items-center">
            <img className="size-12 rounded-full object-cover" src={card.image} alt="User" />
            <div className="flex flex-col">
                <div className="flex items-center gap-1">
                    <p className='font-semibold'>{card.name}</p>
                    <svg className="mt-0.5" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M4.555.72a4 4 0 0 1-.297.24c-.179.12-.38.202-.59.244a4 4 0 0 1-.38.041c-.48.039-.721.058-.922.129a1.63 1.63 0 0 0-.992.992c-.071.2-.09.441-.129.922a4 4 0 0 1-.041.38 1.6 1.6 0 0 1-.245.59 3 3 0 0 1-.239.297c-.313.368-.47.551-.56.743-.213.444-.213.96 0 1.404.09.192.247.375.56.743.125.146.187.219.24.297.12.179.202.38.244.59.018.093.026.189.041.38.039.48.058.721.129.922.163.464.528.829.992.992.2.071.441.09.922.129.191.015.287.023.38.041.21.042.125.411.245-.59.078-.052.114-.151.239-.297.313-.368.47-.551.56-.743.213-.444.213-.96 0-1.404-.09-.192-.247-.375-.56-.743a4 4 0 0 1-.24-.297 1.6 1.6 0 0 1-.244-.59 3 3 0 0 1-.041-.38c-.039-.48-.058-.721-.129-.922a1.63 1.63 0 0 0-.992-.992c-.2-.071-.441-.09-.922-.129a4 4 0 0 1-.38-.041 1.6 1.6 0 0 1-.59-.245A3 3 0 0 1 7.445.72C7.077.407 6.894.25 6.702.16a1.63 1.63 0 0 0-1.404 0c-.192.09-.375.247-.743.56m4.07 3.998a.488.488 0 0 0-.691-.69l-2.91 2.91-.958-.957a.488.488 0 0 0-.69.69l1.302 1.302c.19.191.5.191.69 0z" fill="#2196F3" />
                    </svg>
                </div>
                <span className="text-xs text-slate-400">{card.handle}</span>
            </div>
        </div>
        <p className="text-sm py-4 text-slate-300">
            {/* Using a consistent, impactful quote */}
            I've never worked with a developer who provides such lightning-fast, production-ready components. A true master of modern frontend.
        </p>
        <div className="flex items-center justify-between text-slate-500 text-xs">
            <div className="flex items-center gap-1">
                <span>Posted on</span>
                <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="hover:text-sky-500">
                    <svg width="11" height="10" viewBox="0 0 11 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="m.027 0 4.247 5.516L0 10h.962l3.742-3.926L7.727 10H11L6.514 4.174 10.492 0H9.53L6.084 3.616 3.3 0zM1.44.688h1.504l6.64 8.624H8.082z" fill="currentColor" />
                    </svg>
                </a>
            </div>
            <p>{card.date}</p>
        </div>
    </motion.div>
);


const Portfolio = () => {
    // FAQ Accordion State
    const [openIndex, setOpenIndex] = useState(null)

    // Hero Parallax Effect State and Ref
    const heroRef = useRef(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    // --- Content from anshu-six.vercel.app ---
    const faqsData = [
        {
            question: 'What is your primary tech stack?',
            answer: 'I specialize in the MERN stack (MongoDB, Express, React, Node.js) with a strong focus on React, Next.js, and modern styling frameworks like Tailwind CSS and Styled Components.'
        },
        {
            question: 'Can you work with an existing codebase?',
            answer: 'Absolutely. I can quickly integrate into existing projects for feature development, performance optimization, or bug fixing, maintaining code quality and adhering to best practices.'
        },
        {
            question: 'How do you ensure responsiveness?',
            answer: 'Responsiveness is a core part of my development process, using mobile-first design, fluid layouts, and utility-first frameworks like Tailwind CSS to ensure a flawless experience on all devices.'
        },
        {
            question: 'What is your design philosophy?',
            answer: 'My design philosophy centers on clean, intuitive, and performant user interfaces. I believe in maximizing user experience by balancing aesthetics with functionality and speed.'
        },
        {
            question: 'Do you offer ongoing maintenance?',
            answer: 'Yes, I provide post-launch support and maintenance packages, including performance monitoring, dependency updates, and minor feature adjustments.'
        }
    ];

    const companyLogos = ["slack", "framer", "netflix", "google", "linkedin", "instagram", "facebook"];

    // Service Data for the three cards (keeping original for consistency)
    const services = [
        {
            title: "Web Development",
            description: "Building fast, responsive, and scalable frontend applications using React, Next.js, and Tailwind CSS.",
            icon: <svg className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
        },
        {
            title: "UI/UX Design",
            description: "Creating intuitive and beautiful user interfaces that maximize engagement and user experience.",
            icon: <svg className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1v-3.25m-7.25 0h14.5a.75.75 0 00.75-.75V8.5a.75.75 0 00-.75-.75H3.75a.75.75 0 00-.75.75v7.5a.75.75 0 00.75.75z"></path></svg>
        },
        {
            title: "Performance Audit",
            description: "Optimizing existing applications for speed, Core Web Vitals, and search engine optimization (SEO).",
            icon: <svg className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
        },
    ];

    const cardsData = [
        {
            image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200',
            name: 'Briar Martin',
            handle: '@neilstellar',
            date: 'April 20, 2025'
        },
        {
            image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200',
            name: 'Avery Johnson',
            handle: '@averywrites',
            date: 'May 10, 2025'
        },
        {
            image: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&auto=format&fit=crop&q=60',
            name: 'Jordan Lee',
            handle: '@jordantalks',
            date: 'June 5, 2025'
        },
        {
            image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=60',
            name: 'Alex Smith',
            handle: '@alexdev',
            date: 'July 15, 2025'
        },
    ];

    const projects = [
        {
            name: "Mind Mate (AI Therapy Platform)",
            img: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=600&auto=format&fit=crop",
            alt: "Mind Mate platform screenshot",
            link: "https://mind-mate-ai.vercel.app/",
        },
        {
            name: "Realtime Chat App (MERN)",
            img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=600&auto=format&fit=crop",
            alt: "Realtime chat app screenshot",
            link: "https://realtime-mern-chat.vercel.app/",
        },
        {
            name: "Ecommerce Admin Dashboard",
            img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=600&auto=format&fit=crop",
            alt: "Ecommerce dashboard screenshot",
            link: "https://ecommerce-admin-dashboard-nu.vercel.app/",
        },
        {
            name: "Full Stack Blogging Platform",
            img: "https://images.unsplash.com/photo-1557804506-669b3292454a?q=80&w=600&auto=format&fit=crop",
            alt: "Blogging platform screenshot",
            link: "https://mern-blogging-platform-omega.vercel.app/",
        },
        {
            name: "Stripe E-commerce Storefront",
            img: "https://images.unsplash.com/photo-1542831371-29b139317070?q=80&w=600&auto=format&fit=crop",
            alt: "Stripe store screenshot",
            link: "https://stripe-ecommerce-store.vercel.app/",
        },
        {
            name: "Portfolio V1",
            img: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=600&auto=format&fit=crop",
            alt: "Old Portfolio screenshot",
            link: "https://anshu-v1.netlify.app/",
        },
    ];

    // --- Effects ---
    useEffect(() => {
        const handleMouseMove = (event) => {
            if (heroRef.current) {
                const rect = heroRef.current.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                // Reduced sensitivity for a smoother effect
                const offsetX = (event.clientX - centerX) / 80;
                const offsetY = (event.clientY - centerY) / 80;
                setMousePosition({ x: offsetX, y: offsetY });
            }
        };

        document.addEventListener('mousemove', handleMouseMove);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    // Parallax effect style for the image
    const parallaxStyle = {
        transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px) rotateX(${mousePosition.y * 0.1}deg) rotateY(${mousePosition.x * 0.1}deg) scale(1.02)`,
        transition: 'transform 0.1s ease-out',
        transformStyle: 'preserve-3d',
    };

    return (
        <div className="bg-white"> {/* Wrapper for smooth page background */}
            {/* // --------------HEADER (Hero Section)--------------- */}
            <div
                ref={heroRef}
                className=" min-h-[80vh] md:min-h-[95vh] bg-black text-white font-['Inter'] flex flex-col pt-2 md:pt-0"
            >
                {/* Navigation Menu */}
                <motion.header
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="flex justify-center md:justify-end p-6 md:px-16 border-b border-gray-800/50"
                >
                    <nav className="flex space-x-6 sm:space-x-12 text-sm uppercase tracking-widest font-medium">
                        {['about', 'customers', 'projects', 'contact'].map((item, index) => (
                            <motion.a
                                key={item}
                                href={`#${item}`}
                                className="hover:text-pink-400 transition duration-300"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.1 * index }}
                            >
                                {item.toUpperCase()}
                            </motion.a>
                        ))}
                    </nav>
                </motion.header>

                {/* Main Hero Section */}
                <main className="flex flex-col items-center justify-start flex-grow p-8 md:p-16 relative overflow-hidden">

                    {/* 1. Giant Background Text (Z-index 10) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="z-10 w-full text-center relative mt-16 md:mt-0"
                    >
                        <h1 className="text-6xl sm:text-7xl lg:text-[14rem] font-extrabold leading-none opacity-50 tracking-tight">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-500">
                                HI, I'M ANSHU
                            </span>
                        </h1>
                    </motion.div>

                    {/* 2. Overlapping Image (Z-index 30) - Sticks to the bottom */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-30 perspective-[1000px]">
                        <motion.div
                            initial={{ y: 100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.7, delay: 0.8, ease: "easeOut" }}
                            className="relative w-[400px] h-[400px] sm:w-96 sm:h-[500px] lg:w-[500px] lg:h-[600px] rounded-2xl overflow-hidden"
                        >
                            <img
                                src={assets.avtar || PLACEHOLDER_IMAGE}
                                alt="Anshu's Portfolio Avatar"
                                className="absolute inset-0 w-full h-full object-cover"
                                style={parallaxStyle}
                            />

                           
                        </motion.div>
                    </div>

                    {/* 3. Foreground Text and Button Container (Z-index 40) */}
                    <div className="z-40 absolute w-full h-full max-w-7xl">

                        {/* Left Foreground Text (Subtitle/Role) */}
                        <motion.div
                            initial={{ x: -100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.6, delay: 1 }}
                            className="absolute left-8 top-1/2 mt-8 md:left-16 lg:left-32 transform -translate-y-1/2 w-72 max-w-[40%] text-white"
                        >
                            <p className="text-sm sm:text-base lg:text-xl font-medium tracking-wider mb-2 leading-relaxed">
                                A FRONTEND DEVELOPER PASSIONATE
                            </p>
                            <p className="text-sm sm:text-base lg:text-xl font-medium tracking-wider leading-relaxed">
                                ABOUT CRAFTING BOLD AND
                            </p>
                            <p className="text-sm sm:text-base lg:text-xl font-medium tracking-wider leading-relaxed">
                                MEMORABLE PROJECTS.
                                <span role="img" aria-label="emoji" className="ml-1">🤩</span>
                            </p>
                        </motion.div>

                        {/* Right Foreground Button (Contact Me) */}
                        <motion.div
                            initial={{ x: 100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.6, delay: 1.2 }}
                            className="absolute right-8 top-1/2 mt-16 md:right-16 lg:right-32 transform -translate-y-1/2"
                        >
                            <a href="#contact">
                                <button className="px-10 py-5 rounded-full font-bold text-base uppercase tracking-widest transition duration-300
                                            shadow-lg shadow-pink-600/40 bg-gradient-to-r from-purple-700 to-pink-500 hover:from-purple-600 hover:to-pink-400 hover:scale-105 active:scale-95 min-w-[160px]">
                                    CONTACT ME
                                </button>
                            </a>
                        </motion.div>
                    </div>
                </main>
            </div>

            {/* // --------------Company work start (Marquee)--------------- */}
            <div className="bg-white">
                <div className="overflow-hidden py-10 w-full relative max-w-5xl mx-auto select-none">
                    <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent" />
                    <div className="marquee-inner flex will-change-transform min-w-[200%]">
                        <div className="flex animate-marquee">
                            {[...companyLogos, ...companyLogos].map((company, index) => (
                                <img key={index} src={`https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/companyLogo/${company}.svg`}
                                    alt={company} className="w-full h-full object-cover mx-6 opacity-60 hover:opacity-100 transition duration-300" draggable={false} />
                            ))}
                        </div>
                    </div>
                    <div className="absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent" />
                </div>
            </div>
            {/* // --------------Company work End--------------- */}


            {/* // --------------ABOUT START --------------- */}
            <motion.section
                id="about"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="py-20 flex flex-col md:flex-row items-center justify-center gap-10 max-md:px-4 bg-white text-slate-600"
            >
                <motion.div
                    variants={itemVariants}
                    className="relative shadow-2xl shadow-indigo-600/40 rounded-2xl overflow-hidden shrink-0"
                >
                    <img className="max-w-md w-full object-cover rounded-2xl"
                        src="https://images.unsplash.com/photo-1531497865144-0464ef8fb9a9?q=80&w=451&h=451&auto=format&fit=crop"
                        alt="A developer at work" />
                    {/* Floating Info Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="flex items-center gap-1 max-w-72 absolute bottom-8 left-8 bg-white p-4 rounded-xl shadow-xl"
                    >
                        <div className="flex -space-x-4 shrink-0">
                            <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200" alt="team member"
                                className="size-9 rounded-full border-[3px] border-white hover:-translate-y-1 transition z-1" />
                            <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200" alt="team member"
                                className="size-9 rounded-full border-[3px] border-white hover:-translate-y-1 transition z-[2]" />
                            <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop"
                                alt="team member"
                                className="size-9 rounded-full border-[3px] border-white hover:-translate-y-1 transition z-[3]" />
                            <div
                                className="flex items-center justify-center text-xs text-white size-9 rounded-full border-[3px] border-white bg-indigo-600 hover:-translate-y-1 transition z-[4]">
                                50+
                            </div>
                        </div>
                        <p className="text-sm font-medium text-slate-800">Projects completed</p>
                    </motion.div>
                </motion.div>

                <motion.div
                    variants={itemVariants}
                    className="text-sm text-slate-600 max-w-lg p-4 md:p-0"
                >
                    <h1 className="text-xl uppercase font-semibold text-slate-700">What I do?</h1>
                    <div className="w-24 h-[3px] rounded-full bg-gradient-to-r from-indigo-600 to-[#DDD9FF]"></div>
                    <p className="mt-8">
                        I am a **Frontend Developer** specializing in crafting high-performance, aesthetically pleasing, and scalable web applications. My focus is on delivering exceptional **User Experiences (UX)** and **lightning-fast performance**.
                    </p>
                    <p className="mt-4">
                        My expertise lies in the modern JavaScript ecosystem, primarily **React/Next.js** for robust application architecture and **Tailwind CSS** for rapid, utility-first styling. I bridge the gap between design and development by implementing pixel-perfect UIs.
                    </p>
                    <p className="mt-4">
                        Whether it’s a dynamic **SaaS dashboard**, a complex **E-commerce storefront**, or a modern **corporate website**, I build the future of the web, ensuring every project is responsive, accessible, and optimized for Core Web Vitals.
                    </p>
                    <a href="#projects">
                        <button className="flex items-center gap-2 mt-8 hover:-translate-y-0.5 transition bg-gradient-to-r from-indigo-600 to-purple-500 py-3 px-8 rounded-full text-white shadow-lg shadow-indigo-600/30">
                            <span>View Projects</span>
                            <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M12.53 6.53a.75.75 0 0 0 0-1.06L7.757.697a.75.75 0 1 0-1.06 1.06L10.939 6l-4.242 4.243a.75.75 0 0 0 1.06 1.06zM0 6v.75h12v-1.5H0z"
                                    fill="#fff" />
                            </svg>
                        </button>
                    </a>
                </motion.div>
            </motion.section>
            {/* // --------------ABOUT END --------------- */}


            {/* // --------------SERVICES START --------------- */}
            <motion.section
                id="services"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="py-20 bg-black/90 text-white font-['Inter']"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center ">
                    <motion.div
                        variants={itemVariants}
                        className="text-center mb-16"
                    >
                        {/* Title Styling is cohesive with the main header */}
                        <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl uppercase leading-tight">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-500">
                                My Core Services
                            </span>
                        </h2>
                        <p className="mt-4 text-lg sm:text-xl font-medium text-slate-400 tracking-wide">
                            Delivering modern and high-performance frontend solutions.
                        </p>
                    </motion.div>

                    {/* Service Cards Grid */}
                    <motion.div
                        variants={containerVariants}
                        className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center justify-center p-4 md:p-0"
                    >
                        {services.map((service, index) => (
                            <ServiceCard
                                key={index}
                                icon={service.icon}
                                title={service.title}
                                description={service.description}
                            />
                        ))}
                    </motion.div>
                </div>
            </motion.section>
            {/* // --------------SERVICES END --------------- */}



            {/* // -------------- Projects START --------------- */}
            <motion.section
                id="projects"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="max-w-7xl mx-auto px-6 py-20 bg-white text-gray-900"
            >
                {/* Heading */}
                <motion.div
                    variants={itemVariants}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl uppercase leading-tight">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-500">
                            RECENT PROJECTS
                        </span>
                    </h2>
                    <p className="mt-4 text-lg sm:text-xl font-medium text-slate-600 tracking-wide">
                        Showcasing robust, full-stack applications built with modern tools.
                    </p>
                </motion.div>

                {/* Projects Grid */}
                <motion.div
                    variants={containerVariants}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
                >
                    {projects.map((project) => (
                        <ProjectCard
                            key={project.name}
                            name={project.name}
                            img={project.img}
                            alt={project.alt}
                            link={project.link}
                        />
                    ))}
                </motion.div>
            </motion.section>
            {/* // -------------- Projects End --------------- */}



            {/* // --------------TESTIMONIALS START --------------- */}
            <div className="pt-20 marquee-row w-full mx-auto max-w-full overflow-hidden relative bg-gray-900 text-white">
                <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-gray-900 to-transparent"></div>

                <motion.div
                    variants={itemVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl uppercase leading-tight">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-300 to-gray-500">
                            CLIENT TESTIMONIALS
                        </span>
                    </h2>
                    <p className="mt-4 text-lg sm:text-xl font-medium text-gray-300 tracking-wide">
                        Hear from the businesses I've helped succeed.
                    </p>
                </motion.div>

                <div className="marquee-inner flex transform-gpu min-w-[200%] pt-10 pb-5">
                    <motion.div
                        initial={{ x: 0 }}
                        animate={{ x: '-100%' }}
                        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                        className="flex flex-nowrap"
                    >
                        {[...cardsData, ...cardsData].map((card, index) => (
                            <CreateCard key={index} card={card} />
                        ))}
                    </motion.div>
                </div>

                <div className="marquee-row w-full mx-auto max-w-5xl overflow-hidden relative bg-gray-900 text-white">
                    <div className="marquee-inner marquee-reverse flex transform-gpu min-w-[200%] pt-10 pb-5 text-white">
                        <motion.div
                            initial={{ x: '-100%' }}
                            animate={{ x: '0%' }}
                            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                            className="flex flex-nowrap"
                        >
                            {[...cardsData, ...cardsData].map((card, index) => (
                                <CreateCard key={index} card={card} />
                            ))}
                        </motion.div>
                    </div>
                </div>

                <div className="absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-gradient-to-l from-gray-900 to-transparent"></div>
            </div>
            {/* // --------------TESTIMONIALS END --------------- */}



            {/* // --------------FAQ start --------------- */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className='py-20 flex flex-col items-center text-center text-slate-800 px-3'
            >
                <motion.p variants={itemVariants} className='text-base font-medium text-slate-600'>FAQ</motion.p>
                <motion.h1 variants={itemVariants} className='text-3xl md:text-4xl font-semibold mt-2'>Frequently Asked Questions</motion.h1>
                <motion.p variants={itemVariants} className='text-sm text-slate-500 mt-4 max-w-sm'>
                    Proactively answering FAQs boosts user confidence and cuts down on support tickets.
                </motion.p>
                <div className='max-w-xl w-full mt-6 flex flex-col gap-4 items-start text-left'>
                    {faqsData.map((faq, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className='flex flex-col items-start w-full'
                        >
                            <div className='flex items-center justify-between w-full cursor-pointer bg-slate-50 border border-slate-200 p-4 rounded-xl shadow-md hover:shadow-lg transition' onClick={() => setOpenIndex(openIndex === index ? null : index)}>
                                <h2 className='text-sm font-semibold text-slate-700'>{faq.question}</h2>
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${openIndex === index ? "rotate-180" : ""} transition-all duration-500 ease-in-out shrink-0`}>
                                    <path d="m4.5 7.2 3.793 3.793a1 1 0 0 0 1.414 0L13.5 7.2" stroke="#1D293D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <p className={`text-sm text-slate-500 px-4 transition-all duration-500 ease-in-out overflow-hidden ${openIndex === index ? "opacity-100 max-h-[300px] translate-y-0 pt-4" : "opacity-0 max-h-0 -translate-y-2"}`} >
                                {faq.answer}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
            {/* // --------------FAQ END--------------- */}


            <div className="py-10" id="contact">
                <Contact />
            </div>
        </div>
    );
};

export default Portfolio;