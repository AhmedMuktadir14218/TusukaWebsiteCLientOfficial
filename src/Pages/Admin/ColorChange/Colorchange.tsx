// // src/components/Colorchange.tsx
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useForm } from "react-hook-form";

// interface ThemeColors {
//   titleText?: string;
//   navFootText?: string;
//   textBreakColor?: string;
//   cardBG?: string;
//   webBg?: string;
//   navFootBG?: string;
//   buttonBg?: string;
//   buttonText?: string;
//   activeBorder?: string;
//   accent?: string;
//   accentSoft?: string;
//   webText?: string;
//   report?: string;
//   lightWhite?: string;
// }

// // normalize hex to #rrggbb
// const normalizeHex = (hex: string) => {
//   if (!hex) return "#000000";
//   let clean = hex.trim();
//   if (clean.startsWith("#")) clean = clean.slice(1);
//   if (clean.length === 8) clean = clean.slice(0, 6); // remove alpha
//   if (clean.length === 3) clean = clean.split("").map((c) => c + c).join("");
//   return `#${clean}`;
// };

// function Colorchange() {
//   const [loading, setLoading] = useState(false);
//   const [theme, setTheme] = useState<ThemeColors | null>(null);
//   const { register, handleSubmit, reset, setValue, watch } = useForm<Partial<ThemeColors>>();

//   const API_BASE = "http://localhost/TusukaWebServerV6/api/color-bundles/3";

//   // fetch theme
//   useEffect(() => {
//     const fetchTheme = async () => {
//       try {
//         setLoading(true);
//         const res = await axios.get(`${API_BASE}/colorcode`);
//         if (res.data.success) {
//           // normalize all colors
//           const normalized = Object.fromEntries(
//             Object.entries(res.data.data).map(([k, v]) => [k, normalizeHex(v)])
//           ) as ThemeColors;

//           setTheme(normalized);
//           reset(normalized);
//         }
//       } catch (err) {
//         console.error("Error fetching theme:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchTheme();
//   }, [reset]);

//   // sync text input with color picker
//   const watchFields = watch();

//   const onSubmit = async (data: Partial<ThemeColors>) => {
//     try {
//       setLoading(true);

//       // prepare payload with theme_data key
//       const payload = {
//         theme_data: {
//           titleText: normalizeHex(data.titleText || "#cccccc"),
//           navFootText: normalizeHex(data.navFootText || "#cccccc"),
//           textBreakColor: normalizeHex(data.textBreakColor || "#cccccc"),
//           cardBG: normalizeHex(data.cardBG || "#cccccc"),
//           webBg: normalizeHex(data.webBg || "#000000"),
//           navFootBG: normalizeHex(data.navFootBG || "#000000"),
//           buttonBg: normalizeHex(data.buttonBg || "#000000"),
//           buttonText: normalizeHex(data.buttonText || "#ffffff"),
//           activeBorder: normalizeHex(data.activeBorder || "#000000"),
//           accent: normalizeHex(data.accent || "#000000"),
//           accentSoft: normalizeHex(data.accentSoft || "#000000"),
//           webText: normalizeHex(data.webText || "#000000"),
//           report: normalizeHex(data.report || "#000000"),
//           lightWhite: normalizeHex(data.lightWhite || "#ffffff"),
//         }
//       };

//       console.log("Submitting theme:", payload);

//       const res = await axios.put(`${API_BASE}/update-theme/colorcode`, payload, {
//         headers: { "Content-Type": "application/json" },
//       });

//       console.log("Update response:", res.data);

//       if (res.data.success) {
//         alert("Theme updated successfully!");
//         setTheme(payload.theme_data);
//       } else {
//         alert("Failed to update theme!");
//       }
//     } catch (err: any) {
//       console.error("Error updating theme:", err.response?.data || err.message);
//       alert("Failed to update theme!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async () => {
//     if (!window.confirm("Are you sure you want to delete this theme?")) return;
//     try {
//       setLoading(true);
//       const res = await axios.delete(`${API_BASE}/delete-theme/colorcode`);
//       if (res.data.success) {
//         alert("Theme deleted!");
//         setTheme(null);
//         reset(undefined);
//       } else {
//         alert("Failed to delete theme!");
//       }
//     } catch (err) {
//       console.error("Error deleting theme:", err);
//       alert("Failed to delete theme!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading && !theme) return <p className="text-center">Loading...</p>;

//   return (
//     <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-lg">
//       <h2 className="text-xl font-bold mb-4">Theme Color Editor</h2>

//       {theme ? (
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//           {Object.keys(theme).map((key) => (
//             <div key={key} className="flex items-center gap-4">
//               <label className="w-32 capitalize">{key}</label>
//               <input
//                 type="color"
//                 value={normalizeHex(watchFields[key as keyof ThemeColors] || "#000000")}
//                 onChange={(e) => setValue(key as keyof ThemeColors, e.target.value)}
//                 className="w-12 h-10 border rounded"
//               />
//               <input
//                 type="text"
//                 value={normalizeHex(watchFields[key as keyof ThemeColors] || "#000000")}
//                 onChange={(e) => setValue(key as keyof ThemeColors, normalizeHex(e.target.value))}
//                 className="flex-1 border rounded px-2 py-1"
//               />
//             </div>
//           ))}

//           <div className="flex gap-4 mt-6">
//             <button
//               type="submit"
//               className="px-4 py-2 bg-black text-white rounded hover:bg-blue-700"
//               disabled={loading}
//             >
//               {loading ? "Saving..." : "Update Color"}
//             </button>
 
//           </div>
//         </form>
//       ) : (
//         <p className="text-gray-500">No theme loaded</p>
//       )}
//     </div>
//   );
// }

// export default Colorchange;




// // src/components/Colorchange.tsx
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useForm } from "react-hook-form";

// interface ThemeColors {
//   titleText?: string;
//   navFootText?: string;
//   textBreakColor?: string;
//   cardBG?: string;
//   webBg?: string;
//   navFootBG?: string;
//   buttonBg?: string;
//   buttonText?: string;
//   activeBorder?: string;
//   accent?: string;
//   accentSoft?: string;
//   webText?: string;
//   report?: string;
//   lightWhite?: string;
// }

// // Updated normalizeHex to preserve alpha if needed
// const normalizeHex = (hex: string, preserveAlpha = false) => {
//   if (!hex) return "#000000";
//   let clean = hex.trim();
//   if (clean.startsWith("#")) clean = clean.slice(1);
  
//   // If we want to preserve alpha and the hex has alpha, keep it
//   if (preserveAlpha && clean.length === 8) {
//     return `#${clean}`;
//   }
  
//   // Otherwise, remove alpha
//   if (clean.length === 8) clean = clean.slice(0, 6);
//   if (clean.length === 3) clean = clean.split("").map((c) => c + c).join("");
//   return `#${clean}`;
// };

// function Colorchange() {
//   const [loading, setLoading] = useState(false);
//   const [theme, setTheme] = useState<ThemeColors | null>(null);
//   const { register, handleSubmit, reset, setValue, watch } = useForm<Partial<ThemeColors>>();

//   const API_BASE = "http://localhost/TusukaWebServerV6/api/color-bundles/3";

//   // fetch theme
//   useEffect(() => {
//     const fetchTheme = async () => {
//       try {
//         setLoading(true);
//         const res = await axios.get(`${API_BASE}/colorcode`);
//         if (res.data.success) {
//           // Don't normalize colors on fetch - keep them as they are
//           setTheme(res.data.data);
//           reset(res.data.data);
//         }
//       } catch (err) {
//         console.error("Error fetching theme:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchTheme();
//   }, [reset]);

//   // sync text input with color picker
//   const watchFields = watch();

//   const onSubmit = async (data: Partial<ThemeColors>) => {
//     try {
//       setLoading(true);

//       // prepare payload with theme_data key
//       const payload = {
//         theme_data: {
//           titleText: data.titleText || "#cccccc",
//           navFootText: data.navFootText || "#cccccc",
//           textBreakColor: data.textBreakColor || "#cccccc",
//           cardBG: data.cardBG || "#cccccc",
//           webBg: data.webBg || "#000000",
//           navFootBG: data.navFootBG || "#000000",
//           buttonBg: data.buttonBg || "#000000",
//           buttonText: data.buttonText || "#ffffff",
//           activeBorder: data.activeBorder || "#000000",
//           accent: data.accent || "#000000",
//           accentSoft: data.accentSoft || "#000000",
//           webText: data.webText || "#000000",
//           report: data.report || "#000000",
//           lightWhite: data.lightWhite || "#ffffff",
//         }
//       };

//       console.log("Submitting theme:", payload);

//       const res = await axios.put(`${API_BASE}/update-theme/colorcode`, payload, {
//         headers: { "Content-Type": "application/json" },
//       });

//       console.log("Update response:", res.data);

//       if (res.data.success) {
//         alert("Theme updated successfully!");
//         setTheme(payload.theme_data);
//       } else {
//         alert("Failed to update theme!");
//       }
//     } catch (err: any) {
//       console.error("Error updating theme:", err.response?.data || err.message);
//       alert("Failed to update theme!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Helper function to convert hex with alpha to rgba for color input
//   const hexToRgba = (hex: string) => {
//     if (!hex || !hex.startsWith('#') || (hex.length !== 9 && hex.length !== 7 && hex.length !== 4)) {
//       return hex;
//     }
    
//     let cleanHex = hex.replace('#', '');
    
//     // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
//     if (cleanHex.length === 3) {
//       cleanHex = cleanHex.split('').map(c => c + c).join('');
//     }
    
//     // If we have alpha channel
//     if (cleanHex.length === 8) {
//       const r = parseInt(cleanHex.slice(0, 2), 16);
//       const g = parseInt(cleanHex.slice(2, 4), 16);
//       const b = parseInt(cleanHex.slice(4, 6), 16);
//       const a = parseInt(cleanHex.slice(6, 8), 16) / 255;
      
//       return `rgba(${r}, ${g}, ${b}, ${a.toFixed(2)})`;
//     }
    
//     return hex;
//   };

//   if (loading && !theme) return <p className="text-center">Loading...</p>;

//   return (
//     <div className="max-w-3xl mx-auto p-6 bg-[var(--color-webBg)] shadow rounded-lg">
//       <h2 className="text-xl font-bold mb-4">Theme Color Editor</h2>

//       {theme ? (
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//           {Object.entries(theme).map(([key, value]) => (
//             <div key={key} className="flex items-center gap-4">
//               <label className="w-32 capitalize">{key}</label>
//               <input
//                 type="color"
//                 value={normalizeHex(watchFields[key as keyof ThemeColors] || "#000000")}
//                 onChange={(e) => setValue(key as keyof ThemeColors, e.target.value)}
//                 className="w-12 h-10 border rounded"
//               />
//               <input
//                 type="text"
//                 value={watchFields[key as keyof ThemeColors] || "#000000"}
//                 onChange={(e) => setValue(key as keyof ThemeColors, e.target.value)}
//                 className="flex-1 border rounded px-2 py-1"
//                 placeholder="#RRGGBB or #RRGGBBAA"
//               />
//               {value && value.length === 9 && (
//                 <span className="text-xs text-gray-500">
//                   Alpha: {((parseInt(value.slice(7, 9), 16) / 255) * 100).toFixed(0)}%
//                 </span>
//               )}
//             </div>
//           ))}

//           <div className="flex gap-4 mt-6">
//             <button
//               type="submit"
//               className="px-4 py-2 bg-black text-white rounded hover:bg-white hover:text-black"
//               disabled={loading}
//             >
//               {loading ? "Saving..." : "Update Color"}
//             </button>
//           </div>
//         </form>
//       ) : (
//         <p className="text-gray-500">No theme loaded</p>
//       )}
//     </div>
//   );
// }

// export default Colorchange;


// src/components/Colorchange.tsx
import { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

interface ThemeColors {
  titleText?: string;
  navFootText?: string;
  textBreakColor?: string;
  cardBG?: string;
  webBg?: string;
  navFootBG?: string;
  buttonBg?: string;
  buttonText?: string;
  activeBorder?: string;
  accent?: string;
  accentSoft?: string;
  webText?: string;
  report?: string;
  lightWhite?: string;
}

// ✅ Add this mapping here
const colorLabels: Record<keyof ThemeColors, string> = {
  titleText: "Title Text",
  navFootText: "Navbar/Footer Text",
  textBreakColor: "Text Break Color",
  cardBG: "Card Background",
  webBg: "Website Background",
  navFootBG: "Navbar/Footer Background",
  buttonBg: "Button Background",
  buttonText: "Button Text",
  activeBorder: "Active Border",
  accent: "Accent Color",
  accentSoft: "Accent Soft",
  webText: "Website Text",
  report: "Report Section",
  lightWhite: "Light White",
};

// normalizeHex function (unchanged)
const normalizeHex = (hex: string, preserveAlpha = false) => {
  if (!hex) return "#000000";
  let clean = hex.trim();
  if (clean.startsWith("#")) clean = clean.slice(1);

  if (preserveAlpha && clean.length === 8) return `#${clean}`;
  if (clean.length === 8) clean = clean.slice(0, 6);
  if (clean.length === 3) clean = clean.split("").map((c) => c + c).join("");
  return `#${clean}`;
};

function Colorchange() {
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState<ThemeColors | null>(null);
  const { register, handleSubmit, reset, setValue, watch } = useForm<Partial<ThemeColors>>();

  const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost/TusukaWebServerV6";

  // fetch theme
  useEffect(() => {
    const fetchTheme = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_BASE}/api/color-bundles/3/colorcode`);
        if (res.data.success) {
          setTheme(res.data.data);
          reset(res.data.data);
        }
      } catch (err) {
        console.error("Error fetching theme:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTheme();
  }, [reset]);

  const watchFields = watch();

  const onSubmit = async (data: Partial<ThemeColors>) => {
    try {
      setLoading(true);
      const payload = { theme_data: { ...data } };

      // console.log("Submitting theme:", payload);

      const res = await axios.put(`${API_BASE}/api/color-bundles/3/update-theme/colorcode`, payload, {
        headers: { "Content-Type": "application/json" },
      });

      if (res.data.success) {
        alert("Theme updated successfully!");
        setTheme(payload.theme_data);
      } else {
        alert("Failed to update theme!");
      }
    } catch (err: any) {
      console.error("Error updating theme:", err.response?.data || err.message);
      alert("Failed to update theme!");
    } finally {
      setLoading(false);
    }
  };

  if (loading && !theme) return <p className="text-center">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-[var(--color-webBg)] shadow rounded-lg">
      <h2 className="text-xl font-bold mb-4">Theme Color Editor</h2>

      {theme ? (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {Object.entries(theme).map(([key, value]) => (
            <div key={key} className="flex items-center gap-4">
              {/* ✅ Use mapping here */}
              <label className="w-48 font-medium">
                {colorLabels[key as keyof ThemeColors] || key}
              </label>

              <input
                type="color"
                value={normalizeHex(watchFields[key as keyof ThemeColors] || "#000000")}
                onChange={(e) => setValue(key as keyof ThemeColors, e.target.value)}
                className="w-12 h-10 border rounded"
              />
              <input
                type="text"
                value={watchFields[key as keyof ThemeColors] || "#000000"}
                onChange={(e) => setValue(key as keyof ThemeColors, e.target.value)}
                className="flex-1 border rounded px-2 py-1"
                placeholder="#RRGGBB or #RRGGBBAA"
              />
              {value && value.length === 9 && (
                <span className="text-xs text-gray-500">
                  Alpha: {((parseInt(value.slice(7, 9), 16) / 255) * 100).toFixed(0)}%
                </span>
              )}
            </div>
          ))}

          <div className="flex gap-4 mt-6">
            <button
              type="submit"
              className="px-4 py-2 bg-black text-white rounded hover:bg-white hover:text-black"
              disabled={loading}
            >
              {loading ? "Saving..." : "Update Color"}
            </button>
          </div>
        </form>
      ) : (
        <p className="text-gray-500">No theme loaded</p>
      )}

      
    </div>
  );
}

export default Colorchange;
