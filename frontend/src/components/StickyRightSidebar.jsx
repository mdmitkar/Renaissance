import React from 'react';
import { MessageCircle, FileText, Phone, MapPin } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const StickyRightSidebar = ({ onOpenAdmission }) => {
    return (
        <div className="fixed right-0 top-1/2 transform -translate-y-1/2 z-40 hidden md:flex flex-col gap-2">
            <SidebarItem
                icon={<FileText size={20} />}
                label="Admissions"
                color="bg-primary-gold"
                textColor="text-secondary-black"
                onClick={onOpenAdmission}
            />
            <a
                href="https://wa.me/918483848486"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-end"
            >
                <SidebarItem
                    icon={<MessageCircle size={20} />}
                    label="WhatsApp"
                    color="bg-[#25D366]"
                    textColor="text-white"
                />
            </a>

            <NavLink to="/contact" className="flex items-center justify-end">
                <SidebarItem
                    icon={<MapPin size={20} />}
                    label="Visit Us"
                    color="bg-secondary-black"
                    textColor="text-primary-gold"
                />
            </NavLink>

            <a href="tel:+918483848486" className="flex items-center justify-end">
                <SidebarItem
                    icon={<Phone size={20} />}
                    label="Call Now"
                    color="bg-[#007bff]"
                    textColor="text-white"
                />
            </a>
        </div>
    );
};

const SidebarItem = ({ icon, label, color, textColor, onClick }) => (
    <div
        onClick={onClick}
        className={`${color} ${textColor} p-3 rounded-l-xl shadow-lg cursor-pointer transition-all duration-300 transform translate-x-[70px] hover:translate-x-0 w-[120px] flex items-center gap-3 group`}
    >
        <div className="flex-shrink-0 relative z-10 w-6 flex justify-center">
            {icon}
        </div>
        <span className="font-bold text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            {label}
        </span>
    </div>
);

export default StickyRightSidebar;
