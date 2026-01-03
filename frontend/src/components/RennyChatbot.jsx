import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageCircle, X, Send, Play, Heart, Star, Smile, RefreshCcw, ArrowLeft, ChevronDown, Phone, MapPin, Camera, Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- CHATBOT CONFIGURATION & DATA ---

const BOT_NAME = "Renny";
const BRAND_COLOR = "bg-[#0060AA]"; // Updated to Blue as requested
const BRAND_COLOR_TEXT = "text-[#0060AA]";

const CHAT_FLOW = {
    start: {
        message: "Assalamu Alaikum 👋\nWelcome to Renaissance Preschool 🌸\n\nI’m Renny.\nWho are you chatting as today?",
        options: [
            { label: "👨‍👩‍👧 Parent", next: "parent_menu" },
            { label: "🧒 Student", next: "student_intro" }
        ]
    },
    // --- PARENT FLOW ---
    parent_menu: {
        message: "Welcome 😊\nHow may I assist you today?",
        options: [
            { label: "📝 Admissions", next: "p_admissions" },
            { label: "⏰ School Timings", next: "p_timings" },
            { label: "💰 Fees Enquiry", next: "p_fees" },
            { label: "🏫 About the School", next: "p_about" },
            { label: "🖼️ Gallery & Activities", next: "p_gallery" },
            { label: "📍 Contact & Location", next: "p_contact" },
            { label: "📞 Chat on WhatsApp", action: "whatsapp" },
            { label: "📸 Instagram Page", action: "instagram" }
        ]
    },
    p_admissions: {
        message: "Admissions are open at Renaissance Preschool 🎉\n\nWe offer:\n✨ Age-appropriate learning\n✨ Safe & caring environment\n✨ Activity-based education\n\nPlease fill the admission enquiry form below.",
        options: [
            { label: "📝 Admission Enquiry Form", action: "link", url: "https://docs.google.com/forms/d/e/1FAIpQLSeOiGyFZKqfEcGPlhOpYtekgBjgeLtCh0JZW3_isFUNGSCjkg/viewform?usp=publish-editor" },
            { label: "🔙 Back", next: "parent_menu" }
        ]
    },
    p_timings: {
        message: "🕘 School Timings\nMonday to Friday\n9:00 AM – 1:00 PM",
        options: [
            { label: "🔙 Back", next: "parent_menu" }
        ]
    },
    p_fees: {
        message: "Our fee structure depends on the child’s age group and program.\n\nPlease contact us on WhatsApp for detailed information.",
        options: [
            { label: "📞 Chat on WhatsApp", action: "whatsapp_fee" },
            { label: "🔙 Back", next: "parent_menu" }
        ]
    },
    p_about: {
        message: "Renaissance Preschool was established in 2025 with the belief\n“Learning Through Love and Laughter”.\n\nWe focus on nurturing children through:\n🌱 Early development\n🤍 Moral values\n🎨 Play-based learning",
        options: [
            { label: "🔙 Back", next: "parent_menu" }
        ]
    },
    p_gallery: {
        message: "Our children actively participate in:\n🎨 Art & craft\n🕺 Dance & movement\n📚 Classroom learning\n🎉 Events & celebrations",
        options: [
            { label: "🖼️ Open Gallery Page", action: "navigate", path: "/gallery" },
            { label: "🔙 Back", next: "parent_menu" }
        ]
    },
    p_contact: {
        message: "📍 Address:\nKuwari Compound, 102, Anwar Bubere Hall Rd,\nOpp. Huez Couture, Beside Food Inn Restaurant,\nNizampur, Gokul Nagar,\nBhiwandi, Maharashtra 421308\n\n📞 84838 48486",
        options: [
            { label: "📞 Call Now", action: "link", url: "tel:+918483848486" },
            { label: "🗺️ Open Map", action: "link", url: "https://maps.google.com/?q=Renaissance+Preschool+Bhiwandi" },
            { label: "🔙 Back", next: "parent_menu" }
        ]
    },

    // --- STUDENT FLOW ---
    student_intro: {
        message: "Yay! Hello little star ⭐\nDo you want to play a fun game with me?",
        options: [
            { label: "🎮 Play a Game", next: "game_choice" },
            { label: "🔙 Back", next: "start" }
        ]
    },
    game_choice: {
        message: "Pick a game! 🎲",
        options: [
            { label: "🎨 Color Finder", next: "game_color" },
            { label: "🔢 Count with Renny", next: "game_count" },
            { label: "🔙 Back", next: "student_intro" }
        ]
    },
    // Game 1: Color Finder
    game_color: {
        message: "Can you find the RED color? 🎨",
        options: [
            { label: "❤️", next: "game_color_win" },
            { label: "💙", next: "game_color_lose" },
            { label: "💛", next: "game_color_lose" }
        ]
    },
    game_color_win: {
        message: "Yay 🎉 You are super smart!",
        options: [
            { label: "🔁 Play Again", next: "game_choice" },
            { label: "🔙 Back to Main Menu", next: "start" }
        ]
    },
    game_color_lose: {
        message: "Oops 😄 Let’s try again!",
        options: [
            { label: "🔄 Try Again", next: "game_color" },
            { label: "🔙 Back", next: "game_choice" }
        ]
    },
    // Game 2: Count
    game_count: {
        message: "Let’s count together ⭐\nHow many stars are here? ⭐⭐⭐",
        options: [
            { label: "2", next: "game_count_lose" },
            { label: "3", next: "game_count_win" },
            { label: "4", next: "game_count_lose" }
        ]
    },
    game_count_win: {
        message: "Correct! 🌟 Great job!",
        options: [
            { label: "🔁 Play Again", next: "game_choice" },
            { label: "🔙 Back to Main Menu", next: "start" }
        ]
    },
    game_count_lose: {
        message: "Oops! Count carefully 👀",
        options: [
            { label: "🔄 Try Again", next: "game_count" },
            { label: "🔙 Back", next: "game_choice" }
        ]
    }
};

const RennyChatbot = () => {
    const navigate = useNavigate();
    // State
    const [isVisible, setIsVisible] = useState(false); // 6s delay
    const [isOpen, setIsOpen] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);
    const [messages, setMessages] = useState([]);
    const [currentNode, setCurrentNode] = useState('start');
    const [isTyping, setIsTyping] = useState(false);

    // Refs for auto-scroll
    const messagesEndRef = useRef(null);

    // Initial Delay & Tooltip Logic
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
            setShowTooltip(true);

            // Hide tooltip after 3s
            setTimeout(() => {
                setShowTooltip(false);
            }, 5000);

        }, 3000); // 3 seconds delay (Earlier as requested)

        return () => clearTimeout(timer);
    }, []);

    // Auto-scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isTyping, isOpen]);

    // Initialize chat when opened
    useEffect(() => {
        if (isOpen && messages.length === 0) {
            handleBotResponse('start');
        }
    }, [isOpen]);

    const handleBotResponse = (nodeId) => {
        setIsTyping(true);
        const node = CHAT_FLOW[nodeId];

        // Simulate reading delay
        setTimeout(() => {
            setMessages(prev => [
                ...prev,
                { type: 'bot', text: node.message, options: node.options }
            ]);
            setIsTyping(false);
            setCurrentNode(nodeId);
        }, 600);
    };

    const handleOptionClick = (option) => {
        // Add user selection to chat
        setMessages(prev => [
            ...prev,
            { type: 'user', text: option.label }
        ]);

        // Process Action
        if (option.action === 'whatsapp') {
            window.open("https://wa.me/918483848486?text=Assalamu%20Alaikum%2C%0AI%20would%20like%20to%20enquire%20about%20admission%20and%20fee%20details%20for%20Renaissance%20Preschool.", "_blank");
            setIsTyping(false);
        } else if (option.action === 'whatsapp_fee') {
            window.open("https://wa.me/918483848486?text=Assalamu%20Alaikum%2C%0AI%20would%20like%20to%20enquire%20about%20admission%20and%20fee%20details%20for%20Renaissance%20Preschool.", "_blank");
            setIsTyping(false);
        } else if (option.action === 'instagram') {
            window.open("https://www.instagram.com/renaissancepreschool", "_blank");
            setIsTyping(false);
        } else if (option.action === 'link') {
            window.open(option.url, "_blank");
            setIsTyping(false);
        } else if (option.action === 'navigate') {
            navigate(option.path);
            setIsTyping(false);
        } else if (option.next) {
            handleBotResponse(option.next);
        }
    };

    const resetChat = () => {
        setMessages([]);
        setCurrentNode('start');
        handleBotResponse('start');
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-6 right-6 z-[60] font-sans">

            {/* Tooltip */}
            <AnimatePresence>
                {showTooltip && !isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="absolute bottom-20 right-0 bg-white text-slate-800 px-4 py-2 rounded-xl shadow-xl border border-pink-100 whitespace-nowrap mb-2 origin-bottom-right"
                    >
                        <p className="text-sm font-bold flex items-center gap-2">
                            Hi 👋 I’m Renny!
                        </p>
                        {/* Tri-shape pointer */}
                        <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white rotate-45 border-b border-r border-pink-100"></div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Chat Button (Avatar) */}
            {!isOpen && (
                <motion.button
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsOpen(true)}
                    className={`w-16 h-16 rounded-full ${BRAND_COLOR} shadow-2xl flex items-center justify-center text-white relative group overflow-hidden border-4 border-white`}
                >
                    <Bot size={32} className="animate-wave origin-bottom-right" />

                    {/* Ripple Effect */}
                    <div className="absolute inset-0 rounded-full border-2 border-white opacity-0 group-hover:animate-ping"></div>
                </motion.button>
            )}

            {/* Main Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="bg-white w-[90vw] md:w-[380px] h-[550px] max-h-[80vh] rounded-[2rem] shadow-2xl flex flex-col overflow-hidden border border-gray-100 relative"
                    >
                        {/* Header */}
                        <div className={`${BRAND_COLOR} p-5 flex items-center justify-between text-white shrink-0`}>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-xl shadow-sm">
                                    <Bot size={24} className="text-[#0060AA]" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg leading-none">{BOT_NAME}</h3>
                                    <span className="text-xs opacity-90 font-medium">Assistant • Renaissance</span>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={resetChat} className="p-2 hover:bg-white/20 rounded-full transition-colors" title="Reset Chat">
                                    <RefreshCcw size={18} />
                                </button>
                                <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/20 rounded-full transition-colors">
                                    <ChevronDown size={22} />
                                </button>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 relative scroll-smooth " id="chat-container">
                            {/* Decorative BG */}
                            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #eecda3 2px, transparent 2.5px)', backgroundSize: '30px 30px' }}></div>

                            {messages.map((msg, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex flex-col ${msg.type === 'user' ? 'items-end' : 'items-start'}`}
                                >
                                    {/* Message Bubble */}
                                    <div className={`max-w-[85%] px-5 py-3 rounded-2xl whitespace-pre-line text-sm md:text-[15px] leading-relaxed shadow-sm ${msg.type === 'user'
                                        ? 'bg-slate-800 text-white rounded-br-none'
                                        : 'bg-white text-slate-700 rounded-tl-none border border-gray-100'
                                        }`}>
                                        {msg.text}
                                    </div>

                                    {/* Options (Only show for the latest bot message to clean up UI) */}
                                    {msg.type === 'bot' && idx === messages.length - 1 && !isTyping && (
                                        <div className="mt-4 flex flex-wrap gap-2 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                            {msg.options?.map((opt, i) => (
                                                <button
                                                    key={i}
                                                    onClick={() => handleOptionClick(opt)}
                                                    className={`px-4 py-2 bg-white border border-pink-100 text-sm font-bold ${BRAND_COLOR_TEXT} rounded-full shadow-sm hover:shadow-md hover:scale-105 active:scale-95 transition-all text-left`}
                                                >
                                                    {opt.label}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </motion.div>
                            ))}

                            {/* Typing Indicator */}
                            {isTyping && (
                                <div className="flex items-start">
                                    <div className="bg-white px-4 py-3 rounded-2xl rounded-tl-none border border-gray-100 shadow-sm flex gap-1">
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></div>
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
                                    </div>
                                </div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Footer - Branding (No input needed for this flow) */}
                        <div className="p-2 bg-gray-50 text-center text-[10px] text-gray-400 border-t border-gray-100">
                            Powered by Renaissance Technology
                        </div>

                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`
                @keyframes wave {
                    0% { transform: rotate(0deg); }
                    20% { transform: rotate(14deg); }
                    40% { transform: rotate(-8deg); }
                    60% { transform: rotate(14deg); }
                    80% { transform: rotate(-4deg); }
                    100% { transform: rotate(10deg); }
                }
                .animate-wave {
                    animation: wave 2.5s infinite;
                    transform-origin: 70% 70%;
                }
            `}</style>
        </div>
    );
};

export default RennyChatbot;
