import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "@fontsource/orbitron/600.css";

const Preloader = () => (
  <div className="fixed inset-0 bg-black flex items-center justify-center z-[10000]">
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 0.7, 1], scale: [1, 1.05, 1] }}
      transition={{ duration: 1.6, ease: "easeInOut", repeat: Infinity, repeatDelay: 1 }}
      className="text-cyan-400 text-4xl font-extrabold font-[Orbitron] relative"
    >
      <span className="relative">
        <span className="relative z-10">
          <span className="border-t-2 border-b-2 border-cyan-400 px-1 mr-1">CT</span>RL SOUND
        </span>
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-[2px] h-[6px] bg-cyan-400 opacity-70 blur-sm"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            initial={{ y: 0, opacity: 1 }}
            animate={{ y: 20, opacity: 0 }}
            transition={{
              delay: Math.random() * 2,
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </span>
    </motion.div>
  </div>
);

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, delay, ease: "easeOut" },
});

const App = () => {
  const [loading, setLoading] = useState(true);
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {loading && <Preloader />}
      <main className="bg-gradient-to-b from-black via-[#0a0a1f] to-[#0f001f] text-white overflow-x-hidden font-sans scroll-smooth">
        <ParticlesBackground />
        <Header scrolled={scrolled} navOpen={navOpen} setNavOpen={setNavOpen} />
        <MobileNav navOpen={navOpen} setNavOpen={setNavOpen} />
        <Hero />
        <Spotlight />
        <Services />
        <Contact />
        <Footer />
      </main>
    </>
  );
};

const Header = ({ scrolled, navOpen, setNavOpen }) => (
  <header className={`fixed w-full z-50 top-0 left-0 transition-all duration-300 ${scrolled ? "bg-black/80 backdrop-blur shadow-lg" : "bg-transparent"}`}>
    <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
      <a href="#" className="text-cyan-400 font-[Orbitron] text-xl font-bold"><span className="border-t-2 border-b-2 border-cyan-400 px-1 mr-1">CT</span>RL SOUND</a>
      <nav className="hidden md:flex gap-8 text-sm">
        {['Spotlight', 'Services', 'Contact'].map((link) => (
          <a href={`#${link.toLowerCase()}`} className="hover:text-cyan-400 transition" key={link}>{link}</a>
        ))}
      </nav>
      <div className="md:hidden">
        <button onClick={() => setNavOpen(!navOpen)} className="text-cyan-400 focus:outline-none">
          <div className="w-6 h-0.5 bg-cyan-400 mb-1"></div>
          <div className="w-6 h-0.5 bg-cyan-400 mb-1"></div>
          <div className="w-6 h-0.5 bg-cyan-400"></div>
        </button>
      </div>
    </div>
  </header>
);

const MobileNav = ({ navOpen, setNavOpen }) => (
  <AnimatePresence>
    {navOpen && (
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "tween", duration: 0.3 }}
        className="fixed inset-0 bg-black z-40 flex flex-col items-center justify-center gap-8 text-2xl text-cyan-400"
      >
        {['Spotlight', 'Services', 'Contact'].map((link) => (
          <a
            key={link}
            href={`#${link.toLowerCase()}`}
            onClick={() => setNavOpen(false)}
            className="hover:text-white transition"
          >
            {link}
          </a>
        ))}
        <button onClick={() => setNavOpen(false)} className="text-white text-sm mt-10">Close ✕</button>
      </motion.div>
    )}
  </AnimatePresence>
);

const Hero = () => (
  <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-4 overflow-hidden">
    <video autoPlay muted loop playsInline className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-40">
      <source src="/Dancing Club Stock Video Free Download..mp4" type="video/mp4" />
    </video>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="z-10"
    >
      <LogoAnimated />
      <p className="mt-4 text-xl text-gray-300 max-w-xl">Connecticut’s Elite DJ Promotion Service</p>
      <a href="#contact" className="inline-block mt-8 px-8 py-3 bg-cyan-400 text-black font-bold rounded-full hover:bg-white hover:text-black transition-all">
        Get Promoted
      </a>
    </motion.div>
  </section>
);

const LogoAnimated = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 1.5, ease: "easeOut" }}
    className="relative w-fit font-[Orbitron] text-cyan-400 text-5xl font-bold group"
  >
    <motion.span
      initial={{ scale: 1 }}
      animate={{ scale: [1, 1.05, 1], rotate: [0, 0.5, -0.5, 0] }}
      transition={{ duration: 2, repeat: Infinity, repeatType: "loop" }}
      whileHover={{ textShadow: "0px 0px 12px #00ffff", scale: 1.08 }}
      className="relative z-10 block transition-all duration-300"
    >
      {/* Adding margin to avoid overlap on mobile */}
      <span className="border-t-2 border-b-2 border-cyan-400 px-1 mr-1 md:mr-2 lg:mr-3">CT</span>RL SOUND
    </motion.span>
    {[...Array(10)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-[2px] h-[6px] bg-cyan-400 opacity-70 blur-sm"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
        initial={{ y: 0, opacity: 1 }}
        animate={{ y: 20, opacity: 0 }}
        transition={{ delay: i * 0.2, duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
      />
    ))}
  </motion.div>
);

const Spotlight = () => (
  <section id="spotlight" className="py-24 px-4 text-center bg-black">
  <motion.h2 {...fadeIn()} className="text-3xl font-bold text-cyan-400 mb-10">
    Spotlight
  </motion.h2>
  <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
    <motion.div
      {...fadeIn(0.2)}
      className="bg-neutral-800 p-6 rounded-xl hover:scale-105 transition-transform shadow-lg"
    >
      <h3 className="text-xl font-semibold text-white mb-2">New DJs</h3>
      <p className="text-gray-400">
        We give new DJs the visibility and opportunities they need to get booked and perform at Connecticut’s hottest venues.
      </p>
    </motion.div>
    <motion.div
      {...fadeIn(0.4)}
      className="bg-neutral-800 p-6 rounded-xl hover:scale-105 transition-transform shadow-lg"
    >
      <h3 className="text-xl font-semibold text-white mb-2">Underground Artists</h3>
      <p className="text-gray-400">
        We’re all about supporting underground talent, helping them build their brand and connect with the right audience.
      </p>
    </motion.div>
    <motion.div
      {...fadeIn(0.6)}
      className="bg-neutral-800 p-6 rounded-xl hover:scale-105 transition-transform shadow-lg"
    >
      <h3 className="text-xl font-semibold text-white mb-2">Event Curators</h3>
      <p className="text-gray-400">
        Curating unforgettable events is our specialty. We work with event curators to make their visions come to life, from concept to execution.
      </p>
    </motion.div>
  </div>
</section>
);

// Services Section
const Services = () => (
  <section id="services" className="py-24 px-4 text-center bg-neutral-950">
    <motion.h2 {...fadeIn()} className="text-3xl font-bold text-cyan-400 mb-10">What We Offer</motion.h2>
    <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
      {[{
        title: "DJ Branding",
        desc: "Logos, identity, colors — we help shape a brand that feels like music."
      }, {
        title: "Event Placement",
        desc: "Our network plugs you into CT’s biggest parties, lounges & events."
      }, {
        title: "Social Growth",
        desc: "Reels, flyers, visuals — we amplify your presence everywhere."
      }].map((card, i) => (
        <motion.div key={i} {...fadeIn(i * 0.2)} className="bg-neutral-800 p-6 rounded-xl hover:scale-105 transition-transform">
          <h3 className="text-xl font-semibold text-white mb-2">{card.title}</h3>
          <p className="text-gray-400">{card.desc}</p>
        </motion.div>
      ))}
    </div>
  </section>
  <section id="services" className="py-24 px-4 text-center bg-black">
  <motion.h2 {...fadeIn()} className="text-3xl font-bold text-cyan-400 mb-10">
    What We Offer
  </motion.h2>
  <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
    <motion.div
      {...fadeIn(0.2)}
      className="bg-neutral-800 p-6 rounded-xl hover:scale-105 transition-transform shadow-lg"
    >
      <h3 className="text-xl font-semibold text-white mb-2">DJ Branding</h3>
      <p className="text-gray-400">
        From designing your logo to curating your identity, we help shape a brand that speaks to your audience. We focus on creating a visually compelling presence that resonates with your sound and vibe, ensuring you stand out in a competitive market.
      </p>
    </motion.div>
    <motion.div
      {...fadeIn(0.4)}
      className="bg-neutral-800 p-6 rounded-xl hover:scale-105 transition-transform shadow-lg"
    >
      <h3 className="text-xl font-semibold text-white mb-2">Event Placement</h3>
      <p className="text-gray-400">
        Our extensive network in Connecticut connects you with high-profile events, venues, and private parties. Whether you're aiming for intimate gatherings or large-scale festivals, we make sure you're in the right place to make an impact and expand your reach.
      </p>
    </motion.div>
    <motion.div
      {...fadeIn(0.6)}
      className="bg-neutral-800 p-6 rounded-xl hover:scale-105 transition-transform shadow-lg"
    >
      <h3 className="text-xl font-semibold text-white mb-2">Social Growth</h3>
      <p className="text-gray-400">
        In today’s digital age, your online presence is everything. We specialize in creating eye-catching content, including reels, flyers, and social visuals, to amplify your reach across platforms like Instagram, TikTok, and more. We ensure your brand stays visible and growing, keeping you top of mind.
      </p>
    </motion.div>
  </div>
</section>
);

const Contact = () => (
  <section id="contact" className="py-24 bg-black px-4 text-center">
    <motion.h2 {...fadeIn()} className="text-3xl font-bold text-cyan-400 mb-6">Book With Us</motion.h2>
<motion.form action="https://formspree.io/f/your_form_id" method="POST" {...fadeIn(0.3)} className="max-w-xl mx-auto space-y-6">
<input 
  type="text" 
  name="name"  // Add the name field here
  placeholder="Name" 
  required 
  className="w-full p-3 rounded bg-neutral-800 border border-neutral-700 text-white focus:ring-2 focus:ring-cyan-500" 
/>
<input 
  type="email" 
  name="email"  // Add the email field here
  placeholder="Email" 
  required 
  className="w-full p-3 rounded bg-neutral-800 border border-neutral-700 text-white focus:ring-2 focus:ring-cyan-500" 
/>
<textarea 
  name="message"  // Add the message field here
  placeholder="Your Message" 
  rows="5" 
  required 
  className="w-full p-3 rounded bg-neutral-800 border border-neutral-700 text-white focus:ring-2 focus:ring-cyan-500"
></textarea>
  <button type="submit" className="bg-cyan-400 text-black px-6 py-3 font-bold rounded-full hover:bg-white hover:text-black transition">
    Submit
  </button>
</motion.form>
  </section>
);

const Footer = () => (
  <footer className="py-10 bg-black text-center text-sm text-gray-500">
    <p>&copy; 2025 CTRL Sound. Built for the future of DJ culture.</p>
    <div className="mt-4 flex justify-center gap-6">
      {['Instagram', 'TikTok', 'Email'].map((p, i) => (
        <a key={i} href="#" className="text-cyan-400 hover:text-white transition">
          {p}
        </a>
      ))}
    </div>
  </footer>
);

const ParticlesBackground = () => (
  <div className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none overflow-hidden">
    {[...Array(60)].map((_, i) => (
      <div
        key={i}
        className="absolute w-[2px] h-[2px] bg-cyan-400 rounded-full animate-ping"
        style={{
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          animationDuration: `${Math.random() * 3 + 2}s`,
        }}
      ></div>
    ))}
  </div>
);

export default App;
