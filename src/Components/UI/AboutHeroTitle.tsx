import React, { useEffect, useRef, useState } from 'react';

const AboutHeroTitle: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const titleRef = useRef<HTMLDivElement>(null);
  
  const exploreLetters = ['E', 'X', 'P', 'L', 'O', 'R', 'E'];
  const dblLetters = ['D', 'B', 'L'];
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );
    
    if (titleRef.current) {
      observer.observe(titleRef.current);
    }
    
    return () => {
      if (titleRef.current) {
        observer.unobserve(titleRef.current);
      }
    };
  }, []);

  return (
    <div ref={titleRef} className="title-block mb-10 md:mb-40 hidden md:block">
      <h1 id="discovertitle" className="title text-4xl md:text-6xl font-bold tracking-wide">
        {exploreLetters.map((letter, index) => (
          <div
            key={`explore-${index}`}
            className={`inline-block relative transition-all duration-500 ease-out ${
              isVisible 
                ? 'translate-y-0 opacity-100' 
                : `translate-y-5 opacity-0 ${index % 2 === 0 ? '' : '-translate-y-5'}`
            }`}
            style={{ transitionDelay: `${index * 0.1}s` }}
          >
            {letter}
          </div>
        ))}
        
        <div className="inline-block w-4"></div>
        
        {dblLetters.map((letter, index) => (
          <div
            key={`dbl-${index}`}
            className={`inline-block relative transition-all duration-500 ease-out ${
              isVisible 
                ? 'translate-y-0 opacity-100' 
                : `translate-y-5 opacity-0 ${index % 2 === 0 ? '' : '-translate-y-5'}`
            }`}
            style={{ transitionDelay: `${(exploreLetters.length + index) * 0.1}s` }}
          >
            {letter}
          </div>
        ))}
      </h1>
      
      <span 
        id="discoversmtitle" 
        className={`sm-title block mt-2 text-sm md:text-base opacity-70 transition-opacity duration-500 ease-out ${
          isVisible ? 'opacity-70' : 'opacity-0'
        }`}
        style={{ transitionDelay: '0.8s' }}
      >
        EXPLORE DBL
      </span>
    </div>
  );
};

export default AboutHeroTitle;