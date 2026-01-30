import React, { useState, useEffect, useRef } from "react";
import profile from "../data/profile.json";
import useScrollTrigger from "../hooks/useScrollTrigger";

const Projects = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isVisible, setIsVisible] = useState(false);
  const headingRef = useRef(null);

  // Scroll trigger for project cards
  const [projectsRef, projectsVisible] = useScrollTrigger(0.1);

  const projectsPerPage = 6;
  const indexOfLast = currentPage * projectsPerPage;
  const indexOfFirst = indexOfLast - projectsPerPage;
  const currentProjects = profile.projects.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(profile.projects.length / projectsPerPage);

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

    if (headingRef.current) {
      observer.observe(headingRef.current);
    }

    return () => {
      if (headingRef.current) observer.unobserve(headingRef.current);
    };
  }, []);

  return (
    <section id="projects" className="relative text-white px-4 sm:px-6 py-24 scroll-mt-24">
      <h2
        ref={headingRef}
        className={`section-heading transition-all duration-1000 ${isVisible ? "animate-fade-in-up opacity-100" : "opacity-0"
          }`}
      >
        My{" "}
        <span className="text-cyan">
          Projects
        </span>
      </h2>

      {/* Grid with scroll-triggered stagger animation */}
      <div
        ref={projectsRef}
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto relative z-10 stagger-bottom ${projectsVisible ? 'visible' : ''}`}
      >
        {currentProjects.map((project, idx) => (
          <div
            key={idx}
            className="group relative h-auto md:h-[400px] overflow-hidden rounded-2xl shadow-xl border border-white/10 bg-[#0a0a16] flex flex-col md:block"
          >
            {/* Background Image - Absolute on Desktop, Relative on Mobile */}
            <div className="relative h-48 md:absolute md:inset-0 md:h-full overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-in-out md:group-hover:scale-110 md:group-hover:blur-[8px] md:group-hover:brightness-50"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-60 md:opacity-0 md:group-hover:opacity-90 transition-opacity duration-500"></div>
            </div>

            {/* Content Container - Flex Col on Mobile, Overlay on Desktop */}
            <div className="relative p-6 flex flex-col flex-grow md:absolute md:inset-0 md:justify-end">

              {/* Title - Static on Mobile, Moves Up on Desktop Hover */}
              <div className="transform md:translate-y-0 md:group-hover:-translate-y-[280px] transition-transform duration-700 cubic-bezier(0.22, 1, 0.36, 1) z-20">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2 drop-shadow-md">{project.title}</h3>
                <div className="w-12 h-1 bg-cyan rounded-full transition-all duration-500 md:group-hover:w-full opacity-80 mb-4 md:mb-0"></div>
              </div>

              {/* Description & Tags - Visible on Mobile, Fades in on Desktop */}
              <div className="opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-500 delay-100 z-20 
                            relative md:absolute md:inset-x-6 md:top-[58%] md:-translate-y-1/2 md:group-hover:translate-y-[-50%] transform">
                <p className="text-gray-300 md:text-gray-100 text-sm leading-relaxed drop-shadow-lg font-medium">
                  {project.desc}
                </p>
                {project.tech && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.tech.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-xs font-bold px-2 py-1 bg-cyan/20 text-cyan rounded-md border border-cyan/30 backdrop-blur-md shadow-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Links - Visible on Mobile, Slides up on Desktop */}
              <div className="mt-6 md:mt-0 flex gap-6 opacity-100 md:opacity-0 md:group-hover:opacity-100 transaction-all duration-500 delay-200 z-30
                            relative md:absolute md:bottom-6 md:left-6 md:right-6 md:transform md:translate-y-20 md:group-hover:translate-y-0">
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan md:text-white md:hover:text-cyan font-bold text-lg hover:underline underline-offset-4 decoration-2 transition-all duration-300"
                  >
                    View Live
                  </a>
                )}

                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan md:text-white md:hover:text-cyan font-bold text-lg hover:underline underline-offset-4 decoration-2 transition-all duration-300"
                  >
                    Source
                  </a>
                )}
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-4 mt-16 relative z-10">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className="px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-cyan/30 font-semibold shadow-lg 
                     hover:shadow-cyan/50 hover-lift-smooth transition-all transform hover:-translate-y-1 
                     disabled:opacity-30 disabled:hover:shadow-lg disabled:hover:translate-y-0"
        >
          <span className="gradient-text">Prev</span>
        </button>

        <span className="px-6 py-3 text-white font-semibold flex items-center">{currentPage} / {totalPages}</span>

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
          className="px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-cyan/30 font-semibold shadow-lg 
                     hover:shadow-cyan/50 hover-lift-smooth transition-all transform hover:-translate-y-1 
                     disabled:opacity-30 disabled:hover:shadow-lg disabled:hover:translate-y-0"
        >
          <span className="gradient-text">Next</span>
        </button>
      </div>
    </section>
  );
};

export default Projects;
