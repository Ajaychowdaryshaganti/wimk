import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import axios from "axios";
import { 
  MapPin, Shield, Bell, ChevronDown, Menu, X, CheckCircle2, 
  Smartphone, Users, Car, Calendar, FileText, ClipboardCheck,
  AlertTriangle, Lock, Eye, Play, ArrowRight, Phone, Mail,
  Clock, UserCheck, Building, GraduationCap, Bus, Star,
  Heart, Zap, Target, Award
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const LOGO_URL = "https://customer-assets.emergentagent.com/job_parentpeace/artifacts/42vugmbi_Untitled%20design.png";

// Intersection Observer Hook
const useReveal = () => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1, rootMargin: "-50px" }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return [ref, isVisible];
};

// Scroll Progress Hook - tracks overall page scroll
const useScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = docHeight > 0 ? scrollTop / docHeight : 0;
      setProgress(Math.min(Math.max(scrollProgress, 0), 1));
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial call
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return progress;
};

// SVG Bus Component
const AnimatedBus = ({ className = "", isMoving = false }) => (
  <svg viewBox="0 0 120 60" className={className}>
    {/* Bus Body */}
    <rect x="10" y="15" width="90" height="35" rx="8" fill="#FFC107" />
    <rect x="15" y="20" width="80" height="25" rx="4" fill="#FFD54F" />
    
    {/* Windows */}
    <rect x="20" y="22" width="15" height="12" rx="2" fill="#87CEEB" />
    <rect x="40" y="22" width="15" height="12" rx="2" fill="#87CEEB" />
    <rect x="60" y="22" width="15" height="12" rx="2" fill="#87CEEB" />
    <rect x="80" y="22" width="12" height="12" rx="2" fill="#87CEEB" />
    
    {/* Kids in windows */}
    <circle cx="27" cy="28" r="4" fill="#FFB6C1" />
    <circle cx="47" cy="28" r="4" fill="#98D8C8" />
    <circle cx="67" cy="28" r="4" fill="#DDA0DD" />
    
    {/* Wheels */}
    <g className={isMoving ? "wheel-spin" : ""} style={{ transformOrigin: "30px 50px" }}>
      <circle cx="30" cy="50" r="8" fill="#333" />
      <circle cx="30" cy="50" r="4" fill="#666" />
    </g>
    <g className={isMoving ? "wheel-spin" : ""} style={{ transformOrigin: "85px 50px" }}>
      <circle cx="85" cy="50" r="8" fill="#333" />
      <circle cx="85" cy="50" r="4" fill="#666" />
    </g>
    
    {/* Front light */}
    <rect x="95" y="30" width="8" height="6" rx="2" fill="#FFF" />
    
    {/* Door */}
    <rect x="12" y="25" width="6" height="20" rx="1" fill="#FF8C00" />
  </svg>
);

// SVG School Building
const SchoolBuilding = ({ className = "" }) => (
  <svg viewBox="0 0 100 80" className={className}>
    {/* Main Building */}
    <rect x="10" y="30" width="80" height="45" fill="#E57373" />
    <rect x="15" y="35" width="70" height="35" fill="#EF5350" />
    
    {/* Roof */}
    <polygon points="50,5 5,30 95,30" fill="#C62828" />
    
    {/* Clock/Bell Tower */}
    <rect x="40" y="10" width="20" height="20" fill="#FFEB3B" />
    <circle cx="50" cy="20" r="6" fill="#FFF" stroke="#333" strokeWidth="1" />
    
    {/* Windows */}
    <rect x="20" y="40" width="12" height="15" rx="1" fill="#BBDEFB" />
    <rect x="44" y="40" width="12" height="15" rx="1" fill="#BBDEFB" />
    <rect x="68" y="40" width="12" height="15" rx="1" fill="#BBDEFB" />
    
    {/* Door */}
    <rect x="40" y="50" width="20" height="25" rx="2" fill="#5D4037" />
    <circle cx="55" cy="62" r="2" fill="#FFD700" />
    
    {/* Flag */}
    <line x1="50" y1="5" x2="50" y2="-10" stroke="#333" strokeWidth="2" />
    <polygon points="50,-10 65,-5 50,0" fill="#4CAF50" />
  </svg>
);

// SVG Kid Character
const KidCharacter = ({ className = "", waving = false }) => (
  <svg viewBox="0 0 40 60" className={className}>
    {/* Body */}
    <rect x="12" y="25" width="16" height="20" rx="3" fill="#3B9FD8" />
    
    {/* Head */}
    <circle cx="20" cy="15" r="12" fill="#FFCC80" />
    
    {/* Hair */}
    <ellipse cx="20" cy="8" rx="10" ry="6" fill="#5D4037" />
    
    {/* Eyes */}
    <circle cx="16" cy="14" r="2" fill="#333" />
    <circle cx="24" cy="14" r="2" fill="#333" />
    
    {/* Smile */}
    <path d="M16,20 Q20,24 24,20" fill="none" stroke="#333" strokeWidth="1.5" />
    
    {/* Arms */}
    <rect x="4" y="28" width="10" height="5" rx="2" fill="#FFCC80" className={waving ? "kid-wave" : ""} style={{ transformOrigin: "12px 30px" }} />
    <rect x="26" y="28" width="10" height="5" rx="2" fill="#FFCC80" />
    
    {/* Legs */}
    <rect x="14" y="43" width="5" height="12" rx="2" fill="#1565C0" />
    <rect x="21" y="43" width="5" height="12" rx="2" fill="#1565C0" />
    
    {/* Backpack */}
    <rect x="8" y="26" width="6" height="12" rx="2" fill="#FF7043" />
  </svg>
);

// Animated Journey Scene - Scroll-based animation
const JourneyScene = ({ scrollProgress }) => {
  // Map scroll progress to animation phases
  const busPosition = scrollProgress * 75; // Bus moves from 0% to 75% of scene width
  const kidVisible = scrollProgress < 0.12;
  const kidBoarding = scrollProgress >= 0.08 && scrollProgress < 0.15;
  const busMoving = scrollProgress >= 0.1;
  const arrivedAtSchool = scrollProgress >= 0.85;
  
  return (
    <div className="relative w-full h-[400px] overflow-hidden rounded-3xl bg-gradient-to-b from-[#1a1a2e] via-[#16213e] to-[#0f0f23]">
      {/* Stars */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full star"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 40}%`,
              animationDelay: `${Math.random() * 2}s`,
              opacity: 0.5,
            }}
          />
        ))}
      </div>

      {/* Moon */}
      <div className="absolute top-8 right-12 w-16 h-16 bg-gradient-to-br from-[#FFF9C4] to-[#FFE082] rounded-full shadow-[0_0_40px_rgba(255,235,59,0.4)]" />

      {/* Clouds */}
      <div className="absolute top-16 left-[10%] cloud-float">
        <div className="w-20 h-8 bg-white/10 rounded-full blur-sm" />
      </div>
      <div className="absolute top-24 left-[60%] cloud-float" style={{ animationDelay: "2s" }}>
        <div className="w-16 h-6 bg-white/10 rounded-full blur-sm" />
      </div>

      {/* Ground/Road */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#2d5016] to-[#3d6b1e]" />
      
      {/* Road */}
      <div 
        className={`absolute bottom-12 left-0 right-0 h-12 bg-[#333] ${busMoving ? "road-animate" : ""}`}
        style={{
          backgroundImage: busMoving 
            ? "repeating-linear-gradient(90deg, transparent, transparent 40px, #FFC107 40px, #FFC107 60px)"
            : "repeating-linear-gradient(90deg, transparent, transparent 40px, #FFC107 40px, #FFC107 60px)",
        }}
      />

      {/* Home/Bus Stop */}
      <div className="absolute bottom-20 left-8">
        <div className="w-4 h-20 bg-[#666]" /> {/* Pole */}
        <div className="absolute -top-2 -left-3 w-10 h-8 bg-[#3B9FD8] rounded flex items-center justify-center">
          <Bus className="w-5 h-5 text-white" />
        </div>
      </div>

      {/* Kid at bus stop */}
      {kidVisible && (
        <div 
          className={`absolute bottom-24 transition-all duration-500 ${kidBoarding ? "opacity-0 translate-x-8" : "opacity-100"}`}
          style={{ left: "60px" }}
        >
          <KidCharacter className="w-12 h-18" waving={!kidBoarding} />
        </div>
      )}

      {/* Bus */}
      <div 
        className={`absolute bottom-16 transition-all duration-300 ease-out ${busMoving ? "bus-bounce" : ""}`}
        style={{ 
          left: `${5 + busPosition}%`,
        }}
      >
        <AnimatedBus className="w-32 h-16" isMoving={busMoving} />
      </div>

      {/* School Building */}
      <div 
        className="absolute bottom-20 right-8 transition-all duration-300"
        style={{ 
          opacity: scrollProgress > 0.3 ? 1 : 0.3,
          transform: `scale(${arrivedAtSchool ? 1.15 : 1})`,
        }}
      >
        <SchoolBuilding className="w-24 h-20" />
        {arrivedAtSchool && (
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-green-500 text-white text-xs px-3 py-1 rounded-full animate-bounce">
            Safe! ✓
          </div>
        )}
      </div>

      {/* Journey Progress Text */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center">
        <p className="text-sm text-white/80 font-medium">
          {scrollProgress < 0.1 && "🚏 Child waiting at bus stop..."}
          {scrollProgress >= 0.1 && scrollProgress < 0.2 && "🚌 Boarding the bus..."}
          {scrollProgress >= 0.2 && scrollProgress < 0.5 && "🛣️ On the way to school..."}
          {scrollProgress >= 0.5 && scrollProgress < 0.85 && "🏫 Almost there..."}
          {scrollProgress >= 0.85 && "✅ Arrived at school safely!"}
        </p>
        <div className="w-48 h-2 bg-white/20 rounded-full mt-2 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-[#3B9FD8] to-[#FFC107] rounded-full transition-all duration-300"
            style={{ width: `${scrollProgress * 100}%` }}
          />
        </div>
        <p className="text-xs text-white/40 mt-1">Scroll to follow the journey</p>
      </div>
    </div>
  );
};

// Floating Journey Progress Bar (Fixed at bottom)
const FloatingJourneyBar = ({ scrollProgress }) => {
  const arrivedAtSchool = scrollProgress >= 0.85;
  
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 pointer-events-none">
      <div className="max-w-4xl mx-auto px-6 pb-6">
        <div className="glass rounded-2xl p-4 pointer-events-auto">
          <div className="flex items-center gap-4">
            {/* Bus Stop */}
            <div className={`flex items-center gap-2 ${scrollProgress < 0.15 ? "text-[#3B9FD8]" : "text-gray-500"}`}>
              <div className="w-8 h-8 bg-[#3B9FD8]/20 rounded-lg flex items-center justify-center">
                <Bus className="w-4 h-4" />
              </div>
              <span className="text-xs hidden sm:block">Bus Stop</span>
            </div>
            
            {/* Progress Line with Bus */}
            <div className="flex-1 relative">
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#3B9FD8] to-[#FFC107] rounded-full transition-all duration-300"
                  style={{ width: `${scrollProgress * 100}%` }}
                />
              </div>
              {/* Moving Bus Icon */}
              <div 
                className="absolute top-1/2 -translate-y-1/2 transition-all duration-300"
                style={{ left: `calc(${scrollProgress * 100}% - 12px)` }}
              >
                <div className="w-6 h-6 bg-[#FFC107] rounded-lg flex items-center justify-center shadow-lg">
                  <Bus className="w-3 h-3 text-black" />
                </div>
              </div>
            </div>
            
            {/* School */}
            <div className={`flex items-center gap-2 ${arrivedAtSchool ? "text-green-400" : "text-gray-500"}`}>
              <span className="text-xs hidden sm:block">School</span>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${arrivedAtSchool ? "bg-green-500/20" : "bg-white/10"}`}>
                <Building className="w-4 h-4" />
              </div>
            </div>
          </div>
          
          {/* Status Text */}
          <p className="text-center text-xs text-gray-400 mt-2">
            {scrollProgress < 0.1 && "Child waiting at bus stop..."}
            {scrollProgress >= 0.1 && scrollProgress < 0.2 && "Boarding the bus..."}
            {scrollProgress >= 0.2 && scrollProgress < 0.5 && "On the way to school..."}
            {scrollProgress >= 0.5 && scrollProgress < 0.85 && "Almost there..."}
            {scrollProgress >= 0.85 && "✓ Arrived safely at school!"}
          </p>
        </div>
      </div>
    </div>
  );
};

// Navbar
const Navbar = ({ onRequestDemo }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsMobileOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "glass py-3" : "bg-transparent py-6"
      }`}
      data-testid="navbar"
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="/" className="flex items-center gap-3" data-testid="logo">
          <img src={LOGO_URL} alt="Where Is My Kid" className="h-12 w-auto" />
          <span className="font-bold text-xl hidden sm:block">Where Is My Kid</span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {["features", "how-it-works", "benefits", "contact"].map((item) => (
            <button
              key={item}
              onClick={() => scrollTo(item)}
              className="text-sm text-gray-400 hover:text-white transition-colors capitalize"
              data-testid={`nav-${item}`}
            >
              {item.replace("-", " ")}
            </button>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <button 
            onClick={() => scrollTo("contact")}
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            Contact Sales
          </button>
          <button 
            onClick={onRequestDemo}
            className="btn-primary text-sm py-3 px-6"
            data-testid="nav-demo-btn"
          >
            Request Demo
          </button>
        </div>

        <button 
          className="md:hidden p-2" 
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          data-testid="mobile-menu-btn"
        >
          {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMobileOpen && (
        <div className="md:hidden glass mt-2 mx-4 rounded-2xl p-4" data-testid="mobile-menu">
          {["features", "how-it-works", "benefits", "contact"].map((item) => (
            <button
              key={item}
              onClick={() => scrollTo(item)}
              className="block w-full text-left py-3 px-4 text-gray-300 hover:text-white capitalize"
            >
              {item.replace("-", " ")}
            </button>
          ))}
          <button 
            onClick={() => { onRequestDemo(); setIsMobileOpen(false); }}
            className="w-full btn-primary mt-4 text-center"
          >
            Request Demo
          </button>
        </div>
      )}
    </header>
  );
};

// Hero Section with Scroll-based Journey Animation
const HeroSection = ({ onRequestDemo, scrollProgress }) => {
  return (
    <section className="relative pt-20 overflow-hidden" data-testid="hero-section">
      {/* Background */}
      <div className="absolute inset-0 grid-pattern" />
      <div className="glow-orb w-[800px] h-[800px] bg-[#3B9FD8] top-[-300px] right-[-300px]" />
      <div className="glow-orb w-[600px] h-[600px] bg-[#FFC107] bottom-[20%] left-[-200px]" />
      
      {/* Content */}
      <div className="min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-6 py-20 relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight mb-8">
                From Bus Stops to Classrooms —{" "}
                <span className="gradient-text">Stay Informed</span>
              </h1>

              <p className="text-xl text-gray-400 leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0">
                A complete school safety and student visibility platform. 
                Know where your child is, every step of the way.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button 
                  onClick={onRequestDemo}
                  className="btn-primary text-lg flex items-center justify-center gap-2"
                  data-testid="hero-demo-btn"
                >
                  <Play className="w-5 h-5" /> Request a Demo
                </button>
                <button 
                  onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                  className="btn-secondary text-lg"
                  data-testid="hero-contact-btn"
                >
                  Contact Sales
                </button>
              </div>

              <div className="flex items-center gap-8 mt-12 justify-center lg:justify-start">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm text-gray-500">Real-time Tracking</span>
                </div>
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-500">Secure & Private</span>
                </div>
              </div>
            </div>

            {/* Right - Journey Animation */}
            <div className="relative">
              <JourneyScene scrollProgress={scrollProgress} />
              
              {/* Floating Info Cards */}
              <div className="absolute -top-4 -right-4 glass rounded-2xl p-4 animate-float z-20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Safe Arrival</p>
                    <p className="text-xs text-gray-500">School Gate</p>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-8 glass rounded-2xl p-4 animate-float-delayed z-20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#FFC107]/20 rounded-xl flex items-center justify-center">
                    <Bell className="w-5 h-5 text-[#FFC107]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Live Updates</p>
                    <p className="text-xs text-gray-500">Every moment</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20">
        <span className="text-sm text-gray-500">Scroll to explore</span>
        <ChevronDown className="w-5 h-5 text-gray-500 animate-bounce" />
      </div>
    </section>
  );
};

// Problem Section
const ProblemSection = () => {
  const [ref, isVisible] = useReveal();

  const problems = [
    { icon: AlertTriangle, title: "Safety Concerns", desc: "Parents worry about child safety during travel", color: "text-red-400", bg: "bg-red-500/20" },
    { icon: Eye, title: "No Visibility", desc: "No real-time bus location information", color: "text-orange-400", bg: "bg-orange-500/20" },
    { icon: Clock, title: "Time Wasted", desc: "Waiting at stops without knowing arrivals", color: "text-yellow-400", bg: "bg-yellow-500/20" },
  ];

  return (
    <section className="py-32 relative" data-testid="problem-section">
      <div className="max-w-7xl mx-auto px-6">
        <div ref={ref} className={`reveal ${isVisible ? "visible" : ""}`}>
          <div className="text-center mb-20">
            <span className="text-sm font-semibold tracking-wider uppercase text-[#3B9FD8] mb-4 block">
              The Challenge
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Why Schools Struggle <span className="gradient-text">Today</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Every day, millions of parents face anxiety about their children's school journey.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {problems.map((item, i) => (
              <div 
                key={i} 
                className="glass rounded-3xl p-10 card-3d shine group"
                style={{ animationDelay: `${i * 150}ms` }}
                data-testid={`problem-card-${i}`}
              >
                <div className={`w-16 h-16 ${item.bg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <item.icon className={`w-8 h-8 ${item.color}`} />
                </div>
                <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-400 text-lg">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-8 mt-20 text-center">
            {[
              { num: "76%", text: "of parents worry daily about school commute" },
              { num: "45 min", text: "average time wasted at bus stops" },
              { num: "89%", text: "schools use disconnected systems" },
            ].map((stat, i) => (
              <div key={i} className="p-6">
                <p className="text-6xl font-bold gradient-text mb-3">{stat.num}</p>
                <p className="text-gray-500">{stat.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Features Section with 3D Cards
const FeaturesSection = () => {
  const [ref, isVisible] = useReveal();

  const features = [
    { icon: MapPin, title: "Real-time Bus Tracking", desc: "Live GPS tracking with accurate ETAs and route visualization", size: "large", color: "from-blue-500 to-cyan-500" },
    { icon: UserCheck, title: "Student Verification", desc: "RFID scan-in/scan-out confirmation for every boarding", size: "large", color: "from-green-500 to-emerald-500" },
    { icon: Smartphone, title: "Parent App", desc: "Track & receive instant alerts", size: "small", color: "from-purple-500 to-pink-500" },
    { icon: Car, title: "Driver App", desc: "Location sharing & scanning", size: "small", color: "from-orange-500 to-amber-500" },
    { icon: ClipboardCheck, title: "Attendance", desc: "Automated daily tracking", size: "small", color: "from-indigo-500 to-blue-500" },
    { icon: Calendar, title: "Timetable", desc: "Complete schedule view", size: "small", color: "from-pink-500 to-rose-500" },
    { icon: FileText, title: "Exam & Marks", desc: "Academic results visibility", size: "small", color: "from-teal-500 to-cyan-500" },
    { icon: Bell, title: "Announcements", desc: "Instant push notifications", size: "small", color: "from-yellow-500 to-orange-500" },
  ];

  return (
    <section id="features" className="py-32 relative" data-testid="features-section">
      <div className="glow-orb w-[600px] h-[600px] bg-[#3B9FD8] top-1/2 left-[-300px]" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div ref={ref} className={`reveal ${isVisible ? "visible" : ""}`}>
          <div className="text-center mb-20">
            <span className="text-sm font-semibold tracking-wider uppercase text-[#3B9FD8] mb-4 block">
              Features
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Everything in <span className="gradient-text">One Platform</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <div
                key={i}
                className={`glass rounded-3xl p-8 card-3d shine ${f.size === "large" ? "md:col-span-2 md:row-span-2" : ""}`}
                data-testid={`feature-card-${i}`}
              >
                <div className={`${f.size === "large" ? "w-20 h-20" : "w-14 h-14"} bg-gradient-to-br ${f.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}>
                  <f.icon className={`${f.size === "large" ? "w-10 h-10" : "w-7 h-7"} text-white`} />
                </div>
                <h3 className={`${f.size === "large" ? "text-3xl" : "text-xl"} font-bold mb-3`}>{f.title}</h3>
                <p className={`text-gray-400 ${f.size === "large" ? "text-lg" : ""}`}>{f.desc}</p>
                
                {f.size === "large" && (
                  <div className="mt-8 flex items-center gap-2 text-[#3B9FD8]">
                    <span className="text-sm font-medium">Learn more</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// How It Works with 3D Steps
const HowItWorksSection = () => {
  const [ref, isVisible] = useReveal();

  const steps = [
    { num: "01", title: "School Setup", desc: "Configure buses, students, classes, and staff in minutes", icon: Building, color: "from-blue-500 to-indigo-500" },
    { num: "02", title: "Driver Tracking", desc: "Driver app sends live location & scans students with RFID", icon: Car, color: "from-orange-500 to-amber-500" },
    { num: "03", title: "Parent Visibility", desc: "Parents see everything in real-time via mobile app", icon: Smartphone, color: "from-green-500 to-emerald-500" },
  ];

  return (
    <section id="how-it-works" className="py-32 relative" data-testid="how-it-works-section">
      <div className="max-w-7xl mx-auto px-6">
        <div ref={ref} className={`reveal ${isVisible ? "visible" : ""}`}>
          <div className="text-center mb-20">
            <span className="text-sm font-semibold tracking-wider uppercase text-[#FFC107] mb-4 block">
              How It Works
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Simple <span className="gradient-text-gold">3-Step</span> Process
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <div key={i} className="relative group" data-testid={`step-${i}`}>
                <div className="glass rounded-3xl p-10 text-center card-3d relative overflow-hidden">
                  {/* Background Number */}
                  <span className="absolute text-[120px] font-bold text-white/5 top-0 right-4 leading-none">{step.num}</span>
                  
                  {/* Icon */}
                  <div className={`w-24 h-24 bg-gradient-to-br ${step.color} rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl pulse-glow relative z-10 group-hover:scale-110 transition-transform duration-500`}>
                    <step.icon className="w-12 h-12 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4 relative z-10">{step.title}</h3>
                  <p className="text-gray-400 relative z-10">{step.desc}</p>
                </div>
                
                {/* Connector Arrow */}
                {i < 2 && (
                  <div className="hidden md:flex absolute top-1/2 -right-4 w-8 h-8 items-center justify-center z-20">
                    <ArrowRight className="w-6 h-6 text-[#3B9FD8]" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Benefits Section
const BenefitsSection = () => {
  const [ref, isVisible] = useReveal();

  const benefits = [
    { icon: Heart, title: "Parent Peace of Mind", desc: "Complete transparency builds trust and reduces anxiety", color: "from-pink-500 to-rose-500" },
    { icon: Shield, title: "Enhanced Safety", desc: "Real-time tracking ensures child security at all times", color: "from-green-500 to-emerald-500" },
    { icon: Zap, title: "Reduced Workload", desc: "Automated systems save hours of administrative time", color: "from-yellow-500 to-orange-500" },
    { icon: Target, title: "Fewer Complaints", desc: "Clear communication eliminates transport confusion", color: "from-blue-500 to-indigo-500" },
  ];

  return (
    <section id="benefits" className="py-32 relative" data-testid="benefits-section">
      <div className="glow-orb w-[500px] h-[500px] bg-[#FFC107] bottom-0 right-[-200px]" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div ref={ref} className={`reveal ${isVisible ? "visible" : ""}`}>
          <div className="text-center mb-20">
            <span className="text-sm font-semibold tracking-wider uppercase text-green-400 mb-4 block">
              Benefits
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Why Schools <span className="text-green-400">Choose Us</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b, i) => (
              <div 
                key={i} 
                className="glass rounded-3xl p-8 card-3d group"
                data-testid={`benefit-${i}`}
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${b.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                  <b.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">{b.title}</h3>
                <p className="text-gray-400">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Who It's For
const AudienceSection = () => {
  const [ref, isVisible] = useReveal();

  const audiences = [
    { icon: GraduationCap, title: "Schools", desc: "Complete management solution for modern education" },
    { icon: Users, title: "Parents", desc: "Peace of mind knowing your child is safe" },
    { icon: Bus, title: "Transport Providers", desc: "Streamlined operations and accountability" },
    { icon: Building, title: "Administrators", desc: "Full control, insights, and reporting" },
  ];

  return (
    <section className="py-32 relative" data-testid="audience-section">
      <div className="max-w-7xl mx-auto px-6">
        <div ref={ref} className={`reveal ${isVisible ? "visible" : ""}`}>
          <div className="text-center mb-20">
            <span className="text-sm font-semibold tracking-wider uppercase text-purple-400 mb-4 block">
              Who It's For
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              Built for <span className="text-purple-400">Everyone</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {audiences.map((a, i) => (
              <div 
                key={i}
                className="glass rounded-3xl p-8 text-center card-3d group"
                data-testid={`audience-${i}`}
              >
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform">
                  <a.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">{a.title}</h3>
                <p className="text-gray-400 text-sm">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Contact Section
const ContactSection = () => {
  const [ref, isVisible] = useReveal();
  const [formData, setFormData] = useState({
    school_name: "",
    contact_person: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await axios.post(`${API}/leads`, { ...formData, request_type: "contact" });
      toast.success("Thank you! We'll contact you soon.");
      setFormData({ school_name: "", contact_person: "", email: "", phone: "", message: "" });
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-32 relative" data-testid="contact-section">
      <div className="glow-orb w-[600px] h-[600px] bg-[#3B9FD8] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div ref={ref} className={`reveal ${isVisible ? "visible" : ""}`}>
          <div className="text-center mb-16">
            <span className="text-sm font-semibold tracking-wider uppercase text-[#3B9FD8] mb-4 block">
              Get Started
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Book a <span className="gradient-text">Demo</span> Today
            </h2>
            <p className="text-xl text-gray-400">
              See how Where Is My Kid can transform your school's safety
            </p>
          </div>

          <form onSubmit={handleSubmit} className="glass rounded-3xl p-10" data-testid="contact-form">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm text-gray-400 mb-2">School Name *</label>
                <Input
                  required
                  value={formData.school_name}
                  onChange={(e) => setFormData({ ...formData, school_name: e.target.value })}
                  className="bg-white/5 border-white/10 h-14 rounded-xl text-lg"
                  placeholder="Enter school name"
                  data-testid="input-school"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Contact Person *</label>
                <Input
                  required
                  value={formData.contact_person}
                  onChange={(e) => setFormData({ ...formData, contact_person: e.target.value })}
                  className="bg-white/5 border-white/10 h-14 rounded-xl text-lg"
                  placeholder="Your name"
                  data-testid="input-person"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Email *</label>
                <Input
                  required
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-white/5 border-white/10 h-14 rounded-xl text-lg"
                  placeholder="email@school.com"
                  data-testid="input-email"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Phone *</label>
                <Input
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="bg-white/5 border-white/10 h-14 rounded-xl text-lg"
                  placeholder="+91 XXXXX XXXXX"
                  data-testid="input-phone"
                />
              </div>
            </div>
            <div className="mb-8">
              <label className="block text-sm text-gray-400 mb-2">Message</label>
              <Textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="bg-white/5 border-white/10 rounded-xl min-h-[140px] text-lg"
                placeholder="Tell us about your school's needs..."
                data-testid="input-message"
              />
            </div>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full btn-primary h-16 text-lg font-semibold"
              data-testid="submit-btn"
            >
              {isSubmitting ? "Sending..." : "Request Demo"}
            </Button>
          </form>

          <div className="flex flex-wrap justify-center gap-8 mt-12 text-gray-400">
            <a href="tel:+919959460695" className="flex items-center gap-2 hover:text-white transition-colors text-lg">
              <Phone className="w-5 h-5" /> +91 9959460695
            </a>
            <a href="mailto:ajaychowdaryshaganti@gmail.com" className="flex items-center gap-2 hover:text-white transition-colors text-lg">
              <Mail className="w-5 h-5" /> ajaychowdaryshaganti@gmail.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

// Footer
const Footer = () => {
  return (
    <footer className="py-16 border-t border-white/10" data-testid="footer">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src={LOGO_URL} alt="Where Is My Kid" className="h-12 w-auto" />
            <span className="font-bold text-xl">Where Is My Kid</span>
          </div>
          
          <p className="text-gray-500 text-center">
            Built for schools, parents, and safer student journeys.
          </p>

          <p className="text-gray-600 text-sm">
            © 2024 Where Is My Kid. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

// Demo Modal
const DemoModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    school_name: "",
    contact_person: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await axios.post(`${API}/leads`, { ...formData, request_type: "demo" });
      toast.success("Demo request submitted! We'll contact you within 24 hours.");
      setFormData({ school_name: "", contact_person: "", email: "", phone: "", message: "" });
      onClose();
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#111] border-white/10 max-w-lg" data-testid="demo-modal" aria-describedby="demo-modal-desc">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center mb-4">
            Request a <span className="gradient-text">Demo</span>
          </DialogTitle>
          <p id="demo-modal-desc" className="sr-only">Fill out the form to request a demo</p>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            required
            value={formData.school_name}
            onChange={(e) => setFormData({ ...formData, school_name: e.target.value })}
            className="bg-white/5 border-white/10 h-14 rounded-xl"
            placeholder="School Name *"
            data-testid="modal-school"
          />
          <Input
            required
            value={formData.contact_person}
            onChange={(e) => setFormData({ ...formData, contact_person: e.target.value })}
            className="bg-white/5 border-white/10 h-14 rounded-xl"
            placeholder="Your Name *"
            data-testid="modal-person"
          />
          <Input
            required
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="bg-white/5 border-white/10 h-14 rounded-xl"
            placeholder="Email *"
            data-testid="modal-email"
          />
          <Input
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="bg-white/5 border-white/10 h-14 rounded-xl"
            placeholder="Phone *"
            data-testid="modal-phone"
          />
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full btn-primary h-14"
            data-testid="modal-submit"
          >
            {isSubmitting ? "Submitting..." : "Submit Request"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

// Main Landing Page
export default function LandingPage() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const scrollProgress = useScrollProgress();

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden" data-testid="landing-page">
      <Navbar onRequestDemo={() => setIsDemoModalOpen(true)} />
      <HeroSection onRequestDemo={() => setIsDemoModalOpen(true)} scrollProgress={scrollProgress} />
      <ProblemSection />
      <FeaturesSection />
      <HowItWorksSection />
      <BenefitsSection />
      <AudienceSection />
      <ContactSection />
      <Footer />
      <FloatingJourneyBar scrollProgress={scrollProgress} />
      <DemoModal isOpen={isDemoModalOpen} onClose={() => setIsDemoModalOpen(false)} />
    </div>
  );
}
