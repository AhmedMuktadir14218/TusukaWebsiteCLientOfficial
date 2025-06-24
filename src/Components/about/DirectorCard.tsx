import React, { useState } from 'react';
import {
  FaLinkedin,
  FaTwitter,
  FaEnvelope,
  FaFacebook,
  FaGithub,
  FaQuoteLeft,
} from 'react-icons/fa';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import type { RawDirector } from './DirectorSlider';

interface Props {
  director: RawDirector;
}

const BACKEND_URL = 'http://127.0.0.1:8000';

const DirectorCard: React.FC<Props> = ({ director }) => {
  // Build full image URL, injecting "directors/" if needed, and log for debugging
  const fullImageUrl = (path: string) => {
    console.log('Raw director.image:', path);
    // If path already contains "uploads/directors/", leave it.
    // Otherwise replace "uploads/" ➔ "uploads/directors/"
    const fixedPath = path.includes('uploads/directors/')
      ? path
      : path.replace('uploads/', 'uploads/directors/');
    const url = `${BACKEND_URL}/${fixedPath}`;
    console.log('Computed fullImageUrl:', url);
    return url;
  };

  const fullIntro =
    director.description.find(d => d.section === 'Introduction')?.content || '';
  const PREVIEW_LENGTH = 300;
  const isLong = fullIntro.length > PREVIEW_LENGTH;
  const intro = isLong
    ? fullIntro.slice(0, PREVIEW_LENGTH).trim() + '…'
    : fullIntro;

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const social = director.social_media;

  return (
    <>
      <div className="w-full mx-auto">
        <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden transform hover:scale-[1.02] transition-transform duration-300">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-50 to-transparent z-0" />

          <div className="grid grid-cols-1 md:grid-cols-10 relative z-10">
            {/* Left: Image */}
            <div className="md:col-span-4 relative">
              <div className="relative h-[300px] md:h-[500px] overflow-hidden">
                <img
                  src={fullImageUrl(director.image)}
                  alt={director.name}
                  className="absolute inset-0 w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full p-4 md:p-6 text-white">
                  <h3 className="text-2xl md:text-3xl font-bold mb-1">
                    {director.name}
                  </h3>
                  <p className="text-lg md:text-xl text-blue-200">
                    {director.title}
                  </p>
                </div>
              </div>
            </div>

            {/* Right: About & Contact */}
            <div className="md:col-span-6 flex flex-col p-4 md:p-8">
              <FaQuoteLeft className="text-3xl md:text-4xl text-blue-500/20 mb-4" />

              <div className="flex-grow">
                <h4 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">
                  About
                </h4>
                <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                  {intro}
                </p>
                {isLong && (
                  <button
                    onClick={handleOpen}
                    className="mt-2 text-sm text-blue-600 hover:underline"
                  >
                    See more
                  </button>
                )}
              </div>

              <div className="mt-6 space-y-4">
                {/* Email */}
                <div className="flex items-center space-x-3 p-2 rounded-lg bg-gray-50 hover:bg-blue-50 transition-colors">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <FaEnvelope className="text-blue-600 text-lg" />
                  </div>
                  <a
                    href={`mailto:${director.address.email}`}
                    className="text-sm text-gray-600 hover:text-blue-600"
                  >
                    {director.address.email}
                  </a>
                </div>

                {/* Social & View Profile */}
                <div className="flex justify-between items-center">
                  <div className="flex space-x-3">
                    {social.linkedin && (
                      <SocialLink href={social.linkedin} icon={FaLinkedin} />
                    )}
                    {social.twitter && (
                      <SocialLink href={social.twitter} icon={FaTwitter} />
                    )}
                    {social.facebook && (
                      <SocialLink href={social.facebook} icon={FaFacebook} />
                    )}
                    {social.github && (
                      <SocialLink href={social.github} icon={FaGithub} />
                    )}
                  </div>
                  <button
                    onClick={handleOpen}
                    className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                  >
                    View Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute' as const,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '90vw',
            maxWidth: 1200,
            height: '90vh',
            bgcolor: 'background.paper',
            boxShadow: 24,
            display: 'flex',
            outline: 'none',
            borderRadius: 2,
          }}
        >
          {/* Left pane */}
          <Box sx={{ width: '50%', position: 'relative' }}>
            <img
              src={fullImageUrl(director.image)}
              alt={director.name}
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            <Box
              sx={{
                position: 'absolute',
                bottom: 16,
                left: 16,
                color: '#fff',
                textShadow: '0 1px 4px rgba(0,0,0,0.7)',
              }}
            >
              <Typography variant="h5">{director.name}</Typography>
              <Typography variant="subtitle2">{director.title}</Typography>
            </Box>
          </Box>

          {/* Right pane */}
          <Box sx={{ width: '50%', overflowY: 'auto', p: 4 }}>
            <Typography variant="h4" gutterBottom>
              {director.name}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              {director.title}
            </Typography>

            {director.description.map((sec, i) => (
              <Box key={i} sx={{ mb: 3 }}>
                <Typography variant="h6">{sec.section}</Typography>
                <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
                  {sec.content}
                </Typography>
              </Box>
            ))}

            <Box sx={{ mt: 3 }}>
              <Typography variant="h6">Address</Typography>
              <Typography variant="body2">{director.address.house}</Typography>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

const SocialLink: React.FC<{ href: string; icon: React.ComponentType<React.SVGProps<SVGSVGElement>> }> = ({
  href,
  icon: Icon,
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="p-2 bg-gray-50 rounded-full hover:bg-blue-50 transition-colors"
  >
    <Icon width={20} height={20} className="text-gray-600 hover:text-blue-600" />
  </a>
);

export default DirectorCard;


// // DirectorCard.tsx
// import React from 'react';
// import { FaLinkedin, FaTwitter, FaEnvelope, FaGithub, FaQuoteLeft } from 'react-icons/fa';

// import image1 from '../../assets/homeban33.webp'; // Example image, replace with your own
// import type { IconType } from 'react-icons/lib';

// interface DirectorCardProps {
//   image?: string;
//   name: string;
//   designation: string;
//   description: string;
//   email: string;
//   linkedin?: string;
//   twitter?: string;
//   github?: string;
// }

// const DirectorCard: React.FC<DirectorCardProps> = ({
//   image = image1,
//   name = "John Doe",
//   designation = "Managing Director",
//   description = "Lorem ipsum dolor sit amet...",
//   email = "john.doe@example.com",
//   linkedin = "#",
//   twitter = "#",
//   github = "#"
// }) => {
//  return (
//     <div className="w-full mx-auto">
//       <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden transform hover:scale-[1.02] transition-transform duration-300">
//         <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-50 to-transparent z-0" />
        
//         {/* Grid container with responsive columns */}
//         <div className="grid grid-cols-1 md:grid-cols-10 relative z-10">
//           {/* Left Column - Image and Name */}
//           <div className="md:col-span-4 relative">
//             <div className="absolute top-0 left-0 w-20 h-20 bg-blue-500/10 rounded-br-full" />
//             <div className="absolute bottom-0 right-0 w-32 h-32 bg-blue-500/10 rounded-tl-full" />
            
//             {/* Responsive height for image container */}
//             <div className="relative h-[300px] md:h-[500px] overflow-hidden">
//               <img 
//                 src={image} 
//                 alt={name}
//                 className="w-full h-full object-cover"
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              
//               {/* Name and designation overlay */}
//               <div className="absolute bottom-0 left-0 w-full p-4 md:p-6 text-white">
//                 <h3 className="text-2xl md:text-3xl font-bold mb-1 md:mb-2">{name}</h3>
//                 <p className="text-lg md:text-xl text-blue-200">{designation}</p>
//               </div>
//             </div>
//           </div>

//           {/* Right Column - Description and Contact */}
//           <div className="md:col-span-6 flex flex-col p-4 md:p-8">
//             <FaQuoteLeft className="text-3xl md:text-4xl text-blue-500/20 mb-4 md:mb-6" />
            
//             <div className="flex-grow">
//               <h4 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3 md:mb-4">About</h4>
//               <p className="text-base md:text-lg text-gray-600 leading-relaxed">
//                 {description}
//               </p>
//             </div>

//             {/* Contact and Social Links section */}
//             <div className="mt-6 md:mt-8 space-y-4 md:space-y-6">
//               {/* Email */}
//               <div className="group">
//                 <div className="flex items-center space-x-3 md:space-x-4 p-2 md:p-3 rounded-lg bg-gray-50 hover:bg-blue-50 transition-colors">
//                   <div className="bg-blue-100 p-2 rounded-full">
//                     <FaEnvelope className="text-blue-600 text-lg md:text-xl" />
//                   </div>
//                   <a 
//                     href={`mailto:${email}`}
//                     className="text-sm md:text-base text-gray-600 group-hover:text-blue-600 transition-colors truncate"
//                   >
//                     {email}
//                   </a>
//                 </div>
//               </div>

//               {/* Social Links and Button container */}
//               <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
//                 {/* Social Links */}
//                 <div className="flex space-x-2 md:space-x-3">
//                   {/* Social media links with responsive sizing */}
//                   <SocialLink href={linkedin} icon={FaLinkedin} />
//                   <SocialLink href={twitter} icon={FaTwitter} />
//                   <SocialLink href={github} icon={FaGithub} />
//                 </div>

//                 {/* View Profile Button */}
//                 <button className="w-full sm:w-auto px-4 md:px-6 py-2 md:py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2">
//                   <span className="text-sm md:text-base">View Profile</span>
//                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
//                   </svg>
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Separate component for social links to reduce repetition
// const SocialLink: React.FC<{ href: string; icon: IconType }> = ({ href, icon: Icon }) => (
//   <a
//     href={href}
//     className="p-2 md:p-3 text-gray-600 hover:text-blue-600 bg-gray-50 hover:bg-blue-50 rounded-full transition-all duration-200 transform hover:scale-110"
//     target="_blank"
//     rel="noopener noreferrer"
//   >
//     <Icon size={20} className="md:text-[22px]" />
//   </a>
// );

// export default DirectorCard;
 