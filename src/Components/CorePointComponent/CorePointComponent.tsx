// CorePointComponent.tsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  LuArmchair,
  LuLeaf,
  LuBuilding2,
  LuFlaskConical,
  LuShieldCheck,
  LuHandshake,
} from "react-icons/lu";
// import Brandlogo3 from "../../assets/homeban55.jpg";
import Brandlogo4 from "../../assets/Ban_Tushuka_USAID (12).jpg";
import Brandlogo3 from "../../assets/Ban_Tushuka_USAID (22).jpg";
import Brandlogo6 from "../../assets/Tusuka Apparels Ltd/Tusuka Apparels Ltd 04.jpg";
// import Brandlogo from "../../assets/Needle Art Embroidery Ltd/Needle Art Embroidery Ltd 05.jpg";
import plantsData from "../../../public/CoreComponent.json";
import bgNav from "../../assets/bg.png";
import {
  MarketModal,
  SourcingModal,
  CodeOfConductModal,
  ResearchDevelopmentModal,
  SafetyModal,
  SocialBenefitModal,
} from "./CoreComponentModal";

const points = [
  {
    icon: LuArmchair,
    title: "Our Market",
    description: "We analyze market trends and opportunities...",
    modal: MarketModal,
    data: plantsData.ourMarket,
  },
  {
    icon: LuLeaf,
    title: "Sourcing",
    description:"Specializing in ethical and efficient sourcing of raw materials ...",
    modal: SourcingModal,
    data: plantsData.sourcing,
  },
  {
    icon: LuHandshake,
    title: "Code of Conduct",
    description:"Upholding stringent ethical standards and social responsibility ...",
    modal: CodeOfConductModal,
    data: plantsData.codeOfConduct,
  },
  {
    icon: LuFlaskConical,
    title: "Research & Development",
    description:"Innovating new processes and products through advanced research ...",
    modal: ResearchDevelopmentModal,
    data: plantsData.researchAndDevelopment,
  },
  {
    icon: LuShieldCheck,
    title: "Safety",
    description:"Prioritizing the safety and well-being of our employees and partners ...",
    modal: SafetyModal,
    data: plantsData.safety,
  },
  {
    icon: LuBuilding2,
    title: "Social Benefit",
    description:"Committed to contributing positively to the communities ...",
    modal: SocialBenefitModal,
    data: plantsData.socialBenefit,
  },
];

const CorePointComponent: React.FC = () => {
  const [activeModal, setActiveModal] = useState<number | null>(null);

  const openModal = (index: number) => setActiveModal(index);
  const closeModal = () => setActiveModal(null);

  return (
    <section 
    // className=
    // "relative py-20 bg-[#1B1E35]  overflow-hidden"
      className="relative py-20 bg-[#1B1E35]  overflow-hidden bg-fixed bg-center bg-cover  "
  style={{ backgroundImage: `url(${Brandlogo6})` }}
    >
       <div className="absolute inset-0 bg-[#1B1E35]/50 backdrop-blur-[6px]"></div>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-9 gap-12 relative z-10">
          <motion.div
             className="lg:col-span-5 flex flex-col items-center lg:items-start px-4"
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.3 }}
  transition={{ duration: 0.8 }} // Increased from default ~0.3-0.5
  variants={{
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.1 } }, // Increased stagger
            }}
          >
         

            {/* Section Content */}
            <motion.p
              className="text-[#dbeafe] font-medium  mb-4 uppercase tracking-wider text-center lg:text-left"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { type: "spring", stiffness: 100, damping: 10 },
                },
              }}
            >
              Our Core Points
            </motion.p>

            <motion.h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#dbeafe] leading-tight mb-6 text-center lg:text-left text-transform: uppercase"
  variants={{
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 80,  // Lower stiffness for slower movement
        damping: 15,    // Higher damping for less bounce
        duration: 0.8   // Explicit duration
      },
    },
  }}
            >
              Tusuka’s     <strong className="text-[#20409A]">
                          Commitment
                        </strong> 
              <br /> to Innovation, Safety, <br />and Sustainability
              
            </motion.h2>

            <motion.p
              className="text-[#dbeafe] text-base sm:text-lg mb-8 text-center lg:text-left"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { type: "spring", stiffness: 100, damping: 10 },
                },
              }}
            >
              Dedicated to excellence, innovation, and sustainable growth in
              every partnership.
            </motion.p>

 



               {/* Title and Image */}
            <motion.div
              className="mb-8 w-full max-w-2xl group relative"
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { type: "spring", stiffness: 100, damping: 10 },
                },
              }}
            >
              {/* Main Background Image */}
              <img
                src={Brandlogo3}
                alt="Main"
                className="w-full h-106 object-cover  shadow-xl shadow-lg rounded-lg border-2"
              />

              {/* Small Attached Image */}
              <img
                src={Brandlogo4}
                alt="Overlay"
                className="
                            absolute 
                            -bottom-8 -right-4 w-40 h-28   
                            sm:-bottom-10 sm:-right-6 sm:w-48 sm:h-40   
                            md:-bottom-12 md:-right-8 md:w-56 md:h-48   
                            lg:-bottom-10 lg:-right-6 lg:w-52 lg:h-44   
                            xl:-bottom-16 xl:-right-8 xl:w-64 xl:h-56   
                            object-cover  shadow-lg rounded-lg border-2
                          "
              />
            </motion.div>
          </motion.div>

          {/* Point Cards */}
          <motion.div
            className="lg:col-span-4 grid grid-cols-1 md:grid-cols-2 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
            }}
          >
            {points.map((point, index) => {
              const ModalComponent = point.modal;
              return (
                <React.Fragment key={index}>
                  <motion.div
                    className=" p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col items-start relative  " 
                    // style={{ backgroundImage: `url(${bgNav})` }}

                          style={{
  background: "rgb(173 208 244 / 58%)", 
  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
  backdropFilter: "blur(5px)",
  WebkitBackdropFilter: "blur(5px)",
  border: "1px solid rgba(185, 206, 227, 0.3)"
}}
                    variants={{
                      hidden: { opacity: 0, y: 50 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: {
                          type: "spring",
                          stiffness: 100,
                          damping: 10,
                        },
                      },
                    }}
                    whileHover={{ y: -5 }}
                  >
                    <div className="text-[#040270] mb-4">
                      <point.icon className="h-10 w-10" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {point.title}
                    </h3>
                    <p className="text-gray-700 text-base mb-4">
                      {point.description}
                    </p>
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
 
    </section>
  );
};

export default CorePointComponent;
