import React from 'react';
import binoxLogoWhite from '../assets/binox-logo-white.png'; // Assuming you'll have a white version of the logo for this section. If not, use the main one.

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

      {/* Map and Contact Info Overlay */}
      <div className="relative w-full h-[600px] bg-gray-200"> {/* Placeholder for the map */}
        {/*
          In a real application, you would embed a Google Map or OpenStreetMap here.
          For example, using an iframe or a React map library:
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1dYOUR_LATITUDE!2dYOUR_LONGITUDE!3dYOUR_ZOOM!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zYOUR_LOCATION_NAME!5e0!3m2!1sen!2sbd!4vYOUR_TIMESTAMP"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        */}
        <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-600">
          {/* This is a placeholder for the map visual */}
          <p className="text-lg">Map Placeholder (Integrate Google Maps or similar here)</p>
        </div>


        {/* Contact Info Box */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] md:w-[450px] p-8 lg:p-12 bg-green-500 text-white shadow-xl flex flex-col justify-between items-start"
             style={{ minHeight: '380px' }}> {/* Added minHeight to better match the image aspect ratio */}
          <img src={binoxLogoWhite} alt="Binox Logo" className="h-8 mb-6" /> {/* Assuming white logo version */}
          
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