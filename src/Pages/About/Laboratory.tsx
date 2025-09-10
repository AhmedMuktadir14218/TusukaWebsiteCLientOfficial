// pages/Laboratory/Laboratory.tsx
import React from 'react';
import PageHeaderComponent from '../../Components/PageHeaderComponent';
import { FaCheckCircle, FaMicroscope, FaVial, FaAtom, FaCertificate } from 'react-icons/fa';
import { MdSecurity, MdPrecisionManufacturing } from 'react-icons/md';
import { GiMicroscope, GiChemicalDrop } from 'react-icons/gi';
import useLabApi from '../../hooks/useLabApi';
import LabIntroSection from '../../Components/about/LabIntroSection';

// Map string icon names to actual React Icon components
const IconComponents: { [key: string]: React.ElementType } = {
  FaMicroscope,
  MdSecurity,
  FaVial,
  FaAtom,
  FaCertificate,
  GiMicroscope,
  GiChemicalDrop,
  FaCheckCircle,
  MdPrecisionManufacturing,
};

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
const API_IMAGE_URL = import.meta.env.VITE_API_IMAGE_URL ;

// Default data structure
const DEFAULT_LAB_DATA = {
  pageHeader: {
    images: [
      { id: 1, path: '/src/assets/laboratory/laboratory1.jpg', filename: 'laboratory1.jpg' },
      { id: 2, path: '/src/assets/laboratory/laboratory2.jpg', filename: 'laboratory2.jpg' },
      { id: 3, path: '/src/assets/laboratory/laboratory3.jpg', filename: 'laboratory3.jpg' },
      { id: 4, path: '/src/assets/laboratory/laboratory4.jpg', filename: 'laboratory4.jpg' },
      { id: 5, path: '/src/assets/laboratory/laboratory5.jpg', filename: 'laboratory5.jpg' }
    ],
    title: "Our Laboratory",
    description: "At Tusuka, we prioritize quality and innovation in our laboratory operations."
  },
  introSection: {
    image: { id: 6, path: '/src/assets/laboratory/laboratory6.jpg', filename: 'laboratory6.jpg' },
    title: "State-of-the-Art Testing Facility",
    paragraphs: [
      "Tusuka established its own in-house fabric and garments testing laboratory with state of the art technology. Approved by numerous international standards, our lab is fully equipped for testing all types of fabrics to ensure all garment compliance are met.",
      "Our goal is to provide total satisfaction to our customers, through quality services and maintaining complete security, confidentiality, and integrity of test results."
    ]
  },
  services: [
    { iconType: "FaMicroscope", title: "International Standards", description: "Testing according to AATCC and other international standards ensuring global compliance." },
    { iconType: "MdSecurity", title: "Quality Assurance", description: "Approved by world-renowned buyers including H&M, Varner Group, and other European customers." },
    { iconType: "FaVial", title: "Comprehensive Testing", description: "Complete testing of garments, fabrics and accessories according to international standards." }
  ],
  facilities: {
    SectionTitle: "Our Facilities",
    SectionDescription: "We are equipped with the latest technology and equipment to ensure accurate and reliable results.",
    colorFastness: {
      iconType: "GiChemicalDrop", 
      title: "Color Fastness Tests", 
      items: [
        "Color Fastness to Washing", 
        "Color Fastness to Water", 
        "Color Fastness to Rubbing",
        "Color Fastness to Perspiration", 
        "Color Fastness to Phenolic Yellowing",
        "Color fastness to household Laundering"
      ]
    },
    physical: {
      iconType: "MdPrecisionManufacturing", 
      title: "Physical Tests", 
      items: [
        "Appearance after wash", 
        "Dimensional stability to washing", 
        "Grams per square meter (GSM)",
        "Twisting", 
        "PH Value", 
        "Tear Strength"
      ]
    },
    strength: {
      iconType: "FaAtom", 
      title: "Strength Tests", 
      items: [
        "Tensile Strength", 
        "Seam slippage", 
        "Stretch Recovery", 
        "Nickel", 
        "Pull Test"
      ]
    }
  },
  certifications: [
    { iconType: "FaCertificate", title: "Internationally Certified", description: "Our laboratory meets global testing standards" },
    { iconType: "MdSecurity", title: "Secure Results", description: "Confidential and reliable testing process" },
    { iconType: "GiMicroscope", title: "Advanced Equipment", description: "State-of-the-art testing facilities" }
  ]
};

function Laboratory() {
  const { labData, loading, error } = useLabApi();
  const [finalLabData, setFinalLabData] = React.useState(DEFAULT_LAB_DATA);

  React.useEffect(() => {
    if (labData) {
      setFinalLabData(labData);
    }
  }, [labData]);

  if (loading && !labData) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-[#363D44] text-xl">Loading laboratory data...</div>
      </div>
    );
  }

  if (error && !labData) {
    console.error("API Error, using default data:", error);
  }

  // Helper function to get full image path
  const getImagePath = (imageObj: { path: string }) => {
    // If the path is already a full URL, return it
    if (imageObj.path.startsWith('http')) {
      return imageObj.path;
    }
    // Otherwise, construct the path (adjust this based on your setup)
    return `${API_IMAGE_URL}/${imageObj.path}`;
  };

  return (
    <div className="w-full min-h-screen bg-[var(--color-webBg)] overflow-hidden">
      {/* Header Section */}
      <PageHeaderComponent
        images={finalLabData.pageHeader.images.map(img => getImagePath(img))}
        title={finalLabData.pageHeader.title}
        description={finalLabData.pageHeader.description}
      />

      {/* Introduction Section */}
<LabIntroSection
  // bgColor ="bg-gradient-to-r from-blue-50 to-indigo-50"
  // title={finalLabData.introSection.title}
  // paragraphs={finalLabData.introSection.paragraphs}
  // image={getImagePath(finalLabData.introSection.image)}
/>

      {/* Services Section */}
      <section className="py-12 sm:py-16 md:py-20  ">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#363D44]  mb-4">
              Our Testing Services
            </h2>
            <p className="text-[#363D44]  max-w-2xl mx-auto">
              We provide comprehensive testing services that meet international standards and ensure quality at every step.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
            {finalLabData.services.map((service, index) => {
              const Icon = IconComponents[service.iconType];
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 transform hover:-translate-y-2 animate-slide-up"
                  style={{ animationDelay: `${index * 100 + 100}ms` }}
                >
                  <div className="text-4xl sm:text-5xl text-[#363D44] mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    {Icon ? <Icon /> : <FaVial />}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-semibold text-[#363D44]  mb-3">
                    {service.title}
                  </h3>
                  <p className="text-[#363D44] ">
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section className="py-12 sm:py-16 md:py-20  bg-[var(--color-webBg)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#363D44]  mb-4">
              {finalLabData.facilities.SectionTitle}
            </h2>
            <p className="text-[#363D44]  max-w-2xl mx-auto">
              {finalLabData.facilities.SectionDescription}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
            {/* Color Fastness Tests */}
            <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              <div className="flex items-center space-x-3 mb-6">
                {React.createElement(IconComponents[finalLabData.facilities.colorFastness.iconType] || GiChemicalDrop, { className: "text-2xl text-[#363D44]" })}
                <h3 className="text-xl font-semibold text-[#363D44] ">{finalLabData.facilities.colorFastness.title}</h3>
              </div>
              {finalLabData.facilities.colorFastness.items.map((item, index) => (
                <FacilityItem key={index} title={item} />
              ))}
            </div>

            {/* Physical Tests */}
            <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
              <div className="flex items-center space-x-3 mb-6">
                {React.createElement(IconComponents[finalLabData.facilities.physical.iconType] || MdPrecisionManufacturing, { className: "text-2xl text-[#363D44]" })}
                <h3 className="text-xl font-semibold text-[#363D44] ">{finalLabData.facilities.physical.title}</h3>
              </div>
              {finalLabData.facilities.physical.items.map((item, index) => (
                <FacilityItem key={index} title={item} />
              ))}
            </div>

            {/* Strength Tests */}
            <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
              <div className="flex items-center space-x-3 mb-6">
                {React.createElement(IconComponents[finalLabData.facilities.strength.iconType] || FaAtom, { className: "text-2xl text-[#363D44]" })}
                <h3 className="text-xl font-semibold text-[#363D44] ">{finalLabData.facilities.strength.title}</h3>
              </div>
              {finalLabData.facilities.strength.items.map((item, index) => (
                <FacilityItem key={index} title={item} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Certification Section */}
      <section className="py-12 sm:py-16 bg-[var(--color-webBg)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            {finalLabData.certifications.map((certification, index) => {
              const Icon = IconComponents[certification.iconType];
              return (
                <CertificationItem
                  key={index}
                  icon={Icon ? <Icon /> : <FaCertificate />}
                  title={certification.title}
                  description={certification.description}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* Global CSS for Animations */}
      <style>{`
        /* Animation styles remain the same as before */
        @keyframes fade-in-left {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-fade-in-left {
          animation: fade-in-left 0.8s ease-out forwards;
          opacity: 0;
        }

        @keyframes fade-in-right {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-fade-in-right {
          animation: fade-in-right 0.8s ease-out forwards;
          opacity: 0;
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.7s ease-out forwards;
          opacity: 0;
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.6s ease-out forwards;
          opacity: 0;
        }

        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-bounce-slow {
          animation: bounce-slow 4s infinite ease-in-out;
        }

        @keyframes grow-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-grow-in {
          animation: grow-in 0.5s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}

// Facility Item Component
const FacilityItem = ({ title }: { title: string }) => (
  <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-300 group">
    <FaCheckCircle className="text-[#363D44] flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
    <span className="text-[#363D44]  group-hover:text-[#363D44]-900 transition-colors duration-300">{title}</span>
  </div>
);

// Certification Item Component
const CertificationItem = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <div className="flex flex-col md:flex-row items-center md:items-start space-y-3 md:space-y-0 md:space-x-4 p-4 rounded-lg bg-white hover:bg-blue-100 transition-all duration-300 animate-grow-in" style={{ animationDelay: '0ms' }}>
    <div className="text-4xl sm:text-5xl text-[#363D44] flex-shrink-0">
      {icon}
    </div>
    <div className="text-center md:text-left">
      <h3 className="text-xl font-semibold text-[#363D44]  mb-1">{title}</h3>
      <p className="text-[#363D44]  text-sm">{description}</p>
    </div>
  </div>
);

export default Laboratory;
