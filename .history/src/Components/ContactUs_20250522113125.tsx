import React from 'react';
import Tusuka_Logo_tr from '../assets/Tusuka_Logo_tr.png'; // Using your main logo now as per the recent images

const ContactUs: React.FC = () => {
  return (
    <section className="relative w-full py-20 overflow-hidden">
      {/* Background Section */}
      <div className="container mx-auto px-4 text-center mb-12">
        <p className="text-gray-500 font-medium mb-4">CONTACT US</p>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 leading-tight">
          Would you like more information? <br /> we are happy to help you!
        </h2>
      </div>

      {/* Map and Contact Info Overlay Container */}
      <div className="relative w-full h-[600px] overflow-hidden">
        {/* Map Container - Positioned to the right */}
        {/* We'll make the map container take up most of the width but shifted to the right,
            allowing space for the contact box on the left */}
        <div className="absolute inset-0 left-[20%] sm:left-[30%] md:left-[40%]"> {/* Adjust left% as needed */}
          <iframe
            width="100%"
            height="100%" // Ensure iframe fills its container vertically
            frameBorder="0"
            scrolling="no"
            marginHeight={0}
            marginWidth={0}
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14603.96874838638!2d90.3541469!3d23.7844007!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c0a202d0891d%3A0xc0672e816a75094f!2sTusuka%20Group!5e0!3m2!1sen!2sbd!4v1716353982463!5m2!1sen!2sbd" // Example Google Maps Embed URL for Tusuka Group
            title="Tusuka Group Location"
            allowFullScreen={false} // Prevents full screen button on map
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        {/* Contact Info Box - Positioned to the left over the map */}
        <div
          className="absolute top-1/2 left-4 sm:left-8 md:left-16 lg:left-24 xl:left-32 transform -translate-y-1/2 w-[calc(100%-32px)] sm:w-[350px] md:w-[400px] p-8 lg:p-12 bg-green-500 text-white shadow-xl flex flex-col justify-end items-start"
          style={{ minHeight: '380px' }} // Adjusted minHeight to better match the image aspect ratio
        >
          {/* Using Tusuka_Logo_tr as per the most recent image context */}
          <img src={Tusuka_Logo_tr} alt="Tusuka Logo" className="h-8 mb-6" />

          <h3 className="text-xl font-bold mb-4">Contact info:</h3>
          <p className="text-lg mb-2">+01-75-0660-605</p>
          <a href="mailto:hello@binox-consultant.com" className="text-lg hover:underline mb-4">
            hello@binox-consultant.com
          </a>
          <p className="text-lg">140 Suits, Granville, saltcake.tk</p>
          <p className="text-lg">street, NJ 3967097</p>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;