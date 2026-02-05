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

const Journey3DExperience = lazy(() => import("@/components/Journey3DExperience"));

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const LOGO_URL = "https://customer-assets.emergentagent.com/job_parentpeace/artifacts/42vugmbi_Untitled%20design.png";

const useReveal = () => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setIsVisible(true); }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, isVisible];
};

const Navbar = ({ onRequestDemo }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const h = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsMobileOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${isScrolled ? "glass py-3" : "bg-transparent py-6"}`} data-testid="navbar">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="/" className="flex items-center gap-3" data-testid="logo">
          <img src={LOGO_URL} alt="Where Is My Kid" className="h-12 w-auto" />
          <span className="font-bold text-xl hidden sm:block text-white drop-shadow-lg">Where Is My Kid</span>
        </a>
        <nav className="hidden md:flex items-center gap-8">
          {["features", "how-it-works", "benefits", "contact"].map((item) => (
            <button key={item} onClick={() => scrollTo(item)} className="text-sm text-white/80 hover:text-white transition-colors capitalize drop-shadow">{item.replace("-", " ")}</button>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-4">
          <button onClick={() => scrollTo("contact")} className="text-sm text-white/80 hover:text-white drop-shadow">Contact Sales</button>
          <button onClick={onRequestDemo} className="btn-primary text-sm py-3 px-6" data-testid="nav-demo-btn">Request Demo</button>
        </div>
        <button className="md:hidden p-2 text-white" onClick={() => setIsMobileOpen(!isMobileOpen)}>{isMobileOpen ? <X size={24} /> : <Menu size={24} />}</button>
      </div>
      {isMobileOpen && (
        <div className="md:hidden glass mt-2 mx-4 rounded-2xl p-4">
          {["features", "how-it-works", "benefits", "contact"].map((item) => (
            <button key={item} onClick={() => scrollTo(item)} className="block w-full text-left py-3 px-4 text-white/80 capitalize">{item.replace("-", " ")}</button>
          ))}
          <button onClick={() => { onRequestDemo(); setIsMobileOpen(false); }} className="w-full btn-primary mt-4 text-center">Request Demo</button>
        </div>
      )}
    </header>
  );
};

const ProblemSection = () => {
  const [ref, isVisible] = useReveal();
  const problems = [
    { icon: AlertTriangle, title: "Safety Concerns", desc: "Parents worry about their child's safety during travel", color: "text-red-400", bg: "bg-red-500/20" },
    { icon: Eye, title: "No Visibility", desc: "No real-time bus location information available", color: "text-orange-400", bg: "bg-orange-500/20" },
    { icon: Clock, title: "Time Wasted", desc: "Parents wait at bus stops without knowing arrivals", color: "text-yellow-400", bg: "bg-yellow-500/20" },
  ];
  return (
    <section className="py-24 relative bg-black" data-testid="problem-section">
      <div className="max-w-7xl mx-auto px-6">
        <div ref={ref} className={`reveal ${isVisible ? "visible" : ""}`}>
          <div className="text-center mb-16">
            <span className="text-sm font-semibold tracking-wider uppercase text-[#3B9FD8] mb-4 block">The Challenge</span>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6 text-white">Why Schools Struggle <span className="gradient-text">Today</span></h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {problems.map((item, i) => (
              <div key={i} className="glass rounded-3xl p-8 card-3d" data-testid={`problem-card-${i}`}>
                <div className={`w-14 h-14 ${item.bg} rounded-2xl flex items-center justify-center mb-5`}><item.icon className={`w-7 h-7 ${item.color}`} /></div>
                <h3 className="text-xl font-bold mb-2 text-white">{item.title}</h3>
                <p className="text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="grid md:grid-cols-3 gap-8 mt-16 text-center">
            {[{ num: "76%", text: "of parents worry daily" }, { num: "45 min", text: "average time wasted" }, { num: "89%", text: "use disconnected systems" }].map((s, i) => (
              <div key={i}><p className="text-5xl font-bold gradient-text mb-2">{s.num}</p><p className="text-gray-500">{s.text}</p></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const FeaturesSection = () => {
  const [ref, isVisible] = useReveal();
  const features = [
    { icon: MapPin, title: "Real-time Bus Tracking", desc: "Live GPS tracking with accurate ETAs", size: "large", color: "from-blue-500 to-cyan-500" },
    { icon: UserCheck, title: "Student Verification", desc: "RFID scan-in/scan-out confirmation", size: "large", color: "from-green-500 to-emerald-500" },
    { icon: Smartphone, title: "Parent App", desc: "Track & receive alerts", size: "small", color: "from-purple-500 to-pink-500" },
    { icon: Car, title: "Driver App", desc: "Location & scanning", size: "small", color: "from-orange-500 to-amber-500" },
    { icon: ClipboardCheck, title: "Attendance", desc: "Auto daily tracking", size: "small", color: "from-indigo-500 to-blue-500" },
    { icon: Calendar, title: "Timetable", desc: "Schedule view", size: "small", color: "from-pink-500 to-rose-500" },
    { icon: FileText, title: "Exam & Marks", desc: "Academic results", size: "small", color: "from-teal-500 to-cyan-500" },
    { icon: Bell, title: "Announcements", desc: "Push notifications", size: "small", color: "from-yellow-500 to-orange-500" },
  ];
  return (
    <section id="features" className="py-24 relative bg-black" data-testid="features-section">
      <div className="glow-orb w-[500px] h-[500px] bg-[#3B9FD8] top-1/2 left-[-250px]" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div ref={ref} className={`reveal ${isVisible ? "visible" : ""}`}>
          <div className="text-center mb-16">
            <span className="text-sm font-semibold tracking-wider uppercase text-[#3B9FD8] mb-4 block">Features</span>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6 text-white">Everything in <span className="gradient-text">One Platform</span></h2>
          </div>
          <div className="grid md:grid-cols-4 gap-5">
            {features.map((f, i) => (
              <div key={i} className={`glass rounded-3xl p-7 card-3d ${f.size === "large" ? "md:col-span-2 md:row-span-2" : ""}`} data-testid={`feature-card-${i}`}>
                <div className={`${f.size === "large" ? "w-16 h-16" : "w-12 h-12"} bg-gradient-to-br ${f.color} rounded-2xl flex items-center justify-center mb-5 shadow-lg`}>
                  <f.icon className={`${f.size === "large" ? "w-8 h-8" : "w-6 h-6"} text-white`} />
                </div>
                <h3 className={`${f.size === "large" ? "text-2xl" : "text-lg"} font-bold mb-2 text-white`}>{f.title}</h3>
                <p className="text-gray-400">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const HowItWorksSection = () => {
  const [ref, isVisible] = useReveal();
  const steps = [
    { num: "01", title: "School Setup", desc: "Configure buses, students, and staff", icon: Building, color: "from-blue-500 to-indigo-500" },
    { num: "02", title: "Driver Tracking", desc: "Live location & RFID scans", icon: Car, color: "from-orange-500 to-amber-500" },
    { num: "03", title: "Parent Visibility", desc: "Real-time updates via app", icon: Smartphone, color: "from-green-500 to-emerald-500" },
  ];
  return (
    <section id="how-it-works" className="py-24 relative bg-black" data-testid="how-it-works-section">
      <div className="max-w-7xl mx-auto px-6">
        <div ref={ref} className={`reveal ${isVisible ? "visible" : ""}`}>
          <div className="text-center mb-16">
            <span className="text-sm font-semibold tracking-wider uppercase text-[#FFC107] mb-4 block">How It Works</span>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">Simple <span className="gradient-text-gold">3-Step</span> Process</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {steps.map((step, i) => (
              <div key={i} className="relative group" data-testid={`step-${i}`}>
                <div className="glass rounded-3xl p-8 text-center card-3d">
                  <span className="absolute text-8xl font-bold text-white/5 top-2 right-4">{step.num}</span>
                  <div className={`w-20 h-20 bg-gradient-to-br ${step.color} rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl pulse-glow group-hover:scale-110 transition-transform`}>
                    <step.icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">{step.title}</h3>
                  <p className="text-gray-400">{step.desc}</p>
                </div>
                {i < 2 && <ArrowRight className="hidden md:block absolute top-1/2 -right-3 w-6 h-6 text-[#3B9FD8] -translate-y-1/2" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const BenefitsSection = () => {
  const [ref, isVisible] = useReveal();
  const benefits = [
    { icon: Heart, title: "Peace of Mind", desc: "Complete transparency for parents", color: "from-pink-500 to-rose-500" },
    { icon: Shield, title: "Enhanced Safety", desc: "Real-time tracking always", color: "from-green-500 to-emerald-500" },
    { icon: Zap, title: "Less Workload", desc: "Automated systems save time", color: "from-yellow-500 to-orange-500" },
    { icon: Target, title: "Fewer Complaints", desc: "Clear communication", color: "from-blue-500 to-indigo-500" },
  ];
  return (
    <section id="benefits" className="py-24 relative bg-black" data-testid="benefits-section">
      <div className="glow-orb w-[400px] h-[400px] bg-[#FFC107] bottom-0 right-[-150px]" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div ref={ref} className={`reveal ${isVisible ? "visible" : ""}`}>
          <div className="text-center mb-16">
            <span className="text-sm font-semibold tracking-wider uppercase text-green-400 mb-4 block">Benefits</span>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">Why Schools <span className="text-green-400">Choose Us</span></h2>
          </div>
          <div className="grid md:grid-cols-4 gap-5">
            {benefits.map((b, i) => (
              <div key={i} className="glass rounded-3xl p-7 card-3d group" data-testid={`benefit-${i}`}>
                <div className={`w-14 h-14 bg-gradient-to-br ${b.color} rounded-2xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform`}>
                  <b.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-white">{b.title}</h3>
                <p className="text-gray-400 text-sm">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const AudienceSection = () => {
  const [ref, isVisible] = useReveal();
  const audiences = [
    { icon: GraduationCap, title: "Schools", desc: "Complete management solution" },
    { icon: Users, title: "Parents", desc: "Peace of mind always" },
    { icon: Bus, title: "Transport", desc: "Streamlined operations" },
    { icon: Building, title: "Admins", desc: "Full control & insights" },
  ];
  return (
    <section className="py-24 relative bg-black" data-testid="audience-section">
      <div className="max-w-7xl mx-auto px-6">
        <div ref={ref} className={`reveal ${isVisible ? "visible" : ""}`}>
          <div className="text-center mb-16">
            <span className="text-sm font-semibold tracking-wider uppercase text-purple-400 mb-4 block">Who It's For</span>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">Built for <span className="text-purple-400">Everyone</span></h2>
          </div>
          <div className="grid md:grid-cols-4 gap-5">
            {audiences.map((a, i) => (
              <div key={i} className="glass rounded-3xl p-7 text-center card-3d group" data-testid={`audience-${i}`}>
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl flex items-center justify-center mx-auto mb-5 shadow-lg group-hover:scale-110 transition-transform">
                  <a.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold mb-1 text-white">{a.title}</h3>
                <p className="text-gray-400 text-sm">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

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
    } catch { toast.error("Something went wrong."); }
    finally { setIsSubmitting(false); }
  };

  return (
    <section id="contact" className="py-24 relative bg-black" data-testid="contact-section">
      <div className="glow-orb w-[500px] h-[500px] bg-[#3B9FD8] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      <div className="max-w-3xl mx-auto px-6 relative z-10">
        <div ref={ref} className={`reveal ${isVisible ? "visible" : ""}`}>
          <div className="text-center mb-12">
            <span className="text-sm font-semibold tracking-wider uppercase text-[#3B9FD8] mb-4 block">Get Started</span>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4 text-white">Book a <span className="gradient-text">Demo</span></h2>
          </div>
          <form onSubmit={handleSubmit} className="glass rounded-3xl p-8" data-testid="contact-form">
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <Input required value={formData.school_name} onChange={(e) => setFormData({...formData, school_name: e.target.value})} className="bg-white/5 border-white/10 h-12 rounded-xl text-white" placeholder="School Name *" data-testid="input-school" />
              <Input required value={formData.contact_person} onChange={(e) => setFormData({...formData, contact_person: e.target.value})} className="bg-white/5 border-white/10 h-12 rounded-xl text-white" placeholder="Your Name *" data-testid="input-person" />
              <Input required type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="bg-white/5 border-white/10 h-12 rounded-xl text-white" placeholder="Email *" data-testid="input-email" />
              <Input required value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="bg-white/5 border-white/10 h-12 rounded-xl text-white" placeholder="Phone *" data-testid="input-phone" />
            </div>
            <Textarea value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} className="bg-white/5 border-white/10 rounded-xl mb-4 text-white" placeholder="Message" data-testid="input-message" />
            <Button type="submit" disabled={isSubmitting} className="w-full btn-primary h-12" data-testid="submit-btn">{isSubmitting ? "Sending..." : "Request Demo"}</Button>
          </form>
          <div className="flex flex-wrap justify-center gap-6 mt-8 text-gray-400">
            <a href="tel:+919959460695" className="flex items-center gap-2 hover:text-white"><Phone className="w-5 h-5" /> +91 9959460695</a>
            <a href="mailto:ajaychowdaryshaganti@gmail.com" className="flex items-center gap-2 hover:text-white"><Mail className="w-5 h-5" /> ajaychowdaryshaganti@gmail.com</a>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="py-12 border-t border-white/10 bg-black" data-testid="footer">
    <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <img src={LOGO_URL} alt="Where Is My Kid" className="h-10 w-auto" />
        <span className="font-bold text-white">Where Is My Kid</span>
      </div>
      <p className="text-gray-500 text-sm">Built for schools, parents, and safer journeys.</p>
      <p className="text-gray-600 text-xs">© 2024 Where Is My Kid</p>
    </div>
  </footer>
);

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
    } catch { toast.error("Something went wrong."); }
    finally { setIsSubmitting(false); }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#111] border-white/10 max-w-md" aria-describedby="demo-desc">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center text-white">Request a <span className="gradient-text">Demo</span></DialogTitle>
          <p id="demo-desc" className="sr-only">Demo form</p>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-3">
          <Input required value={formData.school_name} onChange={(e) => setFormData({...formData, school_name: e.target.value})} className="bg-white/5 border-white/10 h-12 rounded-xl text-white" placeholder="School Name *" />
          <Input required value={formData.contact_person} onChange={(e) => setFormData({...formData, contact_person: e.target.value})} className="bg-white/5 border-white/10 h-12 rounded-xl text-white" placeholder="Your Name *" />
          <Input required type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="bg-white/5 border-white/10 h-12 rounded-xl text-white" placeholder="Email *" />
          <Input required value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="bg-white/5 border-white/10 h-12 rounded-xl text-white" placeholder="Phone *" />
          <Button type="submit" disabled={isSubmitting} className="w-full btn-primary h-12">{isSubmitting ? "Submitting..." : "Submit"}</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const LoadingFallback = () => (
  <div className="min-h-screen bg-gradient-to-b from-[#87CEEB] to-[#3B9FD8] flex items-center justify-center">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4" />
      <p className="text-white">Loading 3D Experience...</p>
    </div>
  </div>
);

export default function LandingPage() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [show3D, setShow3D] = useState(true);

  const handleSkip = () => {
    setShow3D(false);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden" data-testid="landing-page">
      <Navbar onRequestDemo={() => setIsDemoModalOpen(true)} />
      
      {show3D && (
        <Suspense fallback={<LoadingFallback />}>
          <Journey3DExperience onSkip={handleSkip} />
        </Suspense>
      )}

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
