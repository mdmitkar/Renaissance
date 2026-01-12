import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

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
            dropdown: [
                { name: 'Experiences', hash: 'events-section' },
                { name: 'Celebrations', hash: 'celebrations-section' }
            ]
        },
        { name: "Parents' Praise", path: '/reviews' },
        { name: 'Contact', path: '/contact' },
    ];

    const handleNavClick = (path, hash) => {
        setIsOpen(false);
        setDropdownOpen(false);
        // If we are on the same page and using a hash, standard navigation might skip scrolling
        // But React Router's <NavLink> or <a> with # usually works if the ID exists.
        // We will just return true to let the Link handle it, or we can use custom logic if needed.
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
                                onMouseEnter={() => link.dropdown && setDropdownOpen(true)}
                                onMouseLeave={() => link.dropdown && setDropdownOpen(false)}
                            >
                                <NavLink
                                    to={link.path}
                                    className={({ isActive }) =>
                                        `relative font-body font-semibold text-base xl:text-lg py-2 transition-colors duration-300 whitespace-nowrap flex items-center gap-1
                    ${isActive ? 'text-primary-gold' : `${scrolled ? 'text-secondary-black dark:text-gentle-sweet' : 'text-gentle-sweet'} hover:text-primary-gold dark:hover:text-primary-gold`} 
                    after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-primary-gold 
                    after:transform after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100
                    ${isActive ? 'after:scale-x-100' : ''}`
                                    }
                                >
                                    {link.name}
                                </NavLink>

                                {/* Dropdown Menu */}
                                {link.dropdown && (
                                    <div className={`absolute top-full left-1/2 -translate-x-1/2 pt-4 w-48 transition-all duration-300 transform origin-top ${dropdownOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'}`}>
                                        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-800">
                                            {link.dropdown.map((subItem, subIndex) => (
                                                <a
                                                    key={subIndex}
                                                    href={`${link.path}#${subItem.hash}`}
                                                    className="block px-6 py-3 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-rose-50 dark:hover:bg-white/5 hover:text-rose-500 transition-colors"
                                                    onClick={() => handleNavClick()}
                                                >
                                                    {subItem.name}
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>

                    {/* Right Actions: Admission Button + Theme Toggle */}
                    <div className="flex items-center gap-6">
                        <NavLink
                            to="/admission"
                            className="bg-primary-gold text-secondary-black font-heading font-bold px-6 py-2 rounded-full hover:bg-yellow-500 transition-all transform hover:scale-105 shadow-md whitespace-nowrap"
                        >
                            Admission
                        </NavLink>
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
                                <NavLink
                                    to={link.path}
                                    className={({ isActive }) =>
                                        `block text-2xl font-body font-semibold py-2
                    ${isActive ? 'text-primary-gold' : 'text-secondary-black dark:text-white'}`
                                    }
                                    onClick={() => !link.dropdown && setIsOpen(false)}
                                >
                                    {link.name}
                                </NavLink>
                                {link.dropdown && (
                                    <div className="mt-2 flex flex-col gap-3 bg-black/5 dark:bg-white/5 w-full max-w-xs rounded-xl p-4">
                                        {link.dropdown.map((subItem, subIndex) => (
                                            <a
                                                key={subIndex}
                                                href={`${link.path}#${subItem.hash}`}
                                                className="text-lg font-medium text-gray-600 dark:text-gray-300"
                                                onClick={() => setIsOpen(false)}
                                            >
                                                {subItem.name}
                                            </a>
                                        ))}
                                    </div>
                                )}
                            </li>
                        ))}
                        <li className="w-full text-center mt-4">
                            <NavLink
                                to="/admission"
                                className="inline-block bg-primary-gold text-secondary-black font-heading font-bold px-8 py-3 rounded-full text-xl hover:bg-yellow-500 transition-all shadow-md"
                                onClick={() => setIsOpen(false)}
                            >
                                Admission
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
