import React from 'react';
import { motion } from 'framer-motion';
import Tusuka_Logo_tr from '../assets/Tusuka_Logo_tr.png';

const ContactUs: React.FC = () => {
  return (
    <section className="relative w-full py-20 overflow-hidden">
      {/* Background Section */}
      <motion.div 
        className="container mx-auto px-4 text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-gray-500 font-medium mb-4">CONTACT US</p>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 leading-tight">
          Would you like more information? <br /> we are happy to help you!
        </h2>
      </motion.div>

      {/* Map and Contact Info Container */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative w-full">
          {/* Map Container with padding */}
          <motion.div 
            className="w-full h-[400px] md:h-[600px] rounded-lg overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <iframe
              width="100%"
              height="100%"
              frameBorder="0"
              scrolling="no"
              marginHeight={0}
              marginWidth={0}
              src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=1346%20Dhaka%20-%20Tangail%20Highway%20Nill%20nagar%20konabari,%20Gazipur%201346+(Tusuka%20Group)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
              title="Tusuka Group Location"
              className="w-full h-full"
            />
          </motion.div>

          {/* Contact Info Box - Bottom on mobile, Right side on desktop */}
          <motion.div 
            className="relative md:absolute 
                      w-full md:w-[400px] lg:w-[450px]
                      mt-4 md:mt-0
                      md:right-0 md:top-1/2 md:-translate-y-1/2
                      bg-[#8DCF9B] text-white 
                      p-6 sm:p-8 lg:p-10
                      rounded-lg shadow-xl"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ 
              duration: 0.8, 
              delay: 0.3,
              type: "spring",
              stiffness: 100 
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.img 
              src={Tusuka_Logo_tr} 
              alt="Company Logo" 
              className="h-8 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            />
            
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              <h3 className="text-xl font-bold">Corporate office:</h3>
              <div className="space-y-2">
                <motion.p 
                  className="text-lg"
                  whileHover={{ x: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  IP Phone : +8809666722222
                </motion.p>
                <motion.a 
                  href="mailto:hello@binox-consultant.com" 
                  className="text-lg hover:underline block"
                  whileHover={{ x: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  hello@binox-consultant.com
                </motion.a>
                <motion.div 
                  className="pt-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1.2 }}
                >
                  <p className="text-lg">Block-F, Banani, Dhaka-1213, Bangladesh.</p>
                  <p className="text-lg">House- 50 (5th floor), Road no –11,</p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>


      
    </section>
  );
};

export default ContactUs;