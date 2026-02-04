import { MapPin, Smartphone, Bell, Users, CheckCircle2 } from "lucide-react";

const solutions = [
  {
    icon: MapPin,
    title: "Live Bus Tracking",
    description: "Real-time GPS tracking of all school buses with accurate ETAs and route visualization",
  },
  {
    icon: CheckCircle2,
    title: "Student Scan-in/Scan-out",
    description: "Instant verification when students board and exit with RFID card scanning",
  },
  {
    icon: Bell,
    title: "Instant Notifications",
    description: "Automated alerts to parents for boarding, arrival, delays, and emergencies",
  },
  {
    icon: Users,
    title: "Unified Dashboard",
    description: "Central control panel for school admins to manage transport, attendance, and communications",
  },
];

export const SolutionSection = () => {
  return (
    <section className="py-20 md:py-28 bg-white" data-testid="solution-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div>
            <span className="text-sm font-semibold tracking-wider uppercase text-[#3B9FD8] mb-4 block">
              Our Solution
            </span>
            <h2 className="font-['Outfit'] text-3xl sm:text-4xl md:text-5xl font-semibold text-slate-900 tracking-tight mb-6">
              Complete Visibility, <br />
              <span className="gradient-text">Complete Peace of Mind</span>
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-10">
              Where Is My Kid brings together everything parents and schools need 
              in one seamless platform. From the moment a child leaves home until 
              they return, every step is tracked and communicated.
            </p>

            {/* Solution Points */}
            <div className="space-y-6">
              {solutions.map((solution, index) => (
                <div 
                  key={index} 
                  className="flex gap-4 group"
                  data-testid={`solution-item-${index}`}
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center group-hover:bg-[#3B9FD8] group-hover:text-white transition-colors">
                    <solution.icon className="w-6 h-6 text-[#3B9FD8] group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h3 className="font-['Outfit'] text-lg font-semibold text-slate-900 mb-1">
                      {solution.title}
                    </h3>
                    <p className="text-slate-600">
                      {solution.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative">
            <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-3xl p-8 md:p-12">
              {/* Apps Grid */}
              <div className="grid grid-cols-2 gap-4">
                {/* Parent App Card */}
                <div className="bg-white rounded-2xl p-5 shadow-card col-span-2 hover:shadow-floating transition-all">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-[#3B9FD8] rounded-xl flex items-center justify-center">
                      <Smartphone className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">Parent Mobile App</p>
                      <p className="text-sm text-slate-500">Real-time updates</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-slate-600">Live bus location tracking</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-slate-600">Instant boarding alerts</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-slate-600">Academic visibility</span>
                    </div>
                  </div>
                </div>

                {/* Driver App Card */}
                <div className="bg-white rounded-2xl p-5 shadow-card hover:shadow-floating transition-all">
                  <div className="w-10 h-10 bg-[#FFC107] rounded-xl flex items-center justify-center mb-3">
                    <MapPin className="w-5 h-5 text-slate-900" />
                  </div>
                  <p className="font-semibold text-slate-900 text-sm">Driver App</p>
                  <p className="text-xs text-slate-500 mt-1">Location sharing & scans</p>
                </div>

                {/* Admin Dashboard Card */}
                <div className="bg-white rounded-2xl p-5 shadow-card hover:shadow-floating transition-all">
                  <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center mb-3">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <p className="font-semibold text-slate-900 text-sm">Admin Panel</p>
                  <p className="text-xs text-slate-500 mt-1">Complete control center</p>
                </div>
              </div>

              {/* Connected Lines Visual */}
              <div className="mt-8 flex items-center justify-center gap-2">
                <div className="w-3 h-3 bg-[#3B9FD8] rounded-full" />
                <div className="flex-1 h-0.5 bg-gradient-to-r from-[#3B9FD8] via-[#FFC107] to-green-500" />
                <div className="w-3 h-3 bg-[#FFC107] rounded-full" />
                <div className="flex-1 h-0.5 bg-gradient-to-r from-[#FFC107] to-green-500" />
                <div className="w-3 h-3 bg-green-500 rounded-full" />
              </div>
              <p className="text-center text-sm text-slate-500 mt-3">
                All systems connected in real-time
              </p>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-[#3B9FD8]/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#FFC107]/10 rounded-full blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
};
