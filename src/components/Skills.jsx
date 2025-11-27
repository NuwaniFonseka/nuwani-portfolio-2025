import React, { useEffect, useRef, useState } from "react";
import profile from "../data/profile.json";

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const headingRef = useRef(null);

  // IntersectionObserver for heading animation
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

    if (headingRef.current) observer.observe(headingRef.current);

    return () => {
      if (headingRef.current) observer.unobserve(headingRef.current);
    };
  }, []);

  return (
    <section
      id="skills"
      className="relative text-white px-6 py-24 scroll-mt-24"
    >
      {/* Heading with fade-in-up */}
      <h2
        ref={headingRef}
        className={`text-4xl md:text-5xl font-bold mb-12 text-center relative z-10 transition-all duration-1000 ${
          isVisible ? "animate-fade-in-up opacity-100" : "opacity-0"
        }`}
      >
        My{" "}
        <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Skills
        </span>
      </h2>

      {/* Skills grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 text-center relative z-10">
        {profile.skills.map((skill, idx) => (
          <div
            key={idx}
            className="bg-white/10 backdrop-blur-md border border-white/10 text-gray-200 py-4 px-4 rounded-xl 
                       shadow-lg transform hover:scale-105 hover:border-primary hover:shadow-primary/40 group"
          >
            <span className="group-hover:text-primary group-hover:font-semibold transition-all duration-300">
              {skill}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
