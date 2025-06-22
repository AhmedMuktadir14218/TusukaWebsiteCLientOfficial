 
import { motion } from 'framer-motion';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { 
  FaIndustry, 
  FaUsers, 
  FaBuilding, 
  FaCogs,   
  FaTshirt,
  FaWater,
  FaSun,
  FaClock,
  FaDollarSign,
  FaChartPie
} from 'react-icons/fa';
import { GiSewingMachine } from "react-icons/gi";
import Image from '../../assets/homeban11.webp'; // Replace with your actual image path
// Register ChartJS components
ChartJS.register(
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const CompanyReport = () => {
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  // Manufacturing data (split into two groups)
  const primaryStats = [
    { id: 1, label: 'Start Manufacturing Unit', value: '2002', icon: <FaIndustry className="text-indigo-600" /> },
    { id: 2, label: 'Total Workers', value: '16,938', icon: <FaUsers className="text-indigo-600" /> },
    { id: 3, label: 'Plant Size', value: '17,27,672 Sqft.', icon: <FaBuilding className="text-indigo-600" /> },
    { id: 4, label: 'Machines', value: '9,331 sets', icon: <FaCogs className="text-indigo-600" /> },
    { id: 5, label: 'Sewing Lines', value: '67 Lines', icon: <FaTshirt className="text-indigo-600" /> },
    { id: 6, label: 'Daily Sewing Capacity', value: '200,000 PCs', icon: < GiSewingMachine className="text-indigo-600" /> }
  ];

  const secondaryStats = [
    { id: 7, label: 'Wet Laundry Capacity', value: '90,000 PCs', icon: <FaWater className="text-indigo-600" /> },
    { id: 8, label: 'Dry Laundry Capacity', value: '105,000 PCs', icon: <FaSun className="text-indigo-600" /> },
    { id: 9, label: 'Production Lead Time', value: '105 days', icon: <FaClock className="text-indigo-600" /> },
    { id: 10, label: 'Yearly Turnover', value: '$228M', icon: <FaDollarSign className="text-indigo-600" /> }
  ];

  // Production capacity chart data
  const capacityData = {
    labels: ['Sewing', 'Wet Laundry', 'Dry Laundry'],
    datasets: [
      {
        label: 'Daily Capacity (PCs)',
        data: [200000, 90000, 105000],
        backgroundColor: [
          'rgba(99, 102, 241, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(168, 85, 247, 0.8)'
        ],
        borderColor: [
          'rgba(99, 102, 241, 1)',
          'rgba(59, 130, 246, 1)',
          'rgba(168, 85, 247, 1)'
        ],
        borderWidth: 1,
      },
    ],
  };

  // Product lines data
  const productLines = [
    {
      name: "Woven Garments",
      categories: [
        "Men’s Shirts",
        "Ladies’ Blouses",
        "Children’s Wear",
        "Uniforms",
        "Workwear",
        "Jackets",
        "Trousers",
        "Shorts"
      ]
    },
    {
      name: "Knit Garments",
      categories: [
        "T-Shirts",
        "Polo Shirts",
        "Sweatshirts",
        "Hoodies",
        "Sportswear",
        "Leggings",
        "Dresses",
        "Sleepwear"
      ]
    }
  ];

  return (
    <section className="  py-16 px-4 md:px-8 bg-gradient-to-br from-gray-50 to-indigo-50">
      <div className="max-w-7xl mx-auto">
        {/* Animated Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our <span className="text-indigo-600">Manufacturing</span> Powerhouse
          </h2>
          <div className="w-24 h-1 bg-indigo-500 mx-auto"></div>
        </motion.div>

        {/* Manufacturing Stats and Pie Chart Row */}
        <div className="flex flex-col lg:flex-row gap-8 mb-20">
          {/* Left Column - Primary Stats */}
          <div className="lg:w-2/3">
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6"
            >
              {primaryStats.map((stat) => (
                <motion.div
                  key={stat.id}
                  variants={item}
                  whileHover={{ y: -5 }}
                  className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all"
                >
                  <div className="text-4xl mb-3 flex justify-center">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold text-indigo-600 mb-1 text-center">{stat.value}</div>
                  <div className="text-gray-700 font-medium text-center">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* Secondary Stats */}
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {secondaryStats.map((stat) => (
                <motion.div
                  key={stat.id}
                  variants={item}
                  whileHover={{ y: -5 }}
                  className="bg-white p-4 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all"
                >
                  <div className="text-3xl mb-2 flex justify-center">
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold text-indigo-600 mb-1 text-center">{stat.value}</div>
                  <div className="text-gray-700 text-sm font-medium text-center">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right Column - Pie Chart */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:w-1/3 bg-white p-6 md:p-8 rounded-2xl shadow-lg flex flex-col"
          >
            <div className="flex items-center mb-6">
              <FaChartPie className="text-indigo-600 text-2xl mr-3" />
              <h3 className="text-2xl font-bold text-gray-800">Daily Production Capacity</h3>
            </div>
            <div className="flex-1 min-h-[300px]">
              <Pie
                data={capacityData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: 'right',
                    },
                    tooltip: {
                      callbacks: {
                        label: function(context) {
                          return `${context.label}: ${(context.raw as number).toLocaleString()} PCs`;
                        }
                      }
                    }
                  },
                  maintainAspectRatio: false
                }}
              />
            </div>
            {/* Additional metrics below pie chart */}
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="bg-indigo-50 p-4 rounded-lg flex items-center">
                <FaClock className="text-indigo-600 mr-3" />
                <div>
                  <div className="text-indigo-600 font-bold text-sm">Lead Time</div>
                  <div className="text-xl font-semibold">105 days</div>
                </div>
              </div>
              <div className="bg-indigo-50 p-4 rounded-lg flex items-center">
                <FaDollarSign className="text-indigo-600 mr-3" />
                <div>
                  <div className="text-indigo-600 font-bold text-sm">Yearly Turnover</div>
                  <div className="text-xl font-semibold">$228M</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Product Lines */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {productLines.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white p-6 md:p-8 rounded-2xl shadow-lg"
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-6">{section.name}</h3>
              <ul className="space-y-3">
                {section.categories.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center py-2 border-b border-gray-100 last:border-0"
                  >
                    <div className="w-2 h-2 rounded-full bg-indigo-500 mr-3"></div>
                    <span className="text-gray-700 text-lg">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Financial & Sister Concerns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
  {/* Financial Institutions */}
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
    className="bg-white p-6 md:p-8 rounded-2xl shadow-lg"
  >
    <h3 className="text-2xl font-bold text-gray-800 mb-6">Banking Partners</h3>

    {/* Bank List */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
      {["Eastern Bank Ltd.", "Uttara Bank Ltd.", "One Bank Ltd.", "The City Bank Ltd."].map((bank, i) => (
        <motion.div
          key={i}
          whileHover={{ scale: 1.03 }}
          className="bg-indigo-50 p-4 rounded-xl flex items-center"
        >
          <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center mr-4">
            <span className="text-indigo-600 font-bold">{bank.charAt(0)}</span>
          </div>
          <span className="text-gray-800 font-medium">{bank}</span>
        </motion.div>
      ))}
    </div>

    {/* Bank Illustration or Logo Image */}
    <div className="mt-4">
      <img
        src={Image} // Replace this with your actual image path
        alt="Banking Illustration"
        className="w-full max-h-64 object-contain rounded-xl shadow-sm"
      />
    </div>
  </motion.div>
{/* </div> */}


          {/* Sister Concerns */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white p-6 md:p-8 rounded-2xl shadow-lg"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Sister Concerns</h3>
            <div className="space-y-4">
              {[
                { name: "Novoair", desc: "Flight and Aviation", icon: "✈️" },
                { name: "Novo Holidays", desc: "Travel agency", icon: "🌴" },
                { name: "Novotel", desc: "IGW and Network agency", icon: "📡" },
                { name: "NovoCom", desc: "IIG", icon: "🖥️" },
                { name: "InterCloud", desc: "ISP provider", icon: "☁️" }
              ].map((concern, i) => (
                <motion.div
                  key={i}
                  whileHover={{ x: 5 }}
                  className="flex items-start p-3 hover:bg-gray-50 rounded-lg transition-all"
                >
                  <span className="text-2xl mr-4 mt-1">{concern.icon}</span>
                  <div>
                    <h4 className="text-lg font-bold text-gray-800">{concern.name}</h4>
                    <p className="text-gray-600">{concern.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CompanyReport;