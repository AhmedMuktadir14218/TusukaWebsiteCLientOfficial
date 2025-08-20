// Components/Laboratory/LabIntroSection.tsx
import React from 'react';

interface LabIntroSectionProps {
  title: string;
  paragraphs: string[];
  image: string;
  bgColor?: string;
}

const LabIntroSection: React.FC<LabIntroSectionProps> = ({ title, paragraphs, image, bgColor = 'bg-white', }) => {
  return (
    <section className={`py-12 sm:py-16 md:py-20 lg:py-24  ${bgColor} relative z-10`} >`
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          
          {/* Text Content */}
          <div className="space-y-4 sm:space-y-6 animate-fade-in-left" style={{ animationDelay: '200ms' }}>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 leading-tight">
              {title}
            </h2>
            <div className="space-y-4">
              {paragraphs.map((paragraph, index) => (
                <p key={index} className="text-base sm:text-lg text-gray-600 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="relative animate-fade-in-right" style={{ animationDelay: '400ms' }}>
            <div className="relative rounded-xl overflow-hidden shadow-2xl transform hover:scale-102 transition-transform duration-500 ease-in-out">
              <img
                src={image}
                alt="Laboratory Equipment"
                className="w-full h-[350px] sm:h-[450px] md:h-[500px] object-cover filter brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-500/10 rounded-full z-0 animate-bounce-slow"></div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default LabIntroSection;
