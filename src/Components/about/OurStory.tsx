import React, { useState } from 'react';
import { useApiData } from '../../hooks/useApiData';
import { motion } from 'framer-motion';

// Default fallback data
const defaultData = {
  title: "Our Story",
  storyTitle: "Our Story",
  StoryVideoUrl: "https://www.youtube.com/embed/3ZHHlM9bg14?autoplay=1&loop=1&playlist=3ZHHlM9bg14",
  foundingVision:
    "Tusuka Group was established in 1995, and by 1997, it ventured into the garment business as a buying house named 'texel', initially focusing solely on the woven market. Recognizing the global demand for denim, Tusuka shifted its focus in 2001 to specialize in denim/jeans manufacturing.",
  growthMilestones:
    "Starting with just 2 sewing lines and a small laundry in 2001, Tusuka expanded significantly. After a year of management recognizing the need for a large-world class in-house laundry section, the washing capacity and new sewing lines were expanded. Now, Tusuka boasts a washing capacity of 45,000 pieces per day and a total of 34 sewing lines dedicated to denim garment making.",
  currentStance:
    "Today, Tusuka is dedicated to excellence in merchandising, product development, production, and logistics. The company has earned a reputation throughout the global apparel industry as one of the foremost factories in Bangladesh, recognized for its commitment to quality, timely delivery, and total value. Through an extensive sourcing network, Tusuka effectively procures the best materials and delivers high-quality products and superb service to compete in the emerging market. They utilize progressive tools such as CAD-CAM and have a management team with extensive understanding of Western companies' needs and Eastern production capabilities, excelling in overseas sourcing.",
};



const OurStorySection: React.FC = () => {
 const { storyData, loading, error } = useApiData();
  const [showFullText, setShowFullText] = useState(false);

  // Decide which data to render: API data once loaded, otherwise default
  const data = !loading && storyData ? storyData : defaultData;
  const { title, storyTitle, StoryVideoUrl, foundingVision, growthMilestones, currentStance } = data;

//   const truncatedText = growthMilestones.slice(0, 200) + "...";

  return (
    <section className=" py-8 bg-[#CDCDE3]  ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-20"
        >
          <span className="text-blue-600 font-semibold text-sm tracking-wider uppercase mb-4 block">
            About Tusuka
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {title}
          </h2>
          <div className="flex items-center justify-center gap-2">
            <div className="h-1 w-10 bg-blue-600 rounded"></div>
            <div className="h-1 w-20 bg-blue-600 rounded"></div>
            <div className="h-1 w-10 bg-blue-600 rounded"></div>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left Column */}
          
  <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <div className="bg-white rounded-2xl p-10 shadow-lg h-full">
              <div className="space-y-8">
                <div className="flex items-center mb-8">
                  <span className="bg-blue-100 p-3 rounded-lg">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </span>
                  <h3 className="text-2xl font-bold text-gray-900 ml-4">{storyTitle}</h3>
                </div>

                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-600 leading-relaxed mb-6">{foundingVision}</p>
                  <p className="text-gray-600 leading-relaxed">{currentStance}</p>
                </div>

                {/* Stats Section */}
                {/* <div className="grid grid-cols-2 gap-6 py-8">
                  <div className="text-center p-6 bg-gray-50 rounded-xl">
                    <div className="text-4xl font-bold text-blue-600 mb-2">45,000+</div>
                    <div className="text-gray-600">Daily Washing Capacity</div>
                  </div>
                  <div className="text-center p-6 bg-gray-50 rounded-xl">
                    <div className="text-4xl font-bold text-blue-600 mb-2">34</div>
                    <div className="text-gray-600">Sewing Lines</div>
                  </div>
                </div> */}

                {/* Call to Action */}
                <div className="flex items-center gap-4 pt-6">
                  <button className="flex-1 bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl">
                    Download Company Profile
                  </button>
                  <button className="flex-1 bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold border-2 border-blue-600 hover:bg-blue-50 transition-all duration-300">
                    Contact Us
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
          {/* Right Column */}
        <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col space-y-6"
          >


            {/* Growth & Milestones Card */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-6">
                <span className="bg-blue-100 p-3 rounded-lg">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </span>
                <h3 className="text-2xl font-bold text-gray-900 ml-4">Growth & Milestones</h3>
              </div>
              <div className="prose prose-lg">
                <p className="text-gray-600 leading-relaxed">
                  {/* {showFullText ? growthMilestones : truncatedText} */}
                  {growthMilestones}
                </p>
              </div>
              <button
                onClick={() => setShowFullText(!showFullText)}
                className="mt-6 text-blue-600 font-semibold hover:text-blue-700 transition-colors flex items-center"
              >
                {showFullText ? 'Show Less' : 'Read More'}
                <svg 
                  className={`ml-2 w-4 h-4 transform transition-transform ${showFullText ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>


                        {/* Video Section */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-[#EFF5FF] p-2">
              <div className="relative rounded-xl overflow-hidden">
                <iframe
                  src={StoryVideoUrl}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full aspect-video"
                ></iframe>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default OurStorySection;