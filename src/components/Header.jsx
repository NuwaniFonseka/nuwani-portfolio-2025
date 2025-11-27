import React, { useState } from "react";

const Header = ({ activeSection }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const firstName = "Portfolio";
  const navItems = ["Home", "About", "Projects", "Skills", "Contact"];

  return (
    <header className="fixed top-0 left-0 w-full bg-black/80 backdrop-blur-lg px-6 py-4 z-50 shadow-2xl border-b border-gray-800/50 transition-all duration-500">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        {/* Site Name */}
        <h1 className="text-xl font-bold text-white hover:text-primary transition-colors duration-300 cursor-pointer">
          {firstName}
        </h1>

        {/* Hamburger for mobile */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6">
          {navItems.map((item) => {
            const isActive = activeSection === item.toLowerCase();
            return (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className={`relative font-bold transition-all duration-300 transform hover:scale-110 ${
                  isActive ? "text-primary" : "text-white"
                } hover:text-primary`}
              >
                {item}
                {isActive && (
                  <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary animate-pulse" />
                )}
              </a>
            );
          })}
        </nav>
      </div>

      {/* Mobile Nav Dropdown */}
      {menuOpen && (
        <div className="md:hidden flex flex-col mt-4 space-y-2 text-center">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              className="block text-white font-semibold py-2 hover:text-primary transition"
            >
              {item}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;
