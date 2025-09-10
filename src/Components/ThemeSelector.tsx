import { ThemeContext } from "../Context/ThemeContext";
import  { useContext } from "react"; 

const ThemeSelector = () => {
  const { themeName, setThemeName } = useContext(ThemeContext);

  return (
    <div className="flex gap-2">
      {["light", "dark", "highContrast"].map((theme) => (
        <button
          key={theme}
          onClick={() => setThemeName(theme)}
          className={`px-3 py-1 rounded ${
            themeName === theme ? "border-2 border-black" : "border border-gray-300"
          }`}
        >
          {theme.charAt(0).toUpperCase() + theme.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default ThemeSelector;
