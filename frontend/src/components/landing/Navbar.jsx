import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Benefits", href: "#benefits" },
  { label: "Contact", href: "#contact" },
];

export const Navbar = ({ onRequestDemo }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-nav border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a 
            href="/" 
            className="flex items-center gap-3"
            data-testid="navbar-logo"
          >
            <img
              src="https://customer-assets.emergentagent.com/job_parentpeace/artifacts/vd59z55h_wimk.png"
              alt="Where Is My Kid"
              className="h-10 w-auto"
            />
            <span className="font-bold text-lg text-slate-900 hidden sm:block font-['Outfit']">
              Where Is My Kid
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8" data-testid="desktop-nav">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="text-slate-600 hover:text-[#3B9FD8] font-medium transition-colors"
                data-testid={`nav-link-${link.label.toLowerCase().replace(' ', '-')}`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              variant="ghost"
              onClick={() => scrollToSection("#contact")}
              className="text-slate-600 hover:text-[#3B9FD8]"
              data-testid="nav-contact-sales"
            >
              Contact Sales
            </Button>
            <Button
              onClick={onRequestDemo}
              className="bg-[#3B9FD8] hover:bg-[#2A8AC0] text-white rounded-full px-6"
              data-testid="nav-request-demo"
            >
              Request Demo
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-slate-600"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            data-testid="mobile-menu-toggle"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4" data-testid="mobile-menu">
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className="text-left px-4 py-3 text-slate-600 hover:text-[#3B9FD8] hover:bg-slate-50 rounded-lg font-medium transition-colors"
                >
                  {link.label}
                </button>
              ))}
              <div className="flex flex-col gap-2 mt-2 px-4">
                <Button
                  variant="outline"
                  onClick={() => scrollToSection("#contact")}
                  className="w-full"
                >
                  Contact Sales
                </Button>
                <Button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onRequestDemo();
                  }}
                  className="w-full bg-[#3B9FD8] hover:bg-[#2A8AC0] text-white"
                >
                  Request Demo
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
