import React from "react";
import profile from "../data/profile.json";

const Home = ({ isVisible }) => {
  return (
    <section
      id="home"
      className="relative min-h-screen 
                 text-white px-4 sm:px-6 scroll-mt-24 transition-all duration-1000 flex items-center justify-center"
    >
      {/* Content */}
      <div
        className={`relative z-10 flex flex-col items-center text-center space-y-6 sm:space-y-8 transition-all duration-1000 delay-300 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        {/* Typing animation on Name */}
        <h2
          className="typing font-orbitron text-4xl sm:text-5xl md:text-6xl lg:text-7xl 
                     font-extrabold leading-tight px-2"
        >
          <span className="text-white">{profile.name.split(" ")[0]}</span>{" "}
          <span className="text-primary">{profile.name.split(" ")[1]}</span>
        </h2>

        {/* Smooth fade for Bio */}
        <p
          className="animate-fade-in-up text-gray-300 max-w-sm sm:max-w-xl md:max-w-2xl 
                     text-base sm:text-lg md:text-xl lg:text-2xl px-2"
        >
          {profile.bio}
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mt-4 sm:mt-6 w-full sm:w-auto px-4">
          <a
            href="#contact"
            className="bg-primary text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full font-bold text-base sm:text-lg 
                       hover:bg-accent transition-all shadow-lg hover:shadow-purple-500/40 transform hover:-translate-y-1 text-center"
          >
            Let's Talk
          </a>
          <a
            href="#projects"
            className="border-2 border-primary text-primary px-6 py-3 sm:px-8 sm:py-4 rounded-full font-bold text-base sm:text-lg 
                       hover:bg-primary hover:text-white transition-all transform hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/30 text-center"
          >
            View Work
          </a>
          <a
            href={profile.resume}
            download
            className="bg-white text-black px-6 py-3 sm:px-8 sm:py-4 rounded-full font-bold text-base sm:text-lg 
                       hover:bg-primary hover:text-white transition-all shadow-lg flex items-center justify-center gap-2 transform hover:-translate-y-1 group"
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6 group-hover:animate-bounce"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 4v12"
              />
            </svg>
            Download CV
          </a>
        </div>
      </div>
    </section>
  );
};

export default Home;
