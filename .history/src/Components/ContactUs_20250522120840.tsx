import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Tusuka_Logo_tr from '../assets/Tusuka_Logo_tr.png';

const ContactUs: React.FC = () => {

      const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    website: '',
    service: 'Market Analysis',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add form submission logic
    console.log(formData);
  };

  const inputVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        type: "spring",
        stiffness: 100 
      }
    }
  };
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


         <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Left Column - Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Let's<br />
            contact<br />
            for<br />
            better<br />
            result
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="pt-8"
          >
            <p className="text-gray-600">LiveChat@binox.skype</p>
            <p className="text-lg font-semibold">BINOX</p>
          </motion.div>
        </motion.div>

        {/* Right Column - Contact Form */}
        <motion.form 
          onSubmit={handleSubmit}
          initial="initial"
          animate="animate"
          className="space-y-6"
        >
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div variants={inputVariants}>
              <label className="block text-gray-700 mb-2">Name</label>
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Your Name"
                required
              />
            </motion.div>

            <motion.div variants={inputVariants}>
              <label className="block text-gray-700 mb-2">Email</label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Your Email"
                required
              />
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <motion.div variants={inputVariants}>
              <label className="block text-gray-700 mb-2">Phone</label>
              <input 
                type="tel" 
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Your Phone"
              />
            </motion.div>

            <motion.div variants={inputVariants}>
              <label className="block text-gray-700 mb-2">Company</label>
              <input 
                type="text" 
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Your Company"
              />
            </motion.div>
          </div>

          <motion.div variants={inputVariants}>
            <label className="block text-gray-700 mb-2">Service</label>
            <select 
              name="service"
              value={formData.service}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            >
              <option>Market Analysis</option>
              <option>Consulting</option>
              <option>Strategy</option>
            </select>
          </motion.div>

          <motion.div variants={inputVariants}>
            <label className="block text-gray-700 mb-2">Message</label>
            <textarea 
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg h-32 focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Write your message here..."
              required
            />
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Submit Now →
          </motion.button>
        </motion.form>
      </div>
    </div>
    </section>
  );
};

export default ContactUs;