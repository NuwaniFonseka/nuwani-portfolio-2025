import React, { useEffect, useRef, useState } from "react";
import profile from "../data/profile.json";
import useScrollTrigger from "../hooks/useScrollTrigger";

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const headingRef = useRef(null);

  // Scroll trigger for skills grid
  const [skillsRef, skillsVisible] = useScrollTrigger(0.1);

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

  // Use the new categorised stack data if available
  const stackData = profile.stack || [
    { category: "My Skills", items: profile.skills.join(", ") }
  ];

  return (
    <section
      id="skills"
      className="relative text-white px-6 py-24 scroll-mt-24"
    >
      {/* Heading with fade-in-up */}
      <h2
        ref={headingRef}
        className={`section-heading relative z-10 transition-all duration-1000 ${isVisible ? "animate-fade-in-up opacity-100" : "opacity-0"
          }`}
      >
        Tech{" "}
        <span className="gradient-text">
          Stack
        </span>
      </h2>

      {/* Skills grid with scroll-triggered stagger animation */}
      <div
        ref={skillsRef}
        className={`max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10 stagger-right ${skillsVisible ? 'visible' : ''}`}
      >
        {stackData.map((stack, idx) => (
          <div
            key={idx}
            className="rounded-[24px] border border-white/10 bg-white/5 backdrop-blur-2xl p-8 
                       hover-lift-smooth hover-glow hover-tilt group transition-all duration-700"
          >
            {/* Top Label */}
            <div className="flex justify-between items-start mb-4">
              <p className="text-sm uppercase tracking-[0.4em] text-cyan opacity-80 group-hover:opacity-100 transition-opacity duration-500">
                STACK
              </p>
            </div>

            {/* Category Title */}
            <h3 className="text-3xl font-display font-bold text-white mb-6 group-hover:text-cyan transition-colors duration-500">
              {stack.category}
            </h3>

            {/* List of Skills */}
            <p className="text-gray-400 text-lg leading-relaxed group-hover:text-gray-200 transition-colors duration-500 font-light">
              {stack.items}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
