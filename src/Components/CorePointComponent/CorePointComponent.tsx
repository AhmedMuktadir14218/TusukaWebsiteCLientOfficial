// CorePointComponent.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LuArmchair, LuLeaf, LuBuilding2, LuFlaskConical, LuShieldCheck, LuHandshake } from 'react-icons/lu';
import Brandlogo3 from '../../assets/homeban2.jpg';
import plantsData from '../../../public/CoreComponent.json';
import {
  MarketModal,
  SourcingModal,
  CodeOfConductModal,
  ResearchDevelopmentModal,
  SafetyModal,
  SocialBenefitModal
} from './CoreComponentModal';

const points = [
  {
    icon: LuArmchair,
    title: 'Our Market',
    description: 'We analyze market trends and opportunities...',
    modal: MarketModal,
    data: plantsData.ourMarket
  },
  {
    icon: LuLeaf,
    title: 'Sourcing',
    description: 'Specializing in ethical and efficient sourcing of raw materials to ensure sustainable and high-quality production.',
    modal: SourcingModal,
    data: plantsData.sourcing
  },
  {
    icon: LuHandshake,
    title: 'Code of Conduct',
    description: 'Upholding stringent ethical standards and social responsibility across all our operations and partnerships.',
    modal: CodeOfConductModal,
    data: plantsData.codeOfConduct
  },
  {
    icon: LuFlaskConical,
    title: 'Research & Development',
    description: 'Innovating new processes and products through advanced research to stay ahead in a competitive landscape.',
    modal: ResearchDevelopmentModal,
    data: plantsData.researchAndDevelopment
  },
  {
    icon: LuShieldCheck,
    title: 'Safety',
    description: 'Prioritizing the safety and well-being of our employees and partners with comprehensive safety protocols.',
    modal: SafetyModal,
    data: plantsData.safety
  },
  {
    icon: LuBuilding2,
    title: 'Social Benefit',
    description: 'Committed to contributing positively to the communities where we operate through various social initiatives.',
    modal: SocialBenefitModal,
    data: plantsData.socialBenefit
  },
];

const CorePointComponent: React.FC = () => {
  const [activeModal, setActiveModal] = useState<number | null>(null);

  const openModal = (index: number) => setActiveModal(index);
  const closeModal = () => setActiveModal(null);

  return (
    <section className="relative py-20 bg-[#EEF5FE] overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative z-10">
          <motion.div
            className="lg:col-span-1 flex flex-col"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={{ 
              hidden: { opacity: 0 }, 
              visible: { opacity: 1, transition: { staggerChildren: 0.1 } } 
            }}
          >
            {/* Title and Image */}
            <motion.div
              className="mb-8 w-full max-w-md mx-auto lg:mx-0 group"
              variants={{ 
                hidden: { opacity: 0, y: 50 }, 
                visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 10 } } 
              }}
            >
              <div className="relative overflow-hidden rounded-xl shadow-2xl">
                <img src={Brandlogo3} alt="Brand Logo" className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-[#040270] opacity-20 group-hover:opacity-10 transition-opacity duration-500"></div>
              </div>
            </motion.div>

            {/* Section Content */}
            <motion.p className="text-gray-700 font-medium mb-4 uppercase tracking-wider"
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { type: 'spring', stiffness: 100, damping: 10 } } }}
            >
              Our Core Points
            </motion.p>
            <motion.h2 className="text-4xl md:text-5xl font-bold text-black leading-tight mb-6"
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { type: 'spring', stiffness: 100, damping: 10 } } }}
            >
              How we are <br /> working with local <br /> and global partners
            </motion.h2>
            <motion.p className="text-gray-600 text-lg mb-8"
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { type: 'spring', stiffness: 100, damping: 10 } } }}
            >
              Dedicated to excellence, innovation, and sustainable growth in every partnership.
            </motion.p>
            <motion.a href="#" className="inline-flex items-center text-gray-700 font-semibold group"
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { type: 'spring', stiffness: 100, damping: 10 } } }}
            >
              Explore All Points
              <span className="ml-2 transform transition-transform group-hover:translate-x-2">→</span>
            </motion.a>
          </motion.div>

          {/* Point Cards */}
          <motion.div
            className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={{ 
              hidden: { opacity: 0 }, 
              visible: { opacity: 1, transition: { staggerChildren: 0.1 } } 
            }}
          >
            {points.map((point, index) => {
              const ModalComponent = point.modal;
              return (
                <React.Fragment key={index}>
                  <motion.div
                    className="bg-[#ffffff] p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col items-start relative "
                    variants={{ 
                      hidden: { opacity: 0, y: 50 }, 
                      visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 10 } } 
                    }}
                    whileHover={{ y: -5 }}
                  >
                    <div className="text-[#040270] mb-4">
                      <point.icon className="h-10 w-10" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{point.title}</h3>
                    <p className="text-gray-700 text-base mb-4">{point.description}</p>
                    <button
                      onClick={() => openModal(index)}
                      className="text-[#040270] font-semibold hover:underline"
                    >
                      See Details
                    </button>
                  </motion.div>

                  {activeModal === index && (
                    <ModalComponent 
                      data={point.data} 
                      isOpen={true} 
                      onClose={closeModal} 
                    />
                  )}
                </React.Fragment>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#040270]/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-full bg-gradient-to-r from-[#040270]/20 to-transparent"></div>
      </div>
    </section>
  );
};

export default CorePointComponent;