import { useEffect } from "react";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE_URL;     // e.g. http://192.168.105.71/TusukaWebServerV6
const API_IMAGE_BASE = import.meta.env.VITE_API_IMAGE_URL; // e.g. http://192.168.105.71/TusukaWebServerV6/public

export const useFavicon = () => {
  useEffect(() => {
    const fetchFavicon = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/favicon`);
        if (res.data.success && res.data.data?.favicon_url) {
          // Build full image URL using .env
          const faviconUrl = `${API_IMAGE_BASE}/${res.data.data.favicon_url}`;
          setFavicon(faviconUrl);
        } else {
          setFavicon("/logo.png"); // fallback from /public/logo.png
        }
      } catch {
        setFavicon("/logo.png"); // fallback if API fails
      }
    };

    const setFavicon = (url: string) => {
      const link =
        document.querySelector<HTMLLinkElement>("link[rel~='icon']") ||
        document.createElement("link");

      link.rel = "icon";
      link.type = "image/png";
      link.href = url;

      document.head.appendChild(link);
    };

    fetchFavicon();
  }, []);
};
