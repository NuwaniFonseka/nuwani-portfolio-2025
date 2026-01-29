import React, { useRef, useState, useEffect } from "react";
import profile from "../data/profile.json";
import emailjs from "@emailjs/browser";
import useScrollTrigger from "../hooks/useScrollTrigger";
import {
  LinkedInIcon,
  InstagramIcon,
  FacebookIcon,
  GitHubIcon,
  TikTokIcon,
  YouTubeIcon,
} from "../assets/SocialIcons";

// Load from environment variables
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const Contact = () => {
  const formRef = useRef();
  const [status, setStatus] = useState(null);

  // --- Heading Animation ---
  const [isVisible, setIsVisible] = useState(false);
  const headingRef = useRef(null);

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

    if (headingRef.current) observer.observe(headingRef.current);

    return () => {
      if (headingRef.current) observer.unobserve(headingRef.current);
    };
  }, []);
  // --- End heading animation ---

  const socialPlatforms = [
    { icon: LinkedInIcon, href: profile.contact.socials.linkedin, label: "LinkedIn" },
    { icon: InstagramIcon, href: profile.contact.socials.instagram, label: "Instagram" },
    { icon: FacebookIcon, href: profile.contact.socials.facebook, label: "Facebook" },
    { icon: GitHubIcon, href: profile.contact.socials.github, label: "GitHub" },
    { icon: TikTokIcon, href: profile.contact.socials.tiktok, label: "TikTok" },
    { icon: YouTubeIcon, href: profile.contact.socials.youtube, label: "YouTube" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("Sending...");

    emailjs
      .sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY)
      .then(() => {
        setStatus("Message sent ✅");
        formRef.current.reset();
      })
      .catch(() => setStatus("Failed to send ❌"));
  };

  return (
    <section
      id="contact"
      className="relative text-white px-4 sm:px-6 py-16 sm:py-24 lg:py-32 scroll-mt-24"
    >
      {/* Container for the unified card */}
      <div className="max-w-6xl mx-auto">
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[24px] overflow-hidden shadow-2xl flex flex-col md:flex-row min-h-[600px]">

          {/* Left Column - Content & Socials */}
          <div className="w-full md:w-5/12 p-8 sm:p-12 flex flex-col justify-between bg-gradient-to-b from-white/5 to-transparent relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

            <div>
              <p className="text-xs font-bold tracking-[0.2em] text-cyan mb-6 uppercase">
                Contact
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold leading-tight mb-6 font-display">
                Let’s create <span className="text-cyan">smooth</span>, high-performing experiences.
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                Tell me about your product vision, goals, and what a perfect launch looks like. I’ll bring strategy, code, and design craft that feels effortless.
              </p>
            </div>

            <div className="space-y-8">
              {/* Connect Buttons */}
              <div className="flex flex-wrap gap-4">
                <a
                  href={`mailto:${profile.contact.email}`}
                  className="px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-cyan/30 font-semibold shadow-lg hover:shadow-cyan/50 transition-all transform hover:-translate-y-1"
                >
                  <span className="gradient-text">Connect with mail</span>
                </a>
              </div>

              {/* Social Icons */}
              <div>
                <p className="text-sm text-gray-500 mb-4">Or find me on:</p>
                <div className="flex flex-wrap gap-3">
                  {socialPlatforms.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center 
                                 border border-white/10 hover:bg-white/20 hover:scale-110 hover:text-cyan 
                                 transition-all duration-500"
                    >
                      <div className="w-5 h-5 flex items-center justify-center">
                        {social.icon}
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="w-full md:w-7/12 p-8 sm:p-12 bg-white/5">
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="space-y-6 h-full flex flex-col justify-center"
            >
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Name <span className="text-cyan">*</span></label>
                  <input
                    name="name"
                    type="text"
                    placeholder="Your Name"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 
                               focus:outline-none focus:border-cyan/50 focus:ring-1 focus:ring-cyan/50
                               placeholder-gray-600 text-white transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Email <span className="text-cyan">*</span></label>
                  <input
                    name="email"
                    type="email"
                    placeholder="you@email.com"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 
                               focus:outline-none focus:border-cyan/50 focus:ring-1 focus:ring-cyan/50
                               placeholder-gray-600 text-white transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Subject</label>
                  <input
                    name="title"
                    type="text"
                    placeholder="Project Inquiry"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 
                               focus:outline-none focus:border-cyan/50 focus:ring-1 focus:ring-cyan/50
                               placeholder-gray-600 text-white transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Message <span className="text-cyan">*</span></label>
                  <textarea
                    name="message"
                    rows="4"
                    placeholder="Tell me about your idea..."
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 
                               focus:outline-none focus:border-cyan/50 focus:ring-1 focus:ring-cyan/50
                               placeholder-gray-600 text-white resize-none transition-all duration-300"
                  />
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full py-4 rounded-full bg-white/10 backdrop-blur-md border border-cyan/30 font-semibold shadow-lg hover:shadow-cyan/50 transition-all transform hover:-translate-y-1"
                >
                  <span className="gradient-text font-bold">Send Message</span>
                </button>
                {status && (
                  <p className="text-sm text-center pt-3 text-cyan animate-pulse">{status}</p>
                )}
              </div>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
