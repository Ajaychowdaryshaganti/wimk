import { 
  MapPin, 
  UserCheck, 
  Smartphone, 
  Car, 
  ClipboardCheck, 
  Calendar, 
  FileText, 
  Bell, 
  Shield, 
  Users 
} from "lucide-react";

const features = [
  {
    icon: MapPin,
    title: "Real-time Bus Tracking",
    description: "Track every school bus on a live map with accurate GPS positioning and estimated arrival times",
    size: "large",
    color: "bg-[#3B9FD8]",
  },
  {
    icon: UserCheck,
    title: "Student Boarding & Drop Confirmation",
    description: "Instant verification when students board or exit the bus using RFID/ID card scanning",
    size: "large",
    color: "bg-green-500",
  },
  {
    icon: Smartphone,
    title: "Parent Mobile App",
    description: "Easy-to-use app for parents to track, receive alerts, and view child's academic progress",
    size: "medium",
    color: "bg-purple-500",
  },
  {
    icon: Car,
    title: "Driver Mobile App",
    description: "Simple app for drivers to share location and scan students",
    size: "medium",
    color: "bg-[#FFC107]",
  },
  {
    icon: ClipboardCheck,
    title: "Attendance Tracking",
    description: "Automated daily attendance with instant parent notifications",
    size: "small",
    color: "bg-indigo-500",
  },
  {
    icon: Calendar,
    title: "Timetable & Subjects",
    description: "Complete class schedule and subject visibility",
    size: "small",
    color: "bg-pink-500",
  },
  {
    icon: FileText,
    title: "Exam Schedule & Marks",
    description: "View upcoming exams and academic results",
    size: "small",
    color: "bg-cyan-500",
  },
  {
    icon: Bell,
    title: "School Announcements",
    description: "Instant push notifications for important updates",
    size: "medium",
    color: "bg-orange-500",
  },
  {
    icon: Shield,
    title: "Emergency Alerts & Geofencing",
    description: "Automated alerts when bus enters or exits designated zones",
    size: "medium",
    color: "bg-red-500",
  },
  {
    icon: Users,
    title: "Role-based Access",
    description: "Separate dashboards for Admins, Teachers, Drivers, and Parents",
    size: "small",
    color: "bg-teal-500",
  },
];

export const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 md:py-28 bg-slate-50" data-testid="features-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-semibold tracking-wider uppercase text-[#3B9FD8] mb-4 block">
            Features
          </span>
          <h2 className="font-['Outfit'] text-3xl sm:text-4xl md:text-5xl font-semibold text-slate-900 tracking-tight mb-6">
            Everything You Need in One Platform
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            Comprehensive features designed for modern schools to enhance safety, 
            improve communication, and provide complete visibility.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((feature, index) => {
            const sizeClasses = {
              large: "lg:col-span-2 lg:row-span-2",
              medium: "lg:col-span-2",
              small: "lg:col-span-1",
            };

            return (
              <div
                key={index}
                className={`bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-card hover:shadow-floating transition-all duration-300 group feature-card ${sizeClasses[feature.size]}`}
                data-testid={`feature-card-${index}`}
              >
                <div className={`w-14 h-14 ${feature.color} rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className={`font-['Outfit'] ${feature.size === 'large' ? 'text-2xl' : 'text-xl'} font-semibold text-slate-900 mb-3`}>
                  {feature.title}
                </h3>
                <p className={`text-slate-600 leading-relaxed ${feature.size === 'large' ? 'text-base' : 'text-sm'}`}>
                  {feature.description}
                </p>
                
                {feature.size === 'large' && (
                  <div className="mt-6 pt-6 border-t border-slate-100">
                    <div className="flex items-center gap-4">
                      <div className="flex -space-x-2">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="w-8 h-8 bg-slate-200 rounded-full border-2 border-white" />
                        ))}
                      </div>
                      <span className="text-sm text-slate-500">
                        Used by 500+ schools daily
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
