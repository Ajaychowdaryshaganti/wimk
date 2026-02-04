import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import axios from "axios";
import { 
  MapPin, Shield, Bell, ChevronDown, Menu, X, CheckCircle2, 
  Smartphone, Users, Car, Calendar, FileText, ClipboardCheck,
  AlertTriangle, Lock, Eye, Play, ArrowRight, Phone, Mail,
  Clock, UserCheck, Building, GraduationCap, Bus
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

// Intersection Observer Hook for reveal animations
const useReveal = () => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: "-50px" }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return [ref, isVisible];
};

// Navbar Component
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
          <img 
            src="https://customer-assets.emergentagent.com/job_parentpeace/artifacts/vd59z55h_wimk.png" 
            alt="Where Is My Kid" 
            className="h-10 w-auto"
          />
          <span className="font-bold text-lg hidden sm:block">Where Is My Kid</span>
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

// Hero Section
const HeroSection = ({ onRequestDemo }) => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden" data-testid="hero-section">
      {/* Background Effects */}
      <div className="absolute inset-0 grid-pattern" />
      <div className="glow-orb w-[600px] h-[600px] bg-[#3B9FD8] top-[-200px] right-[-200px]" />
      <div className="glow-orb w-[400px] h-[400px] bg-[#FFC107] bottom-[-100px] left-[-100px]" />
      
      <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8">
              <Shield className="w-4 h-4 text-[#3B9FD8]" />
              <span className="text-sm text-gray-300">Trusted by 500+ Schools</span>
            </div>

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

          {/* Right - Phone Mockup */}
          <div className="relative flex justify-center">
            <div className="phone-mockup w-[300px] animate-float" data-testid="phone-mockup">
              <div className="phone-screen">
                <div className="phone-notch" />
                <div className="p-5 h-[520px] bg-gradient-to-b from-gray-50 to-white">
                  {/* App Header */}
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <p className="text-[10px] text-gray-400">Good Morning</p>
                      <p className="text-sm font-semibold text-gray-900">Sarah's Mom</p>
                    </div>
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                      <Bell className="w-4 h-4 text-gray-600" />
                    </div>
                  </div>

                  {/* Status Card */}
                  <div className="bg-gradient-to-br from-[#3B9FD8] to-[#2A8AC0] rounded-2xl p-4 text-white mb-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                        <Bus className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-[10px] opacity-80">Sarah is on</p>
                        <p className="text-sm font-semibold">Bus #42 - Route A</p>
                      </div>
                    </div>
                    <div className="bg-white/20 rounded-xl p-3">
                      <div className="flex justify-between text-xs mb-2">
                        <span>ETA to School</span>
                        <span className="font-semibold">12 mins</span>
                      </div>
                      <div className="w-full bg-white/30 rounded-full h-1.5">
                        <div className="bg-white rounded-full h-1.5 w-3/4" />
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-green-50 rounded-xl p-3">
                      <p className="text-[10px] text-gray-500">Boarded</p>
                      <p className="text-sm font-semibold text-green-600">8:15 AM</p>
                    </div>
                    <div className="bg-blue-50 rounded-xl p-3">
                      <p className="text-[10px] text-gray-500">Attendance</p>
                      <p className="text-sm font-semibold text-blue-600">Present</p>
                    </div>
                  </div>

                  {/* Schedule */}
                  <div className="bg-gray-50 rounded-xl p-3">
                    <p className="text-[10px] text-gray-500 mb-2">Today's Schedule</p>
                    <div className="space-y-2">
                      {["Mathematics • 9:00", "Science • 10:30", "English • 12:00"].map((item, i) => (
                        <div key={i} className="flex items-center justify-between text-xs text-gray-600">
                          <span>{item.split(" • ")[0]}</span>
                          <span className="text-gray-400">{item.split(" • ")[1]}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Cards */}
            <div className="absolute -top-4 -right-4 glass rounded-2xl p-4 animate-float-delayed">
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

            <div className="absolute -bottom-4 -left-8 glass rounded-2xl p-4 animate-float">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#FFC107]/20 rounded-xl flex items-center justify-center">
                  <Bell className="w-5 h-5 text-[#FFC107]" />
                </div>
                <div>
                  <p className="text-sm font-medium">New Alert</p>
                  <p className="text-xs text-gray-500">Exam Tomorrow</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
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
    { icon: AlertTriangle, title: "Safety Concerns", desc: "Parents worry about child safety during travel", color: "text-red-400" },
    { icon: Eye, title: "No Visibility", desc: "No real-time bus location information", color: "text-orange-400" },
    { icon: Clock, title: "Time Wasted", desc: "Waiting at stops without knowing arrivals", color: "text-yellow-400" },
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
                className="glass rounded-3xl p-8 card-3d shine"
                style={{ transitionDelay: `${i * 100}ms` }}
                data-testid={`problem-card-${i}`}
              >
                <item.icon className={`w-12 h-12 ${item.color} mb-6`} />
                <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-8 mt-16 text-center">
            {[
              { num: "76%", text: "of parents worry daily" },
              { num: "45 min", text: "average time wasted" },
              { num: "89%", text: "use disconnected systems" },
            ].map((stat, i) => (
              <div key={i}>
                <p className="text-5xl font-bold gradient-text mb-2">{stat.num}</p>
                <p className="text-gray-500">{stat.text}</p>
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
    { icon: MapPin, title: "Real-time Bus Tracking", desc: "Live GPS tracking with accurate ETAs", size: "large" },
    { icon: UserCheck, title: "Student Verification", desc: "RFID scan-in/scan-out confirmation", size: "large" },
    { icon: Smartphone, title: "Parent App", desc: "Track & receive alerts", size: "small" },
    { icon: Car, title: "Driver App", desc: "Location & scanning", size: "small" },
    { icon: ClipboardCheck, title: "Attendance", desc: "Auto-tracking", size: "small" },
    { icon: Calendar, title: "Timetable", desc: "Schedule view", size: "small" },
    { icon: FileText, title: "Exam & Marks", desc: "Academic results", size: "small" },
    { icon: Bell, title: "Announcements", desc: "Push notifications", size: "small" },
  ];

  return (
    <section id="features" className="py-32 relative" data-testid="features-section">
      <div className="glow-orb w-[500px] h-[500px] bg-[#3B9FD8] top-1/2 left-[-250px]" />
      
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

          <div className="grid md:grid-cols-4 gap-5">
            {features.map((f, i) => (
              <div
                key={i}
                className={`glass rounded-3xl p-8 card-3d shine ${f.size === "large" ? "md:col-span-2 md:row-span-2" : ""}`}
                data-testid={`feature-card-${i}`}
              >
                <div className={`${f.size === "large" ? "w-16 h-16" : "w-12 h-12"} bg-[#3B9FD8]/20 rounded-2xl flex items-center justify-center mb-6`}>
                  <f.icon className={`${f.size === "large" ? "w-8 h-8" : "w-6 h-6"} text-[#3B9FD8]`} />
                </div>
                <h3 className={`${f.size === "large" ? "text-3xl" : "text-xl"} font-bold mb-3`}>{f.title}</h3>
                <p className="text-gray-400">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// How It Works Section
const HowItWorksSection = () => {
  const [ref, isVisible] = useReveal();

  const steps = [
    { num: "01", title: "School Setup", desc: "Configure buses, students, classes, and staff", icon: Building },
    { num: "02", title: "Driver Tracking", desc: "Driver app sends live location & scans students", icon: Car },
    { num: "03", title: "Parent Visibility", desc: "Parents see everything in real-time via mobile app", icon: Smartphone },
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
              <div key={i} className="relative" data-testid={`step-${i}`}>
                <div className="glass rounded-3xl p-10 text-center card-3d">
                  <span className="text-6xl font-bold text-[#3B9FD8]/20 absolute top-6 right-8">{step.num}</span>
                  <div className="w-20 h-20 bg-gradient-to-br from-[#3B9FD8] to-[#2A8AC0] rounded-3xl flex items-center justify-center mx-auto mb-8 pulse-glow">
                    <step.icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                  <p className="text-gray-400">{step.desc}</p>
                </div>
                {i < 2 && (
                  <ArrowRight className="hidden md:block absolute top-1/2 -right-6 w-8 h-8 text-[#3B9FD8] -translate-y-1/2" />
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
    { icon: Shield, title: "Increased Parent Trust", desc: "Build confidence with complete transparency" },
    { icon: CheckCircle2, title: "Improved Student Safety", desc: "Real-time tracking ensures child security" },
    { icon: Clock, title: "Reduced School Workload", desc: "Automated systems save administrative time" },
    { icon: Users, title: "Fewer Complaints", desc: "Clear communication reduces transport issues" },
  ];

  return (
    <section id="benefits" className="py-32 relative" data-testid="benefits-section">
      <div className="glow-orb w-[400px] h-[400px] bg-[#FFC107] bottom-0 right-[-200px]" />
      
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
                className="glass rounded-3xl p-8 card-3d"
                data-testid={`benefit-${i}`}
              >
                <div className="w-14 h-14 bg-green-500/20 rounded-2xl flex items-center justify-center mb-6">
                  <b.icon className="w-7 h-7 text-green-400" />
                </div>
                <h3 className="text-xl font-bold mb-3">{b.title}</h3>
                <p className="text-gray-400 text-sm">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Who It's For Section
const AudienceSection = () => {
  const [ref, isVisible] = useReveal();

  const audiences = [
    { icon: GraduationCap, title: "Schools", desc: "Complete management solution" },
    { icon: Users, title: "Parents", desc: "Peace of mind, always" },
    { icon: Bus, title: "Transport Providers", desc: "Streamlined operations" },
    { icon: Building, title: "Administrators", desc: "Full control & insights" },
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
                className="glass rounded-3xl p-8 text-center hover:bg-white/10 transition-colors"
                data-testid={`audience-${i}`}
              >
                <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <a.icon className="w-8 h-8 text-purple-400" />
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
      <div className="glow-orb w-[500px] h-[500px] bg-[#3B9FD8] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div ref={ref} className={`reveal ${isVisible ? "visible" : ""}`}>
          <div className="text-center mb-16">
            <span className="text-sm font-semibold tracking-wider uppercase text-[#3B9FD8] mb-4 block">
              Get Started
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Book a <span className="gradient-text">Demo</span> for Your School
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
                  className="bg-white/5 border-white/10 h-12 rounded-xl"
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
                  className="bg-white/5 border-white/10 h-12 rounded-xl"
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
                  className="bg-white/5 border-white/10 h-12 rounded-xl"
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
                  className="bg-white/5 border-white/10 h-12 rounded-xl"
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
                className="bg-white/5 border-white/10 rounded-xl min-h-[120px]"
                placeholder="Tell us about your school's needs..."
                data-testid="input-message"
              />
            </div>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full btn-primary h-14 text-lg"
              data-testid="submit-btn"
            >
              {isSubmitting ? "Sending..." : "Request Demo"}
            </Button>
          </form>

          <div className="flex flex-wrap justify-center gap-8 mt-12 text-gray-400">
            <a href="tel:+911234567890" className="flex items-center gap-2 hover:text-white transition-colors">
              <Phone className="w-5 h-5" /> +91 123 456 7890
            </a>
            <a href="mailto:hello@whereismykid.com" className="flex items-center gap-2 hover:text-white transition-colors">
              <Mail className="w-5 h-5" /> hello@whereismykid.com
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
            <img 
              src="https://customer-assets.emergentagent.com/job_parentpeace/artifacts/vd59z55h_wimk.png" 
              alt="Where Is My Kid" 
              className="h-10 w-auto"
            />
            <span className="font-bold">Where Is My Kid</span>
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
      <DialogContent className="bg-[#111] border-white/10 max-w-lg" data-testid="demo-modal">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center mb-4">
            Request a <span className="gradient-text">Demo</span>
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              required
              value={formData.school_name}
              onChange={(e) => setFormData({ ...formData, school_name: e.target.value })}
              className="bg-white/5 border-white/10 h-12 rounded-xl"
              placeholder="School Name *"
              data-testid="modal-school"
            />
          </div>
          <div>
            <Input
              required
              value={formData.contact_person}
              onChange={(e) => setFormData({ ...formData, contact_person: e.target.value })}
              className="bg-white/5 border-white/10 h-12 rounded-xl"
              placeholder="Your Name *"
              data-testid="modal-person"
            />
          </div>
          <div>
            <Input
              required
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="bg-white/5 border-white/10 h-12 rounded-xl"
              placeholder="Email *"
              data-testid="modal-email"
            />
          </div>
          <div>
            <Input
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="bg-white/5 border-white/10 h-12 rounded-xl"
              placeholder="Phone *"
              data-testid="modal-phone"
            />
          </div>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full btn-primary h-12"
            data-testid="modal-submit"
          >
            {isSubmitting ? "Submitting..." : "Submit Request"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

// Main Landing Page Component
export default function LandingPage() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden" data-testid="landing-page">
      <Navbar onRequestDemo={() => setIsDemoModalOpen(true)} />
      <HeroSection onRequestDemo={() => setIsDemoModalOpen(true)} />
      <ProblemSection />
      <FeaturesSection />
      <HowItWorksSection />
      <BenefitsSection />
      <AudienceSection />
      <ContactSection />
      <Footer />
      <DemoModal isOpen={isDemoModalOpen} onClose={() => setIsDemoModalOpen(false)} />
    </div>
  );
}
