import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ServicesGrid } from './components/ServicesGrid';
import { ProjectShowcase } from './components/ProjectShowcase';
import { ProcessTimeline } from './components/ProcessTimeline';
import { TestimonialsSection } from './components/TestimonialsSection';
import { StatsSection } from './components/StatsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';
import { LoadingScreen } from './components/LoadingScreen';
import { ProjectDetail } from './pages/ProjectDetail';

function App() {
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      * {
        cursor: none !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <Router>
      <div className="relative bg-black text-white overflow-x-hidden">
        <LoadingScreen />
        <CustomCursor />

        <Routes>
          <Route path="/" element={
            <main>
              <HeroSection />
              <AboutSection />
              <ServicesGrid />
              <ProjectShowcase />
              <ProcessTimeline />
              <TestimonialsSection />
              <StatsSection />
              <ContactSection />
            </main>
          } />
          <Route path="/project/:slug" element={<ProjectDetail />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
