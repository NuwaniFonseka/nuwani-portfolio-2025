import React, { useState, useEffect, useRef } from "react";
import profile from "../data/profile.json";

const Projects = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isVisible, setIsVisible] = useState(false);
  const headingRef = useRef(null);

  const projectsPerPage = 6;
  const indexOfLast = currentPage * projectsPerPage;
  const indexOfFirst = indexOfLast - projectsPerPage;
  const currentProjects = profile.projects.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(profile.projects.length / projectsPerPage);

  // Intersection Observer for heading
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
    <section
      id="projects"
      className="relative text-white px-6 py-24 scroll-mt-24"
    >
      {/* Heading with fade-in animation */}
      <h2
        ref={headingRef}
        className={`text-4xl md:text-5xl font-bold mb-12 text-center relative z-10 transition-all duration-1000 ${
          isVisible ? "animate-fade-in-up opacity-100" : "opacity-0"
        }`}
      >
        My{" "}
        <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Projects
        </span>
      </h2>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto relative z-10">
        {currentProjects.map((project, idx) => (
          <a
            key={idx}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-white/10 p-6 rounded-xl shadow-lg border border-white/10 hover:border-primary/60 transition-transform duration-500 transform hover:scale-105 hover:-translate-y-2"
          >
            <h3 className="text-2xl font-bold mb-4 text-center text-primary group-hover:text-accent transition-colors">
              {project.title}
            </h3>
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-[200px] object-cover rounded-lg"
            />
            <p className="text-sm text-gray-200 mt-3">{project.desc}</p>
          </a>
        ))}
      </div>

      {/* Pagination controls */}
      <div className="flex justify-center gap-4 mt-10 relative z-10">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className="px-4 py-2 bg-primary text-white rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span className="px-4 py-2">
          {currentPage} / {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
          className="px-4 py-2 bg-primary text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default Projects;
