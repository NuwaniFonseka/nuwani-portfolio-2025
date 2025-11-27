// src/components/TechActivities.jsx
import React, { useState } from "react";
import ModalGallery from "./ModalGallery";

import profile from "../data/profile.json";
const techActivities = profile.activities;


const TechActivities = () => {
  const [selected, setSelected] = useState(null);

  return (
    <section id="activities" className=" text-white px-6 py-24 scroll-mt-24" >
      <h2 className="text-4xl font-bold mb-12 text-center">
        Tech <span className="text-primary">Activities</span> & Industry Engagements
      </h2>
      <div className="space-y-6 max-w-5xl mx-auto">
        {techActivities.map((item, index) => (
         <button
  key={index}
  onClick={() => setSelected(item)}
  className="w-full text-left bg-[#1c1c1c] p-6 rounded-lg shadow hover:shadow-lg transition block"
>
  <h3 className="text-xl font-semibold text-primary mb-1">
    {item.icon} {item.title}
  </h3>
  <p className="text-gray-300 mb-2">{item.desc}</p>
  <div className="text-sm text-gray-400 flex items-center gap-2">
    <span>📸 View Photos</span>
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
