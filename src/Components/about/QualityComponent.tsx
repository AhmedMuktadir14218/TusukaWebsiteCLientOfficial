// QualityComponent.tsx
 
import { motion } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa';
import image1 from '../../assets/corepointBG.webp';
import image2 from '../../assets/Ban_Tushuka_USAID (64).jpg';

const QualityComponent = () => {
  const qualitySteps = [
    { title: "Sample Procedure", description: "Systematic approach to sample development and approval" },
    { title: "Measurement Method", description: "Precise measurement techniques for accuracy" },
    { title: "Shade Checking Method", description: "Thorough color consistency verification" },
    { title: "Light Box", description: "Professional color matching under standardized lighting" },
    { title: "Fabric Inspection", description: "Detailed examination of fabric quality" },
    { title: "Fabric Storage", description: "Controlled environment for material preservation" },
    { title: "Fabric Shrinkage", description: "Comprehensive shrinkage testing" },
    { title: "Accessories", description: "Quality control of all supplementary materials" },
    { title: "Production", description: "Monitored manufacturing process" },
    { title: "Trial cutting", description: "Initial cutting verification" },
    { title: "Spreading and Cutting", description: "Precision in material utilization" },
    { title: "Stitching", description: "Expert sewing quality control" },
    { title: "Thread Cutting/Trimming", description: "Detailed finishing process" },
    { title: "Needle Detection", description: "Advanced safety inspection" },
    { title: "Inspection", description: "Final quality assurance check" }
  ];

  return (
    <div className="bg-white">
    {/* Header Section */} 
<div
  className="relative h-[60vh] bg-fixed bg-center bg-cover flex items-center justify-center"
  style={{ backgroundImage: `url(${image1})` }}
>
  {/* Overlay */}
  <div className="absolute inset-0 bg-black/70"></div>

  {/* Content */}
  <div className="relative z-10 text-center px-4">
    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
      Quality Assurance
    </h1>
    <p className="text-lg text-white max-w-2xl mx-auto">
      Tusuka maintains stringent quality control standards across all factories,
      ensuring products meet precise customer specifications through our
      dedicated quality assurance teams.
    </p>
  </div>
</div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        {/* Overview Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className=" container mx-auto ">
            <h2 className="text-3xl font-bold mb-6">Quality Control Process</h2>
            <p className="text-gray-600 leading-relaxed w-full">
              Tusuka has very strong and efficient Quality Controlling team in all the factories who make sure the sewing quality is according to the customer’s requirement. We also have a central QA team who assist the factory QA team in every aspects of quality controlling. In case of every new input, our factory conducts an internal PP meeting with all the QA personals in that line and all the operations are elaborately discussed in that meeting. All the QA stuffs make sure that they fully understand the quality requirement of each and every operation and then only factory goes into bulk production.
            </p>
          </div>
        </motion.div>

        {/* Quality Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {qualitySteps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start space-x-4">
                <FaCheckCircle className="text-blue-600 text-xl mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-16 bg-gray-50 rounded-lg p-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <img
                src={image2}
                alt="Quality Process"
                className="rounded-lg"
              />
            </div>
            <div className="md:w-1/2">
              <h3 className="text-2xl font-bold mb-4">
                Our Commitment to Excellence
              </h3>
              <p className="text-gray-600 mb-4">
                Every quality assurance team member is thoroughly trained in our 
                comprehensive quality control procedures. We ensure complete 
                understanding of quality requirements for each operation before 
                proceeding to bulk production.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <FaCheckCircle className="text-blue-600" />
                  <span>Dedicated QA teams in all facilities</span>
                </li>
                <li className="flex items-center gap-2">
                  <FaCheckCircle className="text-blue-600" />
                  <span>Comprehensive quality control system</span>
                </li>
                <li className="flex items-center gap-2">
                  <FaCheckCircle className="text-blue-600" />
                  <span>Regular quality audits and reviews</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QualityComponent;