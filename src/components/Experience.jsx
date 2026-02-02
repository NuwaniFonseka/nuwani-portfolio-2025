import React, { useRef } from "react";
import profile from "../data/profile.json";
import useScrollTrigger from "../hooks/useScrollTrigger";

const Experience = () => {
    const [sectionRef, isVisible] = useScrollTrigger(0.1);

    return (
        <section
            id="experience"
            className="relative text-white px-6 py-24 sm:py-32 scroll-mt-24"
        >
            <div className="relative z-10 max-w-6xl mx-auto space-y-16">
                {/* Title */}
                <h2
                    ref={sectionRef}
                    className={`section-heading transition-all duration-1000 ${isVisible ? "animate-fade-in-up opacity-100" : "opacity-0"
                        }`}
                >
                    Work <span className="gradient-text">Experience</span>
                </h2>

                {/* Experience Timeline/List */}
                <div className={`space-y-12 stagger-right ${isVisible ? "visible" : ""}`}>
                    {profile.experience.map((exp, idx) => (
                        <div
                            key={idx}
                            className={`relative group bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[32px] 
                         hover:border-cyan/30 transition-all duration-500 hover-glow glow-pulse hover-tilt
                         ${isVisible ? "" : "opacity-0"}`}
                        >
                            {/* Header */}
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                                <div>
                                    <h3 className="text-2xl md:text-3xl font-display font-bold text-white group-hover:text-cyan transition-colors">
                                        {exp.role}
                                    </h3>
                                    <p className="text-lg text-cyan font-semibold mt-1">
                                        {exp.company}
                                    </p>
                                </div>
                                <div className="text-right flex flex-col items-end">
                                    <span className="px-4 py-1 rounded-full bg-white/10 text-sm font-medium border border-white/10">
                                        {exp.duration}
                                    </span>
                                    <span className="text-sm text-slate-400 mt-2 italic">
                                        {exp.location} • {exp.type}
                                    </span>
                                </div>
                            </div>

                            {/* Highlights */}
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {exp.highlights.map((highlight, hIdx) => (
                                    <li key={hIdx} className="flex gap-3 text-slate-300 text-sm leading-relaxed">
                                        <span className="w-1.5 h-1.5 rounded-full bg-cyan mt-2 shrink-0 group-hover:scale-125 transition-transform" />
                                        {highlight}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
        .font-display {
          font-family: 'Space Grotesk', 'Inter', sans-serif;
        }
      `}</style>
        </section>
    );
};

export default Experience;
