import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Life @ Renaissance', path: '/life' },
        { name: 'Gallery', path: '/gallery' },
        { name: 'Contact', path: '/contact' },
    ];

    return (
        <nav className="sticky top-0 z-50 bg-white dark:bg-black shadow-lg dark:shadow-gray-900 transition-colors duration-300 h-[90px] flex items-center">
            {/* Main Container - Full Width */}
            <div className="w-full px-6 md:px-12 flex justify-between items-center h-full">

                {/* Logo - Far Left */}
                <div className="flex-shrink-0">
                    <NavLink to="/">
                        <img
                            src="/logo.jpeg"
                            alt="Renaissance Preschool Logo"
                            className="h-[70px] w-auto object-contain"
                        />
                    </NavLink>
                </div>

                {/* Desktop Menu - Centered & Spaced */}
                <div className="hidden lg:flex items-center justify-between flex-1 ml-12 mr-6">
                    <ul className="flex items-center justify-center flex-1 gap-10 xl:gap-14">
                        {navLinks.map((link, index) => (
                            <li key={index}>
                                <NavLink
                                    to={link.path}
                                    className={({ isActive }) =>
                                        `relative font-body font-semibold text-base xl:text-lg py-2 transition-colors duration-300 whitespace-nowrap
                    ${isActive ? 'text-primary-gold' : 'text-secondary-black dark:text-gray-200 hover:text-primary-gold dark:hover:text-primary-gold'}
                    after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-primary-gold 
                    after:transform after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100
                    ${isActive ? 'after:scale-x-100' : ''}`
                                    }
                                >
                                    {link.name}
                                </NavLink>
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
                <div className={`fixed top-[90px] left-0 w-full h-[calc(100vh-90px)] bg-white dark:bg-black transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:hidden z-40 overflow-y-auto`}>
                    <ul className="flex flex-col items-center justify-start pt-12 h-full gap-8 p-4">
                        {navLinks.map((link, index) => (
                            <li key={index} className="w-full text-center">
                                <NavLink
                                    to={link.path}
                                    className={({ isActive }) =>
                                        `block text-2xl font-body font-semibold py-2
                    ${isActive ? 'text-primary-gold' : 'text-secondary-black dark:text-white'}`
                                    }
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.name}
                                </NavLink>
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
