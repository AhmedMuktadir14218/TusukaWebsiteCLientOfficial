import React from 'react';
import { motion } from 'framer-motion';
import { LuArmchair, LuLeaf, LuBuilding2, LuFlaskConical, LuShieldCheck, LuHandshake } from 'react-icons/lu'; // Icons to represent the new points

// Define the points data
const points = [
  {
    icon: LuArmchair,
    title: 'Our Market',
    description: 'We analyze market trends and opportunities to position your products effectively and expand your reach globally.',
  },
  {
    icon: LuLeaf, // Changed to a leaf icon for sourcing/sustainability
    title: 'Sourcing',
    description: 'Specializing in ethical and efficient sourcing of raw materials to ensure sustainable and high-quality production.',
  },
  {
    icon: LuHandshake, // Changed to handshake for code of conduct
    title: 'Code of Conduct',
    description: 'Upholding stringent ethical standards and social responsibility across all our operations and partnerships.',
  },
  {
    icon: LuFlaskConical, // Changed to flask for R&D
    title: 'Research & Development',
    description: 'Innovating new processes and products through advanced research to stay ahead in a competitive landscape.',
  },
  {
    icon: LuShieldCheck, // Changed to shield for safety
    title: 'Safety',
    description: 'Prioritizing the safety and well-being of our employees and partners with comprehensive safety protocols.',
  },
  {
    icon: LuBuilding2, // Changed to building for social benefit (community focus)
    title: 'Social Benefit',
    description: 'Committed to contributing positively to the communities where we operate through various social initiatives.',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Stagger animation for children
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

const   CorePointComponent: React.FC = () => {
  return (
    <section className="py-20 bg-[#040270]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Section: Title and Description */}
          <motion.div
            className="lg:col-span-1"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
            <motion.p
              className="text-gray-500 font-medium mb-2"
              variants={itemVariants}
            >
              OUR Core Points
            </motion.p>
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6"
              variants={itemVariants}
            >
              How we <br /> can help you <br /> at Binox
            </motion.h2>
            <motion.p
              className="text-white-600 text-lg mb-8"
              variants={itemVariants}
            >
              We are dedicated to guiding you on your financial journey with expertise.
            </motion.p>
            <motion.a
              href="#"
              className="text-[#040270] hover:underline font-semibold text-lg"
              variants={itemVariants}
            >
              All Core Points
            </motion.a>
          </motion.div>

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
                className="bg-gray-50 p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col items-start"
                variants={itemVariants}
                whileHover={{ y: -5 }} // Small hover animation
              >
                <div className="text-[#040270] mb-4">
                  <point.icon className="h-10 w-10" /> {/* Dynamic icon */}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {point.title}
                </h3>
                <p className="text-gray-700 text-base">
                  {point.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default   CorePointComponent;