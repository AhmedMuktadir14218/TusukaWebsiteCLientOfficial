/* eslint-disable @typescript-eslint/no-explicit-any */
// CoreComponentModal.tsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ModalProps {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

export const BaseModal: React.FC<ModalProps> = ({ isOpen, title, onClose, children }) => {
  React.useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-75 backdrop-blur-sm  p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-white rounded-lg overflow-hidden w-full max-w-4xl max-h-[90vh] flex flex-col shadow-xl"
          initial={{ scale: 0.9, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 50 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="bg-gradient-to-r from-blue-900 to-blue-700 p-6 text-white">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">{title}</h2>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
          
          <div className="overflow-y-auto p-6 flex-1">
            {children}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Market Modal
export const MarketModal: React.FC<{ data: any; isOpen: boolean; onClose: () => void }> = ({ data, isOpen, onClose }) => {
  return (
    <BaseModal isOpen={isOpen} title="Our Market" onClose={onClose}>
      <div className="space-y-6 hide-scrollbar">
        <div>
          <h3 className="text-xl font-semibold mb-4 text-blue-800">Customer Table</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-2 px-4 border-b border-gray-200 text-left">Customer Name</th>
                  <th className="py-2 px-4 border-b border-gray-200 text-left">Country</th>
                </tr>
              </thead>
              <tbody>
                {data.customerTable.map((customer: any, index: number) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="py-2 px-4 border-b border-gray-200">{customer['Customer Name']}</td>
                    <td className="py-2 px-4 border-b border-gray-200">{customer.Country}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-semibold mb-2 text-blue-800">Market Distribution</h3>
          <p className="text-gray-700">{data.marketDistributionChartDescription}</p>
        </div>
      </div>
    </BaseModal>
  );
};

// Sourcing Modal
export const SourcingModal: React.FC<{ data: any; isOpen: boolean; onClose: () => void }> = ({ data, isOpen, onClose }) => {
  return (
    <BaseModal isOpen={isOpen} title="Sourcing" onClose={onClose}>
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-2 text-blue-800">Main Sources</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-700 mb-2">Overseas</h4>
              <ul className="list-disc pl-5 space-y-1">
                {data.mainSources.overseas.map((source: string, index: number) => (
                  <li key={index}>{source}</li>
                ))}
              </ul>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-700 mb-2">Local</h4>
              <ul className="list-disc pl-5 space-y-1">
                {data.mainSources.local.map((source: string, index: number) => (
                  <li key={index}>{source}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-semibold mb-2 text-blue-800">Other Production Details</h3>
          <p className="text-gray-700">{data.otherProductionDetails}</p>
        </div>
        
        <div>
          <h3 className="text-xl font-semibold mb-2 text-blue-800">Chemical Suppliers</h3>
          <div className="flex flex-wrap gap-2">
            {data.chemicalSuppliers.map((supplier: string, index: number) => (
              <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                {supplier}
              </span>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-semibold mb-2 text-blue-800">Supplier Partnerships</h3>
          <p className="text-gray-700">{data.supplierPartnerships}</p>
        </div>
      </div>
    </BaseModal>
  );
};

// Code of Conduct Modal
export const CodeOfConductModal: React.FC<{ data: any; isOpen: boolean; onClose: () => void }> = ({ data, isOpen, onClose }) => {
  return (
    <BaseModal isOpen={isOpen} title="Code of Conduct" onClose={onClose}>
      <div className="space-y-6">
        <p className="text-gray-700">{data.introduction}</p>
        
        <div className="space-y-4">
          {Object.entries(data.principles).map(([key, value]) => (
            <div key={key} className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-700 mb-2">
                {key.split(/(?=[A-Z])/).join(' ')}
              </h3>
              <p className="text-gray-700">{value as string}</p>
            </div>
          ))}
        </div>
      </div>
    </BaseModal>
  );
};

// Research and Development Modal
export const ResearchDevelopmentModal: React.FC<{ data: any; isOpen: boolean; onClose: () => void }> = ({ data, isOpen, onClose }) => {
  return (
    <BaseModal isOpen={isOpen} title="Research & Development" onClose={onClose}>
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-2 text-blue-800">Denim Fabric & Sustainability Focus</h3>
          <p className="text-gray-700">{data.denimFabricAndSustainabilityFocus}</p>
        </div>
        
        <div>
          <h3 className="text-xl font-semibold mb-2 text-blue-800">Prime Function</h3>
          <p className="text-gray-700">{data.primeFunction}</p>
        </div>
        
        <div>
          <h3 className="text-xl font-semibold mb-2 text-blue-800">Sustainable Practices & Technologies</h3>
          <p className="text-gray-700">{data.sustainablePracticesAndTechnologies}</p>
        </div>
        
        <div>
          <h3 className="text-xl font-semibold mb-2 text-blue-800">In-House Design & Development</h3>
          <p className="text-gray-700">{data.inHouseDesignAndDevelopment}</p>
        </div>
        
        <div>
          <h3 className="text-xl font-semibold mb-2 text-blue-800">Sustainable Trims Focus</h3>
          <p className="text-gray-700">{data.sustainableTrimsFocus}</p>
        </div>
      </div>
    </BaseModal>
  );
};

// Safety Modal
export const SafetyModal: React.FC<{ data: any; isOpen: boolean; onClose: () => void }> = ({ data, isOpen, onClose }) => {
  return (
    <BaseModal isOpen={isOpen} title="Safety" onClose={onClose}>
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-2 text-blue-800">Workplace Safety</h3>
          <p className="text-gray-700 mb-4">{data.workplaceSafety.introduction}</p>
          <p className="text-gray-700">{data.workplaceSafety.responseToIncidents}</p>
        </div>
        
        <div>
          <h3 className="text-xl font-semibold mb-2 text-blue-800">Fire Safety</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-blue-700 mb-1">Electro-Mechanical System</h4>
              <p className="text-gray-700">{data.fireSafety.electroMechanicalSystem}</p>
            </div>
            <div>
              <h4 className="font-medium text-blue-700 mb-1">Material Selection</h4>
              <p className="text-gray-700"><span className="font-medium">Wiring:</span> {data.fireSafety.materialSelection.wiring}</p>
            </div>
            <div>
              <h4 className="font-medium text-blue-700 mb-1">Panel Boards</h4>
              <p className="text-gray-700">{data.fireSafety.panelBoards}</p>
            </div>
            <div>
              <h4 className="font-medium text-blue-700 mb-1">Mechanical Component</h4>
              <p className="text-gray-700">{data.fireSafety.mechanicalComponent}</p>
            </div>
            <div>
              <h4 className="font-medium text-blue-700 mb-1">Fire Alarm</h4>
              <p className="text-gray-700">{data.fireSafety.fireAlarm}</p>
            </div>
            <div>
              <h4 className="font-medium text-blue-700 mb-1">Fire Extinction</h4>
              <p className="text-gray-700">{data.fireSafety.fireExtinction}</p>
            </div>
            <div>
              <h4 className="font-medium text-blue-700 mb-1">Fire Escape</h4>
              <p className="text-gray-700">{data.fireSafety.fireEscape}</p>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-semibold mb-2 text-blue-800">Security Surveillance System</h3>
          <div className="space-y-2">
            <p className="text-gray-700"><span className="font-medium">Coverage:</span> {data.securitySurveillanceSystem.coverage}</p>
            <p className="text-gray-700"><span className="font-medium">Monitoring Team:</span> {data.securitySurveillanceSystem.monitoringTeam}</p>
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-semibold mb-2 text-blue-800">Building Safety</h3>
          <p className="text-gray-700">{data.buildingSafety.designStandards}</p>
        </div>
        
        <div>
          <h3 className="text-xl font-semibold mb-2 text-blue-800">Materials & Quality Control</h3>
          <p className="text-gray-700">{data.materialsAndQualityControl}</p>
        </div>
        
        <div>
          <h3 className="text-xl font-semibold mb-2 text-blue-800">Job Safety Environment</h3>
          <p className="text-gray-700"><span className="font-medium">Focus:</span> {data.jobSafetyEnvironment.focus}</p>
          <p className="text-gray-700"><span className="font-medium">Practices:</span> {data.jobSafetyEnvironment.practices}</p>
        </div>
      </div>
    </BaseModal>
  );
};

// Social Benefit Modal
export const SocialBenefitModal: React.FC<{ data: any; isOpen: boolean; onClose: () => void }> = ({ data, isOpen, onClose }) => {
  return (
    <BaseModal isOpen={isOpen} title="Social Benefit" onClose={onClose}>
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-2 text-blue-800">Introduction</h3>
          <p className="text-gray-700">{data.introduction}</p>
        </div>
        
        <div>
          <h3 className="text-xl font-semibold mb-2 text-blue-800">Core Values & Competitive Advantage</h3>
          <p className="text-gray-700">{data.coreValuesAndCompetitiveAdvantage}</p>
        </div>
        
        <div>
          <h3 className="text-xl font-semibold mb-2 text-blue-800">Key Practices</h3>
          <ul className="list-disc pl-5 space-y-2">
            {data.keyPractices.map((practice: string, index: number) => (
              <li key={index} className="text-gray-700">{practice}</li>
            ))}
          </ul>
        </div>
      </div>
    </BaseModal>
  );
};