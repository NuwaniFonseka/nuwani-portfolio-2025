import React from "react";
import profile from "../data/profile.json"; 

const Footer = () => {
  // Get current year dynamically
  const year = new Date().getFullYear();

  // Fallback values in case profile.json doesn't have footer info
  const name = profile?.footer?.name || "Your Name";
  const text = profile?.footer?.text || "All rights reserved.";

  return (
    <footer className="bg-black/90 backdrop-blur-md border-t border-gray-800 text-gray-400 text-center py-6 px-4 shadow-inner z-50">
      {/* Footer text with hover effect on name/text */}
      <p className="text-sm hover:text-primary transition-colors duration-300">
        © {year} {name}. {text}
      </p>
    </footer>
  );
};

export default Footer;
