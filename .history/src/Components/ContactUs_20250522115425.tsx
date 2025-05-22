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

      {/* Map and Contact Info Container */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative w-full">
          {/* Map Container with padding */}
          <div className="w-full h-[400px] md:h-[600px] rounded-lg overflow-hidden">
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
          </div>

          {/* Contact Info Box - Bottom on mobile, Right side on desktop */}
          <div className="relative md:absolute 
                        w-full md:w-[400px] lg:w-[450px]
                        mt-4 md:mt-0
                        md:right-0 md:top-1/2 md:-translate-y-1/2
                        bg-[#8DCF9B] text-white 
                        p-6 sm:p-8 lg:p-10
                        rounded-lg shadow-xl">
            <img src={Tusuka_Logo_tr} alt="Company Logo" className="h-8 mb-6" />
            
            <div className="space-y-4">
              <h3 className="text-xl font-bold">Contact info:</h3>
              <div className="space-y-2">
                <p className="text-lg">+01-75-0660-605</p>
                <a href="mailto:hello@binox-consultant.com" 
                   className="text-lg hover:underline block">
                  hello@binox-consultant.com
                </a>
                <div className="pt-2">
                  <p className="text-lg">140 Suits, Granville, saltcake.tk</p>
                  <p className="text-lg">street, NJ 3967097</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;