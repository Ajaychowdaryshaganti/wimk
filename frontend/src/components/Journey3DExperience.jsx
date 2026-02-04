import { useState, useEffect, useRef, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// Story stages based on scroll progress
const STAGES = [
  { progress: 0, text: "Your child's journey starts here.", subtitle: "Safe pickup from home" },
  { progress: 0.15, text: "Know exactly when the bus arrives.", subtitle: "Real-time bus tracking" },
  { progress: 0.35, text: "Boarding confirmed.", subtitle: "RFID scan verification" },
  { progress: 0.55, text: "Track the journey in real time.", subtitle: "Live GPS updates" },
  { progress: 0.8, text: "From Bus Stops to Classrooms – Stay Informed.", subtitle: "Safe arrival at school" },
];

// Ground plane
const Ground = () => (
  <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
    <planeGeometry args={[200, 200]} />
    <meshStandardMaterial color="#3d6b1e" />
  </mesh>
);

// Road
const Road = ({ length = 100 }) => (
  <group position={[0, -0.48, 0]}>
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[8, length]} />
      <meshStandardMaterial color="#333333" />
    </mesh>
    {Array.from({ length: Math.floor(length / 4) }).map((_, i) => (
      <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, -length / 2 + i * 4 + 2]}>
        <planeGeometry args={[0.3, 1.5]} />
        <meshStandardMaterial color="#FFC107" />
      </mesh>
    ))}
  </group>
);

// Simple House
const House = ({ position, color = "#FFE4B5" }) => (
  <group position={position}>
    <mesh position={[0, 1, 0]} castShadow>
      <boxGeometry args={[3, 2, 3]} />
      <meshStandardMaterial color={color} />
    </mesh>
    <mesh position={[0, 2.5, 0]} castShadow>
      <coneGeometry args={[2.5, 1.5, 4]} />
      <meshStandardMaterial color="#C41E3A" />
    </mesh>
    <mesh position={[0, 0.6, 1.51]}>
      <boxGeometry args={[0.8, 1.2, 0.1]} />
      <meshStandardMaterial color="#5D4037" />
    </mesh>
  </group>
);

// School Building
const School = ({ position }) => (
  <group position={position}>
    <mesh position={[0, 2, 0]} castShadow>
      <boxGeometry args={[12, 4, 6]} />
      <meshStandardMaterial color="#E8B4B8" />
    </mesh>
    <mesh position={[0, 5, 0]} castShadow>
      <boxGeometry args={[3, 3, 3]} />
      <meshStandardMaterial color="#FFEB3B" />
    </mesh>
    <mesh position={[0, 7, 0]}>
      <coneGeometry args={[2.5, 2, 4]} />
      <meshStandardMaterial color="#C62828" />
    </mesh>
    <mesh position={[0, 0.8, 3.01]}>
      <boxGeometry args={[2, 1.6, 0.1]} />
      <meshStandardMaterial color="#5D4037" />
    </mesh>
  </group>
);

// Bus Stop Sign
const BusStop = ({ position }) => (
  <group position={position}>
    <mesh position={[0, 1.5, 0]}>
      <cylinderGeometry args={[0.1, 0.1, 3]} />
      <meshStandardMaterial color="#666666" />
    </mesh>
    <mesh position={[0, 2.8, 0]}>
      <boxGeometry args={[1.2, 0.8, 0.1]} />
      <meshStandardMaterial color="#3B9FD8" />
    </mesh>
  </group>
);

// Child Character
const Child = ({ position, visible = true }) => {
  if (!visible) return null;
  return (
    <group position={position}>
      <mesh position={[0, 0.6, 0]} castShadow>
        <capsuleGeometry args={[0.25, 0.5, 8, 16]} />
        <meshStandardMaterial color="#3B9FD8" />
      </mesh>
      <mesh position={[0, 1.3, 0]} castShadow>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshStandardMaterial color="#FFDAB9" />
      </mesh>
      <mesh position={[0, 0.6, -0.25]} castShadow>
        <boxGeometry args={[0.3, 0.4, 0.2]} />
        <meshStandardMaterial color="#FF7043" />
      </mesh>
    </group>
  );
};

// School Bus
const SchoolBus = ({ position }) => (
  <group position={position}>
    <mesh position={[0, 0.9, 0]} castShadow>
      <boxGeometry args={[2.5, 1.5, 5]} />
      <meshStandardMaterial color="#FFD700" />
    </mesh>
    <mesh position={[0, 1.75, 0]}>
      <boxGeometry args={[2.3, 0.2, 4.8]} />
      <meshStandardMaterial color="#FFA500" />
    </mesh>
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
    {[[-0.9, -1.8], [0.9, -1.8], [-0.9, 1.8], [0.9, 1.8]].map(([x, z], i) => (
      <mesh key={i} position={[x, 0.3, z]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.4, 0.4, 0.3, 16]} />
        <meshStandardMaterial color="#333333" />
      </mesh>
    ))}
  </group>
);

// Tree
const Tree = ({ position, scale = 1 }) => (
  <group position={position} scale={scale}>
    <mesh position={[0, 0.75, 0]} castShadow>
      <cylinderGeometry args={[0.2, 0.3, 1.5]} />
      <meshStandardMaterial color="#8B4513" />
    </mesh>
    <mesh position={[0, 2, 0]} castShadow>
      <coneGeometry args={[1, 2, 8]} />
      <meshStandardMaterial color="#228B22" />
    </mesh>
  </group>
);

// Cloud with animation
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
    </group>
  );
};

// Camera Controller
const CameraController = ({ scrollProgress }) => {
  const { camera } = useThree();
  const targetPosition = useRef(new THREE.Vector3());
  const targetLookAt = useRef(new THREE.Vector3());

  useFrame(() => {
    const progress = scrollProgress;
    let camX, camY, camZ, lookZ;
    
    if (progress < 0.2) {
      const t = progress / 0.2;
      camX = 8;
      camY = 3 + t * 1;
      camZ = 5 - t * 10;
      lookZ = 0 - t * 5;
    } else if (progress < 0.4) {
      const t = (progress - 0.2) / 0.2;
      camX = 8 - t * 2;
      camY = 4 + t * 2;
      camZ = -5 - t * 15;
      lookZ = -5 - t * 10;
    } else if (progress < 0.7) {
      const t = (progress - 0.4) / 0.3;
      camX = 6 + Math.sin(t * Math.PI) * 2;
      camY = 6;
      camZ = -20 - t * 40;
      lookZ = -25 - t * 35;
    } else {
      const t = (progress - 0.7) / 0.3;
      camX = 6 - t * 4;
      camY = 6 - t * 2;
      camZ = -60 - t * 15;
      lookZ = -75;
    }
    
    targetPosition.current.set(camX, camY, camZ);
    targetLookAt.current.set(0, 1, lookZ);
    
    camera.position.lerp(targetPosition.current, 0.05);
    camera.lookAt(targetLookAt.current);
  });

  return null;
};

// Main 3D Scene
const Scene3D = ({ scrollProgress }) => {
  const busProgress = Math.max(0, Math.min(1, (scrollProgress - 0.1) / 0.7));
  const busZ = 15 - busProgress * 90;
  const childAtStop = scrollProgress < 0.35;
  const childAtSchool = scrollProgress >= 0.85;
  
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 20, 10]} intensity={1} castShadow />
      <color attach="background" args={["#87CEEB"]} />
      <fog attach="fog" args={["#87CEEB", 30, 100]} />
      
      <mesh position={[30, 40, -50]}>
        <sphereGeometry args={[3, 32, 32]} />
        <meshBasicMaterial color="#FFF9C4" />
      </mesh>
      
      <Cloud position={[-15, 15, -20]} />
      <Cloud position={[20, 18, -40]} />
      <Cloud position={[-10, 16, -60]} />
      
      <Ground />
      <Road length={150} />
      
      <BusStop position={[5, 0, 0]} />
      <House position={[-8, 0, 5]} color="#FFE4B5" />
      <House position={[-12, 0, -5]} color="#E0E0E0" />
      <House position={[12, 0, 3]} color="#DEB887" />
      
      {Array.from({ length: 20 }).map((_, i) => (
        <group key={i}>
          <Tree position={[-6, 0, -i * 7 - 10]} scale={0.8 + Math.random() * 0.4} />
          <Tree position={[6, 0, -i * 7 - 15]} scale={0.8 + Math.random() * 0.4} />
        </group>
      ))}
      
      <House position={[-10, 0, -25]} color="#FFDAB9" />
      <House position={[10, 0, -35]} color="#E8B4B8" />
      
      <School position={[0, 0, -80]} />
      
      <Child position={[3, 0, 0]} visible={childAtStop} />
      <Child position={[0, 0, -72]} visible={childAtSchool} />
      
      <SchoolBus position={[0, 0, busZ]} />
      
      <CameraController scrollProgress={scrollProgress} />
    </>
  );
};

// Overlay Text
const StoryOverlay = ({ scrollProgress }) => {
  const [currentStage, setCurrentStage] = useState(0);
  
  useEffect(() => {
    for (let i = STAGES.length - 1; i >= 0; i--) {
      if (scrollProgress >= STAGES[i].progress) {
        setCurrentStage(i);
        break;
      }
    }
  }, [scrollProgress]);

  const stage = STAGES[currentStage];

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
      <div className="text-center px-6">
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4" style={{ textShadow: "0 4px 20px rgba(0,0,0,0.5)" }}>
          {stage.text}
        </h2>
        <p className="text-xl md:text-2xl text-white/90" style={{ textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>
          {stage.subtitle}
        </p>
      </div>
    </div>
  );
};

// Progress Indicator
const ProgressIndicator = ({ scrollProgress }) => (
  <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col items-center gap-2">
    {STAGES.map((stage, i) => (
      <div 
        key={i}
        className={`w-3 h-3 rounded-full transition-all duration-300 ${
          scrollProgress >= stage.progress ? "bg-[#3B9FD8] scale-125" : "bg-white/30"
        }`}
      />
    ))}
  </div>
);

// Main Component
export const Journey3DExperience = ({ onComplete, onSkip }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [webGLSupported, setWebGLSupported] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      setWebGLSupported(!!gl);
    } catch (e) {
      setWebGLSupported(false);
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const scrollTop = window.scrollY;
      const scrollHeight = containerRef.current.offsetHeight - window.innerHeight;
      const progress = Math.min(Math.max(scrollTop / scrollHeight, 0), 1);
      setScrollProgress(progress);
      if (progress >= 0.99 && onComplete) onComplete();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [onComplete]);

  if (!webGLSupported || prefersReducedMotion) {
    return (
      <div className="relative min-h-screen bg-gradient-to-b from-[#87CEEB] to-[#3B9FD8] flex items-center justify-center">
        <div className="text-center px-6 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6" style={{ textShadow: "0 4px 20px rgba(0,0,0,0.3)" }}>
            From Bus Stops to Classrooms — Stay Informed
          </h1>
          <p className="text-xl text-white/90 mb-8">Complete visibility of your child's daily school journey</p>
          <button onClick={onSkip} className="bg-white text-[#3B9FD8] px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/90">
            Explore Features
          </button>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative" style={{ height: "500vh" }} data-testid="journey-3d-container">
      <div className="fixed inset-0 z-0">
        <Canvas shadows camera={{ position: [8, 3, 5], fov: 60 }} gl={{ antialias: true }}>
          <Suspense fallback={null}>
            <Scene3D scrollProgress={scrollProgress} />
          </Suspense>
        </Canvas>
      </div>

      <StoryOverlay scrollProgress={scrollProgress} />
      <ProgressIndicator scrollProgress={scrollProgress} />

      <button
        onClick={onSkip}
        className="fixed bottom-6 right-6 z-50 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full font-medium border border-white/20"
        data-testid="skip-animation-btn"
      >
        Skip Animation →
      </button>

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
