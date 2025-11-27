import React, { useRef, useState, useEffect } from "react";
import profile from "../data/profile.json";
import emailjs from "@emailjs/browser";
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
      {/* Heading with fade-in-up */}
      <h2
        ref={headingRef}
        className={`text-4xl sm:text-5xl font-bold mb-16 text-center relative z-10 transition-all duration-1000 ${
          isVisible ? "animate-fade-in-up opacity-100" : "opacity-0"
        }`}
      >
        Get In{" "}
        <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Touch
        </span>
      </h2>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-12 relative z-10">
        {/* Left – Info Cards */}
        <div className="space-y-6">
          <ContactCard
            icon={EmailIcon}
            label="Email"
            value={profile.contact.email}
            href={`mailto:${profile.contact.email}`}
          />
          <ContactCard
            icon={PhoneIcon}
            label="Phone"
            value={profile.contact.phone}
            href={`tel:${profile.contact.phone}`}
          />
          <ContactCard
            icon={LocationIcon}
            label="Location"
            value={profile.contact.location.label}
            href={profile.contact.location.mapLink}
          />

          {/* Social Icons */}
          <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-4">
            {socialPlatforms.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center 
                           border border-white/10 hover:scale-110 transition"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Right – Contact Form */}
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="space-y-6 text-black bg-white/5 backdrop-blur-md p-6 sm:p-8 rounded-xl border border-white/10 shadow-lg"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              name="name"
              type="text"
              placeholder="Your Name"
              required
              className="w-full px-4 py-3 rounded-md bg-white/80 border border-white/10 
                         focus:outline-none focus:ring-2 focus:ring-primary 
                         placeholder-gray-700 text-black"
            />

            <input
              name="email"
              type="email"
              placeholder="Your Email"
              required
              className="w-full px-4 py-3 rounded-md bg-white/80 border border-white/10 
                         focus:outline-none focus:ring-2 focus:ring-primary 
                         placeholder-gray-700 text-black"
            />
          </div>

          <input
            name="title"
            type="text"
            placeholder="Subject"
            required
            className="w-full px-4 py-3 rounded-md bg-white/80 border border-white/10 
                       focus:outline-none focus:ring-2 focus:ring-primary 
                       placeholder-gray-700 text-black"
          />

          <textarea
            name="message"
            rows="5"
            placeholder="Your Message"
            required
            className="w-full px-4 py-3 rounded-md bg-white/80 border border-white/10 
                       focus:outline-none focus:ring-2 focus:ring-primary 
                       placeholder-gray-700 text-black"
          />

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-primary to-accent text-black px-6 py-3 rounded-full font-bold hover:opacity-90 transition-all"
          >
            Send Message
          </button>

          {status && (
            <p className="text-sm text-center pt-2 text-white">{status}</p>
          )}
        </form>
      </div>
    </section>
  );
};

// Reusable Card
const ContactCard = ({ icon: Icon, label, value, href }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="block bg-white/10 backdrop-blur-md p-4 rounded-lg shadow-lg hover:shadow-primary/20 transition-all duration-300 border border-white/10 hover:border-primary transform hover:scale-105 group"
  >
    <div className="mb-2 text-primary group-hover:animate-bounce">{Icon}</div>
    <h3 className="text-primary font-bold mb-1">{label}</h3>
    <p className="text-gray-300 group-hover:text-primary underline underline-offset-2 break-words transition-colors duration-300">
      {value}
    </p>
  </a>
);

// Icons
const EmailIcon = (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
);

const PhoneIcon = (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
    />
  </svg>
);

const LocationIcon = (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);

export default Contact;
