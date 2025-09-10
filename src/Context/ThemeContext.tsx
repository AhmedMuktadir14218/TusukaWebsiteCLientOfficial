// // D:\TusukaReact\TusukaWebsiteCLientOfficial\src\Context\ThemeContext.tsx
// import React, { createContext, useState, useEffect, type ReactNode } from "react";

import { getThemeColors } from "../ColorApi/colorApi";
import { createContext, useContext, useEffect, useState } from "react";

// interface ThemeColors {
//   webBg: string;
//   navFoot: string;
//   buttonBg: string;
//   buttonText: string;
//   activeBorder: string;
//   accent: string;
//   accentSoft: string;
//   webText: string;
//   report: string;
//   lightWhite: string;
// }

// interface ThemeContextType {
//   themeName: string;
//   setThemeName: (name: string) => void;
//   theme: ThemeColors;
// }

// export const ThemeContext = createContext<ThemeContextType>({
//   themeName: "light",
//   setThemeName: () => {},
//   theme: {} as ThemeColors,
// });

// interface Props {
//   children: ReactNode;
// }

// export const ThemeProvider: React.FC<Props> = ({ children }) => {
//   const [themeName, setThemeName] = useState(localStorage.getItem("theme") || "light");
//   const [theme, setTheme] = useState<ThemeColors>({} as ThemeColors);

//   useEffect(() => {
//     fetch("/color.json")
//       .then((res) => res.json())
//       .then((data) => {
//         const selectedTheme = data.theme[themeName];
//         setTheme(selectedTheme);

//         // This loop dynamically applies the CSS variables
//         Object.entries(selectedTheme).forEach(([key, value]) => {
//           document.documentElement.style.setProperty(`--color-${key}`, value);
//         });
//       });

//     localStorage.setItem("theme", themeName);
//   }, [themeName]);

//   return (
//     <ThemeContext.Provider value={{ themeName, setThemeName, theme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };

 
interface ThemeContextProps {
  theme: Record<string, string> | null;
  refreshTheme: () => void; // optional: to reload theme dynamically
}

const ThemeContext = createContext<ThemeContextProps>({
  theme: null,
  refreshTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Record<string, string> | null>(null);

  const loadTheme = async () => {
    const colors = await getThemeColors(3, "colorcode");
    if (colors) {
      setTheme(colors);

      // Apply to :root so Tailwind reads them
      Object.entries(colors).forEach(([key, value]) => {
        document.documentElement.style.setProperty(`--color-${key}`, value);
      });

      // console.log("🎨 Theme applied:", colors);
    } else {
      console.warn("⚠️ API returned empty, no colors applied");
    }
  };

  useEffect(() => {
    loadTheme();
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, refreshTheme: loadTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook to use theme in any component
export const useTheme = () => useContext(ThemeContext);
