import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { Bus, Home, School, MapPin, Bell, Shield, CheckCircle } from "lucide-react";

// Story stages
const STAGES = [
  { id: 1, progress: 0, title: "Your child's journey starts here.", subtitle: "Safe pickup from home", icon: Home },
  { id: 2, progress: 0.2, title: "Know exactly when the bus arrives.", subtitle: "Real-time bus tracking", icon: Bus },
  { id: 3, progress: 0.4, title: "Boarding confirmed.", subtitle: "RFID scan verification", icon: CheckCircle },
  { id: 4, progress: 0.6, title: "Track the journey in real time.", subtitle: "Live GPS updates", icon: MapPin },
  { id: 5, progress: 0.85, title: "From Bus Stops to Classrooms – Stay Informed.", subtitle: "Safe arrival at school", icon: School },
];

// Animated Cloud Component
const Cloud = ({ className, delay = 0 }) => (
  <motion.div
    className={`absolute ${className}`}
    animate={{ x: [0, 30, 0], y: [0, -10, 0] }}
    transition={{ duration: 8, repeat: Infinity, delay, ease: "easeInOut" }}
  >
    <div className="flex">
      <div className="w-16 h-8 bg-white/80 rounded-full" />
      <div className="w-12 h-10 bg-white/80 rounded-full -ml-4 -mt-2" />
      <div className="w-10 h-6 bg-white/80 rounded-full -ml-3 mt-1" />
    </div>
  </motion.div>
);

// Animated Tree Component
const Tree = ({ className, delay = 0 }) => (
  <motion.div 
    className={`absolute ${className}`}
    initial={{ scale: 0, opacity: 0 }}
    whileInView={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.5, delay }}
  >
    <div className="relative">
      <div className="w-4 h-10 bg-amber-800 mx-auto rounded" />
      <div className="w-0 h-0 border-l-[20px] border-r-[20px] border-b-[35px] border-l-transparent border-r-transparent border-b-green-600 absolute -top-8 left-1/2 -translate-x-1/2" />
      <div className="w-0 h-0 border-l-[16px] border-r-[16px] border-b-[28px] border-l-transparent border-r-transparent border-b-green-500 absolute -top-14 left-1/2 -translate-x-1/2" />
    </div>
  </motion.div>
);

// House Component
const HouseIcon = ({ className, color = "bg-amber-100" }) => (
  <div className={`relative ${className}`}>
    <div className={`w-20 h-16 ${color} rounded-b-lg shadow-lg`}>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-10 bg-amber-700 rounded-t" />
      <div className="absolute top-3 left-3 w-4 h-4 bg-sky-200 border border-white" />
      <div className="absolute top-3 right-3 w-4 h-4 bg-sky-200 border border-white" />
    </div>
    <div className="w-0 h-0 border-l-[50px] border-r-[50px] border-b-[30px] border-l-transparent border-r-transparent border-b-red-500 absolute -top-[30px] left-1/2 -translate-x-1/2" />
  </div>
);

// School Building Component
const SchoolBuilding = ({ isActive }) => (
  <motion.div 
    className="relative"
    animate={{ scale: isActive ? 1.1 : 1 }}
    transition={{ duration: 0.5 }}
  >
    <div className={`w-32 h-24 ${isActive ? 'bg-pink-200' : 'bg-pink-100'} rounded-lg shadow-xl transition-colors duration-500`}>
      <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-12 h-12 bg-yellow-300 rounded shadow-lg flex items-center justify-center">
        <div className="w-6 h-6 bg-white rounded-full border-2 border-gray-400" />
      </div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-12 bg-amber-700 rounded-t" />
      <div className="flex justify-around pt-4 px-2">
        {[1,2,3,4].map(i => <div key={i} className="w-4 h-5 bg-sky-200 border border-white" />)}
      </div>
    </div>
    {isActive && (
      <motion.div
        className="absolute -top-12 left-1/2 -translate-x-1/2 bg-green-500 text-white text-xs px-3 py-1 rounded-full"
        initial={{ scale: 0, y: 10 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 500 }}
      >
        Safe! ✓
      </motion.div>
    )}
  </motion.div>
);

// Bus Component with Animation
const AnimatedBus = ({ progress }) => {
  const busX = useTransform(progress, [0, 1], [5, 75]);
  const smoothX = useSpring(busX, { stiffness: 100, damping: 30 });
  const wheelRotation = useTransform(progress, [0, 1], [0, 720]);
  
  return (
    <motion.div 
      className="absolute bottom-24 z-20"
      style={{ left: useTransform(smoothX, v => `${v}%`) }}
    >
      <motion.div
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 0.5, repeat: Infinity }}
        className="relative"
      >
        {/* Bus Body */}
        <div className="w-28 h-16 bg-gradient-to-b from-yellow-400 to-yellow-500 rounded-lg shadow-xl relative">
          {/* Windows */}
          <div className="absolute top-2 left-2 right-8 h-6 flex gap-1">
            {[1,2,3].map(i => (
              <div key={i} className="flex-1 bg-sky-300 rounded-sm border border-sky-400">
                {/* Kids in windows */}
                <div className="w-3 h-3 bg-pink-200 rounded-full mx-auto mt-1" />
              </div>
            ))}
          </div>
          {/* Front window */}
          <div className="absolute top-2 right-1 w-6 h-6 bg-sky-200 rounded-sm" />
          {/* Headlight */}
          <div className="absolute bottom-3 right-0 w-3 h-2 bg-yellow-100 rounded-l shadow-lg" />
          {/* SCHOOL BUS text */}
          <div className="absolute bottom-1 left-2 text-[6px] font-bold text-yellow-800">SCHOOL BUS</div>
        </div>
        
        {/* Wheels */}
        <motion.div 
          className="absolute -bottom-2 left-4 w-6 h-6 bg-gray-800 rounded-full border-2 border-gray-600"
          style={{ rotate: wheelRotation }}
        >
          <div className="w-2 h-2 bg-gray-500 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        </motion.div>
        <motion.div 
          className="absolute -bottom-2 right-6 w-6 h-6 bg-gray-800 rounded-full border-2 border-gray-600"
          style={{ rotate: wheelRotation }}
        >
          <div className="w-2 h-2 bg-gray-500 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        </motion.div>
        
        {/* Exhaust smoke */}
        <motion.div
          className="absolute -left-3 bottom-1 flex gap-1"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        >
          {[1,2,3].map(i => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-gray-400 rounded-full"
              animate={{ y: [-2, -8], opacity: [0.8, 0], scale: [1, 1.5] }}
              transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

// Child Character
const ChildCharacter = ({ visible, position = "left" }) => (
  <motion.div
    className={`absolute bottom-24 ${position === "left" ? "left-[12%]" : "right-[18%]"} z-10`}
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: visible ? 1 : 0, opacity: visible ? 1 : 0 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <div className="relative">
      {/* Body */}
      <div className="w-6 h-10 bg-blue-500 rounded-t-lg mx-auto" />
      {/* Head */}
      <div className="w-8 h-8 bg-amber-200 rounded-full absolute -top-7 left-1/2 -translate-x-1/2">
        <div className="w-6 h-3 bg-amber-900 rounded-t-full absolute -top-1 left-1/2 -translate-x-1/2" />
        <div className="flex gap-2 justify-center pt-3">
          <div className="w-1 h-1 bg-gray-800 rounded-full" />
          <div className="w-1 h-1 bg-gray-800 rounded-full" />
        </div>
      </div>
      {/* Backpack */}
      <div className="w-4 h-6 bg-orange-500 rounded absolute top-0 -left-2" />
      {/* Waving arm */}
      {visible && position === "left" && (
        <motion.div
          className="w-5 h-2 bg-amber-200 rounded-full absolute top-2 -right-3 origin-left"
          animate={{ rotate: [0, -30, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        />
      )}
    </div>
  </motion.div>
);

// Road Component
const Road = () => (
  <div className="absolute bottom-12 left-0 right-0 h-16 bg-gray-700 overflow-hidden">
    {/* Road markings */}
    <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-around">
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="w-12 h-1.5 bg-yellow-400"
          initial={{ x: 0 }}
          animate={{ x: -50 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: i * 0.1 }}
        />
      ))}
    </div>
    {/* Road edges */}
    <div className="absolute top-0 left-0 right-0 h-1 bg-white" />
    <div className="absolute bottom-0 left-0 right-0 h-1 bg-white" />
  </div>
);

// Story Overlay
const StoryOverlay = ({ scrollProgress }) => {
  const [currentStage, setCurrentStage] = useState(0);
  
  useEffect(() => {
    const progress = scrollProgress.get();
    for (let i = STAGES.length - 1; i >= 0; i--) {
      if (progress >= STAGES[i].progress) {
        setCurrentStage(i);
        break;
      }
    }
    
    return scrollProgress.on("change", (v) => {
      for (let i = STAGES.length - 1; i >= 0; i--) {
        if (v >= STAGES[i].progress) {
          setCurrentStage(i);
          break;
        }
      }
    });
  }, [scrollProgress]);

  const stage = STAGES[currentStage];
  const Icon = stage.icon;

  return (
    <motion.div 
      className="absolute top-24 left-0 right-0 z-30 text-center px-4"
      key={currentStage}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 backdrop-blur mb-4"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Icon className="w-8 h-8 text-white" />
      </motion.div>
      <h2 
        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3"
        style={{ textShadow: "0 4px 30px rgba(0,0,0,0.5)" }}
      >
        {stage.title}
      </h2>
      <p 
        className="text-lg sm:text-xl text-white/90"
        style={{ textShadow: "0 2px 15px rgba(0,0,0,0.5)" }}
      >
        {stage.subtitle}
      </p>
    </motion.div>
  );
};

// Progress Indicator
const ProgressIndicator = ({ scrollProgress }) => {
  const progress = useTransform(scrollProgress, [0, 1], [0, 100]);
  
  return (
    <div className="fixed right-4 sm:right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-2">
      {STAGES.map((stage, i) => (
        <motion.div
          key={i}
          className="w-3 h-3 rounded-full border-2 border-white/50"
          style={{
            backgroundColor: useTransform(
              scrollProgress,
              [stage.progress - 0.05, stage.progress],
              ["rgba(255,255,255,0.2)", "#3B9FD8"]
            )
          }}
        />
      ))}
      <div className="mt-2 w-1 h-20 bg-white/20 rounded-full overflow-hidden">
        <motion.div 
          className="w-full bg-gradient-to-b from-blue-400 to-green-400 rounded-full"
          style={{ height: useTransform(progress, v => `${v}%`) }}
        />
      </div>
    </div>
  );
};

// Main Journey Experience Component
const Journey3DExperience = ({ onSkip }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  
  // Parallax transforms
  const skyY = useTransform(smoothProgress, [0, 1], [0, -100]);
  const sunY = useTransform(smoothProgress, [0, 1], [0, -150]);
  const sunScale = useTransform(smoothProgress, [0, 0.5, 1], [1, 1.2, 0.8]);
  const groundY = useTransform(smoothProgress, [0, 1], [0, 50]);
  
  // Scene state based on progress
  const childAtStop = useTransform(smoothProgress, v => v < 0.25);
  const childAtSchool = useTransform(smoothProgress, v => v >= 0.85);
  const schoolActive = useTransform(smoothProgress, v => v >= 0.8);
  
  const [showChildAtStop, setShowChildAtStop] = useState(true);
  const [showChildAtSchool, setShowChildAtSchool] = useState(false);
  const [isSchoolActive, setIsSchoolActive] = useState(false);

  useEffect(() => {
    return smoothProgress.on("change", v => {
      setShowChildAtStop(v < 0.25);
      setShowChildAtSchool(v >= 0.85);
      setIsSchoolActive(v >= 0.8);
    });
  }, [smoothProgress]);

  return (
    <div ref={containerRef} className="relative h-[500vh]" data-testid="journey-experience">
      {/* Fixed Scene */}
      <div className="fixed inset-0 overflow-hidden">
        {/* Sky Background with Parallax */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-b from-sky-400 via-sky-300 to-sky-200"
          style={{ y: skyY }}
        />
        
        {/* Sun with Parallax */}
        <motion.div
          className="absolute top-16 right-16 w-24 h-24 rounded-full bg-gradient-to-br from-yellow-200 to-yellow-400"
          style={{ y: sunY, scale: sunScale }}
        >
          <div className="absolute inset-0 rounded-full bg-yellow-300 blur-xl opacity-50" />
        </motion.div>
        
        {/* Clouds with Parallax */}
        <Cloud className="top-20 left-[10%]" delay={0} />
        <Cloud className="top-32 left-[60%]" delay={1} />
        <Cloud className="top-16 left-[35%]" delay={2} />
        <Cloud className="top-40 left-[80%]" delay={0.5} />
        
        {/* Ground/Grass with Parallax */}
        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-green-600 to-green-500"
          style={{ y: groundY }}
        />
        
        {/* Road */}
        <Road />
        
        {/* Trees */}
        <Tree className="bottom-28 left-[5%]" delay={0.1} />
        <Tree className="bottom-28 left-[25%]" delay={0.2} />
        <Tree className="bottom-28 left-[45%]" delay={0.3} />
        <Tree className="bottom-28 left-[65%]" delay={0.4} />
        <Tree className="bottom-28 right-[5%]" delay={0.5} />
        
        {/* Houses */}
        <div className="absolute bottom-32 left-[8%]">
          <HouseIcon color="bg-amber-100" />
        </div>
        <div className="absolute bottom-32 left-[22%]">
          <HouseIcon color="bg-gray-100" />
        </div>
        
        {/* Bus Stop */}
        <div className="absolute bottom-24 left-[15%] z-10">
          <div className="w-2 h-16 bg-gray-600" />
          <div className="w-8 h-6 bg-blue-500 -ml-3 -mt-1 rounded flex items-center justify-center">
            <Bus className="w-4 h-4 text-white" />
          </div>
        </div>
        
        {/* Child at bus stop */}
        <ChildCharacter visible={showChildAtStop} position="left" />
        
        {/* Animated Bus */}
        <AnimatedBus progress={smoothProgress} />
        
        {/* School */}
        <div className="absolute bottom-32 right-[10%]">
          <SchoolBuilding isActive={isSchoolActive} />
        </div>
        
        {/* Child at school */}
        <ChildCharacter visible={showChildAtSchool} position="right" />
        
        {/* Story Overlay */}
        <StoryOverlay scrollProgress={smoothProgress} />
        
        {/* Progress Indicator */}
        <ProgressIndicator scrollProgress={smoothProgress} />
        
        {/* Bottom Progress Bar */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-40">
          <div className="bg-white/20 backdrop-blur rounded-full px-6 py-3 flex items-center gap-4">
            <Home className="w-5 h-5 text-white" />
            <div className="w-32 sm:w-48 h-2 bg-white/30 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-blue-400 to-green-400 rounded-full"
                style={{ width: useTransform(smoothProgress, [0, 1], ["0%", "100%"]) }}
              />
            </div>
            <School className={`w-5 h-5 transition-colors ${isSchoolActive ? 'text-green-400' : 'text-white'}`} />
          </div>
        </div>
        
        {/* Skip Button */}
        <button
          onClick={onSkip}
          className="fixed bottom-4 right-4 z-50 bg-black/30 hover:bg-black/50 backdrop-blur text-white px-5 py-2.5 rounded-full text-sm font-medium border border-white/20 transition-all"
          data-testid="skip-btn"
        >
          Skip →
        </button>
        
        {/* Scroll Indicator */}
        <motion.div 
          className="fixed bottom-20 left-1/2 -translate-x-1/2 z-40 text-center"
          animate={{ opacity: [1, 0.5, 1], y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ opacity: useTransform(smoothProgress, [0, 0.1], [1, 0]) }}
        >
          <p className="text-white/80 text-sm mb-2">Scroll to follow the journey</p>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <svg className="w-6 h-6 text-white mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Journey3DExperience;
