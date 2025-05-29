// MVC_Component.tsx
import React, { useState } from 'react';
import image from '../../assets/homeban11.webp'; // Assuming this is a suitable placeholder image
import image1 from '../../assets/homeban44.webp'; // Assuming this is a suitable placeholder image for the hero section
import image2 from '../../assets/homeban22.webp'; // Assuming this is a suitable placeholder image for the hero section
import image3 from '../../assets/homeban33.webp'; // Assuming this is a suitable placeholder image for the hero section

interface TabContent {
  id: string;
  title: string;
  content: string;
  image?: string;
}

const MVC_Component: React.FC = () => {
  // Set the initial active tab to 'fabric-dyeing' (Mission)
  const [activeTab, setActiveTab] = useState('fabric-dyeing');

  const tabContents: TabContent[] = [
    {
      id: 'fabric-dyeing',
      title: 'Mission',
      content: 'To Manufacture & Supply superior Quality Garments with value added performance to our customer and dedicated to professional sales force with technical support & continues improvements for the sustainability of our business for long term.',
      image: image1
    },
    {
      id: 'digital-printing',
      title: 'Vision',
      content: 'Tusuka aims to produce sustainable superior quality products for our valued customers and ensures customers satisfaction and maintaining safe working place by ethical & environmental sustainability practice.',
      image: image2
    },
    {
      id: 'fabric-treated',
      title: 'Commitment',
      content: 'We are committed to ethical business practice, on-time production with quality products, merchandising, and shipment, and compliance according to the country law to ensure a safe working place.',
      image: image3
    }
  ];

  return (
    <div className="font-sans antialiased bg-gray-50"> {/* Added a subtle background color */}
      {/* Hero Section */}
     <div className="relative h-[300px] md:h-[400px]"> {/* Adjusted hero section height */}
        <img
          src={image}
          alt="Company Values"
          className="w-full h-full object-cover brightness-50"
        />
        <div className="absolute inset-0 bg-opacity-50 flex items-center justify-center">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-2xl md:text-4xl font-bold text-white mb-2 md:mb-4">
                Our Focus
              </h1>
              <p className="text-base md:text-lg text-white max-w-2xl mx-auto">
                Driving excellence through clear mission, focused vision, and strong commitment
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Section - Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16"> {/* Increased max-width and padding */}
        {/* Process Tabs Section - Fully Updated and Professional */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200"> {/* More pronounced shadow and subtle border */}

          {/* Tab Navigation */}
          <div className="flex flex-col md:flex-row justify-around items-center p-4 bg-gray-50 border-b border-gray-200 rounded-t-2xl"> {/* Lighter background for tab bar, refined padding */}
            {tabContents.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  relative flex-1 text-center py-3 md:py-4 px-2 md:px-4 text-lg font-semibold tracking-wide transition-all duration-300 ease-in-out
                  ${
                    activeTab === tab.id
                      ? 'text-blue-700' // Active tab: text color
                      : 'text-gray-600 hover:text-blue-700' // Inactive: subtle text, interactive hover
                  }
                  focus:outline-none group // 'group' class enables group-hover on child elements
                `}
              >
                {tab.title}
                {/* Underline indicator for active tab (professional touch) */}
                <span className={`
                  absolute bottom-0 left-1/2 transform -translate-x-1/2 h-1 bg-blue-700 rounded-full transition-all duration-300 ease-in-out
                  ${activeTab === tab.id ? 'w-full scale-x-100' : 'w-0 scale-x-0 group-hover:w-1/2'}
                `}></span>
              </button>
            ))}
          </div>

          {/* Tab Content Area */}
          <div className="p-6 md:p-10 lg:p-12"> {/* Increased padding for content */}
            {tabContents.map((tab) => (
              <div
                key={tab.id}
                // Use opacity and visibility for smooth transitions and proper layout
                className={`transition-opacity duration-500 ease-in-out ${
                  activeTab === tab.id ? 'opacity-100 block' : 'opacity-0 hidden'
                }`}
              >
                <div className="flex flex-col md:flex-row items-center md:items-start gap-8"> {/* Adjusted alignment and gap */}
                  {tab.image && (
                    <div className="md:w-1/2 lg:w-2/5 flex-shrink-0"> {/* Adjusted image width */}
                      <div className="relative h-64 md:h-80 rounded-xl overflow-hidden shadow-xl border border-gray-200"> {/* Taller image, shadow, border */}
                        <img
                          src={tab.image}
                          alt={tab.title}
                          className="w-full h-full object-cover object-center"
                        />
                      </div>
                    </div>
                  )}
                  <div className="md:w-1/2 lg:w-3/5 text-center md:text-left"> {/* Content takes remaining width */}
                    <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight"> {/* Larger, bolder title */}
                      {tab.title}
                    </h3>
                    <p className="text-base md:text-lg text-gray-700 leading-relaxed"> {/* Improved readability */}
                      {tab.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MVC_Component;