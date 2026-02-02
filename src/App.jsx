import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import TechActivities from "./components/TechActivities";
import Certifications from "./components/Certifications";
import CustomCursor from "./components/CustomCursor";
import Experience from "./components/Experience";

const App = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Handle section visibility + animations
  useEffect(() => {
    setIsVisible(true);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative min-h-screen text-white">
      {/* Custom Cursor with ring + dot + trailing points */}
      <CustomCursor
        color="#ffffff"
        ringColor="rgba(96, 245, 255, 0.9)"
        points={7}
        ringSize={54}
        pointSize={4}
      />

      {/* Background - Teal on left + blue/purple on right*/}
      <div className="fixed inset-0 bg-[#050816]">
        <div className="absolute inset-0 opacity-50 pointer-events-none">
          {/* Teal/cyan glow on left */}
          <div className="absolute top-40 left-10 w-[360px] h-[360px] bg-[#2be4dc] blur-[150px] rounded-full" />
          {/* Blue/purple orb on top right */}
          <div className="absolute top-20 right-40 w-[400px] h-[400px] bg-[#5f3df7] blur-[140px] rounded-full" />
        </div>
      </div>

      {/* Scrollable content */}
      <div className="relative z-10">
        <Header activeSection={activeSection} />
        <Home isVisible={isVisible} />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <TechActivities />
        <Certifications />
        <Contact />
        <Footer />

        {/* Floating Action Button */}
        <div className="fixed bottom-8 right-8 z-50">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="bg-white/10 backdrop-blur-md border border-cyan/30 text-cyan p-4 rounded-full 
                       shadow-lg hover:shadow-cyan/50 transform hover:scale-110 hover:-translate-y-1
                       transition-all duration-300 btn-glow group"
          >
            <svg
              className="w-6 h-6 group-hover:animate-pulse"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Animation styles */}
      <style jsx>{`
        .animate-in {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }

        .animate-fade-in {
          animation: fadeInUp 1s ease-out forwards;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-spin-slow {
          animation: spin 3s linear infinite;
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default App;
