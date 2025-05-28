import React from 'react';
import type { TeamMember } from '../../types/about';
 
interface MeetTheTeamProps {
  title: string;
  introduction: string;
  members: TeamMember[];
}

const MeetTheTeam: React.FC<MeetTheTeamProps> = ({ 
  title, 
  introduction, 
  members 
}) => {
  return (
    <section id="team" className="py-16 px-4 md:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-900">{title}</h2>
        <p className="text-lg text-center text-gray-600 max-w-3xl mx-auto mb-12">{introduction}</p>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {members.map((member) => (
            <div key={member.id} className="bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <img 
                src={member.imageSrc} 
                alt={member.name} 
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
                <p className="text-indigo-600 mb-3">{member.title}</p>
                <p className="text-gray-600 mb-4">{member.bio}</p>
                {member.linkedInUrl && (
                  <a 
                    href={member.linkedInUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-indigo-600 hover:text-indigo-800"
                  >
                    <span>LinkedIn</span>
                    <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MeetTheTeam;