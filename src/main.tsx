// D:\TusukaReact\TusukaWebsiteCLientOfficial\src\main.tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from './Context/ThemeContext.tsx'
import { useFavicon } from './hooks/useFavicon.ts'

const Root = () => {
  useFavicon(); // Try API favicon → fallback logo.png
  return <App />;
};
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <Root />
    </ThemeProvider>
  </StrictMode>,
)
