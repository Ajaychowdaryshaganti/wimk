import { useState, useEffect, useRef, Suspense, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { 
  Environment, 
  Text, 
  useProgress,
  Html
} from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";

// Story stages based on scroll progress
const STAGES = [
  { progress: 0, text: "Your child's journey starts here.", subtitle: "Safe pickup from home" },
  { progress: 0.15, text: "Know exactly when the bus arrives.", subtitle: "Real-time bus tracking" },
  { progress: 0.35, text: "Boarding confirmed.", subtitle: "RFID scan verification" },
  { progress: 0.55, text: "Track the journey in real time.", subtitle: "Live GPS updates" },
  { progress: 0.8, text: "From Bus Stops to Classrooms – Stay Informed.", subtitle: "Safe arrival at school" },
];

// Ground plane
const Ground = () => {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
      <planeGeometry args={[200, 200]} />
      <meshStandardMaterial color="#3d6b1e" />
    </mesh>
  );
};

// Road
const Road = ({ length = 100 }) => {
  return (
    <group position={[0, -0.48, 0]}>
      {/* Main road */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[8, length]} />
        <meshStandardMaterial color="#333333" />
      </mesh>
      {/* Road markings */}
      {Array.from({ length: Math.floor(length / 4) }).map((_, i) => (
        <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, -length / 2 + i * 4 + 2]}>
          <planeGeometry args={[0.3, 1.5]} />
          <meshStandardMaterial color="#FFC107" />
        </mesh>
      ))}
    </group>
  );
};

// Simple House
const House = ({ position, color = "#FFE4B5" }) => {
  return (
    <group position={position}>
      {/* Main building */}
      <mesh position={[0, 1, 0]} castShadow>
        <boxGeometry args={[3, 2, 3]} />
        <meshStandardMaterial color={color} />
      </mesh>
      {/* Roof */}
      <mesh position={[0, 2.5, 0]} castShadow>
        <coneGeometry args={[2.5, 1.5, 4]} />
        <meshStandardMaterial color="#C41E3A" />
      </mesh>
      {/* Door */}
      <mesh position={[0, 0.6, 1.51]}>
        <boxGeometry args={[0.8, 1.2, 0.1]} />
        <meshStandardMaterial color="#5D4037" />
      </mesh>
      {/* Windows */}
      <mesh position={[-0.8, 1.2, 1.51]}>
        <boxGeometry args={[0.6, 0.6, 0.1]} />
        <meshStandardMaterial color="#87CEEB" />
      </mesh>
      <mesh position={[0.8, 1.2, 1.51]}>
        <boxGeometry args={[0.6, 0.6, 0.1]} />
        <meshStandardMaterial color="#87CEEB" />
      </mesh>
    </group>
  );
};

// School Building
const School = ({ position }) => {
  return (
    <group position={position}>
      {/* Main building */}
      <mesh position={[0, 2, 0]} castShadow>
        <boxGeometry args={[12, 4, 6]} />
        <meshStandardMaterial color="#E8B4B8" />
      </mesh>
      {/* Tower */}
      <mesh position={[0, 5, 0]} castShadow>
        <boxGeometry args={[3, 3, 3]} />
        <meshStandardMaterial color="#FFEB3B" />
      </mesh>
      {/* Clock */}
      <mesh position={[0, 5, 1.51]}>
        <circleGeometry args={[0.8, 32]} />
        <meshStandardMaterial color="white" />
      </mesh>
      {/* Roof */}
      <mesh position={[0, 7, 0]}>
        <coneGeometry args={[2.5, 2, 4]} />
        <meshStandardMaterial color="#C62828" />
      </mesh>
      {/* Door */}
      <mesh position={[0, 0.8, 3.01]}>
        <boxGeometry args={[2, 1.6, 0.1]} />
        <meshStandardMaterial color="#5D4037" />
      </mesh>
      {/* Windows */}
      {[-4, -2, 2, 4].map((x, i) => (
        <group key={i}>
          <mesh position={[x, 2.5, 3.01]}>
            <boxGeometry args={[1, 1, 0.1]} />
            <meshStandardMaterial color="#87CEEB" />
          </mesh>
          <mesh position={[x, 1, 3.01]}>
            <boxGeometry args={[1, 1, 0.1]} />
            <meshStandardMaterial color="#87CEEB" />
          </mesh>
        </group>
      ))}
      {/* Flag */}
      <group position={[0, 8.5, 0]}>
        <mesh>
          <cylinderGeometry args={[0.05, 0.05, 2]} />
          <meshStandardMaterial color="#333" />
        </mesh>
        <mesh position={[0.4, 0.7, 0]}>
          <boxGeometry args={[0.8, 0.5, 0.05]} />
          <meshStandardMaterial color="#4CAF50" />
        </mesh>
      </group>
    </group>
  );
};

// Bus Stop Sign
const BusStop = ({ position }) => {
  return (
    <group position={position}>
      {/* Pole */}
      <mesh position={[0, 1.5, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 3]} />
        <meshStandardMaterial color="#666666" />
      </mesh>
      {/* Sign */}
      <mesh position={[0, 2.8, 0]}>
        <boxGeometry args={[1.2, 0.8, 0.1]} />
        <meshStandardMaterial color="#3B9FD8" />
      </mesh>
      {/* Bench */}
      <mesh position={[0.8, 0.3, 0]}>
        <boxGeometry args={[1.5, 0.1, 0.5]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      <mesh position={[0.3, 0.15, 0]}>
        <boxGeometry args={[0.1, 0.3, 0.4]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      <mesh position={[1.3, 0.15, 0]}>
        <boxGeometry args={[0.1, 0.3, 0.4]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
    </group>
  );
};

// Child Character
const Child = ({ position, rotation = [0, 0, 0], visible = true }) => {
  if (!visible) return null;
  
  return (
    <group position={position} rotation={rotation}>
      {/* Body */}
      <mesh position={[0, 0.6, 0]} castShadow>
        <capsuleGeometry args={[0.25, 0.5, 8, 16]} />
        <meshStandardMaterial color="#3B9FD8" />
      </mesh>
      {/* Head */}
      <mesh position={[0, 1.3, 0]} castShadow>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshStandardMaterial color="#FFDAB9" />
      </mesh>
      {/* Hair */}
      <mesh position={[0, 1.45, 0]}>
        <sphereGeometry args={[0.22, 16, 16]} />
        <meshStandardMaterial color="#5D4037" />
      </mesh>
      {/* Backpack */}
      <mesh position={[0, 0.6, -0.25]} castShadow>
        <boxGeometry args={[0.3, 0.4, 0.2]} />
        <meshStandardMaterial color="#FF7043" />
      </mesh>
      {/* Legs */}
      <mesh position={[-0.1, 0.15, 0]}>
        <capsuleGeometry args={[0.08, 0.2, 4, 8]} />
        <meshStandardMaterial color="#1565C0" />
      </mesh>
      <mesh position={[0.1, 0.15, 0]}>
        <capsuleGeometry args={[0.08, 0.2, 4, 8]} />
        <meshStandardMaterial color="#1565C0" />
      </mesh>
    </group>
  );
};

// School Bus
const SchoolBus = ({ position, doorsOpen = false }) => {
  return (
    <group position={position}>
      {/* Body */}
      <mesh position={[0, 0.9, 0]} castShadow>
        <boxGeometry args={[2.5, 1.5, 5]} />
        <meshStandardMaterial color="#FFD700" />
      </mesh>
      {/* Roof */}
      <mesh position={[0, 1.75, 0]}>
        <boxGeometry args={[2.3, 0.2, 4.8]} />
        <meshStandardMaterial color="#FFA500" />
      </mesh>
      {/* Windows */}
      {[-1.5, -0.5, 0.5, 1.5].map((z, i) => (
        <group key={i}>
          <mesh position={[1.26, 1.1, z]}>
            <boxGeometry args={[0.1, 0.6, 0.8]} />
            <meshStandardMaterial color="#87CEEB" />
          </mesh>
          <mesh position={[-1.26, 1.1, z]}>
            <boxGeometry args={[0.1, 0.6, 0.8]} />
            <meshStandardMaterial color="#87CEEB" />
          </mesh>
        </group>
      ))}
      {/* Front window */}
      <mesh position={[0, 1.1, 2.51]}>
        <boxGeometry args={[1.8, 0.6, 0.1]} />
        <meshStandardMaterial color="#87CEEB" />
      </mesh>
      {/* Headlights */}
      <mesh position={[-0.8, 0.5, 2.51]}>
        <circleGeometry args={[0.2, 16]} />
        <meshStandardMaterial color="#FFFACD" emissive="#FFFACD" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[0.8, 0.5, 2.51]}>
        <circleGeometry args={[0.2, 16]} />
        <meshStandardMaterial color="#FFFACD" emissive="#FFFACD" emissiveIntensity={0.5} />
      </mesh>
      {/* Wheels */}
      {[[-0.9, -1.8], [0.9, -1.8], [-0.9, 1.8], [0.9, 1.8]].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.3, z]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.4, 0.4, 0.3, 16]} />
          <meshStandardMaterial color="#333333" />
        </mesh>
      ))}
      {/* Door (animated) */}
      <mesh position={[1.26, 0.7, -2]} rotation={[0, doorsOpen ? -Math.PI / 3 : 0, 0]}>
        <boxGeometry args={[0.1, 1.2, 0.8]} />
        <meshStandardMaterial color="#FFA500" />
      </mesh>
    </group>
  );
};

// Tree
const Tree = ({ position, scale = 1 }) => {
  return (
    <group position={position} scale={scale}>
      {/* Trunk */}
      <mesh position={[0, 0.75, 0]} castShadow>
        <cylinderGeometry args={[0.2, 0.3, 1.5]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      {/* Foliage */}
      <mesh position={[0, 2, 0]} castShadow>
        <coneGeometry args={[1, 2, 8]} />
        <meshStandardMaterial color="#228B22" />
      </mesh>
      <mesh position={[0, 2.8, 0]} castShadow>
        <coneGeometry args={[0.7, 1.5, 8]} />
        <meshStandardMaterial color="#2E8B2E" />
      </mesh>
    </group>
  );
};

// Cloud
const Cloud = ({ position }) => {
  const ref = useRef();
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
    }
  });

  return (
    <group ref={ref} position={position}>
      <mesh>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial color="white" transparent opacity={0.9} />
      </mesh>
      <mesh position={[1, 0, 0]}>
        <sphereGeometry args={[0.8, 16, 16]} />
        <meshStandardMaterial color="white" transparent opacity={0.9} />
      </mesh>
      <mesh position={[-1, 0, 0]}>
        <sphereGeometry args={[0.7, 16, 16]} />
        <meshStandardMaterial color="white" transparent opacity={0.9} />
      </mesh>
      <mesh position={[0.5, 0.5, 0]}>
        <sphereGeometry args={[0.6, 16, 16]} />
        <meshStandardMaterial color="white" transparent opacity={0.9} />
      </mesh>
    </group>
  );
};

// Sun
const Sun = ({ position }) => {
  return (
    <mesh position={position}>
      <sphereGeometry args={[3, 32, 32]} />
      <meshBasicMaterial color="#FFF9C4" />
    </mesh>
  );
};

// Camera Controller - follows scroll progress
const CameraController = ({ scrollProgress }) => {
  const { camera } = useThree();
  const targetPosition = useRef(new THREE.Vector3());
  const targetLookAt = useRef(new THREE.Vector3());

  useFrame(() => {
    // Define camera path based on scroll progress
    const progress = scrollProgress;
    
    // Camera positions along the journey
    // Start: at bus stop looking at child
    // Middle: following bus
    // End: at school
    
    let camX, camY, camZ, lookX, lookY, lookZ;
    
    if (progress < 0.2) {
      // At bus stop - looking at child waiting
      const t = progress / 0.2;
      camX = 8;
      camY = 3 + t * 1;
      camZ = 5 - t * 10;
      lookX = 0;
      lookY = 1;
      lookZ = 0 - t * 5;
    } else if (progress < 0.4) {
      // Bus arrives - camera pulls back
      const t = (progress - 0.2) / 0.2;
      camX = 8 - t * 2;
      camY = 4 + t * 2;
      camZ = -5 - t * 15;
      lookX = 0;
      lookY = 1;
      lookZ = -5 - t * 10;
    } else if (progress < 0.7) {
      // Following the bus
      const t = (progress - 0.4) / 0.3;
      camX = 6 + Math.sin(t * Math.PI) * 2;
      camY = 6;
      camZ = -20 - t * 40;
      lookX = 0;
      lookY = 1;
      lookZ = -25 - t * 35;
    } else {
      // Arriving at school
      const t = (progress - 0.7) / 0.3;
      camX = 6 - t * 4;
      camY = 6 - t * 2;
      camZ = -60 - t * 15;
      lookX = 0;
      lookY = 2;
      lookZ = -75;
    }
    
    targetPosition.current.set(camX, camY, camZ);
    targetLookAt.current.set(lookX, lookY, lookZ);
    
    // Smooth camera movement
    camera.position.lerp(targetPosition.current, 0.05);
    
    const lookAtPoint = new THREE.Vector3();
    lookAtPoint.lerp(targetLookAt.current, 0.05);
    camera.lookAt(targetLookAt.current);
  });

  return null;
};

// Main 3D Scene
const Scene3D = ({ scrollProgress }) => {
  // Calculate positions based on scroll
  const busProgress = Math.max(0, Math.min(1, (scrollProgress - 0.1) / 0.7));
  const busZ = 15 - busProgress * 90; // Bus moves from z=15 to z=-75
  const busDoorsOpen = scrollProgress > 0.2 && scrollProgress < 0.4;
  
  const childAtStop = scrollProgress < 0.35;
  const childOnBus = scrollProgress >= 0.35 && scrollProgress < 0.85;
  const childAtSchool = scrollProgress >= 0.85;
  
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <directionalLight 
        position={[10, 20, 10]} 
        intensity={1} 
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      
      {/* Sky */}
      <color attach="background" args={["#87CEEB"]} />
      <fog attach="fog" args={["#87CEEB", 30, 100]} />
      
      {/* Sun */}
      <Sun position={[30, 40, -50]} />
      
      {/* Clouds */}
      <Cloud position={[-15, 15, -20]} />
      <Cloud position={[20, 18, -40]} />
      <Cloud position={[-10, 16, -60]} />
      <Cloud position={[15, 14, -80]} />
      
      {/* Ground and Road */}
      <Ground />
      <Road length={150} />
      
      {/* Bus Stop Area */}
      <BusStop position={[5, 0, 0]} />
      <House position={[-8, 0, 5]} color="#FFE4B5" />
      <House position={[-12, 0, -5]} color="#E0E0E0" />
      <House position={[12, 0, 3]} color="#DEB887" />
      
      {/* Trees along the road */}
      {Array.from({ length: 20 }).map((_, i) => (
        <group key={i}>
          <Tree position={[-6, 0, -i * 7 - 10]} scale={0.8 + Math.random() * 0.4} />
          <Tree position={[6, 0, -i * 7 - 15]} scale={0.8 + Math.random() * 0.4} />
        </group>
      ))}
      
      {/* More houses along the route */}
      <House position={[-10, 0, -25]} color="#FFDAB9" />
      <House position={[10, 0, -35]} color="#E8B4B8" />
      <House position={[-12, 0, -50]} color="#B8D4E8" />
      
      {/* School at the end */}
      <School position={[0, 0, -80]} />
      
      {/* Child at bus stop */}
      <Child 
        position={[3, 0, 0]} 
        rotation={[0, Math.PI / 4, 0]}
        visible={childAtStop}
      />
      
      {/* Child at school */}
      <Child 
        position={[0, 0, -72]} 
        rotation={[0, 0, 0]}
        visible={childAtSchool}
      />
      
      {/* School Bus */}
      <SchoolBus 
        position={[0, 0, busZ]} 
        doorsOpen={busDoorsOpen}
      />
      
      {/* Camera Controller */}
      <CameraController scrollProgress={scrollProgress} />
    </>
  );
};

// Loading Screen
const Loader = () => {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center gap-4">
        <div className="w-48 h-2 bg-white/20 rounded-full overflow-hidden">
          <div 
            className="h-full bg-[#3B9FD8] rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-white text-sm">Loading 3D Experience... {progress.toFixed(0)}%</p>
      </div>
    </Html>
  );
};

// Overlay Text Component
const StoryOverlay = ({ scrollProgress }) => {
  const [currentStage, setCurrentStage] = useState(0);
  
  useEffect(() => {
    // Find current stage based on progress
    for (let i = STAGES.length - 1; i >= 0; i--) {
      if (scrollProgress >= STAGES[i].progress) {
        setCurrentStage(i);
        break;
      }
    }
  }, [scrollProgress]);

  const stage = STAGES[currentStage];
  const opacity = Math.min(1, Math.max(0, 1 - Math.abs(scrollProgress - stage.progress) * 5));

  return (
    <div 
      className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
      style={{ opacity: Math.max(0.3, opacity) }}
    >
      <div className="text-center px-6">
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 drop-shadow-2xl">
          {stage.text}
        </h2>
        <p className="text-xl md:text-2xl text-white/80 drop-shadow-lg">
          {stage.subtitle}
        </p>
      </div>
    </div>
  );
};

// Progress Indicator
const ProgressIndicator = ({ scrollProgress }) => {
  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col items-center gap-2">
      {STAGES.map((stage, i) => (
        <div 
          key={i}
          className={`w-3 h-3 rounded-full transition-all duration-300 ${
            scrollProgress >= stage.progress 
              ? "bg-[#3B9FD8] scale-125" 
              : "bg-white/30"
          }`}
          title={stage.text}
        />
      ))}
    </div>
  );
};

// Main Component
export const Journey3DExperience = ({ onComplete, onSkip }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [webGLSupported, setWebGLSupported] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const containerRef = useRef(null);

  // Check WebGL support
  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      setWebGLSupported(!!gl);
    } catch (e) {
      setWebGLSupported(false);
    }

    // Check reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // Handle scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const scrollTop = window.scrollY;
      const scrollHeight = containerRef.current.offsetHeight - window.innerHeight;
      const progress = Math.min(Math.max(scrollTop / scrollHeight, 0), 1);
      
      setScrollProgress(progress);
      
      // Trigger completion when fully scrolled
      if (progress >= 0.99 && onComplete) {
        onComplete();
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, [onComplete]);

  // Fallback for unsupported devices or reduced motion
  if (!webGLSupported || prefersReducedMotion) {
    return (
      <div className="relative min-h-screen bg-gradient-to-b from-[#87CEEB] to-[#3B9FD8] flex items-center justify-center">
        <div className="text-center px-6 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg">
            From Bus Stops to Classrooms — Stay Informed
          </h1>
          <p className="text-xl text-white/90 mb-8">
            Complete visibility of your child's daily school journey
          </p>
          <button 
            onClick={onSkip}
            className="bg-white text-[#3B9FD8] px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/90 transition-colors"
          >
            Explore Features
          </button>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className="relative"
      style={{ height: "500vh" }} // 5x viewport height for scroll space
      data-testid="journey-3d-container"
    >
      {/* Fixed 3D Canvas */}
      <div className="fixed inset-0 z-0">
        <Canvas
          shadows
          camera={{ position: [8, 3, 5], fov: 60 }}
          gl={{ antialias: true, alpha: false }}
        >
          <Suspense fallback={<Loader />}>
            <Scene3D scrollProgress={scrollProgress} />
          </Suspense>
        </Canvas>
      </div>

      {/* Story Overlay */}
      <StoryOverlay scrollProgress={scrollProgress} />

      {/* Progress Indicator */}
      <ProgressIndicator scrollProgress={scrollProgress} />

      {/* Skip Button */}
      <button
        onClick={onSkip}
        className="fixed bottom-6 right-6 z-50 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full font-medium transition-all border border-white/20"
        data-testid="skip-animation-btn"
      >
        Skip Animation →
      </button>

      {/* Scroll Indicator (only at start) */}
      {scrollProgress < 0.1 && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-white/80 text-sm">Scroll to explore</span>
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      )}
    </div>
  );
};

export default Journey3DExperience;
