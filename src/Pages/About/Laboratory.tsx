// pages/Laboratory/Laboratory.tsx
import React from 'react';
import PageHeaderComponent from '../../Components/PageHeaderComponent'; // Make sure this points to the Swiper version
import {  FaCheckCircle, FaMicroscope, FaVial, FaAtom, FaCertificate } from 'react-icons/fa';
import {  MdSecurity, MdPrecisionManufacturing } from 'react-icons/md';
import { GiMicroscope, GiChemicalDrop } from 'react-icons/gi';

// Import images
import aboutImage1 from '../../assets/laboratory/laboratory1.jpg'; // Your existing images
import aboutImage2 from '../../assets/laboratory/laboratory2.jpg';
import aboutImage3 from '../../assets/laboratory/laboratory3.jpg';
import aboutImage4 from '../../assets/laboratory/laboratory4.jpg';
import aboutImage5 from '../../assets/laboratory/laboratory5.jpg';

// New image for the main intro section for better visual
import introLabImage from '../../assets/laboratory/laboratory6.jpg'; // Path to a specific image for the intro section

function Laboratory() {
  const headerImages = [aboutImage1, aboutImage2, aboutImage3, aboutImage4, aboutImage5];

  // Service cards data
  const services = [
    {
      icon: <FaMicroscope />,
      title: "International Standards",
      description: "Testing according to AATCC and other international standards ensuring global compliance."
    },
    {
      icon: <MdSecurity />,
      title: "Quality Assurance",
      description: "Approved by world-renowned buyers including H&M, Varner Group, and other European customers."
    },
    {
      icon: <FaVial />,
      title: "Comprehensive Testing",
      description: "Complete testing of garments, fabrics and accessories according to international standards."
    }
  ];

  // Facilities data grouped by category
  const facilities = {
    colorFastness: [
      "Color Fastness to Washing",
      "Color Fastness to Water",
      "Color Fastness to Rubbing",
      "Color Fastness to Perspiration",
      "Color Fastness to Phenolic Yellowing",
      "Color fastness to household Laundering"
    ],
    physical: [
      "Appearance after wash",
      "Dimensional stability to washing",
      "Grams per square meter (GSM)",
      "Twisting",
      "PH Value",
      "Tear Strength"
    ],
    strength: [
      "Tensile Strength",
      "Seam slippage",
      "Stretch Recovery",
      "Nickel",
      "Pull Test"
    ]
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 overflow-hidden"> {/* Added overflow-hidden for animations */}
      {/* Header Section (using PageHeader with Swiper) */}
      <PageHeaderComponent
        images={headerImages}
        title="Our Laboratory"
        description="At Tusuka, we prioritize quality and innovation in our laboratory operations."
        
         // Slightly higher opacity for text contrast
      />

      {/* Introduction Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white relative z-10"> {/* Added relative z-10 for overlapping effect */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
            {/* Text Content with Animation */}
            <div
              className="space-y-4 sm:space-y-6 animate-fade-in-left" // Custom animation class
              style={{ animationDelay: '200ms' }}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 leading-tight">
                State-of-the-Art Testing Facility
              </h2>
              <div className="space-y-4">
                <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                  Tusuka established its own in-house fabric and garments testing laboratory with state of the art technology.
                  Approved by numerous international standards, our lab is fully equipped for testing all types of fabrics to
                  ensure all garment compliance are met.
                </p>
                <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                  Our goal is to provide total satisfaction to our customers, through quality services and maintaining complete
                  security, confidentiality, and integrity of test results.
                </p>
              </div>
            </div>
            {/* Image with Animation and improved styling */}
            <div
              className="relative animate-fade-in-right" // Custom animation class
              style={{ animationDelay: '400ms' }}
            >
              <div className="relative rounded-xl overflow-hidden shadow-2xl transform hover:scale-102 transition-transform duration-500 ease-in-out">
                <img
                  src={introLabImage} // Use a different, specific image for this section if available
                  alt="Laboratory Equipment"
                  className="w-full h-[350px] sm:h-[450px] md:h-[500px] object-cover filter brightness-90" // Slightly brighter image
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div> {/* Darker gradient */}
              </div>
              {/* Decorative element - Adjusted for better visual impact */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-500/10 rounded-full z-0 animate-bounce-slow"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Our Testing Services
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We provide comprehensive testing services that meet international standards and ensure quality at every step.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 transform hover:-translate-y-2  animate-slide-up" // Animation
                style={{ animationDelay: `${index * 100 + 100}ms` }} // Staggered animation
              >
                <div className="text-4xl sm:text-5xl text-blue-600 mb-4 transform group-hover:scale-110 transition-transform duration-300"> {/* Icon hover animation */}
                  {service.icon}
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Testing Facilities
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our comprehensive range of testing capabilities ensures thorough quality assessment.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
            {/* Color Fastness Tests */}
            <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              <div className="flex items-center space-x-3 mb-6">
                <GiChemicalDrop className="text-2xl text-blue-600" />
                <h3 className="text-xl font-semibold text-gray-800">Color Fastness Tests</h3>
              </div>
              {facilities.colorFastness.map((item, index) => (
                <FacilityItem key={index} title={item} />
              ))}
            </div>

            {/* Physical Tests */}
            <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
              <div className="flex items-center space-x-3 mb-6">
                <MdPrecisionManufacturing className="text-2xl text-blue-600" />
                <h3 className="text-xl font-semibold text-gray-800">Physical Tests</h3>
              </div>
              {facilities.physical.map((item, index) => (
                <FacilityItem key={index} title={item} />
              ))}
            </div>

            {/* Strength Tests */}
            <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
              <div className="flex items-center space-x-3 mb-6">
                <FaAtom className="text-2xl text-blue-600" />
                <h3 className="text-xl font-semibold text-gray-800">Strength Tests</h3>
              </div>
              {facilities.strength.map((item, index) => (
                <FacilityItem key={index} title={item} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Certification Section */}
      <section className="py-12 sm:py-16 bg-blue-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left"> {/* Changed to grid for better responsiveness */}
            <CertificationItem
              icon={<FaCertificate />}
              title="Internationally Certified"
              description="Our laboratory meets global testing standards"
            />
            <CertificationItem
              icon={<MdSecurity />}
              title="Secure Results"
              description="Confidential and reliable testing process"
            />
            <CertificationItem
              icon={<GiMicroscope />}
              title="Advanced Equipment"
              description="State-of-the-art testing facilities"
            />
          </div>
        </div>
      </section>

      {/* Global CSS for Animations */}
      <style >{`
        /* Fade In From Left */
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
          opacity: 0; /* Hidden by default */
        }

        /* Fade In From Right */
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

        /* Fade In From Up */
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

        /* Slide Up (for service cards) */
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

        /* Slow Bounce (for decorative element) */
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

        /* Grow In (for certification items) */
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
    <FaCheckCircle className="text-green-500 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
    <span className="text-gray-700 group-hover:text-gray-900 transition-colors duration-300">{title}</span>
  </div>
);

// New Certification Item Component for reusability and animation
const CertificationItem = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <div className="flex flex-col md:flex-row items-center md:items-start space-y-3 md:space-y-0 md:space-x-4 p-4 rounded-lg bg-blue-50 hover:bg-blue-100 transition-all duration-300 animate-grow-in" style={{ animationDelay: '0ms' }}> {/* Added animation */}
    <div className="text-4xl sm:text-5xl text-blue-600 flex-shrink-0">
      {icon}
    </div>
    <div className="text-center md:text-left">
      <h3 className="text-xl font-semibold text-gray-800 mb-1">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  </div>
);

export default Laboratory;