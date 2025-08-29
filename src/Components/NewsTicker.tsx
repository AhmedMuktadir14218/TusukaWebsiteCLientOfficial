// src/components/NewsTicker.tsx
import React from "react";
 
const headlines = [
  "Bangladesh’s Tusuka improves OTDP, efficiency and job satisfaction rate of staff significantly with FastReactPlan from Coats Digital",
  "Covid vaccination inauguration for RMG sector at Tusuka",
  "Tusuka Awarded Most Innovative Premium Brands Award 2020 From H&M",
  "Tusuka open emergency helpline for corona virus to support Tusuka family",
];

const NewsTicker: React.FC = () => {
  return (
    <div className="w-full   text-black  py-4 overflow-hidden"
          style={{
  // background: "rgba(173, 208, 244, 0.84)", 
  // background: "rgba(110, 109, 120, 0.7)", 
  // background: "rgba(4, 3, 18, 0.19)", 
  // background: "rgba(255, 255, 255, 0.73)", 
  background: "rgb(173 208 244 / 78%)", 
  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
  backdropFilter: "blur(5px)",
  WebkitBackdropFilter: "blur(5px)",
  // border: "1px solid rgba(185, 206, 227, 0.3)"
}}
    >
      <div className="ticker flex whitespace-nowrap">
        {/* repeat twice to create seamless loop */}
        {[...headlines, ...headlines].map((text, i) => (
          <span
            key={i}
            className="mx-8 text-sm md:text-base font-medium inline-block"
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  );
};

export default NewsTicker;
