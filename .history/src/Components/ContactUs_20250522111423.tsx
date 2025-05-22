import React from 'react';
import Tusuka_Logo_tr from '../assets/Tusuka_Logo_tr.png'; // Assuming you'll have a white version of the logo for this section. If not, use the main one.

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
        
          In a real application, you would embed a Google Map or OpenStreetMap here.
          For example, using an iframe or a React map library:
     <div style={{ width: '100%' }}>
       <iframe
         width="100%"
         height="600"
         frameBorder="0"
         scrolling="no"
         marginHeight={0}
         marginWidth={0}
         src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Banani%2011+(Tusuka%20Group)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
         title="Tusuka Group Location"
       ></iframe>
     </div>
       
        <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-600">
          {/* This is a placeholder for the map visual */}
          <p className="text-lg">Map Placeholder (Integrate Google Maps or similar here)</p>
        </div>


        {/* Contact Info Box */}
       
      </div>
    </section>
  );
};

export default ContactUs;