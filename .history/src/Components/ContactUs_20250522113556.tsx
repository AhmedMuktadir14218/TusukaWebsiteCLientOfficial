import React from 'react';
import Tusuka_Logo_tr from '../assets/Tusuka_Logo_tr.png'; // Assuming you have a white version of the Binox logo for this section

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
        */}
        <div style={{ width: '100%', height: '100%' }}> {/* Ensure this div takes full height */}
<iframe
  width="100%"
  height="600"
  frameBorder="0"
  scrolling="no"
  marginHeight={0}
  marginWidth={0}
  src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=1346%20Dhaka%20-%20Tangail%20Highway%20Nill%20nagar%20konabari,%20Gazipur%201346+(Tusuka%20Group)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
  style={{ width: '100%' }}
  title="Tusuka Group Location"
/>
        </div>


        {/* Contact Info Box - Positioned to the left */}
        <div
          className="absolute top-1/2 left-/2 transform -translate-y-1/2 -translate-x-[calc(50%+150px)] md:-translate-x-[calc(50%+250px)] lg:-translate-x-[calc(50%+300px)] w-[90%] max-w-[450px] p-8 lg:p-12 bg-green-500 text-white shadow-xl flex flex-col justify-end items-start"
          // Adjust max-w and padding as needed for responsiveness
          style={{ minHeight: '380px' }} // Adjusted minHeight to better match the image aspect ratio
        >
          {/* Use binoxLogoWhite as seen in the image */}
          <img src={Tusuka_Logo_tr} alt="Binox Logo" className="h-8 mb-6" />

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