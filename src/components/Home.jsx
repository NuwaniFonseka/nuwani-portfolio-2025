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
                href="#contact"
                className="px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-cyan/30 font-semibold shadow-lg hover:shadow-cyan/50 transition-all transform hover:-translate-y-1"
              >
                <span className="gradient-text">Get In Touch</span>
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
              {/* Card Header */}
              <div>
                <p className="text-sm uppercase tracking-[0.4em] text-slate-300">
                  STUDENT DEVELOPER
                </p>
                <h3 className="text-2xl font-display mt-2 animate-letters">
                  {/* Split text into individual letters for animation */}
                  {"Building clean, user-focused solutions.".split("").map((char, idx) => (
                    <span key={idx} className={char === " " ? "space" : ""}>
                      {char === " " ? "\u00A0" : char}
                    </span>
                  ))}
                </h3>
              </div>

              {/* Card Details */}
              <div className="grid grid-cols-2 gap-4 text-sm text-slate-300">
                <div className="transition-all duration-700 hover:scale-105">
                  <p className="text-xs uppercase tracking-[0.4em] text-cyan">
                    FOCUS
                  </p>
                  <p>Full-stack development</p>
                </div>
                <div className="transition-all duration-700 hover:scale-105">
                  <p className="text-xs uppercase tracking-[0.4em] text-cyan">
                    STACK
                  </p>
                  <p>React · Node · Java</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards - scroll-triggered stagger animation */}
        <div
          ref={statsRef}
          className={`grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 stagger-children ${statsVisible ? 'visible' : ''}`}
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
            <p className="text-3xl font-display">Intern</p>
          </div>
          <div className="rounded-[24px] border border-white/10 bg-white/5 backdrop-blur-2xl p-6 hover-lift-smooth hover-glow hover-tilt">
            <p className="text-sm uppercase tracking-[0.4em] text-slate-300 mb-2">
              PROJECTS
            </p>
            <p className="text-3xl font-display">10+</p>
          </div>
          <div className="rounded-[24px] border border-white/10 bg-white/5 backdrop-blur-2xl p-6 hover-lift-smooth hover-glow hover-tilt">
            <p className="text-sm uppercase tracking-[0.4em] text-slate-300 mb-2">
              LEARNING
            </p>
            <p className="text-3xl font-display">Always</p>
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
