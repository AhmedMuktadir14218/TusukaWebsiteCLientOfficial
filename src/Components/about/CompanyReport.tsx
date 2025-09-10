// // src/components/CompanyReport.tsx 


// src/components/CompanyReport.tsx
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
import { useEffect, useState } from 'react';
import axios from 'axios';

// Register ChartJS components
ChartJS.register(
  ArcElement,
  Title,
  Tooltip,
  Legend
);

// Icon mapping
const iconComponents: Record<string, React.ReactNode> = {
  industry: <FaIndustry className="text-[#4d4d4d] " />,
  users: <FaUsers className="text-[#4d4d4d] " />,
  building: <FaBuilding className="text-[#4d4d4d] " />,
  cogs: <FaCogs className="text-[#4d4d4d] " />,
  tshirt: <FaTshirt className="text-[#4d4d4d] " />,
  sewing: <GiSewingMachine className="text-[#4d4d4d] " />,
  water: <FaWater className="text-[#4d4d4d] " />,
  sun: <FaSun className="text-[#4d4d4d] " />,
  clock: <FaClock className="text-[#4d4d4d] " />,
  dollar: <FaDollarSign className="text-[#4d4d4d] " />,
  chart: <FaChartPie className="text-[#4d4d4d] " />
};

interface CompanyData {
  title: {
    main: string;
    highlighted: string;
  };
  stats: {
    primary: Array<{ id: number; label: string; value: string; icon: string }>;
    secondary: Array<{ id: number; label: string; value: string; icon: string }>;
  };
  productionCapacity: {
    title: string;
    data: any;
    metrics: Array<{ label: string; value: string; icon: string }>;
  };
  units?: Array<{
    title: string;
    description: string;
    plants: Array<{
      name: string;
      shortDescription: string;
      images: string[];
      details: Record<string, any>;
    }>;
  }>;
  bankingPartners: {
    title: string;
    banks: string[];
    imagePath: string;
  };
  sisterConcerns: {
    title: string;
    concerns: Array<{ name: string; desc: string; icon: string }>;
  };
}

const CompanyReport = () => {
  const [companyData, setCompanyData] = useState<CompanyData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
 const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/about-company`,);
        const apiData = response.data;

        // Transform API data to match your component's structure
        const transformedData: CompanyData = {
          title: {
            main: apiData.main_title.replace(apiData.highlighted_title, ''),
            highlighted: apiData.highlighted_title
          },
          stats: {
            primary: apiData.primary_stats.map((stat: any) => ({
              id: stat.id,
              label: stat.label,
              value: stat.value,
              icon: stat.icon
            })),
            secondary: apiData.secondary_stats.map((stat: any) => ({
              id: stat.id,
              label: stat.label,
              value: stat.value,
              icon: stat.icon
            }))
          },
          productionCapacity: {
            title: apiData.production_capacity.title,
            data: {
              labels: apiData.production_capacity.datasets.map((d: any) => d.label),
              datasets: [{
                label: 'Production Capacity',
                data: apiData.production_capacity.datasets.map((d: any) => d.data),
                backgroundColor: apiData.production_capacity.datasets.map((d: any) => d.background_color),
                borderColor: apiData.production_capacity.datasets.map((d: any) => d.border_color),
                borderWidth: 1
              }]
            },
            metrics: apiData.production_capacity.metrics.map((metric: any) => ({
              label: metric.label,
              value: metric.value,
              icon: metric.icon
            }))
          },
          units: apiData.units.map((unit: any) => ({
            title: unit.title,
            description: '',
            plants: unit.plants.map((plant: any) => ({
              name: plant.name,
              shortDescription: '',
              images: [],
              details: plant.details.reduce((acc: any, detail: any) => {
                acc[detail.key] = detail.value;
                return acc;
              }, {})
            }))
          })),
          bankingPartners: {
            title: 'Banking Partners',
            banks: apiData.banking_partners.map((bank: any) => bank.name),
            imagePath: apiData.banking_partners.find((bank: any) => bank.image_path)?.image_path || ''
          },
          sisterConcerns: {
            title: 'Sister Concerns',
            concerns: apiData.sister_concerns.map((concern: any) => ({
              name: concern.name,
              desc: concern.description,
              icon: concern.icon
            }))
          }
        };

        setCompanyData(transformedData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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

  if (loading) {
    return <div className="text-center py-20">Loading company data...</div>;
  }

  if (error) {
    return <div className="text-center py-20 text-red-500">Error: {error}</div>;
  }

  if (!companyData) {
    return <div className="text-center py-20">No data available</div>;
  }

  return (
    <section className="relative py-16 px-4 md:px-8  ">
      <div className="container mx-auto">
        {/* Animated Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {companyData.title.main.split(' ')[0]} <span className="text-[#4d4d4d] ">{companyData.title.highlighted}</span> {companyData.title.main.split(' ').slice(1).join(' ')}
          </h2>
          <div className="w-24 h-1 bg-[#363D44] container mx-auto"></div>
        </motion.div>

        {/* Manufacturing Stats and Pie Chart Row */}
{/* Manufacturing Stats and Pie Chart Row */}
<div className="flex flex-col lg:flex-row gap-8 mb-20 items-stretch">
  {/* Left Column - Primary + Secondary Stats */}
  <div className="lg:w-2/3 flex flex-col h-full">
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6"
    >
      {companyData.stats.primary.map((stat) => (
        <motion.div
          key={stat.id}
          variants={item}
          whileHover={{ y: -5 }}
          className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all"
        >
          <div className="text-4xl mb-3 flex justify-center">
            {iconComponents[stat.icon]}
          </div>
          <div className="text-3xl font-bold text-[#4d4d4d] mb-1 text-center">
            {stat.value}
          </div>
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
      className="grid grid-cols-2 lg:grid-cols-4 gap-6 flex-1"
    >
      {companyData.stats.secondary.map((stat) => (
        <motion.div
          key={stat.id}
          variants={item}
          whileHover={{ y: -5 }}
          className="bg-white p-[30px] rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all"
        >
          <div className="text-3xl mb-2 flex justify-center">
            {iconComponents[stat.icon]}
          </div>
          <div className="text-2xl font-bold text-[#4d4d4d] mb-1 text-center">
            {stat.value}
          </div>
          <div className="text-gray-700 text-sm font-medium text-center">
            {stat.label}
          </div>
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
   className="lg:w-1/3 bg-white p-6 md:p-8 rounded-2xl shadow-lg flex flex-col max-h-[550px]"

  >
    <div className="flex items-center mb-6">
      <FaChartPie className="text-[#4d4d4d] text-2xl mr-3" />
      <h3 className="text-2xl font-bold text-gray-800">
        {companyData.productionCapacity.title}
      </h3>
    </div>
    <div className="flex-1 min-h-[300px]">
<Pie
  data={{
    ...companyData.productionCapacity.data,
    datasets: companyData.productionCapacity.data.datasets.map((ds) => ({
      ...ds,
      backgroundColor: ["#ccddafc2", "#363D44", "#4d4d4d"], // your colors
      borderColor: "#ffffff", // keeps white border between slices
      borderWidth: 2,
    })),
  }}
  options={{
    responsive: true,
    plugins: {
      legend: { position: "right" },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.label}: ${(context.raw as number).toLocaleString()} PCs`;
          },
        },
      },
    },
    maintainAspectRatio: false,
  }}
/>

    </div>
    {/* Additional metrics below pie chart */}
    <div className="mt-6 grid grid-cols-2 gap-4">
      {companyData.productionCapacity.metrics.map((metric, i) => (
        <div
          key={i}
          className="bg-[#ccddaf5e] p-4 rounded-lg flex items-center"
        >
          {iconComponents[metric.icon]}
          <div className="ml-3">
            <div className="text-[#4d4d4d] font-bold text-sm">
              {metric.label}
            </div>
            <div className="text-xl font-semibold">{metric.value}</div>
          </div>
        </div>
      ))}
    </div>
  </motion.div>
</div>


    {/* Manufacturing Units Section */}
{/* Manufacturing Plants Section */}
<div className="mb-20">
  <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
    className="mb-12 text-center"
  >
    <h3 className="text-3xl font-bold text-gray-800 mb-4">
      Manufacturing Plants
    </h3>
    <div className="w-24 h-1 bg-[#363D44] mx-auto"></div>
  </motion.div>

  <motion.div
    variants={container}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true }}
    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
  >
    {companyData.units?.flatMap(unit => 
      unit.plants.map((plant, plantIndex) => {
        // Extract capacity from plant details
        const capacityDetail = plant.details.capacity || plant.details.Capacity;
        const employeesDetail = plant.details.employees || plant.details.Employees;
        const spaceDetail = plant.details.space || plant.details.Space;

        return (
          <motion.div
            key={plantIndex}
            variants={item}
            whileHover={{ 
              y: -5,
              boxShadow: "0 10px 25px -5px rgba(99, 102, 241, 0.3)"
            }}
            className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 transition-all duration-300 cursor-pointer"
          >
            <div className="p-6">
              <div className="flex items-start mb-4">
                <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center mr-4">
                  <FaIndustry className="text-[#4d4d4d]  text-xl" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-800">
                    {plant.name}
                  </h4>
                  {unit.title && (
                    <span className="text-xs text-[#4d4d4d]  bg-indigo-50 px-2 py-1 rounded-full">
                      {unit.title}
                    </span>
                  )}
                </div>
              </div>
              
              <div className="space-y-3">
                {capacityDetail && (
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-indigo-50 rounded-full flex items-center justify-center mr-3">
                      <GiSewingMachine className="text-[#363D44] text-sm" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Capacity</p>
                      <p className="text-sm font-medium text-gray-800">{capacityDetail}</p>
                    </div>
                  </div>
                )}
                
                {employeesDetail && (
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-indigo-50 rounded-full flex items-center justify-center mr-3">
                      <FaUsers className="text-[#363D44] text-sm" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Employees</p>
                      <p className="text-sm font-medium text-gray-800">{employeesDetail}</p>
                    </div>
                  </div>
                )}
                
                {spaceDetail && (
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-indigo-50 rounded-full flex items-center justify-center mr-3">
                      <FaBuilding className="text-[#363D44] text-sm" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Space</p>
                      <p className="text-sm font-medium text-gray-800">{spaceDetail}</p>
                    </div>
                  </div>
                )}
              </div>
              
              {/* <div className="mt-4 pt-4 border-t border-gray-100">
                <button className="text-xs text-[#4d4d4d]  hover:text-indigo-800 font-medium flex items-center">
                  View Details
                  <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div> */}
            </div>
          </motion.div>
        );
      })
    )}
  </motion.div>
</div>
        {/* Financial & Sister Concerns */}
        {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white p-6 md:p-8 rounded-2xl shadow-lg"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6">{companyData.bankingPartners.title}</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {companyData.bankingPartners.banks.map((bank, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.03 }}
                  className="bg-indigo-50 p-4 rounded-xl flex items-center"
                >
                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center mr-4">
                    <span className="text-[#4d4d4d]  font-bold">{bank.charAt(0)}</span>
                  </div>
                  <span className="text-gray-800 font-medium">{bank}</span>
                </motion.div>
              ))}
            </div>

            {companyData.bankingPartners.imagePath && (
              <div className="mt-4">
                <img
                  src={companyData.bankingPartners.imagePath}
                  alt="Banking Illustration"
                  className="w-full max-h-64 object-contain rounded-xl shadow-sm"
                />
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white p-6 md:p-8 rounded-2xl shadow-lg"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6">{companyData.sisterConcerns.title}</h3>
            <div className="space-y-4">
              {companyData.sisterConcerns.concerns.map((concern, i) => (
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
        </div> */}
      </div>
    </section>
  );
};

export default CompanyReport;