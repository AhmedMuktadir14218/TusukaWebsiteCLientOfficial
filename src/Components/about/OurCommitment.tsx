import React from 'react';
import type { CommitmentArea } from '../../types/about';
 
interface OurCommitmentProps {
  title: string;
  areas: CommitmentArea[];
  conclusion: string;
}

const OurCommitment: React.FC<OurCommitmentProps> = ({ 
   
  areas, 
  conclusion 
}) => {
  return (
    <section className="py-16 px-4 md:px-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        {/* <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">{title}</h2> */}
        
        <div className="space-y-8">
          {areas.map((area, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4 text-indigo-600">{area.title}</h3>
              <p className="text-gray-700">{area.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-lg font-medium text-gray-800 italic">{conclusion}</p>
        </div>
      </div>
    </section>
  );
};

export default OurCommitment;