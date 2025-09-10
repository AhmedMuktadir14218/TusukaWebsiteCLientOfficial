import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-creative";

import {
  Navigation,
  Pagination,
  Autoplay,
  EffectCreative,
} from "swiper/modules";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaQuoteLeft,
  FaEnvelope,
  FaTwitter,
  FaGithub,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Modal, Typography } from "@mui/material";

type Person = {
  id: number;
  name: string;
  title: string;
  image: string;
  address: { email: string; house: string };
  social_media: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
    github?: string;
  };
  description: { section: string; content: string }[];
};

function HomeDirectorSlider() {
  const [directors, setDirectors] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedDirector, setSelectedDirector] = useState<Person | null>(null);

  const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

  useEffect(() => {
    axios
      .get<{ data: Person[] }>(`${API_BASE_URL}/api/directors`)
      .then((res) => setDirectors(res.data.data))
      .catch((err) => console.error("Error fetching directors:", err))
      .finally(() => setLoading(false));
  }, [API_BASE_URL]);

  const handleOpen = (director: Person) => {
    setSelectedDirector(director);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const fullImageUrl = (path: string) => {
    const fixedPath = path.includes("uploads/directors/")
      ? path
      : path.replace("uploads/", "public/uploads/directors/");
    return `${API_BASE_URL}/${fixedPath}`;
  };

  if (loading) {
    return (
      <div className="py-12 flex items-center justify-center">
        <p className="text-lg text-gray-600">Loading directors…</p>
      </div>
    );
  }

  if (!directors.length) {
    return (
      <div className="py-12 flex items-center justify-center">
        <p className="text-lg text-gray-600">No directors found.</p>
      </div>
    );
  }

  return (
 <div className="relative w-full bg-[var(--color-accent)] overflow-visible">
    {/* Top Polygon */}
<div
  className="absolute bottom-[-239px] left-0 w-full h-60 bg-[var(--color-accent)]"
  style={{
    clipPath: "polygon(100% 0, 0 0, 100% 100%)",
  }}
/>


    {/* Bottom Polygon */}
 
{/* <div
  className="absolute top-[-384px] left-0 w-full h-96 bg-[#ccddafc2]"
  style={{
    clipPath: "polygon(100% 100%, 0 0, 0 100%)",
  }}
/> */}
 

    {/* Content */}
    <div className="  container mx-auto px-4 py-12 z-30">
      <h1 className="text-center font-bold py-8 text-3xl md:text-5xl text-[var(--color-titleText)] uppercase">
        Board of Directors
      </h1>
 
    {/* <div className="container mx-auto px-4 py-16">
      <h1 className="text-center font-bold py-8 text-3xl md:text-4xl">Board of Directors</h1>  */}
      
      {/* Responsive grid with proper ordering */}
      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6 xl:gap-8 py-8 lg:py-14">
        {/* Slider - First on all screens except mobile */}
        <div className="order-2 md:order-1 lg:col-span-8 xl:col-span-8 relative">
          <Swiper
            modules={[Navigation, Pagination, Autoplay, EffectCreative]}
            navigation={{
              prevEl: ".swiper-button-prev-custom",
              nextEl: ".swiper-button-next-custom",
            }}
            // pagination={{ clickable: true }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            loop
            effect="creative"
            creativeEffect={{
              prev: { shadow: true, translate: ["-20%", 0, -1] },
              next: { translate: ["100%", 0, 0] },
            }}
            className="rounded-2xl shadow-xl"
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 10
              },
              1024: {
                slidesPerView: 1,
                spaceBetween: 20
              },
              1280: {
                slidesPerView: 1,
                spaceBetween: 30
              }
            }}
          >
            {directors.map((person) => {
              const intro =
                person.description.find((d) => d.section === "Introduction")
                  ?.content || "";
              const PREVIEW_LENGTH = 300;
              const preview =
                intro.length > PREVIEW_LENGTH
                  ? intro.slice(0, PREVIEW_LENGTH).trim() + "…"
                  : intro;

              return (
                <SwiperSlide key={person.id}>
                  <div className="relative bg-white rounded-2xl shadow-3xl border-2 border-gray-200 overflow-hidden h-auto md:h-[340px] flex flex-col md:flex-row">
                    {/* Left: Image */}
                    <div className="md:w-[32%] lg:w-[32%] xl:w-[32%] relative">
<img
  src={fullImageUrl(person.image)}
  alt={person.name}
  className="absolute inset-0 w-full h-full object-contain bg-gray-100"
/>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <div className="absolute bottom-0 left-0 w-full p-4 text-white">
                        <h3 className="text-xl md:text-2xl font-bold">{person.name}</h3>
                        <p className="text-sm md:text-lg text-white">{person.title}</p>
                      </div>
                    </div>

                    {/* Right: Content */}
                    <div className="md:w-4/5 lg:w-4/5 xl:w-4/5 flex flex-col p-4 md:p-6 bg-[var(--color-accentSoft)]" >
                      <FaQuoteLeft className="text-2xl md:text-3xl text-[var(--color-accent)]/40 mb-2" />
                      <p className="text-gray-600 text-xs md:text-sm lg:text-base flex-grow">
                        {preview}
                      </p>

                      {/* Contact */}
                      <div className="mt-4 space-y-3">
                        {/* <div className="flex items-center space-x-2 text-xs md:text-sm text-gray-600 bg-gray-50 rounded-lg p-2">
                          <FaEnvelope className="text-[#ccddaf] flex-shrink-0" />
                          <a
                            href={`mailto:${person.address.email}`}
                            className="hover:text-[#0b36af] truncate"
                          >
                            {person.address.email}
                          </a>
                        </div> */}

                        {/* Social + Button */}
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                          {/* <div className="flex space-x-2">
                            {person.social_media.facebook && (
                              <SocialLink
                                href={person.social_media.facebook}
                                icon={FaFacebookF}
                              />
                            )}
                            {person.social_media.twitter && (
                              <SocialLink
                                href={person.social_media.twitter}
                                icon={FaTwitter}
                              />
                            )}
                            {person.social_media.linkedin && (
                              <SocialLink
                                href={person.social_media.linkedin}
                                icon={FaLinkedinIn}
                              />
                            )}
                            {person.social_media.github && (
                              <SocialLink
                                href={person.social_media.github}
                                icon={FaGithub}
                              />
                            )}
                          </div> */}
                          <button
                            onClick={() => handleOpen(person)}
                            className="px-3 py-1.5 md:px-4 md:py-2 bg-[var(--color-buttonBg)]  text-[var(--color-buttonText)] rounded-full hover:bg-[var(--color-navFootBG)]  transition text-sm md:text-base"
                          >
                            View Profile
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>

        {/* Video - Second on sm/md screens, right on lg/xl screens */}
        <div className="order-1 md:order-2 lg:col-span-4 xl:col-span-4 flex">
          <div className="w-full aspect-video lg:aspect-auto lg:h-full rounded-2xl overflow-hidden shadow-xl">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/3ZHHlM9bg14?autoplay=1&mute=1&loop=1&playlist=3ZHHlM9bg14"
              title="Embedded Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>

 

      {/* Modal */}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "90vw",
            maxWidth: 1200,
            height: "90vh",
            bgcolor: "background.paper",
            boxShadow: 24,
            display: "flex",
            outline: "none",
            borderRadius: 2,
          }}
        >
          {selectedDirector ? (
            <>
              {/* Left pane */}
              <Box sx={{ width: "50%", position: "relative" }}>
                <img
                  src={fullImageUrl(selectedDirector.image)}
                  alt={selectedDirector.name}
                  className="absolute inset-0 w-full h-full object-cover object-center"
                />
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 16,
                    left: 16,
                    color: "#fff",
                    textShadow: "0 1px 4px rgba(0,0,0,0.7)",
                  }}
                >
                  <Typography variant="h5">{selectedDirector.name}</Typography>
                  <Typography variant="subtitle2">
                    {selectedDirector.title}
                  </Typography>
                </Box>
              </Box>

              {/* Right pane */}
              <Box sx={{ width: "50%", overflowY: "auto", p: 4 }}>
                <Typography variant="h4" gutterBottom>
                  {selectedDirector.name}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  {selectedDirector.title}
                </Typography>

                {selectedDirector.description.map((sec, i) => (
                  <Box key={i} sx={{ mb: 3 }}>
                    <Typography variant="h6">{sec.section}</Typography>
                    <Typography variant="body2" sx={{ whiteSpace: "pre-line" }}>
                      {sec.content}
                    </Typography>
                  </Box>
                ))}

                <Box sx={{ mt: 3 }}>
                  <Typography variant="h6">Address</Typography>
                  <Typography variant="body2">
                    {selectedDirector.address.house}
                  </Typography>
                </Box>
              </Box>
            </>
          ) : null}
        </Box>
      </Modal>
    </div>
    </div>
  );
}

const SocialLink = ({
  href,
  icon: Icon,
}: {
  href: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="p-2 bg-gray-100 rounded-full hover:bg-[#99b1f3] transition"
  >
    <Icon width={18} height={18} className="text-gray-600 hover:text-[#0b36af]" />
  </a>
);

export default HomeDirectorSlider;


























// import { Swiper, SwiperSlide } from "swiper/react";

// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import 'swiper/css/effect-creative';

// import {
//   Navigation,
//   Pagination,
//   Autoplay,
//   EffectCreative,
// } from "swiper/modules";
// import {
//   FaFacebookF,
//   FaInstagram,
//   FaLinkedinIn,
//   FaQuoteLeft,
//   FaEnvelope,
// } from "react-icons/fa";
// import image1 from "../assets/BoDirectors/1.jpg";
// import image2 from "../assets/BoDirectors/3.jpg";
 
// type Person = {
//   id: number;
//   name: string;
//   title: string;
//   email: string;
//   image: string;
//   socials: { fb?: string; ig?: string; li?: string };
//   about: string;
// };

// const data: Person[] = [
//   {
//     id: 1,
//     name: "MD ABDUL ALL",
//     title: "Chairman",
//     email: "chairman@example.com",
//     image: image1,
//     socials: { fb: "#", ig: "#", li: "#" },
//     about:
//       "Md. Abdullah Al Mamun is a leading figure in Bangladesh’s private sector, known for his strategic vision and transformative leadership at Delta Group.",
//   },
//   {
//     id: 2,
//     name: "Jane Doe",
//     title: "Managing Director",
//     email: "jane@example.com",
//     image: image2,
//     socials: { fb: "#", ig: "#", li: "#" },
//     about:
//       "Focused on operational excellence and people-first leadership. Jane believes in empowering teams and fostering a culture of innovation.",
//   },
// ];



// function HomeDirectorSlider() {

  
//   return (
//     <div className="container mx-auto px-4 py-16">
//       <h1 className="text-center font-bold py-8 text-4xl">Board of Directors</h1>
//       <div className="grid lg:grid-cols-12 gap-8 py-14">
//         {/* Slider */}
//         <div className="lg:col-span-7 relative">
//          <Swiper
//   modules={[Navigation, Pagination, Autoplay, EffectCreative]}
//   navigation={{
//     prevEl: ".swiper-button-prev-custom",
//     nextEl: ".swiper-button-next-custom",
//   }}
//   pagination={{ clickable: true }}
//   autoplay={{ delay: 3000, disableOnInteraction: false }}
//   loop
//   effect="creative"
//   creativeEffect={{
//     prev: { shadow: true, translate: ["-20%", 0, -1] },
//     next: { translate: ["100%", 0, 0] },
//   }}
//   className="rounded-2xl shadow-xl"
// >
//             {data.map((person) => (
//               <SwiperSlide key={person.id}>
//                 <div className="relative bg-white rounded-2xl shadow-3xl border-2 border-gray-400 overflow-hidden h-[340px] flex flex-col md:flex-row">
//                   {/* Left: Image */}
//                   <div className="md:w-1/2 relative h-48 md:h-full">
//                     <img
//                       src={person.image}
//                       alt={person.name}
//                       className="absolute inset-0 w-full h-full object-cover object-center"
//                     />
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
//                     <div className="absolute bottom-0 left-0 w-full p-4 text-white">
//                       <h3 className="text-2xl font-bold">{person.name}</h3>
//                       <p className="text-lg text-white">{person.title}</p>
//                     </div>
//                   </div>

//                   {/* Right: Content */}
//                   <div className="md:w-1/2 flex flex-col p-6">
//                     <FaQuoteLeft className="text-3xl text-[#ccddaf]/40 mb-2" />
//                     <p className="text-gray-600 text-sm md:text-base flex-grow">
//                       {person.about}
//                     </p>

//                     {/* Contact */}
//                     <div className="mt-4 space-y-3">
//                       <div className="flex items-center space-x-2 text-sm text-gray-600 bg-gray-50 rounded-lg p-2">
//                         <FaEnvelope className="text-[#ccddaf]" />
//                         <a
//                           href={`mailto:${person.email}`}
//                           className="hover:text-[#0b36af]"
//                         >
//                           {person.email}
//                         </a>
//                       </div>

//                       {/* Social + Button */}
//                       <div className="flex justify-between items-center">
//                         <div className="flex space-x-2">
//                           {person.socials.fb && (
//                             <SocialLink href={person.socials.fb} icon={FaFacebookF} />
//                           )}
//                           {person.socials.ig && (
//                             <SocialLink href={person.socials.ig} icon={FaInstagram} />
//                           )}
//                           {person.socials.li && (
//                             <SocialLink href={person.socials.li} icon={FaLinkedinIn} />
//                           )}
//                         </div>
//                         <button className="px-4 py-2 bg-[#ccddaf] text-white rounded-full hover:bg-[#0b36af] transition">
//                           View Profile
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </SwiperSlide>
//             ))}
//           </Swiper>


//         </div>

//         {/* Video */}
//         <div className="lg:col-span-5 flex">
//           <div className="w-full h-[340px] rounded-2xl overflow-hidden shadow-xl">
//             <iframe
//               className="w-full h-full"
//               src="https://www.youtube.com/embed/3ZHHlM9bg14?autoplay=1&mute=1&loop=1&playlist=3ZHHlM9bg14"
//               title="Embedded Video"
//               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//               allowFullScreen
//             ></iframe>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// const SocialLink = ({
//   href,
//   icon: Icon,
// }: {
//   href: string;
//   icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
// }) => (
//   <a
//     href={href}
//     target="_blank"
//     rel="noopener noreferrer"
//     className="p-2 bg-gray-100 rounded-full hover:bg-[#99b1f3] transition"
//   >
//     <Icon width={18} height={18} className="text-gray-600 hover:text-[#0b36af]" />
//   </a>
// );

// export default HomeDirectorSlider;
