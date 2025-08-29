// OurClients.tsx
import HandM from "../assets/OldBrandLogo/client-1.png";
import Zara from "../assets/OldBrandLogo/client-2.png";
import Carrefour from "../assets/OldBrandLogo/client-3.png";
import WE from "../assets/OldBrandLogo/client-4.png";
import SiteIcon from "../assets/logotusuka-removebg-preview.png";

// Bigger outline icons
import NewYorker from "../assets/OldBrandLogo/client-5.png";
import MandS from "../assets/OldBrandLogo/client-6.png";
import Varner from "../assets/OldBrandLogo/client-7.png";
import Elcorte from "../assets/OldBrandLogo/client-8.png";
import Guess from "../assets/OldBrandLogo/client-9.png";
import Shima from "../assets/OldBrandLogo/client-10.jpg";
import LPP from "../assets/OldBrandLogo/client-11.png";

type ClientIconProps = {
  icon: string;
  alt: string;
};

const ClientIcon: React.FC<ClientIconProps> = ({ icon, alt }) => (
  <div className="bg-primary/20 w-16 h-16 rounded-full flex items-center justify-center">
    <img src={icon} alt={alt} className="w-16 h-16 object-contain" />
  </div>
);

const icons = [
  { icon: NewYorker, alt: "NewYorker" },
  { icon: MandS, alt: "MandS" },
  { icon: Varner, alt: "Varner" },
  { icon: Guess, alt: "Guess" },
  { icon: Elcorte, alt: "Elcorte" },
  { icon: Shima, alt: "Shima" },
  { icon: LPP, alt: "LPP" },
];

const radius = 190; // outer circle er half size (adjust as needed)


const OurClients = () => {
  return (
    <>
      {/* Custom Animations */}
      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-reverse {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 25s linear infinite;
        }
        .animate-spin-reverse {
          animation: spin-reverse 18s linear infinite;
        }
      `}</style>

      <div className="flex justify-center">
        <div className="relative flex items-center justify-center">
          {/* Bigger Circle */}
          <div className="w-96 h-96 rounded-full border-2 border-dashed border-accent/70 flex items-center justify-center relative">
<div className="absolute inset-0 animate-spin-slow">
  {icons.map((item, i) => {
    const angle = (i / icons.length) * 2 * Math.PI; // evenly spaced
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;

    return (
      <div
        key={i}
        className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
        style={{ transform: `translate(${x}px, ${y}px)` }}
      >
        <ClientIcon icon={item.icon} alt={item.alt} />
      </div>
    );
  })}
</div>

            {/* Smaller Circle */}
            <div className="w-48 h-48 rounded-full border-2 border-dashed border-accent/50 flex items-center justify-center relative">
              <div className="absolute inset-0 animate-spin-reverse">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <ClientIcon icon={HandM} alt="HandM" />
                </div>
                <div className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                  <ClientIcon icon={Carrefour} alt="Carrefour" />
                </div>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
                  <ClientIcon icon={Zara} alt="Zara" />
                </div>
                <div className="absolute top-1/2 left-0 transform -translate-x-1/2 -translate-y-1/2">
                  <ClientIcon icon={WE} alt="WE" />
                </div>
              </div>

              {/* Center Logo */}
              <div className="text-center text-xl font-bold">
                <img src={SiteIcon} alt="Tusuka Logo" className="w-24" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OurClients;
