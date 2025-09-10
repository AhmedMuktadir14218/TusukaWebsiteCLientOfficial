import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost/TusukaWebServerV6";

// Create Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Default theme colors
export const defaultTheme = {
  webBg: "#363D44",
  navFoot: "#363D44",
  buttonBg: "#363D44",
  buttonText: "#ffffff",
  activeBorder: "#4d4d4d",
  accent: "#7bb661",
  accentSoft: "#a8c69f",
  webText: "#000000",
  report: "#b0b0b0",
  titleText: "#cccccc",
  other2: "#cccccc",
  other3: "#cccccc",
  other4: "#cccccc",
  lightWhite: "#ffffff",
};

// ✅ Function to fetch theme colors with fallback to default
export const getThemeColors = async (bundleId: number, themeName: string) => {
  try {
    const response = await api.get(`/api/color-bundles/${bundleId}/${themeName}`);
    if (response.data?.success && response.data?.data) {
      return response.data.data; // ✅ only the colors
    }
    console.warn("API returned empty data, using null");
    return null; // API returned success: false or no data
  } catch (error: any) {
    console.error("Error fetching theme colors:", error);
    return null; // fallback is null
  }
};
