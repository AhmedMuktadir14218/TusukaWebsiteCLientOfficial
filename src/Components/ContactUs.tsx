import React, { useState } from "react";
import { motion } from "framer-motion";
import Tusuka_Logo_tr from "../assets/LogoWhite.png";
import { Link } from "react-router-dom";
import axios from "axios";
import { CircularProgress } from '@mui/material';

const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/api/contacts`, {
        full_name: formData.name, // Mapping to API's expected field
        email: formData.email,
        subject: formData.subject,  
        phone: formData.phone,
        message: formData.message,
      });

      console.log('Form submitted successfully:', response.data);
      alert('Message sent successfully!');

      // Reset form fields after successful submission
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });

    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Parent form animation: stagger children
  const formContainer = {
    hidden: { opacity: 0, x: 50 },
    show: {
      opacity: 1,
      x: 0,
      transition: { staggerChildren: 0.12, when: 'beforeChildren' }
    }
  };

  // Each input
  const inputItem = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100, duration: 0.5 }
    }
  };

  return (
    <section className="relative w-full py-20 overflow-hidden bg-[var(--color-webBg)]">
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
              src="http://maps.google.com/maps?q=Block-F,+Banani,+Dhaka-1213,+Bangladesh.&output=embed"
              className="w-full h-full"
            />
          </motion.div>

          {/* Contact Info Box - Bottom on mobile, Right side on desktop */}
          <motion.div
            className="relative md:absolute 
                      w-full md:w-[400px] lg:w-[450px]
                      mt-4 md:mt-0
                      md:right-0 md:top-1/2 md:-translate-y-1/2
                      bg-[#363d44e5] text-white
                      p-6 sm:p-8 lg:p-10
                      rounded-lg shadow-xl"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.3,
              type: "spring",
              stiffness: 100,
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link to="/">
              <motion.img
                src={Tusuka_Logo_tr}
                alt="Company Logo"
                className="h-8 mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              />
            </Link>

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
                  href="mailto:hello@tusuka.com"
                  className="text-lg hover:underline block"
                  whileHover={{ x: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  hello@tusuka.com
                </motion.a>
                <motion.div
                  className="pt-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1.2 }}
                >
                  <p className="text-lg">
                    Block-F, Banani, Dhaka-1213, Bangladesh.
                  </p>
                  <p className="text-lg">House- 50 (5th floor), Road no –11,</p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <section className="relative w-full pb-12 pt-8 mt-12 overflow-hidden">
        {/* Header */}
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

        {/* Animated Form Section */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Left Side Text */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="space-y-6 pl-9 pt-6"
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Let's 
                contact<br />
                for 
                better<br />
                result
              </h2>
              <p className="text-gray-600">
                _________________________
              </p>
              <Link to="/">
                <motion.img
                  src={Tusuka_Logo_tr}
                  alt="Company Logo"
                  className="h-8 mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                />
              </Link>
            </motion.div>

            {/* Right Side Form */}
            <motion.form
              onSubmit={handleSubmit}
              variants={formContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              className="space-y-6"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <motion.div variants={inputItem}>
                  <label className="block text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </motion.div>

       
                     <motion.div variants={inputItem}>
                  <label className="block text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Your Phone"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </motion.div>
              </div>

              {/* <div className="grid md:grid-cols-2 gap-6"> */}
           

                {/* <motion.div variants={inputItem}>
                  <label className="block text-gray-700 mb-2">Company</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Your Company"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </motion.div> */}
              {/* </div> */}

              {/* <motion.div variants={inputItem}>
                <label className="block text-gray-700 mb-2">Website</label>
                <input
                  type="text"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  placeholder="Your Website"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                />
              </motion.div> */}
         <motion.div variants={inputItem}>
                  <label className="block text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your Email"
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </motion.div>


              <motion.div variants={inputItem}>
                <label className="block text-gray-700 mb-2">Subject</label>
                <input
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                > 
                </input>
              </motion.div>

              <motion.div variants={inputItem}>
                <label className="block text-gray-700 mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message here..."
                  required
                  className="w-full px-4 py-2 border rounded-lg h-32 focus:outline-none focus:ring-2 focus:ring-black"
                />
              </motion.div>

              <motion.button
                variants={inputItem}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={loading} // Disable button while loading
                className="flex justify-center items-center py-3 px-4 rounded-lg bg-[#363D44] text-white font-medium hover:opacity-90 transition duration-200 shadow-md"
              >
                {loading ? (
                  <CircularProgress size={24} sx={{ color: '#fff' }} />
                ) : (
                  'Submit Now →'
                )}
              </motion.button>
            </motion.form>
          </div>
        </div>
      </section>
    </section>
  );
};

export default ContactUs;