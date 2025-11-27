import React, { useEffect, useState, useRef } from "react";
import profile from "../data/profile.json";

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const headingRef = useRef(null);

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
          className={`text-4xl md:text-5xl font-bold text-center transition-all duration-1000 ${
            isVisible ? "animate-fade-in-up opacity-100" : "opacity-0"
          }`}
        >
          About{" "}
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Me
          </span>
        </h2>

        {/* Headline */}
        <p className="text-lg sm:text-xl md:text-2xl leading-relaxed text-center text-gray-300 max-w-3xl mx-auto">
          {profile.about.headline}
        </p>

        {/* Quick Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {profile.about.highlights.map((item, idx) => (
            <div
              key={idx}
              className="bg-white/10 p-6 rounded-xl shadow-lg text-center border border-white/10 hover:border-primary transition-all"
            >
              <h3 className="text-primary font-bold mb-2">{item.title}</h3>
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
