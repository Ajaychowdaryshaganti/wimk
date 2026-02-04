import { 
  Shield, 
  CheckCircle2, 
  Lock, 
  Eye, 
  FileCheck, 
  AlertTriangle, 
  Server, 
  UserCheck 
} from "lucide-react";

const safetyFeatures = [
  {
    icon: Eye,
    title: "Real-time Tracking",
    description: "24/7 visibility into bus location and student status",
  },
  {
    icon: UserCheck,
    title: "Verified Student Scans",
    description: "Every boarding and drop is verified and logged",
  },
  {
    icon: Lock,
    title: "Secure Data Handling",
    description: "End-to-end encryption for all sensitive information",
  },
  {
    icon: Shield,
    title: "Role-based Access Control",
    description: "Strict permission levels for different user types",
  },
  {
    icon: FileCheck,
    title: "Audit Logs & History",
    description: "Complete tracking history for accountability",
  },
  {
    icon: Server,
    title: "School-controlled Data",
    description: "Schools own and control all their data",
  },
  {
    icon: AlertTriangle,
    title: "Emergency Alerts",
    description: "Instant notifications for any safety concerns",
  },
  {
    icon: CheckCircle2,
    title: "Reduced Errors",
    description: "Automated systems minimize manual mistakes",
  },
];

const trustLogos = [
  "City High School",
  "Valley Academy",
  "Green Hills School",
  "Sunrise International",
  "Metro Public School",
];

export const SafetySection = () => {
  return (
    <section className="py-20 md:py-28 bg-white" data-testid="safety-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Visual */}
          <div className="relative order-2 lg:order-1">
            <div className="bg-gradient-to-br from-[#3B9FD8]/5 to-green-500/5 rounded-3xl p-8 md:p-12">
              {/* Shield Visual */}
              <div className="relative flex justify-center">
                <div className="w-48 h-48 md:w-64 md:h-64 bg-gradient-to-br from-[#3B9FD8] to-[#2A8AC0] rounded-3xl flex items-center justify-center transform rotate-3 hover:rotate-0 transition-transform duration-500">
                  <Shield className="w-24 h-24 md:w-32 md:h-32 text-white" />
                </div>
                
                {/* Floating Badges */}
                <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-floating p-3 animate-float">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    <span className="text-sm font-medium text-slate-900">Verified</span>
                  </div>
                </div>
                
                <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-floating p-3 animate-float animation-delay-400">
                  <div className="flex items-center gap-2">
                    <Lock className="w-5 h-5 text-[#3B9FD8]" />
                    <span className="text-sm font-medium text-slate-900">Encrypted</span>
                  </div>
                </div>
              </div>

              {/* Trust Bar */}
              <div className="mt-12 pt-8 border-t border-slate-200">
                <p className="text-sm text-slate-500 text-center mb-4">Trusted by leading schools</p>
                <div className="flex flex-wrap justify-center gap-6">
                  {trustLogos.map((logo, index) => (
                    <span 
                      key={index} 
                      className="text-sm font-medium text-slate-400 trust-logo hover:text-slate-600 transition-colors"
                    >
                      {logo}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="order-1 lg:order-2">
            <span className="text-sm font-semibold tracking-wider uppercase text-green-600 mb-4 block">
              Safety & Trust
            </span>
            <h2 className="font-['Outfit'] text-3xl sm:text-4xl md:text-5xl font-semibold text-slate-900 tracking-tight mb-6">
              Built with Safety <br />
              <span className="text-green-600">at Its Core</span>
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-10">
              Every feature is designed with student safety as the top priority. 
              Our platform ensures complete accountability and transparency at every step.
            </p>

            {/* Safety Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {safetyFeatures.map((feature, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl hover:bg-green-50 transition-colors group"
                  data-testid={`safety-feature-${index}`}
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm group-hover:bg-green-100 transition-colors">
                    <feature.icon className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-900 text-sm">{feature.title}</h4>
                    <p className="text-xs text-slate-500 mt-0.5">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
