import React from "react";
import profile from "../data/profile.json";
import useScrollTrigger from "../hooks/useScrollTrigger";

const Home = ({ isVisible }) => {
  // Scroll trigger for stats cards
  const [statsRef, statsVisible] = useScrollTrigger(0.1);
  return (
    <section
      id="home"
      className="relative min-h-screen text-white px-6 scroll-mt-24 pt-32 pb-12 md:pt-28 md:pb-0 md:flex md:items-center"
    >
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <h1 className="text-4xl md:text-6xl font-display leading-tight">
              Hey, I'm {profile.name.split(" ")[0]}.
              <span className="block text-cyan mt-2">
                {profile.bio}
              </span>
            </h1>

            {/* Quote/Description */}
            <p className="text-lg text-slate-200 max-w-2xl">
              {profile.about.headline}
            </p>

            <div className="flex flex-wrap gap-4" data-cursor>
              <a
                href={profile.resume}
                download="Nuwani_Fonseka_CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-cyan/30 font-semibold shadow-lg hover:shadow-cyan/50 transition-all transform hover:-translate-y-1"
              >
                <span className="gradient-text">Download CV</span>
              </a>
              <a
                href="#projects"
                className="px-6 py-3 rounded-full border border-white/20 text-white hover:border-cyan/50 transition-all"
              >
                Recent Work
              </a>
            </div>
          </div>

          {/* Right Card - dynamic animation */}
          <div className="relative rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-2xl p-6 shadow-glass animate-float hover-glow glow-pulse">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-[32px]" />
            <div className="relative space-y-6">
              {/* Card Header with Adjusted Avatar */}
              <div className="flex items-center justify-between gap-6">
                <div className="flex-1">
                  <p className="text-[10px] sm:text-xs uppercase tracking-[0.4em] text-slate-300">
                    SOFTWARE ENGINEER UNDERGRADUATE
                  </p>
                  <h3 className="text-xl sm:text-2xl font-display mt-2 animate-letters leading-tight">
                    {/* Split text into individual letters for animation */}
                    {"Explore my professional journey below.".split("").map((char, idx) => (
                      <span key={idx} className={char === " " ? "space" : ""}>
                        {char === " " ? "\u00A0" : char}
                      </span>
                    ))}
                  </h3>
                </div>

                {/* Refined Avatar with Premium Styling */}
                <div className="relative group shrink-0">
                  {/* Outer Glow Ring */}
                  <div className="absolute -inset-1 bg-gradient-to-tr from-cyan/40 to-blue/40 rounded-full blur-sm opacity-75 group-hover:opacity-100 transition duration-500 animate-pulse" />

                  {/* Image Container */}
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-white/30 overflow-hidden shadow-2xl">
                    <img
                      src="/girl9.jpg"
                      alt="Profile"
                      className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                </div>
              </div>

              {/* Card Details */}
              <div className="space-y-4 text-sm text-slate-300">
                <div className="transition-all duration-700 hover:scale-[1.02]">
                  <p className="text-xs uppercase tracking-[0.4em] text-cyan mb-1">
                    CORE FOCUS
                  </p>
                  <p className="leading-relaxed text-slate-200">
                    Full-stack Development with an interest in <span className="text-white font-medium">DevOps and AI</span>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards - scroll-triggered stagger animation */}
        <div
          ref={statsRef}
          className={`grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16 stagger-children ${statsVisible ? 'visible' : ''}`}
        >
          <div className="rounded-[24px] border border-white/10 bg-white/5 backdrop-blur-2xl p-6 hover-lift-smooth hover-glow hover-tilt">
            <p className="text-sm uppercase tracking-[0.4em] text-slate-300 mb-2">
              EDUCATION
            </p>
            <p className="text-3xl font-display">SLIIT</p>
          </div>
          <div className="rounded-[24px] border border-white/10 bg-white/5 backdrop-blur-2xl p-6 hover-lift-smooth hover-glow hover-tilt">
            <p className="text-sm uppercase tracking-[0.4em] text-slate-300 mb-2">
              EXPERIENCE
            </p>
            <p className="text-3xl font-display">7 Months</p>
          </div>
          <div className="rounded-[24px] border border-white/10 bg-white/5 backdrop-blur-2xl p-6 hover-lift-smooth hover-glow hover-tilt">
            <p className="text-sm uppercase tracking-[0.4em] text-slate-300 mb-2">
              PROJECTS
            </p>
            <p className="text-3xl font-display">{profile.projects.length}+</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&display=swap');
        
        .font-display {
          font-family: 'Space Grotesk', 'Inter', sans-serif;
          font-weight: 600;
        }

        .shadow-glass {
          box-shadow: 0 8px 32px 0 rgba(96, 245, 255, 0.1);
        }

        [data-cursor] {
          cursor: pointer;
        }
      `}</style>
    </section>
  );
};

export default Home;
