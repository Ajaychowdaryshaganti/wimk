import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Bus, Home, School, MapPin, CheckCircle, Bell, Shield } from "lucide-react";

// Story stages
const STAGES = [
  { id: 1, progress: 0, title: "Your child's journey starts here.", subtitle: "Safe pickup from home", icon: Home },
  { id: 2, progress: 0.2, title: "Know exactly when the bus arrives.", subtitle: "Real-time bus tracking", icon: Bus },
  { id: 3, progress: 0.4, title: "Boarding confirmed.", subtitle: "RFID scan verification", icon: CheckCircle },
  { id: 4, progress: 0.6, title: "Track the journey in real time.", subtitle: "Live GPS updates", icon: MapPin },
  { id: 5, progress: 0.85, title: "From Bus Stops to Classrooms – Stay Informed.", subtitle: "Safe arrival at school", icon: School },
];

// Realistic Cloud
const Cloud = ({ className, size = "medium", delay = 0 }) => {
  const sizes = {
    small: "scale-75",
    medium: "scale-100",
    large: "scale-125"
  };
  
  return (
    <motion.div
      className={`absolute ${className} ${sizes[size]}`}
      animate={{ 
        x: [0, 20, 0],
        y: [0, -5, 0]
      }}
      transition={{ 
        duration: 12 + delay * 2, 
        repeat: Infinity, 
        ease: "easeInOut",
        delay 
      }}
    >
      <div className="relative">
        <div className="absolute w-20 h-10 bg-white rounded-full opacity-95 shadow-lg" />
        <div className="absolute w-14 h-12 bg-white rounded-full -top-4 left-4 opacity-95 shadow-lg" />
        <div className="absolute w-16 h-10 bg-white rounded-full -top-2 left-10 opacity-95 shadow-lg" />
        <div className="absolute w-10 h-8 bg-white rounded-full top-0 left-20 opacity-90" />
      </div>
    </motion.div>
  );
};

// Realistic Tree with shadow
const Tree = ({ className, variant = 1 }) => {
  const variants = {
    1: { trunk: "h-12", crown: "border-b-[45px] border-l-[22px] border-r-[22px]" },
    2: { trunk: "h-10", crown: "border-b-[35px] border-l-[18px] border-r-[18px]" },
    3: { trunk: "h-14", crown: "border-b-[50px] border-l-[25px] border-r-[25px]" }
  };
  const v = variants[variant];
  
  return (
    <div className={`absolute ${className}`}>
      {/* Shadow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-3 bg-black/20 rounded-full blur-sm" />
      {/* Trunk */}
      <div className={`w-3 ${v.trunk} bg-gradient-to-r from-amber-900 via-amber-800 to-amber-900 mx-auto rounded-sm`} />
      {/* Crown layers */}
      <div className={`w-0 h-0 ${v.crown} border-l-transparent border-r-transparent border-b-green-700 absolute -top-10 left-1/2 -translate-x-1/2`} />
      <div className={`w-0 h-0 border-b-[35px] border-l-[17px] border-r-[17px] border-l-transparent border-r-transparent border-b-green-600 absolute -top-16 left-1/2 -translate-x-1/2`} />
      <div className={`w-0 h-0 border-b-[25px] border-l-[12px] border-r-[12px] border-l-transparent border-r-transparent border-b-green-500 absolute -top-20 left-1/2 -translate-x-1/2`} />
    </div>
  );
};

// Realistic House
const House = ({ className, color = "warm" }) => {
  const colors = {
    warm: { wall: "from-amber-100 to-amber-200", roof: "from-red-600 to-red-700" },
    cool: { wall: "from-slate-100 to-slate-200", roof: "from-slate-600 to-slate-700" },
    pink: { wall: "from-pink-100 to-pink-200", roof: "from-rose-500 to-rose-600" }
  };
  const c = colors[color];
  
  return (
    <div className={`absolute ${className}`}>
      {/* Shadow */}
      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-24 h-4 bg-black/20 rounded-full blur-md" />
      {/* Main building */}
      <div className={`w-24 h-20 bg-gradient-to-b ${c.wall} rounded-sm shadow-lg relative`}>
        {/* Door */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-7 h-12 bg-gradient-to-b from-amber-700 to-amber-900 rounded-t-lg">
          <div className="absolute right-1.5 top-1/2 w-1.5 h-1.5 bg-yellow-400 rounded-full" />
        </div>
        {/* Windows */}
        <div className="absolute top-4 left-3 w-5 h-5 bg-gradient-to-br from-sky-200 to-sky-300 border-2 border-white rounded-sm shadow-inner" />
        <div className="absolute top-4 right-3 w-5 h-5 bg-gradient-to-br from-sky-200 to-sky-300 border-2 border-white rounded-sm shadow-inner" />
      </div>
      {/* Roof */}
      <div className={`w-0 h-0 border-l-[58px] border-r-[58px] border-b-[35px] border-l-transparent border-r-transparent absolute -top-[35px] left-1/2 -translate-x-1/2`} style={{ borderBottomColor: '#dc2626' }} />
      <div className="absolute -top-[32px] left-1/2 -translate-x-1/2 w-28 h-8 bg-gradient-to-b from-red-500 to-red-600" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
      {/* Chimney */}
      <div className="absolute -top-[45px] right-4 w-5 h-10 bg-gradient-to-r from-red-800 to-red-900 rounded-t-sm" />
    </div>
  );
};

// Realistic School Building
const SchoolBuilding = ({ isActive }) => (
  <motion.div 
    className="relative"
    animate={{ 
      scale: isActive ? 1.05 : 1,
      filter: isActive ? "brightness(1.1)" : "brightness(1)"
    }}
    transition={{ duration: 0.5 }}
  >
    {/* Shadow */}
    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-44 h-6 bg-black/20 rounded-full blur-lg" />
    
    {/* Main building */}
    <div className={`w-40 h-28 bg-gradient-to-b ${isActive ? 'from-pink-200 to-pink-300' : 'from-pink-100 to-pink-200'} rounded-lg shadow-xl relative transition-all duration-500`}>
      {/* Clock tower */}
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-16 h-16 bg-gradient-to-b from-yellow-200 to-yellow-300 rounded-t-lg shadow-lg">
        {/* Clock face */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-10 h-10 bg-white rounded-full border-2 border-gray-300 shadow-inner flex items-center justify-center">
          <div className="w-0.5 h-4 bg-gray-800 absolute origin-bottom" style={{ transform: 'rotate(-30deg)' }} />
          <div className="w-0.5 h-3 bg-gray-800 absolute origin-bottom" style={{ transform: 'rotate(60deg)' }} />
          <div className="w-2 h-2 bg-gray-800 rounded-full" />
        </div>
      </div>
      
      {/* Bell */}
      <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-6 h-8 bg-gradient-to-b from-yellow-500 to-yellow-600 rounded-t-full" />
      
      {/* Main door */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-14 bg-gradient-to-b from-amber-700 to-amber-900 rounded-t-xl">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 border-2 border-amber-600 rounded-full opacity-30" />
      </div>
      
      {/* Windows - top row */}
      <div className="flex justify-around pt-4 px-3">
        {[1,2,3,4].map(i => (
          <div key={i} className="w-6 h-7 bg-gradient-to-br from-sky-200 to-sky-300 border-2 border-white rounded-sm shadow-inner" />
        ))}
      </div>
      
      {/* Windows - bottom row */}
      <div className="flex justify-around pt-2 px-3">
        {[1,2,3,4].map(i => (
          <div key={i} className="w-6 h-7 bg-gradient-to-br from-sky-200 to-sky-300 border-2 border-white rounded-sm shadow-inner" />
        ))}
      </div>
      
      {/* SCHOOL text */}
      <div className="absolute top-1 left-1/2 -translate-x-1/2 text-[8px] font-bold text-pink-700 tracking-wider">SCHOOL</div>
    </div>
    
    {/* Flag */}
    <div className="absolute -top-20 left-1/2 -translate-x-1/2">
      <div className="w-1 h-8 bg-gray-600" />
      <motion.div 
        className="absolute top-0 left-1 w-8 h-5 bg-gradient-to-r from-green-500 to-green-600 rounded-r-sm origin-left"
        animate={{ scaleX: [1, 0.9, 1], skewY: [0, 2, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </div>
    
    {/* Arrival badge */}
    {isActive && (
      <motion.div
        className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg"
        initial={{ scale: 0, y: 10 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
      >
        ✓ Safe Arrival!
      </motion.div>
    )}
  </motion.div>
);

// Realistic School Bus
const SchoolBus = ({ progress }) => {
  const busX = useTransform(progress, [0, 1], [8, 72]);
  const smoothX = useSpring(busX, { stiffness: 50, damping: 20 });
  const wheelRotation = useTransform(progress, [0, 1], [0, 1440]);
  
  return (
    <motion.div 
      className="absolute bottom-20 sm:bottom-24 z-20"
      style={{ left: useTransform(smoothX, v => `${v}%`), x: "-50%" }}
    >
      <motion.div
        animate={{ y: [0, -2, 0] }}
        transition={{ duration: 0.3, repeat: Infinity }}
        className="relative"
      >
        {/* Shadow */}
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-28 h-4 bg-black/30 rounded-full blur-md" />
        
        {/* Bus Body */}
        <div className="w-32 sm:w-36 h-16 sm:h-20 bg-gradient-to-b from-yellow-400 via-yellow-500 to-yellow-600 rounded-lg shadow-2xl relative overflow-hidden">
          {/* Shine effect */}
          <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-b from-white/40 to-transparent" />
          
          {/* Windows */}
          <div className="absolute top-2 sm:top-3 left-2 right-10 h-6 sm:h-8 flex gap-1">
            {[1,2,3].map(i => (
              <div key={i} className="flex-1 bg-gradient-to-b from-sky-300 to-sky-400 rounded-sm border border-yellow-600 relative overflow-hidden">
                {/* Window shine */}
                <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/50 to-transparent" />
                {/* Kid silhouette */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-pink-300 rounded-full" />
              </div>
            ))}
          </div>
          
          {/* Front window */}
          <div className="absolute top-2 sm:top-3 right-1 w-7 sm:w-8 h-6 sm:h-8 bg-gradient-to-b from-sky-200 to-sky-300 rounded-sm border border-yellow-600">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/50 to-transparent" />
          </div>
          
          {/* Headlights */}
          <div className="absolute bottom-2 sm:bottom-3 right-0 flex flex-col gap-1">
            <div className="w-3 h-2 bg-gradient-to-l from-yellow-100 to-yellow-200 rounded-l-full shadow-lg" />
            <div className="w-3 h-2 bg-gradient-to-l from-yellow-100 to-yellow-200 rounded-l-full shadow-lg" />
          </div>
          
          {/* Tail lights */}
          <div className="absolute bottom-2 sm:bottom-3 left-0 flex flex-col gap-1">
            <div className="w-2 h-1.5 bg-red-500 rounded-r-full" />
            <div className="w-2 h-1.5 bg-red-500 rounded-r-full" />
          </div>
          
          {/* SCHOOL BUS text */}
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[7px] sm:text-[8px] font-bold text-yellow-900 tracking-wide">SCHOOL BUS</div>
          
          {/* Side stripe */}
          <div className="absolute bottom-4 sm:bottom-5 left-0 right-0 h-1 bg-black/20" />
        </div>
        
        {/* Wheels with realistic rotation */}
        <motion.div 
          className="absolute -bottom-2.5 left-5 w-6 h-6 sm:w-7 sm:h-7 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full border-3 border-gray-600 shadow-lg"
          style={{ rotate: wheelRotation }}
        >
          <div className="absolute inset-1 bg-gray-500 rounded-full" />
          <div className="absolute inset-2 bg-gray-700 rounded-full" />
        </motion.div>
        <motion.div 
          className="absolute -bottom-2.5 right-7 w-6 h-6 sm:w-7 sm:h-7 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full border-3 border-gray-600 shadow-lg"
          style={{ rotate: wheelRotation }}
        >
          <div className="absolute inset-1 bg-gray-500 rounded-full" />
          <div className="absolute inset-2 bg-gray-700 rounded-full" />
        </motion.div>
        
        {/* Exhaust smoke */}
        <div className="absolute -left-2 bottom-1 flex gap-0.5">
          {[0, 1, 2].map(i => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-gray-400/60 rounded-full"
              animate={{ 
                y: [0, -15, -25],
                x: [-5 * i, -8 * i, -12 * i],
                opacity: [0.6, 0.3, 0],
                scale: [0.5, 1, 1.5]
              }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity, 
                delay: i * 0.3,
                ease: "easeOut"
              }}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

// Child Character
const ChildCharacter = ({ visible, position = "left", waving = false }) => (
  <motion.div
    className={`absolute bottom-20 sm:bottom-24 ${position === "left" ? "left-[15%] sm:left-[12%]" : "right-[15%] sm:right-[18%]"} z-10`}
    initial={{ scale: 0, opacity: 0 }}
    animate={{ 
      scale: visible ? 1 : 0, 
      opacity: visible ? 1 : 0,
      y: visible ? 0 : 20
    }}
    transition={{ type: "spring", stiffness: 200, damping: 15 }}
  >
    {/* Shadow */}
    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-2 bg-black/30 rounded-full blur-sm" />
    
    <div className="relative">
      {/* Body */}
      <div className="w-7 h-11 bg-gradient-to-b from-blue-500 to-blue-600 rounded-t-lg mx-auto shadow-md" />
      
      {/* Head */}
      <div className="w-9 h-9 bg-gradient-to-b from-amber-200 to-amber-300 rounded-full absolute -top-8 left-1/2 -translate-x-1/2 shadow-md">
        {/* Hair */}
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-8 h-4 bg-gradient-to-b from-amber-900 to-amber-800 rounded-t-full" />
        {/* Face */}
        <div className="flex gap-2 justify-center pt-4">
          <div className="w-1.5 h-1.5 bg-gray-800 rounded-full" />
          <div className="w-1.5 h-1.5 bg-gray-800 rounded-full" />
        </div>
        <div className="w-3 h-1.5 border-b-2 border-gray-800 rounded-b-full mx-auto mt-1" />
      </div>
      
      {/* Backpack */}
      <div className="w-5 h-7 bg-gradient-to-b from-orange-500 to-orange-600 rounded absolute top-0 -left-2 shadow-md" />
      
      {/* Waving arm */}
      {waving && visible && (
        <motion.div
          className="w-6 h-2.5 bg-gradient-to-r from-amber-200 to-amber-300 rounded-full absolute top-2 -right-4 origin-left shadow-sm"
          animate={{ rotate: [-20, -50, -20] }}
          transition={{ duration: 0.4, repeat: Infinity }}
        />
      )}
      
      {/* Legs */}
      <div className="flex gap-1 justify-center">
        <div className="w-2.5 h-5 bg-gradient-to-b from-blue-800 to-blue-900 rounded-b" />
        <div className="w-2.5 h-5 bg-gradient-to-b from-blue-800 to-blue-900 rounded-b" />
      </div>
    </div>
  </motion.div>
);

// Bus Stop
const BusStopSign = ({ className }) => (
  <div className={`absolute ${className} z-10`}>
    {/* Pole */}
    <div className="w-2 h-20 bg-gradient-to-r from-gray-500 to-gray-600 mx-auto rounded-t shadow-md" />
    {/* Sign */}
    <div className="w-12 h-10 bg-gradient-to-b from-blue-500 to-blue-600 -mt-1 -ml-5 rounded-lg shadow-lg flex items-center justify-center">
      <Bus className="w-6 h-6 text-white" />
    </div>
    {/* Bench */}
    <div className="absolute bottom-0 -left-4 w-14 h-1.5 bg-gradient-to-r from-amber-700 to-amber-800 rounded shadow" />
    <div className="absolute bottom-0 -left-3 w-1.5 h-4 bg-amber-800" />
    <div className="absolute bottom-0 left-6 w-1.5 h-4 bg-amber-800" />
  </div>
);

// Road with animated markings
const Road = ({ progress }) => {
  const markingOffset = useTransform(progress, [0, 1], [0, -200]);
  
  return (
    <div className="absolute bottom-8 sm:bottom-10 left-0 right-0 h-14 sm:h-16 overflow-hidden">
      {/* Road surface */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-600 via-gray-700 to-gray-800" />
      
      {/* Road texture */}
      <div className="absolute inset-0 opacity-30" style={{ 
        backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 4 4\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Ccircle cx=\'2\' cy=\'2\' r=\'0.5\' fill=\'%23000\'/%3E%3C/svg%3E")',
        backgroundSize: '4px 4px'
      }} />
      
      {/* Center line markings */}
      <motion.div 
        className="absolute top-1/2 -translate-y-1/2 left-0 flex gap-6"
        style={{ x: markingOffset }}
      >
        {Array.from({ length: 30 }).map((_, i) => (
          <div key={i} className="w-10 sm:w-14 h-1 bg-yellow-400 rounded-full shadow" />
        ))}
      </motion.div>
      
      {/* Road edges */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-white/80" />
      <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-white/80" />
    </div>
  );
};

// Story Overlay
const StoryOverlay = ({ scrollProgress }) => {
  const [currentStage, setCurrentStage] = useState(0);
  
  useEffect(() => {
    const unsubscribe = scrollProgress.on("change", (v) => {
      for (let i = STAGES.length - 1; i >= 0; i--) {
        if (v >= STAGES[i].progress) {
          setCurrentStage(i);
          break;
        }
      }
    });
    return unsubscribe;
  }, [scrollProgress]);

  const stage = STAGES[currentStage];
  const Icon = stage.icon;

  return (
    <motion.div 
      className="absolute top-20 sm:top-24 left-0 right-0 z-30 text-center px-4"
      key={currentStage}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.div
        className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/20 backdrop-blur-md shadow-lg mb-4"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-white drop-shadow-lg" />
      </motion.div>
      <h2 
        className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 leading-tight"
        style={{ textShadow: "0 4px 30px rgba(0,0,0,0.6), 0 2px 10px rgba(0,0,0,0.4)" }}
      >
        {stage.title}
      </h2>
      <p 
        className="text-base sm:text-xl text-white/95"
        style={{ textShadow: "0 2px 15px rgba(0,0,0,0.5)" }}
      >
        {stage.subtitle}
      </p>
    </motion.div>
  );
};

// Progress Dot
const ProgressDot = ({ scrollProgress, stageProgress }) => {
  const bgColor = useTransform(
    scrollProgress,
    [stageProgress - 0.05, stageProgress],
    ["rgba(255,255,255,0.3)", "#3B9FD8"]
  );
  const scale = useTransform(
    scrollProgress,
    [stageProgress - 0.05, stageProgress, stageProgress + 0.05],
    [1, 1.3, 1]
  );
  
  return (
    <motion.div
      className="w-3 h-3 rounded-full border-2 border-white/50 shadow-lg"
      style={{ backgroundColor: bgColor, scale }}
    />
  );
};

// Progress Indicator
const ProgressIndicator = ({ scrollProgress }) => {
  const progressHeight = useTransform(scrollProgress, [0, 1], ["0%", "100%"]);
  
  return (
    <div className="fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-2">
      {STAGES.map((stage, i) => (
        <ProgressDot key={i} scrollProgress={scrollProgress} stageProgress={stage.progress} />
      ))}
      <div className="mt-2 w-1 h-16 sm:h-20 bg-white/20 rounded-full overflow-hidden shadow-inner">
        <motion.div 
          className="w-full bg-gradient-to-b from-blue-400 via-cyan-400 to-green-400 rounded-full"
          style={{ height: progressHeight }}
        />
      </div>
    </div>
  );
};

// Bottom Progress Bar
const BottomProgressBar = ({ scrollProgress, isSchoolActive }) => {
  const progressWidth = useTransform(scrollProgress, [0, 1], ["0%", "100%"]);
  
  return (
    <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-40">
      <div className="bg-black/30 backdrop-blur-md rounded-full px-4 sm:px-6 py-2.5 sm:py-3 flex items-center gap-3 sm:gap-4 shadow-xl border border-white/10">
        <Home className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
        <div className="w-24 sm:w-40 h-2 bg-white/20 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-blue-400 via-cyan-400 to-green-400 rounded-full"
            style={{ width: progressWidth }}
          />
        </div>
        <motion.div
          animate={{ scale: isSchoolActive ? [1, 1.2, 1] : 1 }}
          transition={{ duration: 0.5, repeat: isSchoolActive ? Infinity : 0 }}
        >
          <School className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors duration-300 ${isSchoolActive ? 'text-green-400' : 'text-white'}`} />
        </motion.div>
      </div>
    </div>
  );
};

// Main Component
const Journey3DExperience = ({ onSkip }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 50, damping: 20 });
  
  // Parallax transforms
  const skyY = useTransform(smoothProgress, [0, 1], ["0%", "-15%"]);
  const sunY = useTransform(smoothProgress, [0, 1], ["0%", "-30%"]);
  const sunScale = useTransform(smoothProgress, [0, 0.5, 1], [1, 1.3, 0.9]);
  const cloudsY = useTransform(smoothProgress, [0, 1], ["0%", "-20%"]);
  const mountainsY = useTransform(smoothProgress, [0, 1], ["0%", "-8%"]);
  const hillsY = useTransform(smoothProgress, [0, 1], ["0%", "-5%"]);
  
  // State
  const [showChildAtStop, setShowChildAtStop] = useState(true);
  const [showChildAtSchool, setShowChildAtSchool] = useState(false);
  const [isSchoolActive, setIsSchoolActive] = useState(false);

  useEffect(() => {
    const unsubscribe = smoothProgress.on("change", v => {
      setShowChildAtStop(v < 0.25);
      setShowChildAtSchool(v >= 0.85);
      setIsSchoolActive(v >= 0.8);
    });
    return unsubscribe;
  }, [smoothProgress]);

  return (
    <div ref={containerRef} className="relative h-[500vh]" data-testid="journey-experience">
      <div className="fixed inset-0 overflow-hidden">
        {/* Sky with parallax */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-b from-sky-400 via-sky-300 to-cyan-200"
          style={{ y: skyY }}
        />
        
        {/* Sun with parallax */}
        <motion.div
          className="absolute top-10 sm:top-16 right-10 sm:right-20 w-20 h-20 sm:w-28 sm:h-28"
          style={{ y: sunY, scale: sunScale }}
        >
          <div className="w-full h-full rounded-full bg-gradient-to-br from-yellow-200 via-yellow-300 to-orange-300 shadow-2xl" />
          <div className="absolute inset-0 rounded-full bg-yellow-200 blur-2xl opacity-60" />
          <div className="absolute -inset-4 rounded-full bg-yellow-100 blur-3xl opacity-30" />
        </motion.div>
        
        {/* Clouds with parallax */}
        <motion.div style={{ y: cloudsY }}>
          <Cloud className="top-16 sm:top-20 left-[5%]" size="medium" delay={0} />
          <Cloud className="top-28 sm:top-36 left-[55%]" size="large" delay={1.5} />
          <Cloud className="top-12 sm:top-14 left-[30%]" size="small" delay={0.8} />
          <Cloud className="top-20 sm:top-24 left-[75%]" size="medium" delay={2} />
        </motion.div>
        
        {/* Distant mountains (parallax layer) */}
        <motion.div 
          className="absolute bottom-24 sm:bottom-32 left-0 right-0"
          style={{ y: mountainsY }}
        >
          <div className="absolute bottom-0 left-[10%] w-0 h-0 border-l-[80px] border-r-[80px] border-b-[60px] border-l-transparent border-r-transparent border-b-blue-300/50" />
          <div className="absolute bottom-0 left-[30%] w-0 h-0 border-l-[100px] border-r-[100px] border-b-[80px] border-l-transparent border-r-transparent border-b-blue-400/40" />
          <div className="absolute bottom-0 right-[20%] w-0 h-0 border-l-[90px] border-r-[90px] border-b-[70px] border-l-transparent border-r-transparent border-b-blue-300/50" />
        </motion.div>
        
        {/* Hills (parallax layer) */}
        <motion.div 
          className="absolute bottom-16 sm:bottom-20 left-0 right-0"
          style={{ y: hillsY }}
        >
          <div className="absolute bottom-0 left-0 right-0 h-20 sm:h-28 bg-gradient-to-t from-green-500 to-green-400 rounded-t-[100%]" style={{ transform: 'scaleX(1.5)' }} />
        </motion.div>
        
        {/* Ground/Grass */}
        <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-32 bg-gradient-to-t from-green-700 via-green-600 to-green-500" />
        
        {/* Road */}
        <Road progress={smoothProgress} />
        
        {/* Trees with varying positions */}
        <Tree className="bottom-24 sm:bottom-32 left-[3%]" variant={2} />
        <Tree className="bottom-24 sm:bottom-32 left-[20%]" variant={1} />
        <Tree className="bottom-24 sm:bottom-32 left-[40%]" variant={3} />
        <Tree className="bottom-24 sm:bottom-32 left-[60%]" variant={2} />
        <Tree className="bottom-24 sm:bottom-32 left-[85%]" variant={1} />
        <Tree className="bottom-24 sm:bottom-32 right-[5%]" variant={3} />
        
        {/* Houses */}
        <House className="bottom-24 sm:bottom-32 left-[6%] sm:left-[8%]" color="warm" />
        <House className="bottom-24 sm:bottom-32 left-[22%] sm:left-[25%]" color="cool" />
        
        {/* Bus Stop */}
        <BusStopSign className="bottom-20 sm:bottom-24 left-[14%] sm:left-[15%]" />
        
        {/* Child at bus stop */}
        <ChildCharacter visible={showChildAtStop} position="left" waving={showChildAtStop} />
        
        {/* Animated Bus */}
        <SchoolBus progress={smoothProgress} />
        
        {/* School */}
        <div className="absolute bottom-24 sm:bottom-32 right-[5%] sm:right-[8%]">
          <SchoolBuilding isActive={isSchoolActive} />
        </div>
        
        {/* Child at school */}
        <ChildCharacter visible={showChildAtSchool} position="right" waving={false} />
        
        {/* Story Overlay */}
        <StoryOverlay scrollProgress={smoothProgress} />
        
        {/* Progress Indicator */}
        <ProgressIndicator scrollProgress={smoothProgress} />
        
        {/* Bottom Progress Bar */}
        <BottomProgressBar scrollProgress={smoothProgress} isSchoolActive={isSchoolActive} />
        
        {/* Skip Button */}
        <button
          onClick={onSkip}
          className="fixed bottom-3 sm:bottom-4 right-3 sm:right-4 z-50 bg-black/40 hover:bg-black/60 backdrop-blur-md text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium border border-white/20 transition-all shadow-lg"
          data-testid="skip-btn"
        >
          Skip →
        </button>
        
        {/* Scroll Indicator */}
        <motion.div 
          className="fixed bottom-16 sm:bottom-20 left-1/2 -translate-x-1/2 z-40 text-center"
          style={{ opacity: useTransform(smoothProgress, [0, 0.08], [1, 0]) }}
        >
          <p className="text-white/90 text-xs sm:text-sm mb-2 font-medium" style={{ textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>
            Scroll to follow the journey
          </p>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white mx-auto drop-shadow-lg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Journey3DExperience;
