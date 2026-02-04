import { AlertTriangle, Clock, MessageCircleOff, Puzzle, Eye, HelpCircle } from "lucide-react";

const problems = [
  {
    icon: AlertTriangle,
    title: "Safety Concerns",
    description: "Parents constantly worry about their child's safety during daily school travel",
    color: "text-red-500",
    bgColor: "bg-red-50",
  },
  {
    icon: Eye,
    title: "No Real-time Visibility",
    description: "No way to know the exact location of school buses or when they'll arrive",
    color: "text-orange-500",
    bgColor: "bg-orange-50",
  },
  {
    icon: HelpCircle,
    title: "Boarding Uncertainty",
    description: "No confirmation when a child boards or safely exits the school bus",
    color: "text-amber-500",
    bgColor: "bg-amber-50",
  },
  {
    icon: MessageCircleOff,
    title: "Communication Gaps",
    description: "Poor communication channels between schools, parents, and transport staff",
    color: "text-purple-500",
    bgColor: "bg-purple-50",
  },
  {
    icon: Puzzle,
    title: "Fragmented Systems",
    description: "Separate disconnected systems for transport, attendance, and academics",
    color: "text-blue-500",
    bgColor: "bg-blue-50",
  },
  {
    icon: Clock,
    title: "Time Wasted",
    description: "Parents waiting at bus stops without knowing actual arrival times",
    color: "text-slate-500",
    bgColor: "bg-slate-100",
  },
];

export const ProblemSection = () => {
  return (
    <section className="py-20 md:py-28 bg-slate-50" data-testid="problem-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-semibold tracking-wider uppercase text-[#3B9FD8] mb-4 block">
            The Challenge
          </span>
          <h2 className="font-['Outfit'] text-3xl sm:text-4xl md:text-5xl font-semibold text-slate-900 tracking-tight mb-6">
            Why Schools & Parents Struggle Today
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            Every day, millions of parents face anxiety about their children's school journey. 
            The lack of visibility and communication creates unnecessary stress.
          </p>
        </div>

        {/* Problem Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl border border-slate-100 shadow-card hover:shadow-floating transition-all duration-300 group"
              data-testid={`problem-card-${index}`}
            >
              <div className={`w-12 h-12 ${problem.bgColor} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <problem.icon className={`w-6 h-6 ${problem.color}`} />
              </div>
              <h3 className="font-['Outfit'] text-xl font-semibold text-slate-900 mb-2">
                {problem.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {problem.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Stats */}
        <div className="mt-16 bg-white rounded-3xl p-8 md:p-12 border border-slate-100 shadow-card">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <p className="font-['Outfit'] text-4xl md:text-5xl font-bold text-[#3B9FD8] mb-2">76%</p>
              <p className="text-slate-600">of parents worry daily about their child's school commute</p>
            </div>
            <div>
              <p className="font-['Outfit'] text-4xl md:text-5xl font-bold text-[#3B9FD8] mb-2">45 min</p>
              <p className="text-slate-600">average time wasted at bus stops due to uncertain schedules</p>
            </div>
            <div>
              <p className="font-['Outfit'] text-4xl md:text-5xl font-bold text-[#3B9FD8] mb-2">89%</p>
              <p className="text-slate-600">schools use disconnected systems for transport & academics</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
