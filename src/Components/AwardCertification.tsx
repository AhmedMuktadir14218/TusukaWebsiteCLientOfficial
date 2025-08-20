import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';

// Import certificate images
import CF1 from '../assets/Award&Certificate/CF1.jpg';
import CF2 from '../assets/Award&Certificate/CF2.png';
import CF3 from '../assets/Award&Certificate/CF3.png';
import CF4 from '../assets/Award&Certificate/CF4.gif';
import CF5 from '../assets/Award&Certificate/CF5.gif';
import CF6 from '../assets/Award&Certificate/CF6.jpg';
import CF7 from '../assets/Award&Certificate/CF2.png';
import CF8 from '../assets/Award&Certificate/CF3.png';
import { Link } from 'react-router-dom';

const AwardCertification: React.FC = () => {
  const certificates = [
    { image: CF1, title: 'Certificate 1' },
    { image: CF2, title: 'Certificate 2' },
    { image: CF3, title: 'Certificate 3' },
    { image: CF4, title: 'Certificate 4' },
    { image: CF5, title: 'Certificate 5' },
    { image: CF6, title: 'Certificate 6' },
    { image: CF7, title: 'Certificate 7 (Example)' },
    { image: CF8, title: 'Certificate 8 (Example)' },
  ];

  const controls = useAnimation();
  const [isHovered, setIsHovered] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const [singleSetWidth, setSingleSetWidth] = useState(0);

  useEffect(() => {
    if (trackRef.current) {
      const childNodes = Array.from(trackRef.current.children);
      const widthOfOneSet = childNodes
        .slice(0, certificates.length)
        .reduce((acc, childNode) => {
          const child = childNode as HTMLElement;
          return acc + child.offsetWidth;
        }, 0);

      setSingleSetWidth(widthOfOneSet);
    }
  }, [certificates.length]);

  useEffect(() => {
    if (singleSetWidth > 0) {
      const animationDefinition = {
        x: [0, -singleSetWidth],
        transition: {
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: certificates.length * 5, // Slower by default
            ease: 'linear',
          },
        },
      };

      if (isHovered) {
        controls.stop();
      } else {
        controls.start(animationDefinition);
      }
    }
    return () => {
      controls.stop();
    };
  }, [isHovered, controls, singleSetWidth, certificates.length]);

  const duplicatedCertificates = [...certificates, ...certificates];

  return (
    <section className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 relative inline-block pb-2">
            

             <Link to='/acp' >Awards & Certifications</Link>
            <span className="block absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-[#040270] rounded-full"></span>
          </h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Our commitment to excellence has been recognized globally through these prestigious awards and certifications. <Link to='/acp' ><span className='text-[#040270]'>[see more..]</span></Link>
          </p>
        </div>

        <div
          className="w-full overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <motion.div
            ref={trackRef}
            className="flex"
            animate={controls}
          >
            {duplicatedCertificates.map((cert, index) => (
              <motion.div
                key={`${cert.title}-${index}`}
                className="flex-shrink-0 mx-4   cursor-pointer"
                onClick={() => window.open(cert.image, '_blank', 'noopener,noreferrer')}
                whileHover={{
                  scale: 1.1,
                  zIndex: 10,
                  boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.2)",
                }}
                style={{ transition: 'transform 0.3s ease' }}
              >
                <div className=" rounded-lg  overflow-hidden w-56 md:w-72 lg:w-80">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="h-36 md:h-48 lg:h-56 w-full object-contain "
                  />
                  {/* <p className="text-center text-sm md:text-base p-2 text-gray-700 truncate" title={cert.title}>
                    {cert.title}
                  </p> */}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AwardCertification;



 