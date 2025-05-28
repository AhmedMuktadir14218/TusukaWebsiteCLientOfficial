import React from 'react';
import type { CompanyValue } from '../../types/about';
 
interface MissionValuesProps {
  title: string;
  mission: string;
  vision: string;
  values: CompanyValue[];
}

const MissionValues: React.FC<MissionValuesProps> = ({ 
  title, 
  mission, 
  vision, 
  values 
}) => {
  return (
    <section id="mission" className="py-16 px-4 md:px-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">{title}</h2>
        
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-4 text-indigo-600">Our Mission</h3>
            <p className="text-gray-700">{mission}</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-4 text-indigo-600">Our Vision</h3>
            <p className="text-gray-700">{vision}</p>
          </div>
        </div>
        
        <h3 className="text-2xl font-semibold mb-8 text-center text-gray-800">Our Core Values</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {values.map((value, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center mr-4">
                  <span className="text-indigo-600">{index + 1}</span>
                </div>
                <h4 className="text-lg font-semibold text-gray-800">{value.name}</h4>
              </div>
              <p className="text-gray-600">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MissionValues;