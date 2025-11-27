// src/components/ModalGallery.jsx
import React from "react";

const ModalGallery = ({ images, title, onClose }) => {
  if (!images || images.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center p-6">
      <div className="relative bg-[#1c1c1c] p-6 rounded-lg w-full max-w-4xl overflow-y-auto max-h-[90vh] shadow-lg">
        <button onClick={onClose} className="absolute top-3 right-4 text-white text-2xl hover:text-primary">
          ×
        </button>
        <h3 className="text-2xl font-bold text-primary text-center mb-4">{title}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((src, idx) => (
            <img
              key={idx}
              src={src}
              alt={`Event ${idx + 1}`}
              className="rounded shadow hover:scale-105 transition transform duration-300"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModalGallery;
