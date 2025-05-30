// DirectorCard.tsx
import React from 'react';
import { FaLinkedin, FaTwitter, FaEnvelope, FaGithub, FaQuoteLeft } from 'react-icons/fa';

import image1 from '../../assets/homeban33.webp'; // Example image, replace with your own
import type { IconType } from 'react-icons/lib';

interface DirectorCardProps {
  image?: string;
  name: string;
  designation: string;
  description: string;
  email: string;
  linkedin?: string;
  twitter?: string;
  github?: string;
}

const DirectorCard: React.FC<DirectorCardProps> = ({
  image = image1,
  name = "John Doe",
  designation = "Managing Director",
  description = "Lorem ipsum dolor sit amet...",
  email = "john.doe@example.com",
  linkedin = "#",
  twitter = "#",
  github = "#"
}) => {
 return (
    <div className="w-full mx-auto">
      <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden transform hover:scale-[1.02] transition-transform duration-300">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-50 to-transparent z-0" />
        
        {/* Grid container with responsive columns */}
        <div className="grid grid-cols-1 md:grid-cols-10 relative z-10">
          {/* Left Column - Image and Name */}
          <div className="md:col-span-4 relative">
            <div className="absolute top-0 left-0 w-20 h-20 bg-blue-500/10 rounded-br-full" />
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-blue-500/10 rounded-tl-full" />
            
            {/* Responsive height for image container */}
            <div className="relative h-[300px] md:h-[500px] overflow-hidden">
              <img 
                src={image} 
                alt={name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              
              {/* Name and designation overlay */}
              <div className="absolute bottom-0 left-0 w-full p-4 md:p-6 text-white">
                <h3 className="text-2xl md:text-3xl font-bold mb-1 md:mb-2">{name}</h3>
                <p className="text-lg md:text-xl text-blue-200">{designation}</p>
              </div>
            </div>
          </div>

          {/* Right Column - Description and Contact */}
          <div className="md:col-span-6 flex flex-col p-4 md:p-8">
            <FaQuoteLeft className="text-3xl md:text-4xl text-blue-500/20 mb-4 md:mb-6" />
            
            <div className="flex-grow">
              <h4 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3 md:mb-4">About</h4>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                {description}
              </p>
            </div>

            {/* Contact and Social Links section */}
            <div className="mt-6 md:mt-8 space-y-4 md:space-y-6">
              {/* Email */}
              <div className="group">
                <div className="flex items-center space-x-3 md:space-x-4 p-2 md:p-3 rounded-lg bg-gray-50 hover:bg-blue-50 transition-colors">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <FaEnvelope className="text-blue-600 text-lg md:text-xl" />
                  </div>
                  <a 
                    href={`mailto:${email}`}
                    className="text-sm md:text-base text-gray-600 group-hover:text-blue-600 transition-colors truncate"
                  >
                    {email}
                  </a>
                </div>
              </div>

              {/* Social Links and Button container */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                {/* Social Links */}
                <div className="flex space-x-2 md:space-x-3">
                  {/* Social media links with responsive sizing */}
                  <SocialLink href={linkedin} icon={FaLinkedin} />
                  <SocialLink href={twitter} icon={FaTwitter} />
                  <SocialLink href={github} icon={FaGithub} />
                </div>

                {/* View Profile Button */}
                <button className="w-full sm:w-auto px-4 md:px-6 py-2 md:py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2">
                  <span className="text-sm md:text-base">View Profile</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Separate component for social links to reduce repetition
const SocialLink: React.FC<{ href: string; icon: IconType }> = ({ href, icon: Icon }) => (
  <a
    href={href}
    className="p-2 md:p-3 text-gray-600 hover:text-blue-600 bg-gray-50 hover:bg-blue-50 rounded-full transition-all duration-200 transform hover:scale-110"
    target="_blank"
    rel="noopener noreferrer"
  >
    <Icon size={20} className="md:text-[22px]" />
  </a>
);

export default DirectorCard;
 