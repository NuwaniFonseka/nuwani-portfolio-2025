// src/components/TechActivities.jsx
import React, { useState } from "react";
import ModalGallery from "./ModalGallery";
import useScrollTrigger from "../hooks/useScrollTrigger";

import profile from "../data/profile.json";
const techActivities = profile.activities;


const TechActivities = () => {
  const [selected, setSelected] = useState(null);

  // Scroll trigger for activities
  const [activitiesRef, activitiesVisible] = useScrollTrigger(0.1);

  return (
    <section id="activities" className=" text-white px-6 py-24 scroll-mt-24" >
      <h2 className="section-heading">
        <span className="gradient-text">Volunteering</span>
      </h2>
      <div
        ref={activitiesRef}
        className={`space-y-6 max-w-5xl mx-auto stagger-children ${activitiesVisible ? 'visible' : ''}`}
      >
        {techActivities.map((item, index) => (
          <button
            key={index}
            onClick={() => setSelected(item)}
            className="w-full text-left bg-white/10 backdrop-blur-md border border-white/10 p-6 rounded-xl shadow-lg 
                       hover-lift-smooth hover-glow hover-tilt hover-ripple transition-all duration-700 block"
          >
            <h3 className="text-xl font-semibold text-cyan mb-1 transition-all duration-500">
              {item.icon} {item.title}
            </h3>
            <p className="text-gray-300 mb-2">{item.desc}</p>
            <div className="text-sm text-gray-400 flex items-center gap-4 mt-auto">
              {item.images && item.images.length > 0 && (
                <span>📸 View Photos</span>
              )}
              {item.link && (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan hover:underline flex items-center gap-1 transition-all"
                  onClick={(e) => e.stopPropagation()}
                >
                  🔗 View Repo
                </a>
              )}
            </div>
          </button>

        ))}
      </div>

      {selected && (
        <ModalGallery
          images={selected.images}
          title={selected.title}
          onClose={() => setSelected(null)}
        />
      )}
    </section>
  );
};

export default TechActivities;
