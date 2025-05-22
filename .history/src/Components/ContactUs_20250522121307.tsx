import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
    console.log(formData);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200
      }
    }
  };

  const inputVariants = {
    initial: { 
      opacity: 0, 
      y: 20 
    },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 15
      }
    },
    hover: {
      scale: 1.02,
      transition: { duration: 0.2 }
    },
    focus: {
      scale: 1.02,
      borderColor: "#000000",
      transition: { duration: 0.2 }
    }
  };

  return (
    <section className="relative w-full py-20 overflow-hidden">
      {/* Previous map and contact info section remains the same */}
      
      <div className="container mx-auto px-4 py-16 md:py-24">
        <motion.div 
          className="grid md:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left Column - Text Content */}
          <motion.div
            variants={itemVariants}
            className="space-y-6"
          >
            <motion.h2 
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
              variants={itemVariants}
            >
              Let's<br />
              contact<br />
              for<br />
              better<br />
              result
            </motion.h2>

            <motion.div
              variants={itemVariants}
              className="pt-8"
            >
              <p className="text-gray-600">LiveChat@binox.skype</p>
              <p className="text-lg font-semibold">BINOX</p>
            </motion.div>
          </motion.div>

          {/* Right Column - Contact Form */}
          <motion.form 
            onSubmit={handleSubmit}
            variants={containerVariants}
            className="space-y-6"
          >
            <motion.div 
              className="grid md:grid-cols-2 gap-6"
              variants={itemVariants}
            >
              <motion.div 
                variants={inputVariants}
                whileHover="hover"
                whileFocus="focus"
              >
                <label className="block text-gray-700 mb-2">Name</label>
                <motion.input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="Your Name"
                  required
                  variants={inputVariants}
                  initial="initial"
                  animate="animate"
                />
              </motion.div>

              <motion.div 
                variants={inputVariants}
                whileHover="hover"
                whileFocus="focus"
              >
                <label className="block text-gray-700 mb-2">Email</label>
                <motion.input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="Your Email"
                  required
                  variants={inputVariants}
                  initial="initial"
                  animate="animate"
                />
              </motion.div>
            </motion.div>

            {/* Similar modifications for other form fields */}
            <motion.div 
              className="grid md:grid-cols-2 gap-6"
              variants={itemVariants}
            >
              {/* Phone and Company inputs */}
            </motion.div>

            <motion.div 
              variants={inputVariants}
              whileHover="hover"
              whileFocus="focus"
            >
              <label className="block text-gray-700 mb-2">Service</label>
              <motion.select 
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                variants={inputVariants}
                initial="initial"
                animate="animate"
              >
                <option>Market Analysis</option>
                <option>Consulting</option>
                <option>Strategy</option>
              </motion.select>
            </motion.div>

            <motion.div 
              variants={inputVariants}
              whileHover="hover"
              whileFocus="focus"
            >
              <label className="block text-gray-700 mb-2">Message</label>
              <motion.textarea 
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg h-32 focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Write your message here..."
                required
                variants={inputVariants}
                initial="initial"
                animate="animate"
              />
            </motion.div>

            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Submit Now →
            </motion.button>
          </motion.form>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactUs;