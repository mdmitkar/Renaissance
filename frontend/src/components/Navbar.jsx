import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const Navbar = ({ onOpenAdmission }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [desktopDropdownOpen, setDesktopDropdownOpen] = useState(false);
    const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
    const location = useLocation();

    // Pages that have a dark hero section (needs light text even when transparent)
    const isDarkHeroPage = ['/', '/inside-renaissance', '/about'].includes(location.pathname);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => setIsOpen(!isOpen);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        {
            name: 'Inside Renaissance',
            path: '/inside-renaissance',
            // Structure: Groups of links
            dropdownGroups: [
                {
                    title: 'Events',
                    items: [
                        { name: 'Activities', hash: 'activities' },
                        { name: 'Sports', hash: 'sports' },
                        { name: 'PTM', hash: 'ptm' },
                        { name: 'Awards', hash: 'awards' },
                        { name: 'Campus', hash: 'campus' },
                        { name: 'Testimonials', hash: 'testimonials' },
                    ]
                },
                {
                    title: 'Celebrations',
                    items: [
                        { name: "Children's Day", hash: 'childrens_day' },
                        { name: "Independence Day", hash: 'independence_day' },
                        { name: "Islamic Day", hash: 'islamic_day' },
                        { name: "Red Day", hash: 'red_day' },
                    ]
                }
            ]
        },
        { name: "Parents' Praise", path: '/reviews' },
        { name: 'Contact', path: '/contact' },
    ];

    const handleNavClick = () => {
        setIsOpen(false);
        setDesktopDropdownOpen(false);
    };

    return (
        <nav className={`fixed top-0 z-50 w-full transition-all duration-300 h-[90px] flex items-center ${scrolled
            ? 'bg-cream-velvet/90 dark:bg-black/80 backdrop-blur-md shadow-lg'
            : 'bg-transparent shadow-none'
            }`}>
            {/* Main Container - Full Width */}
            <div className="w-full px-6 md:px-12 flex justify-between items-center h-full">

                {/* Logo - Far Left */}
                <div className="flex-shrink-0">
                    <NavLink to="/">
                        <img
                            src="/logo.jpeg"
                            alt="Renaissance Preschool Logo"
                            className="h-[70px] w-auto object-contain rounded-full"
                        />
                    </NavLink>
                </div>

                {/* Desktop Menu - Centered & Spaced */}
                <div className="hidden lg:flex items-center justify-between flex-1 ml-12 mr-6">
                    <ul className="flex items-center justify-center flex-1 gap-10 xl:gap-14">
                        {navLinks.map((link, index) => (
                            <li key={index} className="relative group"
                                onMouseEnter={() => link.dropdownGroups && setDesktopDropdownOpen(true)}
                                onMouseLeave={() => link.dropdownGroups && setDesktopDropdownOpen(false)}
                            >
                                <NavLink
                                    to={link.path}
                                    className={({ isActive }) =>
                                        `relative font-body font-semibold text-base xl:text-lg py-2 transition-colors duration-300 whitespace-nowrap flex items-center gap-1
                    ${isActive
                                            ? 'text-primary-gold'
                                            : `${(scrolled || !isDarkHeroPage) ? 'text-secondary-black dark:text-gentle-sweet' : 'text-gentle-sweet'} hover:text-primary-gold dark:hover:text-primary-gold`
                                        } 
                    after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-primary-gold 
                    after:transform after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100
                    ${isActive ? 'after:scale-x-100' : ''}`
                                    }
                                >
                                    {link.name}
                                    {link.dropdownGroups && (
                                        <ChevronDown size={16} className={`ml-1 transition-transform duration-300 ${desktopDropdownOpen ? 'rotate-180' : ''}`} />
                                    )}
                                </NavLink>

                                {/* Categories Dropdown Menu */}
                                {link.dropdownGroups && (
                                    <div className={`absolute top-full left-1/2 -translate-x-1/2 pt-6 w-[500px] transition-all duration-300 transform origin-top ${desktopDropdownOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'}`}>
                                        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-800 p-6 grid grid-cols-2 gap-8">
                                            {link.dropdownGroups.map((group, gIndex) => (
                                                <div key={gIndex} className="flex flex-col gap-2">
                                                    <h3 className="text-xs font-bold uppercase tracking-widest text-[#BA1054] mb-2 border-b border-gray-100 dark:border-gray-800 pb-2">{group.title}</h3>
                                                    {group.items.map((subItem, subIndex) => (
                                                        <NavLink
                                                            key={subIndex}
                                                            to={`${link.path}#${subItem.hash}`}
                                                            className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-[#BA1054] hover:translate-x-1 transition-all"
                                                            onClick={(e) => {
                                                                handleNavClick();
                                                                // Manually scroll if on same page because React Router might not trigger scroll on hash change only
                                                                if (window.location.pathname === link.path) {
                                                                    const element = document.getElementById(subItem.hash);
                                                                    if (element) element.scrollIntoView({ behavior: 'smooth' });
                                                                }
                                                            }}
                                                        >
                                                            {subItem.name}
                                                        </NavLink>
                                                    ))}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>

                    {/* Right Actions: Admission Button + Theme Toggle */}
                    <div className="flex items-center gap-6">
                        <button
                            onClick={onOpenAdmission}
                            className="bg-primary-gold text-secondary-black font-heading font-bold px-6 py-2 rounded-full hover:bg-yellow-500 transition-all transform hover:scale-105 shadow-md whitespace-nowrap cursor-pointer"
                        >
                            Admission
                        </button>
                        <ThemeToggle />
                    </div>
                </div>

                {/* Mobile Toggle */}
                <div className="lg:hidden flex items-center gap-4">
                    <ThemeToggle />
                    <button onClick={toggleMenu} className="text-secondary-black dark:text-white">
                        {isOpen ? <X size={32} /> : <Menu size={32} />}
                    </button>
                </div>

                {/* Mobile Menu */}
                <div className={`fixed top-[90px] left-0 w-full h-[calc(100vh-90px)] bg-cream-velvet dark:bg-black transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:hidden z-40 overflow-y-auto`}>
                    <ul className="flex flex-col items-center justify-start pt-12 h-full gap-8 p-4">
                        {navLinks.map((link, index) => (
                            <li key={index} className="w-full text-center flex flex-col items-center">
                                {/* Mobile Link Item Container */}
                                <div className="flex items-center justify-center gap-2">
                                    <NavLink
                                        to={link.path}
                                        className={({ isActive }) =>
                                            `text-2xl font-body font-semibold py-2
                    ${isActive ? 'text-primary-gold' : 'text-secondary-black dark:text-white'}`
                                        }
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {link.name}
                                    </NavLink>

                                    {/* Separate Dropdown Trigger for Mobile */}
                                    {link.dropdownGroups && (
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                setMobileDropdownOpen(!mobileDropdownOpen);
                                            }}
                                            className="p-2 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 active:scale-95 transition-all"
                                        >
                                            <ChevronDown size={24} className={`transition-transform duration-300 ${mobileDropdownOpen ? 'rotate-180' : ''}`} />
                                        </button>
                                    )}
                                </div>

                                {link.dropdownGroups && mobileDropdownOpen && (
                                    <div className="mt-4 flex flex-col gap-6 bg-white dark:bg-white/10 w-[95%] max-w-sm rounded-2xl p-6 shadow-xl border border-gray-100 dark:border-white/5 animate-in slide-in-from-top-4 duration-300">
                                        {link.dropdownGroups.map((group, gIndex) => (
                                            <div key={gIndex} className="flex flex-col gap-3 items-center">
                                                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-rose-500 border-b-2 border-rose-100 dark:border-white/10 pb-2 w-full text-center">{group.title}</h3>
                                                <div className="flex flex-col gap-2 w-full">
                                                    {group.items.map((subItem, subIndex) => (
                                                        <NavLink
                                                            key={subIndex}
                                                            to={`${link.path}#${subItem.hash}`}
                                                            className="text-lg font-medium text-slate-600 dark:text-slate-300 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-white/5 py-2 rounded-lg transition-all w-full text-center"
                                                            onClick={(e) => {
                                                                setIsOpen(false);
                                                                if (window.location.pathname === link.path) {
                                                                    const element = document.getElementById(subItem.hash);
                                                                    if (element) element.scrollIntoView({ behavior: 'smooth' });
                                                                }
                                                            }}
                                                        >
                                                            {subItem.name}
                                                        </NavLink>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </li>
                        ))}
                        <li className="w-full text-center mt-4">
                            <button
                                onClick={() => {
                                    setIsOpen(false);
                                    onOpenAdmission();
                                }}
                                className="inline-block bg-primary-gold text-secondary-black font-heading font-bold px-8 py-3 rounded-full text-xl hover:bg-yellow-500 transition-all shadow-md cursor-pointer"
                            >
                                Admission
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
