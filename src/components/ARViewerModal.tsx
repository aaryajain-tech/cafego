import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { 
  X, 
  Camera, 
  RotateCw, 
  Sparkles, 
  ShieldCheck, 
  Download, 
  RefreshCw, 
  AlertCircle,
  Eye,
  Sliders,
  Check,
  Flame
} from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface ARViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialItemName?: string;
}

export const ARViewerModal: React.FC<ARViewerModalProps> = ({
  isOpen,
  onClose,
  initialItemName = 'Kimchi Gouda Croissant',
}) => {
  if (!isOpen) return null;

  const [selectedDish, setSelectedDish] = useState<string>(initialItemName);
  const [cameraActive, setCameraActive] = useState<boolean>(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [scale, setScale] = useState<number>(1);
  const [isPlaced, setIsPlaced] = useState<boolean>(true);
  const [snapshotTaken, setSnapshotTaken] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const dishMeshGroupRef = useRef<THREE.Group | null>(null);
  const animationFrameId = useRef<number | null>(null);

  // Dish details
  const dishes = [
    {
      id: 'croissant',
      name: 'Kimchi Gouda Croissant',
      friendReview: 'Sarah: “Warm flaky layers, spicy kimchi crunch, Dutch gouda melt. 10/10!”',
      price: '$7.80',
      cafe: 'Mellow Hearth Roasters',
    },
    {
      id: 'coffee',
      name: 'Cardamom Espresso Tonic',
      friendReview: 'Rohan: “Citrus oil, green cardamom, crisp bubbly tonic. Unreal refreshment.”',
      price: '$6.50',
      cafe: 'Mellow Hearth Roasters',
    },
    {
      id: 'tiramisu',
      name: 'Masala Chai Tiramisu',
      friendReview: 'Chloe: “Assam spiced black tea ladyfingers & pistachio bark. Way better than coffee tiramisu.”',
      price: '$11.00',
      cafe: 'Velvet Dusk Rooftop',
    },
    {
      id: 'dosa',
      name: 'Truffle Masala Dosa Roll',
      friendReview: 'Marcus: “Crisp ghee podi crepe rolled with truffle oil & Monterey Jack!”',
      price: '$9.50',
      cafe: 'The Dueling Dosa & Dice',
    },
  ];

  const currentDishData = dishes.find((d) => d.name === selectedDish) || dishes[0];

  // 1. Initialize Real Device Camera Stream
  useEffect(() => {
    let stream: MediaStream | null = null;

    const startCamera = async () => {
      try {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: { ideal: 'environment' } },
            audio: false,
          });
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.play();
            setCameraActive(true);
            setCameraError(null);
          }
        } else {
          setCameraError('Camera API not available. Showing tabletop AR simulation mode.');
        }
      } catch (err: any) {
        console.warn('Camera access denied or unavailable:', err);
        setCameraError('Camera permission not granted. Running in interactive AR tabletop simulation mode.');
        setCameraActive(false);
      }
    };

    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // 2. Initialize Three.js AR Overlay
  useEffect(() => {
    if (!canvasContainerRef.current) return;
    const container = canvasContainerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 1.8, 3.8);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Studio Lighting for AR Mesh
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffeedd, 1.8);
    dirLight.position.set(3, 6, 4);
    dirLight.castShadow = true;
    scene.add(dirLight);

    // Group for the 3D Dish Model
    const dishGroup = new THREE.Group();
    scene.add(dishGroup);
    dishMeshGroupRef.current = dishGroup;

    // Build 3D models based on selected dish
    const buildDishMesh = () => {
      while (dishGroup.children.length > 0) {
        dishGroup.remove(dishGroup.children[0]);
      }

      // Ceramic Serving Plate
      const plateGeo = new THREE.CylinderGeometry(1.2, 1.0, 0.08, 32);
      const plateMat = new THREE.MeshStandardMaterial({
        color: '#FAF6EE',
        roughness: 0.3,
        metalness: 0.05,
      });
      const plateMesh = new THREE.Mesh(plateGeo, plateMat);
      plateMesh.position.y = -0.4;
      plateMesh.receiveShadow = true;
      dishGroup.add(plateMesh);

      if (currentDishData.id === 'croissant') {
        // Flaky Kimchi Croissant Geometry
        const croissantGeo = new THREE.TorusGeometry(0.55, 0.28, 16, 32, Math.PI * 1.4);
        const croissantMat = new THREE.MeshStandardMaterial({
          color: '#D48C46',
          roughness: 0.7,
        });
        const croissantMesh = new THREE.Mesh(croissantGeo, croissantMat);
        croissantMesh.rotation.x = Math.PI / 2;
        croissantMesh.rotation.z = 0.5;
        croissantMesh.position.y = -0.15;
        dishGroup.add(croissantMesh);

        // Kimchi red flakes
        const flakeGeo = new THREE.DodecahedronGeometry(0.04);
        const flakeMat = new THREE.MeshStandardMaterial({ color: '#C93B2B', roughness: 0.5 });
        for (let i = 0; i < 12; i++) {
          const flake = new THREE.Mesh(flakeGeo, flakeMat);
          flake.position.set((Math.random() - 0.5) * 0.6, -0.05, (Math.random() - 0.5) * 0.6);
          dishGroup.add(flake);
        }
      } else if (currentDishData.id === 'coffee') {
        // Clear Glass Cup with layered tonic & espresso
        const glassGeo = new THREE.CylinderGeometry(0.42, 0.38, 1.0, 24);
        const glassMat = new THREE.MeshStandardMaterial({
          color: '#E8F5E9',
          roughness: 0.1,
          transparent: true,
          opacity: 0.6,
        });
        const glassMesh = new THREE.Mesh(glassGeo, glassMat);
        glassMesh.position.y = 0.15;
        dishGroup.add(glassMesh);

        // Espresso layer
        const espressoGeo = new THREE.CylinderGeometry(0.38, 0.36, 0.45, 24);
        const espressoMat = new THREE.MeshStandardMaterial({ color: '#3A2618', roughness: 0.4 });
        const espressoMesh = new THREE.Mesh(espressoGeo, espressoMat);
        espressoMesh.position.y = 0.38;
        dishGroup.add(espressoMesh);

        // Tonic layer
        const tonicGeo = new THREE.CylinderGeometry(0.36, 0.34, 0.45, 24);
        const tonicMat = new THREE.MeshStandardMaterial({ color: '#E0F2FE', roughness: 0.2, transparent: true, opacity: 0.8 });
        const tonicMesh = new THREE.Mesh(tonicGeo, tonicMat);
        tonicMesh.position.y = -0.08;
        dishGroup.add(tonicMesh);

        // Orange Slice on rim
        const orangeGeo = new THREE.CylinderGeometry(0.25, 0.25, 0.04, 16);
        const orangeMat = new THREE.MeshStandardMaterial({ color: '#F97316', roughness: 0.5 });
        const orangeMesh = new THREE.Mesh(orangeGeo, orangeMat);
        orangeMesh.position.set(0.4, 0.65, 0);
        orangeMesh.rotation.z = 0.6;
        dishGroup.add(orangeMesh);
      } else if (currentDishData.id === 'tiramisu') {
        // Chai Tiramisu Slice
        const tiramisuGeo = new THREE.BoxGeometry(0.9, 0.6, 0.9);
        const tiramisuMat = new THREE.MeshStandardMaterial({ color: '#F7E7CE', roughness: 0.6 });
        const tiramisuMesh = new THREE.Mesh(tiramisuGeo, tiramisuMat);
        tiramisuMesh.position.y = -0.05;
        dishGroup.add(tiramisuMesh);

        // Cocoa/Cinnamon Dusting layer
        const dustGeo = new THREE.BoxGeometry(0.92, 0.04, 0.92);
        const dustMat = new THREE.MeshStandardMaterial({ color: '#633B20', roughness: 0.9 });
        const dustMesh = new THREE.Mesh(dustGeo, dustMat);
        dustMesh.position.y = 0.28;
        dishGroup.add(dustMesh);
      } else {
        // Truffle Dosa Quesadilla Roll
        const dosaGeo = new THREE.CylinderGeometry(0.24, 0.24, 1.2, 20);
        const dosaMat = new THREE.MeshStandardMaterial({ color: '#DCA258', roughness: 0.6 });
        const dosaMesh = new THREE.Mesh(dosaGeo, dosaMat);
        dosaMesh.rotation.z = Math.PI / 2;
        dosaMesh.position.y = -0.12;
        dishGroup.add(dosaMesh);
      }

      // Floating AR Holographic Ring
      const ringGeo = new THREE.RingGeometry(1.3, 1.38, 32);
      const ringMat = new THREE.MeshBasicMaterial({ color: '#E07A5F', side: THREE.DoubleSide });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = -Math.PI / 2;
      ringMesh.position.y = -0.42;
      dishGroup.add(ringMesh);
    };

    buildDishMesh();

    // Orbit/drag rotation interaction on 3D AR Model
    let isDragging = false;
    let prevX = 0;
    let prevY = 0;

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      prevX = e.clientX;
      prevY = e.clientY;
    };
    const onPointerMove = (e: PointerEvent) => {
      if (isDragging && dishGroup) {
        const dx = e.clientX - prevX;
        const dy = e.clientY - prevY;
        dishGroup.rotation.y += dx * 0.01;
        dishGroup.rotation.x += dy * 0.01;
        prevX = e.clientX;
        prevY = e.clientY;
      }
    };
    const onPointerUp = () => {
      isDragging = false;
    };

    container.addEventListener('pointerdown', onPointerDown);
    container.addEventListener('pointermove', onPointerMove);
    container.addEventListener('pointerup', onPointerUp);

    // Animation loop
    const animate = () => {
      animationFrameId.current = requestAnimationFrame(animate);
      if (!isDragging && dishGroup) {
        dishGroup.rotation.y += 0.005; // Gentle automatic AR turntable spin
      }
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
      container.removeEventListener('pointerdown', onPointerDown);
      container.removeEventListener('pointermove', onPointerMove);
      container.removeEventListener('pointerup', onPointerUp);
      if (rendererRef.current && rendererRef.current.domElement) {
        container.removeChild(rendererRef.current.domElement);
      }
      scene.clear();
    };
  }, [selectedDish]);

  // Handle Scale Update
  useEffect(() => {
    if (dishMeshGroupRef.current) {
      dishMeshGroupRef.current.scale.set(scale, scale, scale);
    }
  }, [scale]);

  const handleCaptureSnapshot = () => {
    soundEngine.playPop();
    setSnapshotTaken(true);
    setTimeout(() => setSnapshotTaken(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl h-[92vh] rounded-3xl overflow-hidden bg-[#1E1915] border-2 border-white/20 shadow-2xl flex flex-col">
        
        {/* AR Viewport Top Header */}
        <div className="p-4 bg-black/60 backdrop-blur-md border-b border-white/10 flex items-center justify-between text-white z-20">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#E07A5F] flex items-center justify-center text-white shadow-sm">
              <Camera className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base tracking-tight font-['Outfit']">
                  AR Spatial Dining & Dish Inspector
                </h3>
                <span className="text-[10px] font-bold bg-[#819B72] text-white px-2 py-0.5 rounded-full uppercase">
                  {cameraActive ? 'Live Camera Feed' : 'AR Tabletop Sim'}
                </span>
              </div>
              <p className="text-xs text-white/70">
                Place and inspect 3D fusion dishes and friend reviews in augmented reality.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Real Camera Video Feed Layer (Behind WebGL) */}
        <div className="relative flex-1 overflow-hidden">
          <video
            ref={videoRef}
            playsInline
            muted
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
              cameraActive ? 'opacity-100' : 'opacity-0'
            }`}
          />

          {/* Fallback Simulation Background if Camera is Denied */}
          {!cameraActive && (
            <div 
              className="absolute inset-0 w-full h-full"
              style={{
                backgroundColor: '#2A221C',
                backgroundImage: `
                  radial-gradient(circle at 50% 50%, #3D3027 0%, #1A1410 100%),
                  linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)
                `,
                backgroundSize: '100% 100%, 30px 30px, 30px 30px',
              }}
            >
              <div className="absolute inset-x-0 bottom-12 text-center text-white/50 text-xs pointer-events-none">
                Interactive 3D AR Tabletop Grid · Drag to rotate in 360°
              </div>
            </div>
          )}

          {/* Three.js 3D WebGL Canvas Layer (Transparent over video) */}
          <div ref={canvasContainerRef} className="absolute inset-0 w-full h-full z-10" />

          {/* Floating Spatial Hologram Review Card above 3D Dish */}
          <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 max-w-sm w-[90%] bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-2xl border border-white/80 animate-fadeIn pointer-events-none">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-extrabold text-[#2C221B]">{currentDishData.name}</span>
              <span className="text-[#E07A5F] font-bold">{currentDishData.price}</span>
            </div>
            <p className="text-xs text-[#5C4839] italic font-medium leading-relaxed">
              {currentDishData.friendReview}
            </p>
            <div className="mt-1 pt-1 border-t border-[#F0E6D8] flex items-center justify-between text-[10px] text-[#8A7565]">
              <span>📍 {currentDishData.cafe}</span>
              <span className="text-[#3E6532] font-bold">✓ Verified by Friend Squad</span>
            </div>
          </div>

          {/* Snapshot feedback flash toast */}
          {snapshotTaken && (
            <div className="absolute inset-0 z-30 bg-white/40 flex items-center justify-center animate-fadeOut pointer-events-none">
              <div className="bg-[#2C221B] text-white px-5 py-2.5 rounded-2xl text-xs font-bold shadow-xl flex items-center gap-2">
                <Check className="w-4 h-4 text-[#819B72]" />
                <span>AR Snapshot Saved to Squad Album!</span>
              </div>
            </div>
          )}
        </div>

        {/* AR Controls & Dish Switcher Toolbar */}
        <div className="p-4 bg-[#231B15] border-t border-white/10 z-20 space-y-3">
          
          {/* Dish Switcher Buttons */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-[11px] font-bold text-white/60 uppercase tracking-wider whitespace-nowrap">
              Select 3D Dish:
            </span>
            {dishes.map((d) => (
              <button
                key={d.id}
                onClick={() => {
                  setSelectedDish(d.name);
                  soundEngine.playPop();
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  selectedDish === d.name
                    ? 'bg-[#E07A5F] text-white shadow-md'
                    : 'bg-white/10 text-white/80 hover:bg-white/20'
                }`}
              >
                {d.name}
              </button>
            ))}
          </div>

          {/* Bottom Actions: Scale slider & Snapshot */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
            <div className="flex items-center gap-3 text-xs text-white/80">
              <span>AR Scale:</span>
              <input
                type="range"
                min="0.6"
                max="1.6"
                step="0.05"
                value={scale}
                onChange={(e) => setScale(parseFloat(e.target.value))}
                className="w-28 accent-[#E07A5F] cursor-pointer"
              />
              <span className="font-mono text-white/60">{Math.round(scale * 100)}%</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCaptureSnapshot}
                className="clay-btn-primary px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                <Camera className="w-4 h-4" />
                <span>Snap AR Photo</span>
              </button>

              <button
                onClick={onClose}
                className="clay-btn-secondary px-4 py-2 rounded-xl text-xs font-bold cursor-pointer"
              >
                Return to 3D Cafe
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
