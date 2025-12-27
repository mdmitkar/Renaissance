import React from 'react';
import { NavLink } from 'react-router-dom';
import { MapPin, Phone, Mail, Instagram } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-secondary-black text-white pt-16 pb-4 mt-auto">
            <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-8 mb-8">
                {/* Brand Section */}
                <div className="flex flex-col items-start">
                    <img src="/logo.jpeg" alt="Renaissance Preschool" className="h-[80px] mb-4 bg-white p-1 rounded" />
                    <h3 className="text-xl font-heading text-primary-gold mb-2">Renaissance Preschool</h3>
                    <p className="text-sm opacity-80">Learning Through Love and Laughter</p>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 className="text-primary-gold text-lg font-semibold mb-4">Quick Links</h4>
                    <ul className="space-y-2">
                        <li><NavLink to="/" className="hover:text-primary-gold transition-colors block">Home</NavLink></li>
                        <li><NavLink to="/about" className="hover:text-primary-gold transition-colors block">About Us</NavLink></li>
                        <li><NavLink to="/admission" className="hover:text-primary-gold transition-colors block">Admissions</NavLink></li>
                        <li><NavLink to="/contact" className="hover:text-primary-gold transition-colors block">Contact Us</NavLink></li>
                    </ul>
                </div>

                {/* Contact Section */}
                <div>
                    <h4 className="text-primary-gold text-lg font-semibold mb-4">Contact Us</h4>
                    <div className="flex items-start gap-3 mb-3">
                        <MapPin size={20} className="text-primary-gold mt-1 flex-shrink-0" />
                        <p className="text-sm opacity-90">102, Kuwari Compound, Bubere Hall Road, Nizampur, Bhiwandi</p>
                    </div>
                    <div className="flex items-center gap-3 mb-3">
                        <Phone size={20} className="text-primary-gold flex-shrink-0" />
                        <p className="text-sm opacity-90">8483848486 / 9323956718</p>
                    </div>
                    <div className="flex items-center gap-3 mb-3">
                        <Mail size={20} className="text-primary-gold flex-shrink-0" />
                        <p className="text-sm opacity-90">info.renaissanceschool@gmail.com</p>
                    </div>

                    <div className="flex gap-4 mt-6">
                        <a
                            href="https://www.instagram.com/renaissancepreschool?igsh=MzN5ZDhzbm9pYW16"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-gradient-to-tr hover:from-yellow-400 hover:via-red-500 hover:to-purple-600 transition-all transform hover:-translate-y-1"
                        >
                            <Instagram size={20} />
                        </a>
                        <a
                            href="https://wa.me/918483848486?text=Hello%20Renaissance%20Preschool%2C%0A%0AI%20am%20interested%20in%20admission%20for%20my%20child.%20Kindly%20share%20details%20about%20programs%2C%20fees%2C%20and%20admission%20process.%0A%0AThank%20you."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-[#25D366] transition-all transform hover:-translate-y-1"
                        >
                            <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" className="w-5 h-5 brightness-0 invert" />
                        </a>
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-800 pt-4 text-center text-xs opacity-60">
                <p>&copy; 2025 Renaissance Preschool. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
