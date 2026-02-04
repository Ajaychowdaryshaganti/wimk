import { Button } from "@/components/ui/button";
import { MapPin, Shield, Bell, ChevronDown } from "lucide-react";

export const HeroSection = ({ onRequestDemo }) => {
  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section 
      className="relative min-h-screen pt-20 md:pt-24 hero-pattern overflow-hidden"
      data-testid="hero-section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full mb-6">
              <Shield className="w-4 h-4 text-[#3B9FD8]" />
              <span className="text-sm font-medium text-[#3B9FD8]">
                Trusted by 500+ Schools
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-['Outfit'] text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-[1.1] mb-6">
              From Bus Stops to Classrooms –{" "}
              <span className="gradient-text">Stay Informed</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
              A complete school safety and student visibility platform for parents, 
              schools, and transport staff. Know where your child is, every step of the way.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                onClick={onRequestDemo}
                className="bg-[#3B9FD8] hover:bg-[#2A8AC0] text-white rounded-full px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 btn-glow"
                data-testid="hero-request-demo"
              >
                Request a Demo
              </Button>
              <Button
                variant="outline"
                onClick={() => scrollToSection("#contact")}
                className="border-slate-200 hover:bg-slate-50 rounded-full px-8 py-6 text-lg font-medium"
                data-testid="hero-contact-sales"
              >
                Contact Sales
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center gap-6 mt-10 justify-center lg:justify-start">
              <div className="flex items-center gap-2 text-slate-500">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm">Real-time Tracking</span>
              </div>
              <div className="flex items-center gap-2 text-slate-500">
                <Shield className="w-4 h-4" />
                <span className="text-sm">Secure & Private</span>
              </div>
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative flex justify-center lg:justify-end">
            {/* Main Phone Mockup */}
            <div className="relative z-10">
              <div className="phone-frame w-[280px] sm:w-[320px]">
                <div className="phone-frame-inner">
                  <div className="phone-notch" />
                  <div className="bg-white p-4 h-[500px] sm:h-[560px]">
                    {/* App UI Mockup */}
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-xs text-slate-400">Good Morning</p>
                        <p className="font-semibold text-slate-900">Sarah's Mom</p>
                      </div>
                      <Bell className="w-5 h-5 text-slate-400" />
                    </div>
                    
                    {/* Status Card */}
                    <div className="bg-gradient-to-br from-[#3B9FD8] to-[#2A8AC0] rounded-2xl p-4 mb-4 text-white">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                          <MapPin className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-sm opacity-80">Sarah is on</p>
                          <p className="font-semibold">Bus #42 - Route A</p>
                        </div>
                      </div>
                      <div className="bg-white/20 rounded-xl p-3">
                        <div className="flex items-center justify-between text-sm">
                          <span>ETA to School</span>
                          <span className="font-semibold">12 mins</span>
                        </div>
                        <div className="w-full bg-white/30 rounded-full h-2 mt-2">
                          <div className="bg-white rounded-full h-2 w-3/4" />
                        </div>
                      </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="bg-green-50 rounded-xl p-3">
                        <p className="text-xs text-slate-500">Boarded</p>
                        <p className="font-semibold text-green-600">8:15 AM</p>
                      </div>
                      <div className="bg-blue-50 rounded-xl p-3">
                        <p className="text-xs text-slate-500">Attendance</p>
                        <p className="font-semibold text-[#3B9FD8]">Present</p>
                      </div>
                    </div>

                    {/* Today's Schedule */}
                    <div className="bg-slate-50 rounded-xl p-3">
                      <p className="text-xs text-slate-500 mb-2">Today's Schedule</p>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-600">Mathematics</span>
                          <span className="text-slate-400">9:00 AM</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-600">Science</span>
                          <span className="text-slate-400">10:30 AM</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-600">English</span>
                          <span className="text-slate-400">12:00 PM</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-floating p-3 animate-float">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <Shield className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-900">Safe Arrival</p>
                    <p className="text-xs text-slate-500">School Gate</p>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-floating p-3 animate-float animation-delay-400">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-[#FFC107]/20 rounded-full flex items-center justify-center">
                    <Bell className="w-4 h-4 text-[#F59E0B]" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-900">New Alert</p>
                    <p className="text-xs text-slate-500">Exam Tomorrow</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Background Decorations */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#3B9FD8]/5 rounded-full blur-3xl" />
            <div className="absolute top-1/4 right-0 w-[200px] h-[200px] bg-[#FFC107]/10 rounded-full blur-3xl" />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-sm text-slate-400">Scroll to explore</span>
        <ChevronDown className="w-5 h-5 text-slate-400 scroll-indicator" />
      </div>
    </section>
  );
};
