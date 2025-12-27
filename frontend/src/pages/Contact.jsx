import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const Contact = () => {
    return (
        <div className="min-h-screen bg-bg-cream dark:bg-bg-dark transition-colors duration-300">

            {/* Header */}
            <div className="bg-white dark:bg-black py-16 text-center shadow-sm">
                <h1 className="text-4xl md:text-5xl font-heading font-bold text-secondary-black dark:text-primary-gold mb-4">Contact Us</h1>
                <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4">
                    We'd love to hear from you! Visit our campus or reach out to us for any queries regarding admissions or programs.
                </p>
            </div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 md:p-12">

                {/* Contact Info Cards */}
                <div className="space-y-6">
                    <ContactCard
                        icon={<MapPin size={32} />}
                        title="Our Campus"
                        content="102, Kuwari Compound, Bubere Hall Road, Beside Food In Restaurant, Nizampur, Bhiwandi, Maharashtra 421302"
                        action="Get Directions"
                        link="https://maps.google.com" // Update with real map link if available specifically
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <ContactCard
                            icon={<Phone size={32} />}
                            title="Call Us"
                            content={
                                <>
                                    <a href="tel:+918483848486" className="hover:text-primary-gold transition-colors">+91 84838 48486</a>
                                    <br />
                                    <a href="tel:+919323956718" className="hover:text-primary-gold transition-colors">+91 93239 56718</a>
                                </>
                            }
                        />
                        <ContactCard
                            icon={<Mail size={32} />}
                            title="Email Us"
                            content={<a href="mailto:info.renaissanceschool@gmail.com" className="hover:text-primary-gold transition-colors">info.renaissanceschool@gmail.com</a>}
                        />
                    </div>

                    <ContactCard
                        icon={<Clock size={32} />}
                        title="Office Hours"
                        content="Monday - Saturday: 9:00 AM - 4:00 PM\nSunday: Closed"
                    />
                </div>

                {/* Map Embed */}
                <div className="bg-white dark:bg-[#222] p-2 rounded-2xl shadow-lg h-[400px] lg:h-auto overflow-hidden">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3766.9632497672!2d73.0560!3d19.2905!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDE3JzI1LjgiTiA3M8KwMDMnMjEuNiJF!5e0!3m2!1sen!2sin!4v1631234567890!5m2!1sen!2sin"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        title="Renaissance Preschool Location"
                        className="rounded-xl grayscale hover:grayscale-0 transition-all duration-500"
                    ></iframe>
                </div>

            </div>
        </div>
    );
};

const ContactCard = ({ icon, title, content, action, link }) => (
    <div className="bg-white dark:bg-[#222] p-8 rounded-2xl shadow-md hover:shadow-lg transition-all border-l-4 border-transparent hover:border-primary-gold group">
        <div className="text-secondary-black dark:text-primary-gold mb-4 group-hover:scale-110 transition-transform origin-left">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-secondary-black dark:text-white mb-2">{title}</h3>
        <p className="text-gray-600 dark:text-gray-400 whitespace-pre-line leading-relaxed mb-4">{content}</p>

        {action && (
            <a href={link} target="_blank" rel="noopener noreferrer" className="text-primary-gold font-semibold hover:underline flex items-center gap-1">
                {action} &rarr;
            </a>
        )}
    </div>
);

export default Contact;
