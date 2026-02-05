import { useState, useEffect, useRef, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";

// Story stages
const STAGES = [
  { progress: 0, text: "Your child's journey starts here.", subtitle: "Safe pickup from home" },
  { progress: 0.2, text: "Know exactly when the bus arrives.", subtitle: "Real-time bus tracking" },
  { progress: 0.4, text: "Boarding confirmed.", subtitle: "RFID scan verification" },
  { progress: 0.6, text: "Track the journey in real time.", subtitle: "Live GPS updates" },
  { progress: 0.85, text: "From Bus Stops to Classrooms – Stay Informed.", subtitle: "Safe arrival at school" },
];

// Ground
const Ground = () => (
  <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
    <planeGeometry args={[200, 200]} />
    <meshStandardMaterial color="#3d6b1e" />
  </mesh>
);

// Road
const Road = ({ length = 120 }) => (
  <group position={[0, -0.48, 0]}>
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[8, length]} />
      <meshStandardMaterial color="#333" />
    </mesh>
    {Array.from({ length: Math.floor(length / 4) }).map((_, i) => (
      <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, -length/2 + i * 4 + 2]}>
        <planeGeometry args={[0.3, 1.5]} />
        <meshStandardMaterial color="#FFC107" />
      </mesh>
    ))}
  </group>
);

// House
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

// School
const School = ({ position, highlight }) => (
  <group position={position} scale={highlight ? 1.05 : 1}>
    <mesh position={[0, 2, 0]} castShadow>
      <boxGeometry args={[12, 4, 6]} />
      <meshStandardMaterial color={highlight ? "#FFB6C1" : "#E8B4B8"} />
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
    {highlight && (
      <mesh position={[0, 4, 0]}>
        <sphereGeometry args={[8, 16, 16]} />
        <meshBasicMaterial color="#3B9FD8" transparent opacity={0.1} />
      </mesh>
    )}
  </group>
);

// Bus Stop
const BusStop = ({ position }) => (
  <group position={position}>
    <mesh position={[0, 1.5, 0]}>
      <cylinderGeometry args={[0.1, 0.1, 3]} />
      <meshStandardMaterial color="#666" />
    </mesh>
    <mesh position={[0, 2.8, 0]}>
      <boxGeometry args={[1.2, 0.8, 0.1]} />
      <meshStandardMaterial color="#3B9FD8" />
    </mesh>
  </group>
);

// Child
const Child = ({ position, visible }) => {
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

// Bus
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
        <meshStandardMaterial color="#333" />
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

// Cloud
const Cloud = ({ position }) => {
  const ref = useRef();
  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.3) * 0.5;
      ref.current.position.x = position[0] + Math.sin(state.clock.elapsedTime * 0.2) * 0.3;
    }
  });
  return (
    <group ref={ref} position={position}>
      <mesh><sphereGeometry args={[1.5, 16, 16]} /><meshStandardMaterial color="white" transparent opacity={0.9} /></mesh>
      <mesh position={[1.2, 0, 0]}><sphereGeometry args={[1, 16, 16]} /><meshStandardMaterial color="white" transparent opacity={0.9} /></mesh>
      <mesh position={[-1.2, 0, 0]}><sphereGeometry args={[1, 16, 16]} /><meshStandardMaterial color="white" transparent opacity={0.9} /></mesh>
    </group>
  );
};

// Camera Controller
const CameraController = ({ scrollProgress }) => {
  const { camera } = useThree();
  const target = useRef({ pos: new THREE.Vector3(), look: new THREE.Vector3() });

  useFrame(() => {
    const p = scrollProgress;
    let x, y, z, lz;
    
    if (p < 0.25) {
      const t = p / 0.25;
      x = 10; y = 4 + t; z = 8 - t * 15; lz = -t * 10;
    } else if (p < 0.5) {
      const t = (p - 0.25) / 0.25;
      x = 10 - t * 2; y = 5 + t; z = -7 - t * 20; lz = -10 - t * 15;
    } else if (p < 0.75) {
      const t = (p - 0.5) / 0.25;
      x = 8 + Math.sin(t * Math.PI) * 3; y = 6; z = -27 - t * 25; lz = -25 - t * 20;
    } else {
      const t = (p - 0.75) / 0.25;
      x = 8 - t * 6; y = 6 - t * 2; z = -52 - t * 18; lz = -70;
    }
    
    target.current.pos.set(x, y, z);
    target.current.look.set(0, 1.5, lz);
    camera.position.lerp(target.current.pos, 0.03);
    camera.lookAt(target.current.look);
  });
  return null;
};

// Scene
const Scene = ({ scrollProgress }) => {
  const busZ = 12 - scrollProgress * 82;
  const childAtStop = scrollProgress < 0.3;
  const childAtSchool = scrollProgress >= 0.9;
  const schoolHighlight = scrollProgress >= 0.85;

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[15, 25, 15]} intensity={1.2} castShadow />
      <hemisphereLight args={["#87CEEB", "#3d6b1e", 0.3]} />
      
      <color attach="background" args={["#87CEEB"]} />
      <fog attach="fog" args={["#87CEEB", 40, 120]} />
      
      <mesh position={[40, 50, -60]}>
        <sphereGeometry args={[5, 32, 32]} />
        <meshBasicMaterial color="#FFF9C4" />
      </mesh>
      
      <Cloud position={[-20, 18, -15]} />
      <Cloud position={[25, 20, -35]} />
      <Cloud position={[-15, 16, -55]} />
      <Cloud position={[20, 18, -75]} />
      
      <Ground />
      <Road length={140} />
      
      <BusStop position={[5, 0, 2]} />
      <House position={[-10, 0, 8]} color="#FFE4B5" />
      <House position={[-14, 0, -3]} color="#E0E0E0" />
      <House position={[14, 0, 5]} color="#DEB887" />
      
      {Array.from({ length: 18 }).map((_, i) => (
        <group key={i}>
          <Tree position={[-7 - Math.random() * 3, 0, -i * 8 - 5]} scale={0.7 + Math.random() * 0.5} />
          <Tree position={[7 + Math.random() * 3, 0, -i * 8 - 8]} scale={0.7 + Math.random() * 0.5} />
        </group>
      ))}
      
      <House position={[-12, 0, -20]} color="#FFDAB9" />
      <House position={[12, 0, -30]} color="#E8B4B8" />
      <House position={[-14, 0, -45]} color="#B8D4E8" />
      
      <School position={[0, 0, -75]} highlight={schoolHighlight} />
      
      <Child position={[3.5, 0, 2]} visible={childAtStop} />
      <Child position={[2, 0, -68]} visible={childAtSchool} />
      
      <SchoolBus position={[0, 0, busZ]} />
      
      <CameraController scrollProgress={scrollProgress} />
    </>
  );
};

// Loading
const Loader = () => (
  <Html center>
    <div className="text-center">
      <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-3" />
      <p className="text-white text-sm">Loading 3D Experience...</p>
    </div>
  </Html>
);

// Overlay
const StoryOverlay = ({ scrollProgress }) => {
  const [stage, setStage] = useState(0);
  
  useEffect(() => {
    for (let i = STAGES.length - 1; i >= 0; i--) {
      if (scrollProgress >= STAGES[i].progress) { setStage(i); break; }
    }
  }, [scrollProgress]);

  const s = STAGES[stage];
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 px-4">
      <div className="text-center max-w-4xl">
        <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4" 
            style={{ textShadow: "0 4px 30px rgba(0,0,0,0.7)" }}>
          {s.text}
        </h2>
        <p className="text-lg sm:text-xl md:text-2xl text-white/90" 
           style={{ textShadow: "0 2px 15px rgba(0,0,0,0.7)" }}>
          {s.subtitle}
        </p>
      </div>
    </div>
  );
};

// Progress dots
const ProgressDots = ({ scrollProgress }) => (
  <div className="fixed right-4 sm:right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
    {STAGES.map((s, i) => (
      <div key={i} className={`w-3 h-3 rounded-full transition-all duration-300 ${
        scrollProgress >= s.progress ? "bg-[#3B9FD8] scale-125 shadow-lg shadow-blue-500/50" : "bg-white/40"
      }`} />
    ))}
  </div>
);

// Main Export
const Journey3DExperience = ({ onSkip }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [supported, setSupported] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    try {
      const c = document.createElement("canvas");
      setSupported(!!(c.getContext("webgl") || c.getContext("experimental-webgl")));
    } catch { setSupported(false); }
    
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (!containerRef.current) return;
      const top = window.scrollY;
      const height = containerRef.current.offsetHeight - window.innerHeight;
      setScrollProgress(Math.min(Math.max(top / height, 0), 1));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!supported || reducedMotion) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#87CEEB] to-[#3B9FD8] flex items-center justify-center px-6">
        <div className="text-center max-w-3xl">
          <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6" style={{ textShadow: "0 4px 20px rgba(0,0,0,0.3)" }}>
            From Bus Stops to Classrooms — Stay Informed
          </h1>
          <p className="text-xl text-white/90 mb-8">Complete visibility of your child's school journey</p>
          <button onClick={onSkip} className="bg-white text-[#3B9FD8] px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/90 transition">
            Explore Features
          </button>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative" style={{ height: "500vh" }} data-testid="journey-3d">
      <div className="fixed inset-0">
        <Canvas shadows camera={{ position: [10, 4, 8], fov: 55 }} gl={{ antialias: true }}>
          <Suspense fallback={<Loader />}>
            <Scene scrollProgress={scrollProgress} />
          </Suspense>
        </Canvas>
      </div>

      <StoryOverlay scrollProgress={scrollProgress} />
      <ProgressDots scrollProgress={scrollProgress} />

      <button onClick={onSkip} className="fixed bottom-6 right-6 z-50 bg-black/30 hover:bg-black/50 backdrop-blur text-white px-5 py-2.5 rounded-full text-sm font-medium border border-white/20 transition" data-testid="skip-btn">
        Skip →
      </button>

      {scrollProgress < 0.08 && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 text-center animate-bounce">
          <p className="text-white/80 text-sm mb-2">Scroll to explore</p>
          <svg className="w-6 h-6 text-white mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      )}
    </div>
  );
};

export default Journey3DExperience;
