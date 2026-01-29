import React, { useState } from "react";
import profile from "../data/profile.json";
import useScrollTrigger from "../hooks/useScrollTrigger";
const certificates = profile.certifications;
const Certifications = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCert, setSelectedCert] = useState(null);

  // Scroll trigger for certifications
  const [certsRef, certsVisible] = useScrollTrigger(0.1);

  return (
    <section
      id="certifications"
      className=" text-white px-6 py-24 scroll-mt-24"

    >
      <h2 className="section-heading">
        <span className="gradient-text">Certifications</span>
      </h2>
      <div
        ref={certsRef}
        className={`max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 stagger-children ${certsVisible ? 'visible' : ''}`}
      >
        {certificates.map((cert, idx) => (
          <button
            key={idx}
            onClick={() => {
              setSelectedCert(cert);
              setModalOpen(true);
            }}
            className="bg-white/10 backdrop-blur-md border border-white/10 text-left p-4 rounded-xl shadow-lg 
                       hover-lift-smooth hover-glow hover-tilt hover-ripple transition-all duration-700"
          >
            <span className="text-lg text-cyan">📄</span>{" "}
            <span className="ml-2">{cert.title}</span>
          </button>
        ))}
      </div>

      {/* Modal */}
      {modalOpen && selectedCert && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white/5 backdrop-blur-2xl border border-white/10 p-8 rounded-[24px] max-w-lg w-full shadow-2xl relative animate-fade-in-up">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-all"
            >
              ×
            </button>
            <h3 className="text-2xl font-bold text-center mb-6 gradient-text">
              {selectedCert.title}
            </h3>

            {selectedCert.file?.toLowerCase().endsWith('.pdf') ? (
              <div className="flex flex-col items-center justify-center p-12 bg-white/5 rounded-xl border border-white/10">
                <span className="text-6xl mb-4 opacity-80">📄</span>
                <p className="text-gray-400 mb-6 text-center">This certificate is available as a PDF document.</p>
                <a
                  href={selectedCert.file}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3 rounded-full bg-cyan text-black font-bold shadow-lg shadow-cyan/20 hover:shadow-cyan/50 hover:scale-105 transition-all"
                >
                  Download Certificate ⬇
                </a>
              </div>
            ) : (
              <>
                <div className="rounded-xl overflow-hidden bg-white/5 p-2">
                  <img
                    src={selectedCert.image}
                    alt="Certificate"
                    className="rounded-lg w-full object-contain max-h-[60vh]"
                  />
                </div>
                {selectedCert.file && (
                  <a href={selectedCert.file} target="_blank" rel="noopener noreferrer"
                    className="block mt-6 text-center text-cyan hover:underline hover:text-cyan/80 transition-colors">
                    View Full Credential ↗
                  </a>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Certifications;
