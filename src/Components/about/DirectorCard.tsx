// DirectorCard.tsx
import React from 'react';
import { FaLinkedin, FaTwitter, FaEnvelope, FaGithub, FaQuoteLeft } from 'react-icons/fa';

import image1 from '../../assets/homeban33.webp'; // Example image, replace with your own

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
  image = image1, // Default image if none provided
  name = "John Doe",
  designation = "Managing Director",
  description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  email = "john.doe@example.com",
  linkedin = "#",
  twitter = "#",
  github = "#"
}) => {
 return (
    <div className="max-w-4xl mx-auto">
      <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden transform hover:scale-[1.02] transition-transform duration-300">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-50 to-transparent z-0" />
        
        {/* Changed grid-cols-2 to grid-cols-10 for precise control */}
        <div className="grid grid-cols-10 relative z-10">
          {/* Left Column - Image and Name (40%) */}
          <div className="col-span-4 relative"> {/* Takes 4 columns out of 10 = 40% */}
            <div className="absolute top-0 left-0 w-20 h-20 bg-blue-500/10 rounded-br-full" />
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-blue-500/10 rounded-tl-full" />
            
            <div className="relative h-[500px] overflow-hidden">
              <img 
                src={image} 
                alt={name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              
              <div className="absolute bottom-0 left-0 w-full p-6 text-white">
                <h3 className="text-3xl font-bold mb-2">{name}</h3>
                <p className="text-xl text-blue-200">{designation}</p>
              </div>
            </div>
          </div>

          {/* Right Column - Description and Contact (60%) */}
          <div className="col-span-6 flex flex-col p-8"> {/* Takes 6 columns out of 10 = 60% */}
            {/* Rest of the content remains the same */}
            <FaQuoteLeft className="text-4xl text-blue-500/20 mb-6" />
            
            <div className="flex-grow">
              <h4 className="text-2xl font-semibold text-gray-800 mb-4">About</h4>
              <p className="text-gray-600 leading-relaxed text-lg">
                {description}
              </p>
            </div>

            {/* Contact and Social Links section remains the same */}
            <div className="mt-8 space-y-6">
              {/* Email */}
              <div className="group">
                <div className="flex items-center space-x-4 p-3 rounded-lg bg-gray-50 hover:bg-blue-50 transition-colors">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <FaEnvelope className="text-blue-600 text-xl" />
                  </div>
                  <a 
                    href={`mailto:${email}`}
                    className="text-gray-600 group-hover:text-blue-600 transition-colors"
                  >
                    {email}
                  </a>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex justify-between items-center">
                <div className="flex space-x-3">
                  {/* LinkedIn */}
                  <a
                    href={linkedin}
                    className="p-3 text-gray-600 hover:text-blue-600 bg-gray-50 hover:bg-blue-50 rounded-full transition-all duration-200 transform hover:scale-110"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaLinkedin size={22} />
                  </a>
                  
                  {/* Twitter */}
                  <a
                    href={twitter}
                    className="p-3 text-gray-600 hover:text-blue-600 bg-gray-50 hover:bg-blue-50 rounded-full transition-all duration-200 transform hover:scale-110"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaTwitter size={22} />
                  </a>
                  
                  {/* GitHub */}
                  <a
                    href={github}
                    className="p-3 text-gray-600 hover:text-blue-600 bg-gray-50 hover:bg-blue-50 rounded-full transition-all duration-200 transform hover:scale-110"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaGithub size={22} />
                  </a>
                </div>

                {/* View Profile Button */}
                <button className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 flex items-center space-x-2">
                  <span>View Profile</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add some custom styles */}
      {/* 
        To style .social-icon-link, use Tailwind classes directly on the element.
        The <style jsx> block is removed for compatibility with standard React.
      */}
    </div>
  );
};

export default DirectorCard;