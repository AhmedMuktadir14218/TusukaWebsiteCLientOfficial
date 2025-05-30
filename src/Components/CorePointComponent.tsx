import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LuArmchair, LuLeaf, LuBuilding2, LuFlaskConical, LuShieldCheck, LuHandshake } from 'react-icons/lu';
import Brandlogo3 from '../assets/homeban3.jpg'; 

// Define the points data
const points = [
  {
    icon: LuArmchair,
    title: 'Our Market',
    description: 'We analyze market trends and opportunities to position your products effectively and expand your reach globally.',
  },
  {
    icon: LuLeaf,
    title: 'Sourcing',
    description: 'Specializing in ethical and efficient sourcing of raw materials to ensure sustainable and high-quality production.',
  },
  {
    icon: LuHandshake,
    title: 'Code of Conduct',
    description: 'Upholding stringent ethical standards and social responsibility across all our operations and partnerships.',
  },
  {
    icon: LuFlaskConical,
    title: 'Research & Development',
    description: 'Innovating new processes and products through advanced research to stay ahead in a competitive landscape.',
  },
  {
    icon: LuShieldCheck,
    title: 'Safety',
    description: 'Prioritizing the safety and well-being of our employees and partners with comprehensive safety protocols.',
  },
  {
    icon: LuBuilding2,
    title: 'Social Benefit',
    description: 'Committed to contributing positively to the communities where we operate through various social initiatives. lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.', 
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 10,
    },
  },
};

const CorePointComponent: React.FC = () => {

    const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const toggleCardDescription = (index: number) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  const truncateDescription = (description: string, maxWords: number = 15) => {
    const words = description.split(' ');
    if (words.length <= maxWords) return description;
    return words.slice(0, maxWords).join(' ') + '...';
  };
  return (
    <section className="relative py-20 bg-[#EEF5FE] overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative z-10">
          {/* Left Section: Title and Description */}
          <motion.div
            className="lg:col-span-1 flex flex-col"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
            {/* Image Container */}
            <motion.div 
              className="mb-8 w-full max-w-md mx-auto lg:mx-0 group"
              variants={itemVariants}
            >              
              <div className="relative overflow-hidden rounded-xl shadow-2xl">
                <img 
                  src={Brandlogo3} 
                  alt="Brand Logo" 
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-[#040270] opacity-20 group-hover:opacity-10 transition-opacity duration-500"></div>
              </div>
            </motion.div>
            
            {/* Section Title and Description */}
            <motion.p
              className="text-gray-700 font-medium mb-4 uppercase tracking-wider"
              variants={itemVariants}
            >
              Our Core Points
            </motion.p>
            
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-black leading-tight mb-6"
              variants={itemVariants}
            >
              How we are <br /> working with local <br /> and global partners
            </motion.h2>
            
            <motion.p
              className="text-gray-600 text-lg mb-8"
              variants={itemVariants}
            >
              Dedicated to excellence, innovation, and sustainable growth in every partnership.
            </motion.p>
            
            <motion.a
              href="#"
              className="inline-flex items-center text-gray-700 font-semibold group"
              variants={itemVariants}
            >
              Explore All Points
              <span className="ml-2 transform transition-transform group-hover:translate-x-2">
                →
              </span>
            </motion.a>
          </motion.div>

          {/* Right Section: Point Cards */}
          {/* <motion.div
            className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
            {points.map((point, index) => (
              <motion.div
                key={index}
                className="bg-white/10 backdrop-blur-sm p-6 rounded-xl 
                border border-white/10 space-y-4 
                transition-all duration-300 
                hover:bg-white/20 hover:border-white/20 
                group"
                variants={itemVariants}
                whileHover={{ 
                  y: -10,
                  scale: 1.05
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="bg-white/20 p-3 rounded-full group-hover:bg-white/30 transition-colors">
                    <point.icon className="h-7 w-7 text-white" />
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-6 w-6 text-white" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-white">
                  {point.title}
                </h3>
                <p className="text-gray-300 text-base">
                  {point.description}
                </p>
              </motion.div>
            ))}
          </motion.div> */}

          {/* Right Section: point Cards */}
           <motion.div
            className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
            {points.map((point, index) => (
              <motion.div
                key={index}
                className="bg-[#ffffff] p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col items-start relative"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <div className="text-[#040270] mb-4">
                  <point.icon className="h-10 w-10" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {point.title}
                </h3>
                <p className="text-gray-700 text-base mb-4">
                  {expandedCard === index 
                    ? point.description 
                    : truncateDescription(point.description)
                  }
                </p>
                
                {/* See More/Less Button */}
                {point.description.split(' ').length > 10 && (
                  <button
                    onClick={() => toggleCardDescription(index)}
                    className="text-[#040270] font-semibold hover:underline"
                  >
                    {expandedCard === index ? 'See Less' : 'See More'}
                  </button>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#040270]/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-full bg-gradient-to-r from-[#040270]/20 to-transparent"></div>
      </div>
    </section>
  );
};

export default CorePointComponent;