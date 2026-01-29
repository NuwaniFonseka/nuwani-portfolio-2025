import React, { useEffect, useState, useRef } from "react";
import profile from "../data/profile.json";
import useScrollTrigger from "../hooks/useScrollTrigger";

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const headingRef = useRef(null);

  // Scroll trigger for highlights
  const [highlightsRef, highlightsVisible] = useScrollTrigger(0.1);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );

    if (headingRef.current) {
      observer.observe(headingRef.current);
    }

    return () => {
      if (headingRef.current) observer.unobserve(headingRef.current);
    };
  }, []);

  return (
    <section
      id="about"
      className="relative text-white px-6 py-24 sm:py-32 scroll-mt-24"
    >
      {/* Removed per-section background + overlay, since handled globally */}

      <div className="relative z-10 max-w-6xl mx-auto space-y-16">
        {/* Title with fade-in-up */}
        <h2
          ref={headingRef}
          className={`section-heading transition-all duration-1000 ${isVisible ? "animate-fade-in-up opacity-100" : "opacity-0"
            }`}
        >
          About{" "}
          <span className="gradient-text">
            Me
          </span>
        </h2>

        {/* Headline */}
        <p className="text-lg sm:text-xl md:text-2xl leading-relaxed text-center text-gray-300 max-w-3xl mx-auto">
          {profile.about.headline}
        </p>

        {/* Quick Highlights with scroll-triggered zoom animation */}
        <div
          ref={highlightsRef}
          className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 stagger-zoom ${highlightsVisible ? 'visible' : ''}`}
        >
          {profile.about.highlights.map((item, idx) => (
            <div
              key={idx}
              className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-lg text-center border border-white/10 
                         hover-lift-smooth hover-glow hover-tilt transition-all duration-700"
            >
              <h3 className="text-cyan font-bold mb-2 transition-all duration-500">{item.title}</h3>
              <p className="text-gray-200 text-sm whitespace-pre-line">
                {item.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
