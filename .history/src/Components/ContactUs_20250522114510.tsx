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
      <div className="relative w-full h-[600px]">
        {/* Map iframe */}
        <div className="absolute w-full h-full">
          <iframe
            width="100%"
            height="100%"
            frameBorder="0"
            scrolling="no"
            marginHeight={0}
            marginWidth={0}
            src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=1346%20Dhaka%20-%20Tangail%20Highway%20Nill%20nagar%20konabari,%20Gazipur%201346+(Tusuka%20Group)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
            title="Tusuka Group Location"
          />
        </div>

        {/* Contact Info Box - Adjusted positioning */}
        <div className="absolute top-0 left-0 w-[30%] h-full bg-green-500 text-white p-8">
          <img src={Tusuka_Logo_tr} alt="Company Logo" className="h-8 mb-6" />
          
          <div className="mt-auto">
            <h3 className="text-xl font-bold mb-4">Contact info:</h3>
            <p className="text-lg mb-2">+01-75-0660-605</p>
            <a href="mailto:hello@binox-consultant.com" className="text-lg hover:underline mb-4 block">
              hello@binox-consultant.com
            </a>
            <p className="text-lg">140 Suits, Granville, saltcake.tk</p>
            <p className="text-lg">street, NJ 3967097</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
 