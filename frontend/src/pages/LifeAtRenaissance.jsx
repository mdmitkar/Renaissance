import React from 'react';
import { Calendar, Palette, Music, Dumbbell, BookOpen } from 'lucide-react';

const LifeAtRenaissance = () => {
    return (
        <div className="bg-bg-cream dark:bg-bg-dark text-text-dark dark:text-text-light transition-colors duration-300">
            {/* Header */}
            <div className="py-20 text-center px-4 bg-white dark:bg-secondary-black">
                <h1 className="text-4xl md:text-5xl font-heading font-bold text-secondary-black dark:text-primary-gold mb-4">Life @ Renaissance</h1>
                <p className="text-xl max-w-2xl mx-auto text-gray-600 dark:text-gray-300">Where learning meets fun, and every day is a new adventure.</p>
            </div>

            {/* Daily Activities Section */}
            <section className="py-16 px-6 max-w-[1200px] mx-auto">
                <h2 className="text-3xl font-heading font-bold text-center mb-12 border-b-2 border-primary-gold inline-block pb-2">Daily Activities</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <ActivityCard
                        icon={<BookOpen size={32} />}
                        title="Interactive Learning"
                        desc="Storytelling, phonics, and concept-based learning."
                    />
                    <ActivityCard
                        icon={<Palette size={32} />}
                        title="Art & Craft"
                        desc="Exploring creativity through colors, clay, and waste material."
                    />
                    <ActivityCard
                        icon={<Music size={32} />}
                        title="Music & Dance"
                        desc="Rhythm, rhymes, and movement for expression."
                    />
                    <ActivityCard
                        icon={<Dumbbell size={32} />}
                        title="Physical Play"
                        desc="Yoga, outdoor games, and sensory play activities."
                    />
                </div>
            </section>

            {/* Events Section */}
            <section className="py-16 px-6 bg-white dark:bg-[#1a1a1a]">
                <div className="max-w-[1200px] mx-auto">
                    <h2 className="text-3xl font-heading font-bold text-center mb-12 border-b-2 border-primary-gold inline-block pb-2">Events & Celebrations</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div className="space-y-6">
                            <EventItem title="Annual Sports Day" desc="A day of energy, teamwork, and medals! Kids showcase their athletic skills." />
                            <EventItem title="Cultural Festivals" desc="Diwali, Eid, Christmas - we celebrate unity in diversity." />
                            <EventItem title="Grandparents Day" desc="A special day to honor the roots of our families." />
                            <EventItem title="Field Trips" desc="Experiential learning outside the classroom." />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {/* Placeholders for reels/images */}
                            <div className="aspect-[4/5] bg-gray-200 dark:bg-gray-800 rounded-lg flex items-center justify-center text-gray-500">
                                Instagram Reel Embed
                            </div>
                            <div className="aspect-[4/5] bg-gray-200 dark:bg-gray-800 rounded-lg flex items-center justify-center text-gray-500">
                                Event Photo
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

const ActivityCard = ({ icon, title, desc }) => (
    <div className="bg-white dark:bg-[#222] p-6 rounded-xl shadow-md hover:shadow-xl transition-all border-l-4 border-primary-gold">
        <div className="text-primary-gold mb-4">{icon}</div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">{desc}</p>
    </div>
);

const EventItem = ({ title, desc }) => (
    <div className="flex gap-4 items-start">
        <div className="bg-primary-gold/20 p-3 rounded-full text-primary-gold">
            <Calendar size={24} />
        </div>
        <div>
            <h3 className="text-xl font-bold dark:text-white">{title}</h3>
            <p className="text-gray-600 dark:text-gray-400">{desc}</p>
        </div>
    </div>
);

export default LifeAtRenaissance;
