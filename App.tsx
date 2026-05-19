/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { 
  Lightbulb, 
  Wind, 
  Zap, 
  ArrowRight, 
  Phone, 
  Mail, 
  MapPin, 
  CheckCircle2,
  Menu,
  X,
  ChevronDown
} from 'lucide-react';
import { useState, useRef } from 'react';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Calculate brightness and contrast based on scroll
  const brightness = useTransform(scrollYProgress, [0, 0.4], [0.3, 1.2]);
  const contrast = useTransform(scrollYProgress, [0, 0.4], [0.8, 1.1]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const revealOpacity = useTransform(scrollYProgress, [0.3, 0.5], [0, 1]);
  const revealY = useTransform(scrollYProgress, [0.3, 0.5], [50, 0]);

  const smoothBrightness = useSpring(brightness, { stiffness: 100, damping: 30 });

  return (
    <div className="min-h-screen bg-white font-sans text-brand-blue selection:bg-brand-electric selection:text-white" ref={containerRef}>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-brand-blue/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <a href="/" className="flex items-center h-12 group">
              <img 
                src="input_file_4.png" 
                alt="Edison Amp Logo" 
                className="h-full w-auto object-contain brightness-110"
                referrerPolicy="no-referrer"
              />
            </a>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8 text-sm font-medium uppercase tracking-wider">
              <a href="#services" className="hover:text-brand-electric transition-colors">Services</a>
              <a href="#solutions" className="hover:text-brand-electric transition-colors">Solutions</a>
              <a href="#about" className="hover:text-brand-electric transition-colors">About</a>
              <a href="#contact" className="bg-brand-blue text-white px-6 py-2.5 rounded-full hover:bg-brand-blue/90 transition-all shadow-lg hover:shadow-brand-electric/20">
                Get Quote
              </a>
            </div>

            {/* Mobile Nav Toggle */}
            <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-white border-b border-brand-blue/10 p-4 space-y-4"
          >
            <a href="#services" className="block text-lg font-medium px-4 py-2" onClick={() => setIsMenuOpen(false)}>Services</a>
            <a href="#solutions" className="block text-lg font-medium px-4 py-2" onClick={() => setIsMenuOpen(false)}>Solutions</a>
            <a href="#contact" className="block text-lg font-medium px-4 py-2" onClick={() => setIsMenuOpen(false)}>Contact</a>
          </motion.div>
        )}
      </nav>

      {/* Hero Section with Dark to Bright Animation */}
      <section className="relative h-[250vh]">
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
          {/* Base Dark Image - Industrial Lighting Poles */}
          <motion.div 
            className="absolute inset-0 z-0 grayscale-[0.5]"
          >
            <img 
              src="input_file_3.png" 
              alt="Industrial Nightscape" 
              className="w-full h-full object-cover brightness-[0.1] contrast-[1.4]"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-brand-blue/40"></div>
          </motion.div>

          {/* Brilliantly Lit Reveal - High Mast Lighting */}
          <motion.div 
            className="absolute inset-0 z-10"
            style={{ 
              clipPath: useTransform(scrollYProgress, [0, 0.35], ["inset(100% 0 0 0)", "inset(0% 0 0 0)"]),
            }}
          >
            <img 
              src="input_file_3.png" 
              alt="High Mast Illumination" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/60 via-transparent to-transparent"></div>
          </motion.div>

          {/* Hero Content */}
          <motion.div 
            className="relative z-20 text-center max-w-4xl px-4"
            style={{ 
              opacity: useTransform(scrollYProgress, [0, 0.15], [1, 0]),
              y: useTransform(scrollYProgress, [0, 0.15], [0, -50])
            }}
          >
            <motion.h1 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="text-6xl md:text-9xl font-display font-black text-white leading-[0.85] mb-8 uppercase italic tracking-tighter"
            >
              EDISON <br/> <span className="text-brand-electric">AMP</span>
            </motion.h1>
            <div className="flex flex-col items-center gap-4 text-white/50">
              <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-glow">Scroll to illuminate the city</span>
              <motion.div animate={{ y: [0, 15, 0] }} transition={{ repeat: Infinity, duration: 2.5 }} className="w-px h-20 bg-brand-electric/50" />
            </div>
          </motion.div>

          {/* New Bright Content Reveal */}
          <motion.div 
            className="absolute z-30 text-center max-w-5xl px-4"
            style={{ 
              opacity: useTransform(scrollYProgress, [0.35, 0.5], [0, 1]),
              y: useTransform(scrollYProgress, [0.35, 0.5], [50, 0])
             }}
          >
            <h2 className="text-4xl md:text-7xl font-display font-black text-white mb-6 uppercase tracking-tighter italic leading-none">
              LIGHT THAT <span className="text-brand-electric">CONNECTS</span> COMMUNITIES
            </h2>
            <p className="text-lg md:text-2xl text-white/80 mb-12 max-w-2xl mx-auto italic">
              Reliable Road Lighting & Rural Highmast Solutions for a brighter and safer tomorrow.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid with Your Real Images */}
      <section id="services" className="py-24 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div className="max-w-2xl">
              <h3 className="text-sm font-bold text-brand-electric uppercase tracking-[0.3em] mb-4">Our Core Expertise</h3>
              <h2 className="text-4xl md:text-5xl font-display font-black uppercase italic tracking-tighter">Solutions that Power Bharat</h2>
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                title: "LED Lighting",
                desc: "High-efficiency commercial and industrial projects (Megoleck & more).",
                icon: <Lightbulb className="w-8 h-8" />,
                image: "input_file_1.png"
              },
              {
                title: "HVLS Fans",
                desc: "High Volume Low Speed fans for massive air circulation in large industrial spaces.",
                icon: <Wind className="w-8 h-8" />,
                image: "input_file_2.png"
              },
              {
                title: "Rural Highmast",
                desc: "Powerful area illumination for communities, grounds, and markets.",
                icon: <Zap className="w-8 h-8" />,
                image: "input_file_0.png"
              },
              {
                title: "HT & LT Works",
                desc: "Turnkey electrical infrastructure design and nationwide execution.",
                icon: <ArrowRight className="w-8 h-8" />,
                image: "input_file_3.png"
              }
            ].map((service, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -10 }}
                className="group relative h-[450px] rounded-[40px] overflow-hidden shadow-2xl transition-all"
              >
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-blue via-brand-blue/30 to-white/10"></div>
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <div className="w-12 h-12 bg-brand-electric/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-brand-electric mb-4">
                    {service.icon}
                  </div>
                  <h4 className="text-xl font-black text-white mb-2 uppercase italic tracking-tighter">{service.title}</h4>
                  <p className="text-white/70 text-xs italic leading-relaxed">{service.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Corporate/Commercial Section (Bento Style) */}
      <section id="solutions" className="py-24 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="aspect-[4/5] rounded-[40px] overflow-hidden bg-brand-blue/5">
                <img 
                  src="input_file_2.png" 
                  alt="Modern Corporate Office" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 bg-brand-blue p-8 rounded-3xl text-white shadow-2xl max-w-xs hidden md:block">
                <p className="text-3xl font-display font-bold mb-2">99%</p>
                <p className="text-sm text-white/60 leading-relaxed uppercase tracking-widest font-bold">Client satisfaction in high-end corporate installations.</p>
              </div>
            </div>

            <div className="order-1 lg:order-2 space-y-8">
              <h3 className="text-sm font-bold text-brand-electric uppercase tracking-[0.3em]">Corporate Spaces</h3>
              <h2 className="text-4xl md:text-5xl font-display font-bold leading-tight">Elevating Modern Infrastructure</h2>
              <p className="text-lg text-brand-blue/60 leading-relaxed">
                We design lighting and ventilation systems that aren't just functional—they're transformative. Our corporate solutions enhance productivity through better illumination while drastically reducing operational costs.
              </p>
              
              <div className="space-y-4">
                {[
                  "Premium LED Panel Installations",
                  "Smart Lighting Control Systems",
                  "HVLS Ventilation for Large Open Areas",
                  "Comprehensive Electrical Audits"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <CheckCircle2 className="text-brand-electric w-6 h-6 flex-shrink-0" />
                    <span className="font-semibold text-brand-blue/80 italic">{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-8 flex gap-6">
                <div>
                  <p className="text-4xl font-display font-bold text-brand-blue">15+</p>
                  <p className="text-xs uppercase tracking-widest text-brand-blue/40 font-bold">Years Experience</p>
                </div>
                <div className="w-px h-12 bg-brand-blue/10"></div>
                <div>
                  <p className="text-4xl font-display font-bold text-brand-blue">500+</p>
                  <p className="text-xs uppercase tracking-widest text-brand-blue/40 font-bold">Projects Done</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlighting Street/Rural */}
      <section className="bg-brand-blue py-24 px-4 text-white relative overflow-hidden">
        {/* Abstract Light Trails */}
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
          <svg viewBox="0 0 400 400" className="w-full h-full stroke-brand-electric fill-none">
            <path d="M100,50 Q250,50 350,300 T150,350 S50,200 100,50" />
            <path d="M120,70 Q270,70 370,320 T170,370 S70,220 120,70" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h3 className="text-sm font-bold text-brand-electric uppercase tracking-[0.3em]">Rural & Public Lighting</h3>
              <h2 className="text-4xl md:text-5xl font-display font-bold leading-tight uppercase italic">Reliable Road Lighting & Rural Highmast Solutions</h2>
              <p className="text-lg text-white/60 leading-relaxed">
                Lighting rural India, empowering every street. Our high-mast solutions provide safety and visibility in villages, grounds, markets, and public spaces across the nation.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="p-6 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                  <h4 className="font-bold mb-2 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-brand-electric"></div>
                    Energy Efficient
                  </h4>
                  <p className="text-sm text-white/50 italic">Save more with smart LED distribution.</p>
                </div>
                <div className="p-6 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                  <h4 className="font-bold mb-2 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-brand-electric"></div>
                    Weather Resistant
                  </h4>
                  <p className="text-sm text-white/50 italic">Built tough for extreme Indian climates.</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <img 
                src="input_file_0.png" 
                alt="Rural Highmast Lighting" 
                className="rounded-3xl h-64 w-full object-cover shadow-2xl"
                referrerPolicy="no-referrer"
              />
              <img 
                src="input_file_3.png" 
                alt="Public Square Lighting" 
                className="rounded-3xl h-64 w-full object-cover mt-12 shadow-2xl"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer / Contact Section */}
      <footer id="contact" className="bg-white border-t border-brand-blue/5 pt-24 pb-12 px-4 italic">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
            <div className="space-y-4">
              <div className="flex items-center h-12">
                <img 
                  src="input_file_4.png" 
                  alt="Edison Amp Logo" 
                  className="h-full w-auto object-contain brightness-110"
                  referrerPolicy="no-referrer"
                />
              </div>
              <p className="text-brand-blue/60 text-sm leading-relaxed font-medium">
                Designing, installing, and maintaining the infrastructure of tomorrow. Let's light up a better future together.
              </p>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full border border-brand-blue/10 flex items-center justify-center hover:bg-brand-electric hover:text-white transition-all cursor-pointer">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="w-10 h-10 rounded-full border border-brand-blue/10 flex items-center justify-center hover:bg-brand-electric hover:text-white transition-all cursor-pointer">
                  <Mail className="w-4 h-4" />
                </div>
              </div>
            </div>

            <div>
              <h5 className="font-bold uppercase tracking-widest text-xs mb-6 text-brand-blue/40">Quick Links</h5>
              <ul className="space-y-4 text-sm font-semibold">
                <li><a href="#" className="hover:text-brand-electric transition-colors">Residential Lighting</a></li>
                <li><a href="#" className="hover:text-brand-electric transition-colors">Industrial Fans</a></li>
                <li><a href="#" className="hover:text-brand-electric transition-colors">HT Distribution</a></li>
                <li><a href="#" className="hover:text-brand-electric transition-colors">Success Stories</a></li>
              </ul>
            </div>

            <div>
              <h5 className="font-bold uppercase tracking-widest text-xs mb-6 text-brand-blue/40">Contact Us</h5>
              <ul className="space-y-4 text-sm font-semibold">
                <li className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-brand-electric" />
                  <span>+91 9900015902</span>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-brand-electric" />
                  <span>sales@edisonamp.in</span>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-brand-electric" />
                  <span>Serving Rural & Urban India</span>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="font-bold uppercase tracking-widest text-xs mb-6 text-brand-blue/40">Newsletter</h5>
              <div className="space-y-4">
                <p className="text-xs text-brand-blue/60 font-medium">Get the latest updates on energy efficient technology.</p>
                <div className="flex gap-2">
                  <input type="text" placeholder="Email" className="bg-gray-100 border-none rounded-full px-4 py-2 text-sm w-full focus:ring-2 focus:ring-brand-electric outline-none" />
                  <button className="bg-brand-blue text-white p-2 rounded-full shadow-lg">
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-12 border-t border-brand-blue/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-xs text-brand-blue/40 font-bold uppercase tracking-widest">
              © {new Date().getFullYear()} Edison Amp. All rights reserved.
            </p>
            <div className="flex items-center gap-8 text-[10px] uppercase tracking-[0.2em] font-bold text-brand-blue/40">
              <span className="cursor-pointer hover:text-brand-blue transition-colors">Privacy Policy</span>
              <span className="hover:text-brand-blue transition-colors cursor-pointer">Terms of Service</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
