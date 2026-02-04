import { useState, useEffect, useRef, lazy, Suspense } from "react";
import { toast } from "sonner";
import axios from "axios";
import { 
  MapPin, Shield, Bell, ChevronDown, Menu, X, CheckCircle2, 
  Smartphone, Users, Car, Calendar, FileText, ClipboardCheck,
  AlertTriangle, Lock, Eye, Play, ArrowRight, Phone, Mail,
  Clock, UserCheck, Building, GraduationCap, Bus,
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

// Lazy load the 3D experience
const Journey3DExperience = lazy(() => import("@/components/Journey3DExperience"));

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

// Navbar - now fixed and always visible
const Navbar = ({ onRequestDemo, isTransparent = true }) => {
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
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        isScrolled || !isTransparent ? "glass py-3" : "bg-transparent py-6"
      }`}
      data-testid="navbar"
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="/" className="flex items-center gap-3" data-testid="logo">
          <img src={LOGO_URL} alt="Where Is My Kid" className="h-12 w-auto" />
          <span className="font-bold text-xl hidden sm:block text-white drop-shadow-lg">Where Is My Kid</span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {["features", "how-it-works", "benefits", "contact"].map((item) => (
            <button
              key={item}
              onClick={() => scrollTo(item)}
              className="text-sm text-white/80 hover:text-white transition-colors capitalize drop-shadow"
              data-testid={`nav-${item}`}
            >
              {item.replace("-", " ")}
            </button>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <button 
            onClick={() => scrollTo("contact")}
            className="text-sm text-white/80 hover:text-white transition-colors drop-shadow"
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
          className="md:hidden p-2 text-white" 
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
              className="block w-full text-left py-3 px-4 text-white/80 hover:text-white capitalize"
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

// Problem Section
const ProblemSection = () => {
  const [ref, isVisible] = useReveal();

  const problems = [
    { icon: AlertTriangle, title: "Safety Concerns", desc: "Parents constantly worry about their child's safety during daily school travel", color: "text-red-400", bg: "bg-red-500/20" },
    { icon: Eye, title: "No Visibility", desc: "No way to know the exact location of school buses or when they'll arrive", color: "text-orange-400", bg: "bg-orange-500/20" },
    { icon: Clock, title: "Time Wasted", desc: "Parents waiting at bus stops without knowing actual arrival times", color: "text-yellow-400", bg: "bg-yellow-500/20" },
  ];

  return (
    <section className="py-32 relative bg-black" data-testid="problem-section">
      <div className="max-w-7xl mx-auto px-6">
        <div ref={ref} className={`reveal ${isVisible ? "visible" : ""}`}>
          <div className="text-center mb-20">
            <span className="text-sm font-semibold tracking-wider uppercase text-[#3B9FD8] mb-4 block">
              The Challenge
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-white">
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
                data-testid={`problem-card-${i}`}
              >
                <div className={`w-16 h-16 ${item.bg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <item.icon className={`w-8 h-8 ${item.color}`} />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white">{item.title}</h3>
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

// Features Section
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
    <section id="features" className="py-32 relative bg-black" data-testid="features-section">
      <div className="glow-orb w-[600px] h-[600px] bg-[#3B9FD8] top-1/2 left-[-300px]" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div ref={ref} className={`reveal ${isVisible ? "visible" : ""}`}>
          <div className="text-center mb-20">
            <span className="text-sm font-semibold tracking-wider uppercase text-[#3B9FD8] mb-4 block">
              Features
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-white">
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
                <h3 className={`${f.size === "large" ? "text-3xl" : "text-xl"} font-bold mb-3 text-white`}>{f.title}</h3>
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

// How It Works Section
const HowItWorksSection = () => {
  const [ref, isVisible] = useReveal();

  const steps = [
    { num: "01", title: "School Setup", desc: "Configure buses, students, classes, and staff in minutes", icon: Building, color: "from-blue-500 to-indigo-500" },
    { num: "02", title: "Driver Tracking", desc: "Driver app sends live location & scans students with RFID", icon: Car, color: "from-orange-500 to-amber-500" },
    { num: "03", title: "Parent Visibility", desc: "Parents see everything in real-time via mobile app", icon: Smartphone, color: "from-green-500 to-emerald-500" },
  ];

  return (
    <section id="how-it-works" className="py-32 relative bg-black" data-testid="how-it-works-section">
      <div className="max-w-7xl mx-auto px-6">
        <div ref={ref} className={`reveal ${isVisible ? "visible" : ""}`}>
          <div className="text-center mb-20">
            <span className="text-sm font-semibold tracking-wider uppercase text-[#FFC107] mb-4 block">
              How It Works
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-white">
              Simple <span className="gradient-text-gold">3-Step</span> Process
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <div key={i} className="relative group" data-testid={`step-${i}`}>
                <div className="glass rounded-3xl p-10 text-center card-3d relative overflow-hidden">
                  <span className="absolute text-[120px] font-bold text-white/5 top-0 right-4 leading-none">{step.num}</span>
                  
                  <div className={`w-24 h-24 bg-gradient-to-br ${step.color} rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl pulse-glow relative z-10 group-hover:scale-110 transition-transform duration-500`}>
                    <step.icon className="w-12 h-12 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4 relative z-10 text-white">{step.title}</h3>
                  <p className="text-gray-400 relative z-10">{step.desc}</p>
                </div>
                
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
    <section id="benefits" className="py-32 relative bg-black" data-testid="benefits-section">
      <div className="glow-orb w-[500px] h-[500px] bg-[#FFC107] bottom-0 right-[-200px]" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div ref={ref} className={`reveal ${isVisible ? "visible" : ""}`}>
          <div className="text-center mb-20">
            <span className="text-sm font-semibold tracking-wider uppercase text-green-400 mb-4 block">
              Benefits
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-white">
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
                <h3 className="text-xl font-bold mb-3 text-white">{b.title}</h3>
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
    <section className="py-32 relative bg-black" data-testid="audience-section">
      <div className="max-w-7xl mx-auto px-6">
        <div ref={ref} className={`reveal ${isVisible ? "visible" : ""}`}>
          <div className="text-center mb-20">
            <span className="text-sm font-semibold tracking-wider uppercase text-purple-400 mb-4 block">
              Who It's For
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white">
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
                <h3 className="text-xl font-bold mb-2 text-white">{a.title}</h3>
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
    <section id="contact" className="py-32 relative bg-black" data-testid="contact-section">
      <div className="glow-orb w-[600px] h-[600px] bg-[#3B9FD8] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div ref={ref} className={`reveal ${isVisible ? "visible" : ""}`}>
          <div className="text-center mb-16">
            <span className="text-sm font-semibold tracking-wider uppercase text-[#3B9FD8] mb-4 block">
              Get Started
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-white">
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
                  className="bg-white/5 border-white/10 h-14 rounded-xl text-lg text-white"
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
                  className="bg-white/5 border-white/10 h-14 rounded-xl text-lg text-white"
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
                  className="bg-white/5 border-white/10 h-14 rounded-xl text-lg text-white"
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
                  className="bg-white/5 border-white/10 h-14 rounded-xl text-lg text-white"
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
                className="bg-white/5 border-white/10 rounded-xl min-h-[140px] text-lg text-white"
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
    <footer className="py-16 border-t border-white/10 bg-black" data-testid="footer">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src={LOGO_URL} alt="Where Is My Kid" className="h-12 w-auto" />
            <span className="font-bold text-xl text-white">Where Is My Kid</span>
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
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await axios.post(`${API}/leads`, { ...formData, request_type: "demo" });
      toast.success("Demo request submitted! We'll contact you within 24 hours.");
      setFormData({ school_name: "", contact_person: "", email: "", phone: "" });
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
          <DialogTitle className="text-2xl font-bold text-center mb-4 text-white">
            Request a <span className="gradient-text">Demo</span>
          </DialogTitle>
          <p id="demo-modal-desc" className="sr-only">Fill out the form to request a demo</p>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            required
            value={formData.school_name}
            onChange={(e) => setFormData({ ...formData, school_name: e.target.value })}
            className="bg-white/5 border-white/10 h-14 rounded-xl text-white"
            placeholder="School Name *"
            data-testid="modal-school"
          />
          <Input
            required
            value={formData.contact_person}
            onChange={(e) => setFormData({ ...formData, contact_person: e.target.value })}
            className="bg-white/5 border-white/10 h-14 rounded-xl text-white"
            placeholder="Your Name *"
            data-testid="modal-person"
          />
          <Input
            required
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="bg-white/5 border-white/10 h-14 rounded-xl text-white"
            placeholder="Email *"
            data-testid="modal-email"
          />
          <Input
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="bg-white/5 border-white/10 h-14 rounded-xl text-white"
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

// 3D Loading fallback
const Journey3DFallback = () => (
  <div className="min-h-screen bg-gradient-to-b from-[#87CEEB] to-[#3B9FD8] flex items-center justify-center">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4" />
      <p className="text-white text-lg">Loading 3D Experience...</p>
    </div>
  </div>
);

// Main Landing Page
export default function LandingPage() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [show3DExperience, setShow3DExperience] = useState(true);
  const [journeyComplete, setJourneyComplete] = useState(false);

  const handleSkipAnimation = () => {
    setShow3DExperience(false);
    // Scroll to content
    document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleJourneyComplete = () => {
    setJourneyComplete(true);
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden" data-testid="landing-page">
      <Navbar onRequestDemo={() => setIsDemoModalOpen(true)} isTransparent={show3DExperience} />
      
      {/* 3D Journey Experience */}
      {show3DExperience && (
        <Suspense fallback={<Journey3DFallback />}>
          <Journey3DExperience 
            onComplete={handleJourneyComplete}
            onSkip={handleSkipAnimation}
          />
        </Suspense>
      )}

      {/* Main Content */}
      <div id="main-content">
        <ProblemSection />
        <FeaturesSection />
        <HowItWorksSection />
        <BenefitsSection />
        <AudienceSection />
        <ContactSection />
        <Footer />
      </div>
      
      <DemoModal isOpen={isDemoModalOpen} onClose={() => setIsDemoModalOpen(false)} />
    </div>
  );
}
