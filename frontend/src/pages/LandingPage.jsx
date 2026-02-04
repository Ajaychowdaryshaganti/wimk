import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import axios from "axios";
import { 
  MapPin, Shield, Bell, ChevronDown, Menu, X, CheckCircle2, 
  Smartphone, Users, Car, Calendar, FileText, ClipboardCheck,
  AlertTriangle, Lock, Eye, Play, ArrowRight, Phone, Mail,
  Clock, UserCheck, Building, GraduationCap, Bus, Home,
  Heart, Zap, Target
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

// Scroll Progress Hook
const useScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return progress;
};

// Intersection Observer Hook
const useReveal = () => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return [ref, isVisible];
};

// 3D House Component
const House3D = ({ className = "" }) => (
  <div className={`relative ${className}`} style={{ transform: "rotateX(10deg)" }}>
    {/* House Base */}
    <div className="relative w-32 h-28">
      {/* Main Building */}
      <div 
        className="absolute bottom-0 w-28 h-24 rounded-lg"
        style={{
          background: "linear-gradient(135deg, #FFE4B5 0%, #DEB887 100%)",
          boxShadow: "inset -8px 0 20px rgba(0,0,0,0.1), 0 10px 30px rgba(0,0,0,0.3)",
          transform: "perspective(500px) rotateY(-5deg)",
        }}
      >
        {/* Door */}
        <div 
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-14 rounded-t-lg"
          style={{ background: "linear-gradient(180deg, #8B4513 0%, #654321 100%)" }}
        >
          <div className="absolute right-2 top-1/2 w-1.5 h-1.5 bg-yellow-400 rounded-full" />
        </div>
        {/* Windows */}
        <div className="absolute top-4 left-3 w-6 h-6 bg-sky-200 rounded border-2 border-white shadow-inner" />
        <div className="absolute top-4 right-3 w-6 h-6 bg-sky-200 rounded border-2 border-white shadow-inner" />
      </div>
      {/* Roof */}
      <div 
        className="absolute -top-6 left-1/2 -translate-x-1/2 w-0 h-0"
        style={{
          borderLeft: "70px solid transparent",
          borderRight: "70px solid transparent",
          borderBottom: "50px solid #C41E3A",
          filter: "drop-shadow(0 -5px 10px rgba(0,0,0,0.2))",
        }}
      />
      {/* Chimney */}
      <div 
        className="absolute -top-10 right-4 w-6 h-10 bg-red-800 rounded-t"
        style={{ boxShadow: "inset -2px 0 5px rgba(0,0,0,0.3)" }}
      />
    </div>
    {/* Label */}
    <p className="text-center text-sm font-medium text-white/80 mt-2">Home</p>
  </div>
);

// 3D School Component
const School3D = ({ isActive = false, className = "" }) => (
  <div className={`relative transition-all duration-500 ${isActive ? "scale-110" : ""} ${className}`}>
    <div className="relative w-44 h-36">
      {/* Main Building */}
      <div 
        className="absolute bottom-0 w-40 h-28 rounded-lg"
        style={{
          background: "linear-gradient(135deg, #E8B4B8 0%, #C9A0A0 100%)",
          boxShadow: `inset -10px 0 25px rgba(0,0,0,0.15), 0 15px 40px rgba(0,0,0,0.3)${isActive ? ", 0 0 60px rgba(59,159,216,0.5)" : ""}`,
          transform: "perspective(500px) rotateY(5deg)",
        }}
      >
        {/* Windows Row 1 */}
        <div className="absolute top-3 flex justify-center w-full gap-2">
          {[1,2,3,4].map(i => (
            <div key={i} className="w-6 h-6 bg-sky-100 rounded border-2 border-white shadow-inner" />
          ))}
        </div>
        {/* Windows Row 2 */}
        <div className="absolute top-12 flex justify-center w-full gap-2">
          {[1,2,3,4].map(i => (
            <div key={i} className="w-6 h-6 bg-sky-100 rounded border-2 border-white shadow-inner" />
          ))}
        </div>
        {/* Main Door */}
        <div 
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-12 rounded-t-xl"
          style={{ background: "linear-gradient(180deg, #5D4037 0%, #3E2723 100%)" }}
        />
      </div>
      {/* Tower/Clock */}
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-14 h-16 bg-gradient-to-b from-yellow-200 to-yellow-300 rounded-t-lg shadow-lg">
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-8 h-8 bg-white rounded-full border-2 border-gray-400 flex items-center justify-center">
          <div className="w-0.5 h-3 bg-gray-800 absolute" style={{ transform: "rotate(-30deg)", transformOrigin: "bottom" }} />
          <div className="w-0.5 h-2 bg-gray-800 absolute" style={{ transform: "rotate(60deg)", transformOrigin: "bottom" }} />
        </div>
      </div>
      {/* Flag */}
      <div className="absolute -top-16 left-1/2 -translate-x-1/2">
        <div className="w-1 h-8 bg-gray-700" />
        <div className="absolute top-0 left-1 w-6 h-4 bg-green-500 rounded-r" style={{ animation: "wave 1s ease-in-out infinite" }} />
      </div>
    </div>
    {/* Label */}
    <p className={`text-center text-sm font-medium mt-2 transition-colors ${isActive ? "text-green-400" : "text-white/80"}`}>
      {isActive ? "✓ Arrived Safely!" : "School"}
    </p>
  </div>
);

// 3D Bus Component
const Bus3D = ({ isMoving = false, className = "" }) => (
  <div 
    className={`relative ${className}`}
    style={{ 
      transform: "perspective(800px) rotateX(15deg) rotateY(-10deg)",
      transformStyle: "preserve-3d",
    }}
  >
    <div className="relative w-24 h-16">
      {/* Bus Body */}
      <div 
        className="absolute inset-0 rounded-xl"
        style={{
          background: "linear-gradient(180deg, #FFD700 0%, #FFA500 100%)",
          boxShadow: "0 8px 25px rgba(0,0,0,0.4), inset 0 2px 10px rgba(255,255,255,0.3)",
          transform: "translateZ(10px)",
        }}
      >
        {/* Windows */}
        <div className="absolute top-2 left-2 right-8 h-6 flex gap-1">
          {[1,2,3].map(i => (
            <div key={i} className="flex-1 bg-sky-300 rounded border border-sky-400" />
          ))}
        </div>
        {/* Front */}
        <div className="absolute top-2 right-1 w-6 h-6 bg-sky-200 rounded" />
        {/* Headlights */}
        <div className="absolute bottom-2 right-1 w-3 h-2 bg-yellow-100 rounded-full shadow-lg" />
      </div>
      {/* Wheels */}
      <div 
        className={`absolute -bottom-2 left-3 w-5 h-5 bg-gray-800 rounded-full border-2 border-gray-600 ${isMoving ? "animate-spin" : ""}`}
        style={{ animationDuration: "0.3s" }}
      >
        <div className="absolute inset-1 bg-gray-500 rounded-full" />
      </div>
      <div 
        className={`absolute -bottom-2 right-6 w-5 h-5 bg-gray-800 rounded-full border-2 border-gray-600 ${isMoving ? "animate-spin" : ""}`}
        style={{ animationDuration: "0.3s" }}
      >
        <div className="absolute inset-1 bg-gray-500 rounded-full" />
      </div>
    </div>
    {/* Exhaust */}
    {isMoving && (
      <div className="absolute -left-4 bottom-0 flex gap-1">
        {[1,2,3].map(i => (
          <div 
            key={i} 
            className="w-2 h-2 bg-gray-400/50 rounded-full animate-ping"
            style={{ animationDelay: `${i * 0.1}s`, animationDuration: "0.5s" }}
          />
        ))}
      </div>
    )}
  </div>
);

// 3D Kid Component
const Kid3D = ({ isWaving = false, className = "" }) => (
  <div className={`relative ${className}`} style={{ transform: "perspective(500px) rotateX(5deg)" }}>
    <div className="relative w-12 h-20">
      {/* Body */}
      <div 
        className="absolute bottom-4 left-1/2 -translate-x-1/2 w-8 h-10 rounded-t-lg"
        style={{
          background: "linear-gradient(180deg, #3B9FD8 0%, #2980B9 100%)",
          boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
        }}
      />
      {/* Head */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full"
        style={{
          background: "linear-gradient(135deg, #FFDAB9 0%, #DEB887 100%)",
          boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
        }}
      >
        {/* Hair */}
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-9 h-5 bg-amber-900 rounded-t-full" />
        {/* Eyes */}
        <div className="absolute top-4 left-2 w-2 h-2 bg-gray-800 rounded-full" />
        <div className="absolute top-4 right-2 w-2 h-2 bg-gray-800 rounded-full" />
        {/* Smile */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-4 h-2 border-b-2 border-gray-800 rounded-b-full" />
      </div>
      {/* Backpack */}
      <div 
        className="absolute bottom-6 -left-1 w-4 h-8 rounded bg-orange-500"
        style={{ boxShadow: "2px 2px 5px rgba(0,0,0,0.3)" }}
      />
      {/* Waving Arm */}
      <div 
        className={`absolute top-12 -right-2 w-6 h-2 bg-[#FFDAB9] rounded-full origin-left ${isWaving ? "animate-wave" : ""}`}
        style={{ transform: isWaving ? "rotate(-45deg)" : "rotate(0deg)" }}
      />
      {/* Legs */}
      <div className="absolute bottom-0 left-2 w-2 h-5 bg-blue-900 rounded" />
      <div className="absolute bottom-0 right-2 w-2 h-5 bg-blue-900 rounded" />
    </div>
  </div>
);

// Phone Mockup with App UI
const PhoneMockup = ({ scrollProgress, className = "", side = "left" }) => {
  const getNotification = () => {
    if (scrollProgress < 0.2) return { text: "Sarah is waiting for the bus", icon: "🚏", color: "bg-blue-500" };
    if (scrollProgress < 0.4) return { text: "Sarah boarded Bus #42", icon: "🚌", color: "bg-green-500" };
    if (scrollProgress < 0.7) return { text: "Bus is on the way to school", icon: "🛣️", color: "bg-yellow-500" };
    return { text: "Sarah arrived safely at school!", icon: "✅", color: "bg-green-500" };
  };

  const notification = getNotification();

  return (
    <div 
      className={`${className}`}
      style={{
        transform: `perspective(1000px) rotateY(${side === "left" ? "15deg" : "-15deg"}) rotateX(5deg)`,
        transformStyle: "preserve-3d",
      }}
    >
      {/* Phone Frame */}
      <div 
        className="w-[200px] h-[400px] rounded-[32px] p-2"
        style={{
          background: "linear-gradient(145deg, #1a1a1a, #000)",
          boxShadow: "0 30px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)",
        }}
      >
        {/* Screen */}
        <div className="w-full h-full bg-white rounded-[26px] overflow-hidden relative">
          {/* Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-6 bg-black rounded-b-2xl" />
          
          {/* App Content */}
          <div className="pt-8 px-3 h-full bg-gradient-to-b from-gray-50 to-white">
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-[8px] text-gray-400">Good Morning</p>
                <p className="text-[10px] font-semibold text-gray-900">Sarah's Mom</p>
              </div>
              <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
                <Bell className="w-3 h-3 text-gray-500" />
              </div>
            </div>

            {/* Live Status Card */}
            <div className={`${notification.color} rounded-xl p-3 text-white mb-3 transition-all duration-500`}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">{notification.icon}</span>
                <span className="text-[9px] font-medium">{notification.text}</span>
              </div>
              <div className="bg-white/20 rounded-lg p-2">
                <div className="flex justify-between text-[8px] mb-1">
                  <span>Journey Progress</span>
                  <span>{Math.round(scrollProgress * 100)}%</span>
                </div>
                <div className="w-full h-1.5 bg-white/30 rounded-full">
                  <div 
                    className="h-full bg-white rounded-full transition-all duration-300"
                    style={{ width: `${scrollProgress * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Map Preview */}
            <div className="bg-gray-100 rounded-xl p-2 mb-3 h-24 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-blue-100" />
              <div className="absolute bottom-2 left-2 w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              <div 
                className="absolute bottom-2 w-3 h-3 bg-yellow-500 rounded transition-all duration-300"
                style={{ left: `${10 + scrollProgress * 70}%` }}
              />
              <div className="absolute bottom-2 right-2 w-3 h-3 bg-red-500 rounded" />
              <p className="absolute top-1 left-2 text-[7px] text-gray-600">Live Location</p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-green-50 rounded-lg p-2">
                <p className="text-[7px] text-gray-500">Status</p>
                <p className="text-[9px] font-semibold text-green-600">
                  {scrollProgress < 0.2 ? "Waiting" : scrollProgress < 0.9 ? "In Transit" : "Arrived"}
                </p>
              </div>
              <div className="bg-blue-50 rounded-lg p-2">
                <p className="text-[7px] text-gray-500">ETA</p>
                <p className="text-[9px] font-semibold text-blue-600">
                  {scrollProgress >= 0.9 ? "Arrived!" : `${Math.round((1 - scrollProgress) * 15)} min`}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main 3D Journey Scene
const Journey3DScene = ({ scrollProgress }) => {
  // Calculate positions based on scroll
  const pathProgress = Math.min(scrollProgress * 1.2, 1); // Slightly faster than scroll
  const busX = 10 + pathProgress * 65; // Bus moves from 10% to 75%
  const kidVisible = scrollProgress < 0.15;
  const busMoving = scrollProgress > 0.1 && scrollProgress < 0.9;
  const arrivedAtSchool = scrollProgress >= 0.85;

  return (
    <div className="relative w-full h-[500px] lg:h-[600px]" style={{ perspective: "1500px" }}>
      {/* Background Gradient */}
      <div 
        className="absolute inset-0 rounded-3xl overflow-hidden"
        style={{
          background: "linear-gradient(180deg, #0a1628 0%, #1a2744 50%, #2d4a3e 100%)",
        }}
      >
        {/* Stars */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 50}%`,
                opacity: 0.3 + Math.random() * 0.7,
                animation: `twinkle ${2 + Math.random() * 2}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        {/* Moon */}
        <div 
          className="absolute top-8 right-16 w-20 h-20 rounded-full"
          style={{
            background: "radial-gradient(circle at 30% 30%, #FFF9C4 0%, #FFE082 100%)",
            boxShadow: "0 0 60px rgba(255,235,59,0.4)",
          }}
        />

        {/* Clouds */}
        <div className="absolute top-20 left-[20%] w-24 h-8 bg-white/10 rounded-full blur-sm" 
          style={{ animation: "float 8s ease-in-out infinite" }} />
        <div className="absolute top-32 left-[60%] w-16 h-6 bg-white/10 rounded-full blur-sm"
          style={{ animation: "float 6s ease-in-out infinite", animationDelay: "2s" }} />
      </div>

      {/* 3D Ground Plane */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-[55%] overflow-hidden"
        style={{
          transform: "rotateX(60deg)",
          transformOrigin: "bottom center",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Grass */}
        <div 
          className="absolute inset-0"
          style={{
            background: "linear-gradient(180deg, #2d5a27 0%, #1e3d1a 100%)",
          }}
        />
        
        {/* Road */}
        <div 
          className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-16"
          style={{
            background: "#333",
            boxShadow: "inset 0 4px 10px rgba(0,0,0,0.5)",
          }}
        >
          {/* Road markings */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-1 flex justify-center gap-8">
            {[...Array(15)].map((_, i) => (
              <div key={i} className="w-12 h-full bg-yellow-400" />
            ))}
          </div>
        </div>
      </div>

      {/* Phone Mockups in Background */}
      <div className="absolute top-8 left-4 lg:left-16 z-10 opacity-90 hidden lg:block">
        <PhoneMockup scrollProgress={scrollProgress} side="left" />
      </div>
      <div className="absolute top-8 right-4 lg:right-16 z-10 opacity-90 hidden lg:block">
        <PhoneMockup scrollProgress={scrollProgress} side="right" />
      </div>

      {/* 3D Elements Container */}
      <div className="absolute bottom-[20%] left-0 right-0 flex items-end justify-between px-8 lg:px-20">
        {/* Home */}
        <House3D className="z-20" />

        {/* Kid at bus stop */}
        {kidVisible && (
          <div 
            className="absolute z-30 transition-all duration-500"
            style={{ 
              left: "18%",
              bottom: "10%",
              opacity: scrollProgress < 0.1 ? 1 : 0,
              transform: `translateX(${scrollProgress > 0.05 ? "20px" : "0"})`,
            }}
          >
            <Kid3D isWaving={scrollProgress < 0.08} />
          </div>
        )}

        {/* Bus */}
        <div 
          className="absolute z-30 transition-all duration-200 ease-linear"
          style={{ 
            left: `${busX}%`,
            bottom: "8%",
          }}
        >
          <Bus3D isMoving={busMoving} />
        </div>

        {/* School */}
        <School3D isActive={arrivedAtSchool} className="z-20" />
      </div>

      {/* Journey Progress Overlay */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-40">
        <div className="glass rounded-2xl px-6 py-3 flex items-center gap-4">
          <Home className="w-5 h-5 text-blue-400" />
          <div className="w-32 lg:w-48 h-2 bg-white/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 via-yellow-500 to-green-500 rounded-full transition-all duration-200"
              style={{ width: `${scrollProgress * 100}%` }}
            />
          </div>
          <Building className={`w-5 h-5 transition-colors ${arrivedAtSchool ? "text-green-400" : "text-gray-400"}`} />
        </div>
        <p className="text-center text-xs text-white/60 mt-2">
          {scrollProgress < 0.1 && "🚏 Waiting for the bus..."}
          {scrollProgress >= 0.1 && scrollProgress < 0.3 && "🚌 Boarding the bus!"}
          {scrollProgress >= 0.3 && scrollProgress < 0.7 && "🛣️ On the way to school..."}
          {scrollProgress >= 0.7 && scrollProgress < 0.85 && "🏫 Almost there..."}
          {scrollProgress >= 0.85 && "✅ Safely arrived at school!"}
        </p>
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
            >
              {item.replace("-", " ")}
            </button>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <button onClick={() => scrollTo("contact")} className="text-sm text-gray-400 hover:text-white">
            Contact Sales
          </button>
          <button onClick={onRequestDemo} className="btn-primary text-sm py-3 px-6" data-testid="nav-demo-btn">
            Request Demo
          </button>
        </div>

        <button className="md:hidden p-2" onClick={() => setIsMobileOpen(!isMobileOpen)}>
          {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMobileOpen && (
        <div className="md:hidden glass mt-2 mx-4 rounded-2xl p-4">
          {["features", "how-it-works", "benefits", "contact"].map((item) => (
            <button
              key={item}
              onClick={() => scrollTo(item)}
              className="block w-full text-left py-3 px-4 text-gray-300 hover:text-white capitalize"
            >
              {item.replace("-", " ")}
            </button>
          ))}
          <button onClick={() => { onRequestDemo(); setIsMobileOpen(false); }} className="w-full btn-primary mt-4">
            Request Demo
          </button>
        </div>
      )}
    </header>
  );
};

// Hero Section with 3D Journey
const HeroSection = ({ onRequestDemo, scrollProgress }) => {
  return (
    <section className="relative min-h-[200vh]" data-testid="hero-section">
      {/* Fixed Content */}
      <div className="sticky top-0 min-h-screen pt-24 pb-8 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="glow-orb w-[600px] h-[600px] bg-[#3B9FD8] top-[-200px] right-[-200px]" />
        <div className="glow-orb w-[400px] h-[400px] bg-[#FFC107] bottom-[10%] left-[-100px]" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Text Content */}
          <div className="text-center mb-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-4">
              From Bus Stops to Classrooms —{" "}
              <span className="gradient-text">Stay Informed</span>
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-6">
              Watch the journey unfold as you scroll. Complete visibility of your child's daily school commute.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={onRequestDemo} className="btn-primary flex items-center justify-center gap-2">
                <Play className="w-5 h-5" /> Request a Demo
              </button>
              <button 
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="btn-secondary"
              >
                Contact Sales
              </button>
            </div>
          </div>

          {/* 3D Journey Scene */}
          <Journey3DScene scrollProgress={scrollProgress} />
        </div>

        {/* Scroll Hint */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center">
          <span className="text-sm text-gray-500 mb-2">Scroll to follow the journey</span>
          <ChevronDown className="w-6 h-6 text-gray-500 animate-bounce" />
        </div>
      </div>
    </section>
  );
};

// Problem Section
const ProblemSection = () => {
  const [ref, isVisible] = useReveal();
  const problems = [
    { icon: AlertTriangle, title: "Safety Concerns", desc: "Parents worry about child safety during travel", color: "from-red-500 to-rose-500" },
    { icon: Eye, title: "No Visibility", desc: "No real-time bus location information", color: "from-orange-500 to-amber-500" },
    { icon: Clock, title: "Time Wasted", desc: "Waiting at stops without knowing arrivals", color: "from-yellow-500 to-orange-500" },
  ];

  return (
    <section className="py-24 relative" data-testid="problem-section">
      <div className="max-w-7xl mx-auto px-6">
        <div ref={ref} className={`reveal ${isVisible ? "visible" : ""}`}>
          <div className="text-center mb-16">
            <span className="text-sm font-semibold tracking-wider uppercase text-[#3B9FD8] mb-4 block">The Challenge</span>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
              Why Schools Struggle <span className="gradient-text">Today</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {problems.map((item, i) => (
              <div key={i} className="glass rounded-3xl p-8 card-3d" data-testid={`problem-card-${i}`}>
                <div className={`w-14 h-14 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center mb-6`}>
                  <item.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Features Section
const FeaturesSection = () => {
  const [ref, isVisible] = useReveal();
  const features = [
    { icon: MapPin, title: "Real-time Bus Tracking", desc: "Live GPS tracking with accurate ETAs", color: "from-blue-500 to-cyan-500" },
    { icon: UserCheck, title: "Student Verification", desc: "RFID scan-in/scan-out confirmation", color: "from-green-500 to-emerald-500" },
    { icon: Smartphone, title: "Parent App", desc: "Track & receive instant alerts", color: "from-purple-500 to-pink-500" },
    { icon: Car, title: "Driver App", desc: "Location sharing & scanning", color: "from-orange-500 to-amber-500" },
    { icon: Bell, title: "Instant Alerts", desc: "Push notifications for every update", color: "from-red-500 to-rose-500" },
    { icon: Shield, title: "Complete Safety", desc: "End-to-end journey protection", color: "from-teal-500 to-cyan-500" },
  ];

  return (
    <section id="features" className="py-24 relative" data-testid="features-section">
      <div className="max-w-7xl mx-auto px-6">
        <div ref={ref} className={`reveal ${isVisible ? "visible" : ""}`}>
          <div className="text-center mb-16">
            <span className="text-sm font-semibold tracking-wider uppercase text-[#3B9FD8] mb-4 block">Features</span>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
              Everything in <span className="gradient-text">One Platform</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div key={i} className="glass rounded-3xl p-8 card-3d" data-testid={`feature-card-${i}`}>
                <div className={`w-14 h-14 bg-gradient-to-br ${f.color} rounded-2xl flex items-center justify-center mb-6`}>
                  <f.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">{f.title}</h3>
                <p className="text-gray-400">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// How It Works
const HowItWorksSection = () => {
  const [ref, isVisible] = useReveal();
  const steps = [
    { num: "01", title: "School Setup", desc: "Configure buses, students, and routes", icon: Building },
    { num: "02", title: "Driver Tracking", desc: "Driver app sends live location", icon: Car },
    { num: "03", title: "Parent Visibility", desc: "Real-time updates on mobile app", icon: Smartphone },
  ];

  return (
    <section id="how-it-works" className="py-24 relative" data-testid="how-it-works-section">
      <div className="max-w-7xl mx-auto px-6">
        <div ref={ref} className={`reveal ${isVisible ? "visible" : ""}`}>
          <div className="text-center mb-16">
            <span className="text-sm font-semibold tracking-wider uppercase text-[#FFC107] mb-4 block">How It Works</span>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
              Simple <span className="gradient-text-gold">3-Step</span> Process
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <div key={i} className="relative" data-testid={`step-${i}`}>
                <div className="glass rounded-3xl p-10 text-center card-3d">
                  <span className="absolute text-7xl font-bold text-white/5 top-4 right-6">{step.num}</span>
                  <div className="w-20 h-20 bg-gradient-to-br from-[#3B9FD8] to-[#2A8AC0] rounded-3xl flex items-center justify-center mx-auto mb-6 pulse-glow">
                    <step.icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-gray-400">{step.desc}</p>
                </div>
                {i < 2 && <ArrowRight className="hidden md:block absolute top-1/2 -right-4 w-8 h-8 text-[#3B9FD8] -translate-y-1/2" />}
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
    { icon: Heart, title: "Parent Peace of Mind", desc: "Complete transparency builds trust" },
    { icon: Shield, title: "Enhanced Safety", desc: "Real-time tracking ensures security" },
    { icon: Zap, title: "Reduced Workload", desc: "Automated systems save time" },
    { icon: Target, title: "Fewer Complaints", desc: "Clear communication reduces issues" },
  ];

  return (
    <section id="benefits" className="py-24 relative" data-testid="benefits-section">
      <div className="max-w-7xl mx-auto px-6">
        <div ref={ref} className={`reveal ${isVisible ? "visible" : ""}`}>
          <div className="text-center mb-16">
            <span className="text-sm font-semibold tracking-wider uppercase text-green-400 mb-4 block">Benefits</span>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
              Why Schools <span className="text-green-400">Choose Us</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b, i) => (
              <div key={i} className="glass rounded-3xl p-8 card-3d" data-testid={`benefit-${i}`}>
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-6">
                  <b.icon className="w-7 h-7 text-white" />
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

// Contact Section
const ContactSection = () => {
  const [ref, isVisible] = useReveal();
  const [formData, setFormData] = useState({ school_name: "", contact_person: "", email: "", phone: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await axios.post(`${API}/leads`, { ...formData, request_type: "contact" });
      toast.success("Thank you! We'll contact you soon.");
      setFormData({ school_name: "", contact_person: "", email: "", phone: "", message: "" });
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative" data-testid="contact-section">
      <div className="max-w-4xl mx-auto px-6">
        <div ref={ref} className={`reveal ${isVisible ? "visible" : ""}`}>
          <div className="text-center mb-12">
            <span className="text-sm font-semibold tracking-wider uppercase text-[#3B9FD8] mb-4 block">Get Started</span>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
              Book a <span className="gradient-text">Demo</span> Today
            </h2>
          </div>
          <form onSubmit={handleSubmit} className="glass rounded-3xl p-8" data-testid="contact-form">
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <Input required value={formData.school_name} onChange={(e) => setFormData({...formData, school_name: e.target.value})}
                className="bg-white/5 border-white/10 h-12 rounded-xl" placeholder="School Name *" data-testid="input-school" />
              <Input required value={formData.contact_person} onChange={(e) => setFormData({...formData, contact_person: e.target.value})}
                className="bg-white/5 border-white/10 h-12 rounded-xl" placeholder="Your Name *" data-testid="input-person" />
              <Input required type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="bg-white/5 border-white/10 h-12 rounded-xl" placeholder="Email *" data-testid="input-email" />
              <Input required value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="bg-white/5 border-white/10 h-12 rounded-xl" placeholder="Phone *" data-testid="input-phone" />
            </div>
            <Textarea value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})}
              className="bg-white/5 border-white/10 rounded-xl mb-4" placeholder="Message (optional)" data-testid="input-message" />
            <Button type="submit" disabled={isSubmitting} className="w-full btn-primary h-14" data-testid="submit-btn">
              {isSubmitting ? "Sending..." : "Request Demo"}
            </Button>
          </form>
          <div className="flex flex-wrap justify-center gap-8 mt-8 text-gray-400">
            <a href="tel:+919959460695" className="flex items-center gap-2 hover:text-white"><Phone className="w-5 h-5" /> +91 9959460695</a>
            <a href="mailto:ajaychowdaryshaganti@gmail.com" className="flex items-center gap-2 hover:text-white"><Mail className="w-5 h-5" /> ajaychowdaryshaganti@gmail.com</a>
          </div>
        </div>
      </div>
    </section>
  );
};

// Footer
const Footer = () => (
  <footer className="py-12 border-t border-white/10" data-testid="footer">
    <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <img src={LOGO_URL} alt="Where Is My Kid" className="h-10 w-auto" />
        <span className="font-bold">Where Is My Kid</span>
      </div>
      <p className="text-gray-500 text-center">Built for schools, parents, and safer student journeys.</p>
      <p className="text-gray-600 text-sm">© 2024 Where Is My Kid</p>
    </div>
  </footer>
);

// Demo Modal
const DemoModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({ school_name: "", contact_person: "", email: "", phone: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await axios.post(`${API}/leads`, { ...formData, request_type: "demo" });
      toast.success("Demo request submitted!");
      setFormData({ school_name: "", contact_person: "", email: "", phone: "" });
      onClose();
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#111] border-white/10 max-w-lg" aria-describedby="demo-desc">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">Request a <span className="gradient-text">Demo</span></DialogTitle>
          <p id="demo-desc" className="sr-only">Request a demo form</p>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input required value={formData.school_name} onChange={(e) => setFormData({...formData, school_name: e.target.value})}
            className="bg-white/5 border-white/10 h-12 rounded-xl" placeholder="School Name *" />
          <Input required value={formData.contact_person} onChange={(e) => setFormData({...formData, contact_person: e.target.value})}
            className="bg-white/5 border-white/10 h-12 rounded-xl" placeholder="Your Name *" />
          <Input required type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="bg-white/5 border-white/10 h-12 rounded-xl" placeholder="Email *" />
          <Input required value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})}
            className="bg-white/5 border-white/10 h-12 rounded-xl" placeholder="Phone *" />
          <Button type="submit" disabled={isSubmitting} className="w-full btn-primary h-12">
            {isSubmitting ? "Submitting..." : "Submit Request"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

// Main Page
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
      <ContactSection />
      <Footer />
      <DemoModal isOpen={isDemoModalOpen} onClose={() => setIsDemoModalOpen(false)} />
    </div>
  );
}
