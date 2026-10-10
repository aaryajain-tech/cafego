import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { 
  Camera, 
  RotateCcw, 
  Eye, 
  UserCheck, 
  Sparkles, 
  Move, 
  Compass, 
  Volume2, 
  VolumeX, 
  ArrowRight,
  Coffee,
  CheckCircle2,
  ChevronRight,
  Layers,
  MapPin,
  Utensils,
  Maximize2
} from 'lucide-react';
import { CAFE_PATRONS } from '../data/mockData';
import { CafePatron, UserProfile } from '../types';
import { soundEngine } from '../utils/audio';

interface ThreeCafeSceneProps {
  user: UserProfile;
  onUpdateUser: (updated: Partial<UserProfile>) => void;
  onSelectPatron?: (patron: CafePatron) => void;
  onLaunchAR?: () => void;
  onOpenDiscovery?: () => void;
}

export const ThreeCafeScene: React.FC<ThreeCafeSceneProps> = ({
  user,
  onUpdateUser,
  onSelectPatron,
  onLaunchAR,
  onOpenDiscovery,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [cameraMode, setCameraMode] = useState<'isometric' | 'follow' | 'counter' | 'lounge'>('isometric');
  const [activePatron, setActivePatron] = useState<CafePatron | null>(null);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [characterColor, setCharacterColor] = useState('#E07A5F');

  // Story / Welcome Modal inside 3D
  const [showStoryModal, setShowStoryModal] = useState<boolean>(!user.name);
  const [storyStep, setStoryStep] = useState<number>(user.name ? 5 : 1);
  const [inputName, setInputName] = useState(user.name || '');
  const [inputPassword, setInputPassword] = useState('');
  const [coffeeSlid, setCoffeeSlid] = useState(false);

  // References for Three.js objects
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const characterGroupRef = useRef<THREE.Group | null>(null);
  const trishiGroupRef = useRef<THREE.Group | null>(null);
  const slidingCupRef = useRef<THREE.Group | null>(null);
  const steamParticlesRef = useRef<THREE.Points | null>(null);
  const animationFrameId = useRef<number | null>(null);

  // Target movement state
  const targetPosRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 3));
  const currentPosRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 3));
  const isWalkingRef = useRef<boolean>(false);
  const walkCycleRef = useRef<number>(0);

  // Orbit angles & dragging
  const isDraggingRef = useRef<boolean>(false);
  const previousMousePositionRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const orbitAnglesRef = useRef<{ theta: number; phi: number }>({ theta: 0.15, phi: 0.95 });
  const orbitDistanceRef = useRef<number>(25);

  // Trigger sound helper
  const playSound = useCallback((type: 'pop' | 'slide' | 'chime' | 'step') => {
    if (isAudioMuted) return;
    if (type === 'pop') soundEngine.playPop();
    if (type === 'slide') soundEngine.playSlide();
    if (type === 'chime') soundEngine.playChime();
    if (type === 'step') soundEngine.playFootstep();
  }, [isAudioMuted]);

  // Handle Character movement to a 3D floor coordinate
  const moveCharacterTo = (x: number, z: number) => {
    const clampedX = Math.max(-11, Math.min(11, x));
    const clampedZ = Math.max(-7, Math.min(11, z));
    targetPosRef.current.set(clampedX, 0, clampedZ);
    isWalkingRef.current = true;
    playSound('step');
  };

  // Check proximity to patrons
  const checkProximity = useCallback((charPos: THREE.Vector3) => {
    const patronCoords: Record<string, THREE.Vector3> = {
      'patron-trishi': new THREE.Vector3(0, 0, -4.0),
      'patron-sarah': new THREE.Vector3(-6.5, 0, 2.5),
      'patron-marcus': new THREE.Vector3(7, 0, 5),
      'patron-elena': new THREE.Vector3(-6.5, 0, -2),
      'patron-rohan': new THREE.Vector3(6.5, 0, -1.5),
    };

    const foundPatron = CAFE_PATRONS.find((p) => {
      const coord = patronCoords[p.id];
      return coord ? charPos.distanceTo(coord) < 3.8 : false;
    });

    if (foundPatron) {
      if (foundPatron.id !== activePatron?.id) {
        setActivePatron(foundPatron);
        playSound('chime');
        if (onSelectPatron) onSelectPatron(foundPatron);
      }
    } else {
      if (activePatron) {
        setActivePatron(null);
      }
    }
  }, [activePatron, playSound, onSelectPatron]);

  // -------------------------------------------------------------
  // INITIALIZE THREE.JS 3D SCENE MATCHING REFERENCE IMAGES
  // -------------------------------------------------------------
  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene with soft warm minimalist ambient fog
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#F7F3EB'); // warm oatmeal plaster tone
    scene.fog = new THREE.FogExp2('#F7F3EB', 0.012);
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 120);
    camera.position.set(0, 20, 26);
    camera.lookAt(0, 1, 0);
    cameraRef.current = camera;

    // 3. Renderer with soft shadows & antialiasing
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. ARCHITECTURAL LIGHTING SYSTEM (from reference images)
    // Warm ambient glow
    const ambientLight = new THREE.AmbientLight('#FFFBF5', 1.4);
    scene.add(ambientLight);

    // Warm Sun Directional Light
    const sunLight = new THREE.DirectionalLight('#FFF5E6', 1.6);
    sunLight.position.set(14, 24, 16);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 60;
    sunLight.shadow.camera.left = -18;
    sunLight.shadow.camera.right = 18;
    sunLight.shadow.camera.top = 18;
    sunLight.shadow.camera.bottom = -18;
    sunLight.shadow.bias = -0.0004;
    scene.add(sunLight);

    // Warm Bar Underglow strip light
    const barGlowLight = new THREE.PointLight('#FFE0B2', 2.2, 10);
    barGlowLight.position.set(0, 1.2, -4.2);
    scene.add(barGlowLight);

    // Wavy wall warm LED ribbon light
    const wavyWallLight = new THREE.PointLight('#FFECB3', 1.8, 14);
    wavyWallLight.position.set(-8.5, 4.5, 2);
    scene.add(wavyWallLight);

    // Rattan pendant warm glow
    const pendantLight = new THREE.PointLight('#FFA726', 1.5, 12);
    pendantLight.position.set(-6, 6, 2.5);
    scene.add(pendantLight);

    // -------------------------------------------------------------
    // MATERIALS PALETTE FROM REFERENCE IMAGES
    // -------------------------------------------------------------
    // Soft Sage Green (mio / modern sage minimalist tone)
    const sageFlutedMat = new THREE.MeshStandardMaterial({
      color: '#9BB196',
      roughness: 0.5,
      metalness: 0.05,
    });
    // Darker Sage Velvet for Curved Booths
    const sageVelvetMat = new THREE.MeshStandardMaterial({
      color: '#7A9175',
      roughness: 0.6,
      metalness: 0.02,
    });
    // Polished White Terrazzo / Marble for Bar Tops & Tables
    const marbleTopMat = new THREE.MeshStandardMaterial({
      color: '#FAF8F5',
      roughness: 0.25,
      metalness: 0.1,
    });
    // Warm Light Oak Wood (Flooring & Planters)
    const oakWoodMat = new THREE.MeshStandardMaterial({
      color: '#E8DEC8',
      roughness: 0.6,
      metalness: 0.05,
    });
    // Warm Cream Plaster Walls
    const creamPlasterMat = new THREE.MeshStandardMaterial({
      color: '#F5EFE6',
      roughness: 0.85,
    });
    // Terracotta & Warm Ceramic
    const terracottaMat = new THREE.MeshStandardMaterial({
      color: '#D47D5F',
      roughness: 0.5,
    });
    // Warm Woven Rattan / Wicker
    const rattanMat = new THREE.MeshStandardMaterial({
      color: '#D6A870',
      roughness: 0.8,
    });
    // Dark Charcoal Metal (Stems, lettering)
    const darkMetalMat = new THREE.MeshStandardMaterial({
      color: '#2A2421',
      roughness: 0.4,
      metalness: 0.6,
    });
    // Glass for Showcase
    const glassMat = new THREE.MeshStandardMaterial({
      color: '#F0F8FA',
      roughness: 0.1,
      metalness: 0.15,
      transparent: true,
      opacity: 0.55,
    });
    // Golden LED strip glow material
    const ledStripMat = new THREE.MeshBasicMaterial({
      color: '#FFF2C6',
    });

    // -------------------------------------------------------------
    // 1. MAIN CAFE FLOORING (Terrazzo & Light Oak)
    // -------------------------------------------------------------
    const floorGroup = new THREE.Group();
    const mainFloorGeo = new THREE.BoxGeometry(28, 0.4, 24);
    const mainFloorMesh = new THREE.Mesh(mainFloorGeo, oakWoodMat);
    mainFloorMesh.position.set(0, -0.2, 1);
    mainFloorMesh.receiveShadow = true;
    mainFloorMesh.name = 'floor';
    floorGroup.add(mainFloorMesh);

    // Front Promenade Runner (Light Terrazzo Walkway from door to counter)
    const walkwayGeo = new THREE.BoxGeometry(7, 0.41, 18);
    const walkwayMesh = new THREE.Mesh(walkwayGeo, marbleTopMat);
    walkwayMesh.position.set(0, -0.19, 3);
    walkwayMesh.receiveShadow = true;
    floorGroup.add(walkwayMesh);
    scene.add(floorGroup);

    // -------------------------------------------------------------
    // 2. REAR WALL WITH ARCHES & ILLUMINATED "CafeGo" SIGN (Ref Image 1 & 3)
    // -------------------------------------------------------------
    const backWallGeo = new THREE.BoxGeometry(28, 9, 0.8);
    const backWallMesh = new THREE.Mesh(backWallGeo, creamPlasterMat);
    backWallMesh.position.set(0, 4.5, -9);
    backWallMesh.receiveShadow = true;
    scene.add(backWallMesh);

    // Recessed Illuminated Arch Niche behind bar
    const archBackGeo = new THREE.CylinderGeometry(3.6, 3.6, 0.5, 32, 1, false, 0, Math.PI);
    const archBackMat = new THREE.MeshStandardMaterial({ color: '#A3B89D', roughness: 0.6 });
    const archBackMesh = new THREE.Mesh(archBackGeo, archBackMat);
    archBackMesh.rotation.z = -Math.PI / 2;
    archBackMesh.position.set(0, 6, -8.6);
    scene.add(archBackMesh);

    // Glowing 3D "CafeGo" Brand Sign on Wall
    const signPlateGeo = new THREE.BoxGeometry(5.2, 1.2, 0.15);
    const signPlateMat = new THREE.MeshStandardMaterial({
      color: '#FAF6EE',
      emissive: '#FFF3DB',
      emissiveIntensity: 0.6,
      roughness: 0.3,
    });
    const signPlateMesh = new THREE.Mesh(signPlateGeo, signPlateMat);
    signPlateMesh.position.set(0, 6.2, -8.3);
    scene.add(signPlateMesh);

    // Circular Display Alcove on Left Rear Wall (Ref Image 3)
    const circleNicheGeo = new THREE.CylinderGeometry(1.6, 1.6, 0.4, 32);
    const nicheMat = new THREE.MeshStandardMaterial({ color: '#E48C6B', roughness: 0.5 }); // warm terracotta niche
    const circleNiche = new THREE.Mesh(circleNicheGeo, nicheMat);
    circleNiche.rotation.x = Math.PI / 2;
    circleNiche.position.set(-8, 5.2, -8.6);
    scene.add(circleNiche);

    // Ceramic Vases on Niche Shelf
    const vaseGeo = new THREE.CylinderGeometry(0.25, 0.35, 0.9, 16);
    const vaseMat = new THREE.MeshStandardMaterial({ color: '#F7F2E8', roughness: 0.3 });
    const vase1 = new THREE.Mesh(vaseGeo, vaseMat);
    vase1.position.set(-8, 4.8, -8.3);
    scene.add(vase1);

    // -------------------------------------------------------------
    // 3. BARISTA COUNTER WITH SAGE FLUTED PANELS & GLASS PASTRY DISPLAY (Ref Image 1 & 3)
    // -------------------------------------------------------------
    const counterGroup = new THREE.Group();
    counterGroup.position.set(0, 0, -5.2);

    // Curved Counter Body
    const counterBaseGeo = new THREE.BoxGeometry(13, 2.1, 2.8);
    const counterBaseMesh = new THREE.Mesh(counterBaseGeo, sageFlutedMat);
    counterBaseMesh.position.set(0, 1.05, 0);
    counterBaseMesh.castShadow = true;
    counterBaseMesh.receiveShadow = true;
    counterGroup.add(counterBaseMesh);

    // Vertical Fluted Slat Accents along front
    const slatGeo = new THREE.BoxGeometry(0.12, 1.8, 0.1);
    for (let i = -6; i <= 6; i += 0.4) {
      const slatMesh = new THREE.Mesh(slatGeo, sageFlutedMat);
      slatMesh.position.set(i, 1.05, 1.45);
      slatMesh.castShadow = true;
      counterGroup.add(slatMesh);
    }

    // Warm LED Under-glow Strip Ribbon
    const ledBarGeo = new THREE.BoxGeometry(13.2, 0.08, 0.1);
    const ledBarMesh = new THREE.Mesh(ledBarGeo, ledStripMat);
    ledBarMesh.position.set(0, 0.1, 1.46);
    counterGroup.add(ledBarMesh);

    // Polished White Marble Countertop
    const counterTopGeo = new THREE.BoxGeometry(13.6, 0.22, 3.2);
    const counterTopMesh = new THREE.Mesh(counterTopGeo, marbleTopMat);
    counterTopMesh.position.set(0, 2.2, 0);
    counterTopMesh.castShadow = true;
    counterTopMesh.receiveShadow = true;
    counterGroup.add(counterTopMesh);

    // GLASS PASTRY & DESSERT DISPLAY CASE (Ref Image 1 & 3)
    const pastryCaseGeo = new THREE.BoxGeometry(4.2, 1.5, 1.8);
    const pastryCaseMesh = new THREE.Mesh(pastryCaseGeo, glassMat);
    pastryCaseMesh.position.set(3.8, 3.0, 0);
    counterGroup.add(pastryCaseMesh);

    // Golden Waffles & Cakes inside showcase
    const cakeGeo = new THREE.CylinderGeometry(0.4, 0.4, 0.3, 16);
    const cakeMat = new THREE.MeshStandardMaterial({ color: '#E8C59A', roughness: 0.5 });
    const berryCakeMat = new THREE.MeshStandardMaterial({ color: '#C85A5A', roughness: 0.4 });

    const cake1 = new THREE.Mesh(cakeGeo, cakeMat);
    cake1.position.set(2.8, 2.45, 0);
    counterGroup.add(cake1);

    const cake2 = new THREE.Mesh(cakeGeo, berryCakeMat);
    cake2.position.set(4.2, 2.45, 0);
    counterGroup.add(cake2);

    // Espresso Machine (Minimalist Cream & Brass)
    const machineBodyGeo = new THREE.BoxGeometry(2.4, 1.4, 1.4);
    const machineMat = new THREE.MeshStandardMaterial({ color: '#F7F3EB', roughness: 0.3, metalness: 0.2 });
    const machineMesh = new THREE.Mesh(machineBodyGeo, machineMat);
    machineMesh.position.set(-3.5, 3.0, 0);
    machineMesh.castShadow = true;
    counterGroup.add(machineMesh);

    // SLIDING CERAMIC COFFEE CUP (for interactive greeting)
    const cupGroup = new THREE.Group();
    cupGroup.position.set(0, 2.42, -0.4);

    const cupBodyGeo = new THREE.CylinderGeometry(0.3, 0.24, 0.48, 20);
    const cupBodyMesh = new THREE.Mesh(cupBodyGeo, terracottaMat);
    cupBodyMesh.castShadow = true;
    cupGroup.add(cupBodyMesh);

    const liquidGeo = new THREE.CircleGeometry(0.26, 20);
    const liquidMat = new THREE.MeshStandardMaterial({ color: '#2B1C14', roughness: 0.3 });
    const liquidMesh = new THREE.Mesh(liquidGeo, liquidMat);
    liquidMesh.rotation.x = -Math.PI / 2;
    liquidMesh.position.set(0, 0.22, 0);
    cupGroup.add(liquidMesh);

    const saucerGeo = new THREE.CylinderGeometry(0.48, 0.45, 0.06, 20);
    const saucerMesh = new THREE.Mesh(saucerGeo, marbleTopMat);
    saucerMesh.position.set(0, -0.22, 0);
    saucerMesh.castShadow = true;
    cupGroup.add(saucerMesh);

    counterGroup.add(cupGroup);
    slidingCupRef.current = cupGroup;

    scene.add(counterGroup);

    // Rising steam above coffee
    const particleCount = 28;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 0.2;
      particlePositions[i * 3 + 1] = Math.random() * 0.8;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 0.2;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: '#FFFFFF',
      size: 0.12,
      transparent: true,
      opacity: 0.5,
    });
    const steamPoints = new THREE.Points(particleGeo, particleMat);
    steamPoints.position.set(0, 2.9, -5.6);
    scene.add(steamPoints);
    steamParticlesRef.current = steamPoints;

    // -------------------------------------------------------------
    // 4. SIGNATURE WAVY WALL WITH QUOTE & SNAKE PLANTS (Ref Image 2)
    // -------------------------------------------------------------
    const wavyWallGroup = new THREE.Group();
    wavyWallGroup.position.set(-11, 0, 1.5);

    // Left Partition Wall
    const leftWallGeo = new THREE.BoxGeometry(0.8, 8, 20);
    const leftWallMesh = new THREE.Mesh(leftWallGeo, creamPlasterMat);
    leftWallMesh.position.set(0, 4, 0);
    leftWallMesh.receiveShadow = true;
    wavyWallGroup.add(leftWallMesh);

    // Organic Wavy Acoustic Ribbon (Sculpted undulating curve along wall)
    const curvePoints: THREE.Vector3[] = [];
    for (let i = -9; i <= 9; i += 1.5) {
      const yWave = 5.2 + Math.sin(i * 0.6) * 0.7;
      curvePoints.push(new THREE.Vector3(0.5, yWave, i));
    }
    const waveCurve = new THREE.CatmullRomCurve3(curvePoints);
    const waveTubeGeo = new THREE.TubeGeometry(waveCurve, 40, 0.12, 12, false);
    const waveRibbonMesh = new THREE.Mesh(waveTubeGeo, ledStripMat);
    wavyWallGroup.add(waveRibbonMesh);

    // Built-in Oak Planter Box along wall (Ref Image 2)
    const planterBoxGeo = new THREE.BoxGeometry(1.2, 1.6, 17);
    const planterBoxMesh = new THREE.Mesh(planterBoxGeo, oakWoodMat);
    planterBoxMesh.position.set(0.8, 0.8, 0);
    planterBoxMesh.castShadow = true;
    wavyWallGroup.add(planterBoxMesh);

    // Snake Plants (Sansevieria) growing inside planter
    const plantLeafGeo = new THREE.BoxGeometry(0.12, 1.6, 0.35);
    const snakePlantMat = new THREE.MeshStandardMaterial({ color: '#4D6B4F', roughness: 0.6 });
    for (let z = -7.5; z <= 7.5; z += 1.2) {
      const leafCount = 3;
      for (let l = 0; l < leafCount; l++) {
        const leafMesh = new THREE.Mesh(plantLeafGeo, snakePlantMat);
        leafMesh.position.set(0.8 + (Math.random() - 0.5) * 0.3, 2.2 + Math.random() * 0.4, z + (Math.random() - 0.5) * 0.3);
        leafMesh.rotation.z = (Math.random() - 0.5) * 0.2;
        leafMesh.rotation.y = Math.random() * Math.PI;
        leafMesh.castShadow = true;
        wavyWallGroup.add(leafMesh);
      }
    }

    // Banquette Bench Seating along Wavy Wall (Mint / Sage cushioned)
    const banquetteSeatGeo = new THREE.BoxGeometry(1.8, 0.7, 17);
    const banquetteSeatMesh = new THREE.Mesh(banquetteSeatGeo, sageFlutedMat);
    banquetteSeatMesh.position.set(2.2, 0.75, 0);
    banquetteSeatMesh.castShadow = true;
    wavyWallGroup.add(banquetteSeatMesh);

    // Pillowy Backrest
    const backrestGeo = new THREE.BoxGeometry(0.5, 0.9, 17);
    const backrestMesh = new THREE.Mesh(backrestGeo, sageVelvetMat);
    backrestMesh.position.set(1.5, 1.45, 0);
    wavyWallGroup.add(backrestMesh);

    // Wall Quote 3D Plaque: "Maybe coffee is addicted to me?" (Ref Image 2)
    const quotePlateGeo = new THREE.BoxGeometry(0.08, 0.9, 8.5);
    const quotePlateMat = new THREE.MeshStandardMaterial({
      color: '#F4ECE1',
      roughness: 0.5,
    });
    const quotePlate = new THREE.Mesh(quotePlateGeo, quotePlateMat);
    quotePlate.position.set(0.48, 4.2, 0.5);
    wavyWallGroup.add(quotePlate);

    scene.add(wavyWallGroup);

    // -------------------------------------------------------------
    // 5. CURVED RIBBED SAGE BOOTHS & MARBLE BISTRO TABLES (Ref Image 3 & 4)
    // -------------------------------------------------------------
    // Booth 1 (Right Side Curved Velvet Booth)
    const boothGroup = new THREE.Group();
    boothGroup.position.set(7.5, 0, 1.5);

    // Curved Backrest (Half Cylinder Arc)
    const boothCurveGeo = new THREE.CylinderGeometry(3.2, 3.2, 1.4, 24, 1, true, 0, Math.PI * 1.05);
    const boothCurveMesh = new THREE.Mesh(boothCurveGeo, sageVelvetMat);
    boothCurveMesh.rotation.y = Math.PI * 0.8;
    boothCurveMesh.position.set(0, 1.3, 0);
    boothGroup.add(boothCurveMesh);

    // Round Marble Bistro Table in center of booth
    const boothTableTopGeo = new THREE.CylinderGeometry(1.6, 1.6, 0.12, 24);
    const boothTableTop = new THREE.Mesh(boothTableTopGeo, marbleTopMat);
    boothTableTop.position.set(0, 1.4, 0);
    boothTableTop.castShadow = true;
    boothTableTop.receiveShadow = true;
    boothGroup.add(boothTableTop);

    const tablePedestalGeo = new THREE.CylinderGeometry(0.14, 0.4, 1.4, 16);
    const brassMat = new THREE.MeshStandardMaterial({ color: '#D4AF37', roughness: 0.3, metalness: 0.7 });
    const tablePedestal = new THREE.Mesh(tablePedestalGeo, brassMat);
    tablePedestal.position.set(0, 0.7, 0);
    boothGroup.add(tablePedestal);

    scene.add(boothGroup);

    // Individual Round Cafe Tables along the Wavy Wall Bench
    const bistroTables: THREE.Group[] = [];
    [-4, 1.5, 6.5].forEach((posZ) => {
      const tableGroup = new THREE.Group();
      tableGroup.position.set(-6.5, 0, posZ);

      const tTopGeo = new THREE.CylinderGeometry(1.3, 1.3, 0.1, 24);
      const tTopMesh = new THREE.Mesh(tTopGeo, marbleTopMat);
      tTopMesh.position.y = 1.35;
      tTopMesh.castShadow = true;
      tableGroup.add(tTopMesh);

      const tLegGeo = new THREE.CylinderGeometry(0.1, 0.3, 1.35, 12);
      const tLegMesh = new THREE.Mesh(tLegGeo, darkMetalMat);
      tLegMesh.position.y = 0.67;
      tableGroup.add(tLegMesh);

      // Ceramic Cup on table
      const miniCupGeo = new THREE.CylinderGeometry(0.18, 0.14, 0.3, 16);
      const miniCupMesh = new THREE.Mesh(miniCupGeo, terracottaMat);
      miniCupMesh.position.set(0.3, 1.5, 0.2);
      tableGroup.add(miniCupMesh);

      scene.add(tableGroup);
      bistroTables.push(tableGroup);
    });

    // -------------------------------------------------------------
    // 6. WAFFLE GRID CEILING CANOPY & PENDANTS (Ref Image 2 & 3)
    // -------------------------------------------------------------
    const ceilingGroup = new THREE.Group();
    ceilingGroup.position.set(0, 8.5, 0);

    // Organic Waffle Grid (interlocking oak crossbeams)
    const beamGeoX = new THREE.BoxGeometry(22, 0.4, 0.2);
    const beamGeoZ = new THREE.BoxGeometry(0.2, 0.4, 18);
    for (let z = -7; z <= 7; z += 1.6) {
      const beamX = new THREE.Mesh(beamGeoX, oakWoodMat);
      beamX.position.set(0, 0, z);
      ceilingGroup.add(beamX);
    }
    for (let x = -9; x <= 9; x += 1.6) {
      const beamZ = new THREE.Mesh(beamGeoZ, oakWoodMat);
      beamZ.position.set(x, 0, 0);
      ceilingGroup.add(beamZ);
    }

    // Woven Rattan Basket Pendant Lamps (Ref Image 2)
    const rattanPendantGeo = new THREE.CylinderGeometry(0.7, 0.9, 1.1, 16);
    const pendant1 = new THREE.Mesh(rattanPendantGeo, rattanMat);
    pendant1.position.set(-6, -2.2, 2.5);
    ceilingGroup.add(pendant1);

    const cordGeo = new THREE.CylinderGeometry(0.03, 0.03, 2.2, 8);
    const cord1 = new THREE.Mesh(cordGeo, darkMetalMat);
    cord1.position.set(-6, -1.1, 2.5);
    ceilingGroup.add(cord1);

    scene.add(ceilingGroup);

    // -------------------------------------------------------------
    // 7. ENTRANCE POSTER EASEL: "CafeGo" (Ref Image 1)
    // -------------------------------------------------------------
    const easelGroup = new THREE.Group();
    easelGroup.position.set(-2.8, 0, 8.5);
    easelGroup.rotation.y = 0.25;

    const boardGeo = new THREE.BoxGeometry(1.4, 2.1, 0.08);
    const boardMat = new THREE.MeshStandardMaterial({ color: '#819B72', roughness: 0.6 }); // sage A-frame board
    const boardMesh = new THREE.Mesh(boardGeo, boardMat);
    boardMesh.position.y = 1.3;
    boardMesh.rotation.x = -0.15;
    boardMesh.castShadow = true;
    easelGroup.add(boardMesh);

    scene.add(easelGroup);

    // -------------------------------------------------------------
    // 8. 3D CHARACTERS (Barista Trishi & Seated Friends)
    // -------------------------------------------------------------
    const create3DCharacter = (color: string, faceEmoji: string, withHat = false) => {
      const group = new THREE.Group();

      // Torso / Clay Body
      const bodyGeo = new THREE.CylinderGeometry(0.48, 0.58, 1.2, 16);
      const charMat = new THREE.MeshStandardMaterial({ color, roughness: 0.45 });
      const bodyMesh = new THREE.Mesh(bodyGeo, charMat);
      bodyMesh.position.y = 0.9;
      bodyMesh.castShadow = true;
      group.add(bodyMesh);

      // Head
      const headGeo = new THREE.SphereGeometry(0.44, 20, 20);
      const skinMat = new THREE.MeshStandardMaterial({ color: '#FCE7D0', roughness: 0.5 });
      const headMesh = new THREE.Mesh(headGeo, skinMat);
      headMesh.position.y = 1.8;
      headMesh.castShadow = true;
      group.add(headMesh);

      // Hat / Barista Apron Headband
      if (withHat) {
        // Puffy White Baker/Barista Cap
        const hatGeo = new THREE.CylinderGeometry(0.55, 0.46, 0.45, 16);
        const hatMat = new THREE.MeshStandardMaterial({ color: '#FAF7F0', roughness: 0.4 });
        const hatMesh = new THREE.Mesh(hatGeo, hatMat);
        hatMesh.position.y = 2.25;
        hatMesh.castShadow = true;
        group.add(hatMesh);

        // White Apron on chest
        const apronGeo = new THREE.BoxGeometry(0.65, 0.8, 0.15);
        const apronMat = new THREE.MeshStandardMaterial({ color: '#FAF8F2', roughness: 0.5 });
        const apron = new THREE.Mesh(apronGeo, apronMat);
        apron.position.set(0, 1.0, 0.52);
        group.add(apron);

        // Welcoming Arms resting forward near counter
        const armGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.75, 12);
        const armMat = new THREE.MeshStandardMaterial({ color: '#E07A5F', roughness: 0.45 });
        const leftArm = new THREE.Mesh(armGeo, armMat);
        leftArm.position.set(-0.5, 1.1, 0.35);
        leftArm.rotation.set(-Math.PI / 4, 0, Math.PI / 8);
        group.add(leftArm);

        const rightArm = new THREE.Mesh(armGeo, armMat);
        rightArm.position.set(0.5, 1.1, 0.35);
        rightArm.rotation.set(-Math.PI / 4, 0, -Math.PI / 8);
        group.add(rightArm);
      }

      // Eyes
      const eyeGeo = new THREE.SphereGeometry(0.06, 8, 8);
      const eyeMat = new THREE.MeshBasicMaterial({ color: '#2B1E16' });
      const leftEye = new THREE.Mesh(eyeGeo, eyeMat);
      leftEye.position.set(-0.16, 1.84, 0.4);
      group.add(leftEye);
      const rightEye = new THREE.Mesh(eyeGeo, eyeMat);
      rightEye.position.set(0.16, 1.84, 0.4);
      group.add(rightEye);

      return group;
    };

    // Raised Barista Step Platform behind counter so Trishi stands tall and clearly visible
    const baristaStepGeo = new THREE.BoxGeometry(5.2, 0.65, 2.4);
    const baristaStepMesh = new THREE.Mesh(baristaStepGeo, oakWoodMat);
    baristaStepMesh.position.set(0, 0.32, -6.1);
    baristaStepMesh.receiveShadow = true;
    scene.add(baristaStepMesh);

    // Barista Trishi standing high & proud behind the Fluted Counter
    const trishi3D = create3DCharacter('#E07A5F', '👩🏽‍🍳', true);
    trishi3D.scale.set(1.22, 1.22, 1.22);
    trishi3D.position.set(0, 0.72, -5.8);
    trishi3D.name = 'patron-trishi';

    // Floating 3D "☕ Trishi" Name Beacon Badge above his head
    const trishiBeacon = new THREE.Group();
    trishiBeacon.position.set(0, 2.7, 0);

    const badgeGeo = new THREE.BoxGeometry(1.6, 0.48, 0.08);
    const badgeMat = new THREE.MeshStandardMaterial({
      color: '#FFFFFF',
      roughness: 0.2,
      emissive: '#FFF9ED',
      emissiveIntensity: 0.6,
    });
    const badgeMesh = new THREE.Mesh(badgeGeo, badgeMat);
    badgeMesh.castShadow = true;
    trishiBeacon.add(badgeMesh);

    // Tiny 3D coffee icon on beacon
    const beaconIconGeo = new THREE.CylinderGeometry(0.12, 0.08, 0.22, 12);
    const beaconIconMat = new THREE.MeshStandardMaterial({ color: '#E07A5F', roughness: 0.3 });
    const beaconIcon = new THREE.Mesh(beaconIconGeo, beaconIconMat);
    beaconIcon.position.set(-0.55, 0, 0.08);
    trishiBeacon.add(beaconIcon);

    trishi3D.add(trishiBeacon);

    scene.add(trishi3D);
    trishiGroupRef.current = trishi3D;

    // Seated Friend 1 (Sarah & Dev at Wavy Wall Booth)
    const sarah3D = create3DCharacter('#819B72', '👩🏻‍💻');
    sarah3D.position.set(-6.5, 0, 2.5);
    sarah3D.rotation.y = Math.PI * 0.4;
    scene.add(sarah3D);

    // Seated Friend 2 (Elena at Quiet Work Bench)
    const elena3D = create3DCharacter('#588157', '💻');
    elena3D.position.set(-6.5, 0, -2);
    elena3D.rotation.y = Math.PI * 0.35;
    scene.add(elena3D);

    // Seated Friend 3 (Marcus & Dog Biscuit on Patio / Lounge)
    const marcus3D = create3DCharacter('#D4A373', '🐕');
    marcus3D.position.set(7, 0, 5);
    marcus3D.rotation.y = -Math.PI * 0.4;
    scene.add(marcus3D);

    // 3D Miniature Clay Dog (Biscuit)
    const dogGroup = new THREE.Group();
    const dogBodyGeo = new THREE.SphereGeometry(0.35, 12, 12);
    const dogHeadGeo = new THREE.SphereGeometry(0.25, 12, 12);
    const dogMat = new THREE.MeshStandardMaterial({ color: '#C89666', roughness: 0.6 });
    const dogBody = new THREE.Mesh(dogBodyGeo, dogMat);
    const dogHead = new THREE.Mesh(dogHeadGeo, dogMat);
    dogBody.position.set(0, 0.3, 0);
    dogHead.position.set(0, 0.55, 0.28);
    dogGroup.add(dogBody);
    dogGroup.add(dogHead);
    dogGroup.position.set(6.2, 0, 4.3);
    scene.add(dogGroup);

    // Seated Friend 4 (Rohan at Corner Boardgame Table)
    const rohan3D = create3DCharacter('#BC6C25', '🎲');
    rohan3D.position.set(6.5, 0, -1.5);
    rohan3D.rotation.y = -Math.PI * 0.6;
    scene.add(rohan3D);

    // -------------------------------------------------------------
    // 9. THE MOVABLE 3D PLAYER AVATAR (You)
    // -------------------------------------------------------------
    const playerGroup = new THREE.Group();
    playerGroup.position.set(0, 0, 3);

    const playerChar = create3DCharacter(characterColor, '🥰');
    playerGroup.add(playerChar);

    // Tactile Halo Beacon ring
    const ringGeo = new THREE.RingGeometry(0.65, 0.82, 32);
    const ringMat = new THREE.MeshBasicMaterial({ color: '#E07A5F', side: THREE.DoubleSide });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 2;
    ringMesh.position.y = 0.05;
    playerGroup.add(ringMesh);

    scene.add(playerGroup);
    characterGroupRef.current = playerGroup;

    // -------------------------------------------------------------
    // RAYCASTING FOR CLICK-TO-WALK
    // -------------------------------------------------------------
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handleCanvasClick = (e: MouseEvent) => {
      if (isDraggingRef.current) return;
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(scene.children, true);

      if (intersects.length > 0) {
        const floorHit = intersects.find((hit) => hit.point.y <= 0.8);
        if (floorHit) {
          moveCharacterTo(floorHit.point.x, floorHit.point.z);
        }
      }
    };

    renderer.domElement.addEventListener('click', handleCanvasClick);

    // -------------------------------------------------------------
    // MOUSE & TOUCH ORBIT ROTATION
    // -------------------------------------------------------------
    const onMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = false;
      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - previousMousePositionRef.current.x;
      const deltaY = e.clientY - previousMousePositionRef.current.y;
      if (e.buttons === 1 && (Math.abs(deltaX) > 2 || Math.abs(deltaY) > 2)) {
        isDraggingRef.current = true;
        orbitAnglesRef.current.theta -= deltaX * 0.005;
        orbitAnglesRef.current.phi = Math.max(0.4, Math.min(1.4, orbitAnglesRef.current.phi + deltaY * 0.004));
      }
      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      orbitDistanceRef.current = Math.max(14, Math.min(36, orbitDistanceRef.current + e.deltaY * 0.02));
    };

    renderer.domElement.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    renderer.domElement.addEventListener('wheel', onWheel, { passive: false });

    // Touch support for mobile devices
    let touchStartX = 0;
    let touchStartY = 0;
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        const deltaX = e.touches[0].clientX - touchStartX;
        const deltaY = e.touches[0].clientY - touchStartY;
        orbitAnglesRef.current.theta -= deltaX * 0.004;
        orbitAnglesRef.current.phi = Math.max(0.4, Math.min(1.4, orbitAnglesRef.current.phi + deltaY * 0.003));
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      }
    };
    renderer.domElement.addEventListener('touchstart', onTouchStart);
    renderer.domElement.addEventListener('touchmove', onTouchMove);

    // -------------------------------------------------------------
    // MAIN RENDER & ANIMATION LOOP
    // -------------------------------------------------------------
    const animate = () => {
      animationFrameId.current = requestAnimationFrame(animate);

      // Character smooth movement
      if (characterGroupRef.current) {
        const dist = currentPosRef.current.distanceTo(targetPosRef.current);
        if (dist > 0.1) {
          const dir = new THREE.Vector3().subVectors(targetPosRef.current, currentPosRef.current).normalize();
          currentPosRef.current.add(dir.clone().multiplyScalar(0.18));
          characterGroupRef.current.position.copy(currentPosRef.current);

          // Rotate character towards travel direction
          const targetAngle = Math.atan2(dir.x, dir.z);
          characterGroupRef.current.rotation.y = targetAngle;

          // Cute bobbing walking cycle
          walkCycleRef.current += 0.25;
          characterGroupRef.current.position.y = Math.abs(Math.sin(walkCycleRef.current)) * 0.22;

          checkProximity(currentPosRef.current);
        } else {
          characterGroupRef.current.position.y = 0;
          isWalkingRef.current = false;
        }
      }

      // Steam animation
      if (steamParticlesRef.current) {
        const posAttr = steamParticlesRef.current.geometry.attributes.position as THREE.BufferAttribute;
        for (let i = 0; i < particleCount; i++) {
          let y = posAttr.getY(i) + 0.012;
          if (y > 1.2) y = 0;
          posAttr.setY(i, y);
        }
        posAttr.needsUpdate = true;
      }

      // Trishi gentle breathing & welcoming animation
      if (trishiGroupRef.current) {
        trishiGroupRef.current.position.y = 0.72 + Math.sin(Date.now() * 0.003) * 0.03;
      }

      // Camera view choreography
      if (cameraRef.current && characterGroupRef.current) {
        const target = characterGroupRef.current.position;

        if (cameraMode === 'isometric') {
          const dist = orbitDistanceRef.current;
          const theta = orbitAnglesRef.current.theta;
          const phi = orbitAnglesRef.current.phi;
          cameraRef.current.position.x = THREE.MathUtils.lerp(cameraRef.current.position.x, dist * Math.sin(phi) * Math.sin(theta), 0.05);
          cameraRef.current.position.y = THREE.MathUtils.lerp(cameraRef.current.position.y, dist * Math.cos(phi), 0.05);
          cameraRef.current.position.z = THREE.MathUtils.lerp(cameraRef.current.position.z, dist * Math.sin(phi) * Math.cos(theta), 0.05);
          cameraRef.current.lookAt(0, 1.5, 0);
        } else if (cameraMode === 'follow') {
          const offset = new THREE.Vector3(0, 7, 10);
          cameraRef.current.position.lerp(target.clone().add(offset), 0.08);
          cameraRef.current.lookAt(target.x, target.y + 1.2, target.z);
        } else if (cameraMode === 'counter') {
          cameraRef.current.position.lerp(new THREE.Vector3(0, 3.6, -1.2), 0.08);
          cameraRef.current.lookAt(0, 2.6, -5.8);
        } else if (cameraMode === 'lounge') {
          cameraRef.current.position.lerp(new THREE.Vector3(-1.5, 4.2, 5.5), 0.08);
          cameraRef.current.lookAt(-8.5, 2.8, 1.5);
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    // Resize handler
    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current || !cameraRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('click', handleCanvasClick);
      renderer.domElement.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      renderer.domElement.removeEventListener('wheel', onWheel);
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [cameraMode, checkProximity]);

  // Handle Trishi Name submission & sliding coffee animation
  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputName.trim()) return;
    onUpdateUser({ name: inputName.trim(), username: inputName.trim().toLowerCase().replace(/\s+/g, '_') });
    setStoryStep(3);
    playSound('pop');
  };

  const triggerCoffeeSlide = () => {
    playSound('slide');
    setCoffeeSlid(true);

    if (slidingCupRef.current) {
      let t = 0;
      const slideInterval = setInterval(() => {
        t += 0.08;
        if (slidingCupRef.current) {
          slidingCupRef.current.position.z = THREE.MathUtils.lerp(-0.4, 1.1, t);
        }
        if (t >= 1) {
          clearInterval(slideInterval);
          setStoryStep(4);
        }
      }, 30);
    } else {
      setStoryStep(4);
    }
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUser({
      name: inputName || user.name || 'Friend',
      coffeeTokens: (user.coffeeTokens || 0) + 15,
    });
    setStoryStep(5);
    setShowStoryModal(false);
    playSound('chime');
  };

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden select-none bg-[#F7F3EB]">
      {/* 1. THREE.JS 3D WEBGL FULLSCREEN CANVAS */}
      <div
        ref={containerRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      />

      {/* 2. TOP FLOATING ARCHITECTURAL HUD */}
      <div className="absolute top-4 left-4 right-4 z-30 flex items-center justify-between gap-4 pointer-events-none">
        {/* Brand Lockup */}
        <div className="pointer-events-auto flex items-center gap-3 clay-bubble px-4 py-2 border border-white/80 backdrop-blur-md shadow-md">
          <div className="w-9 h-9 rounded-2xl bg-[#9BB196] flex items-center justify-center text-white shadow-sm">
            <Coffee className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-extrabold text-[#2C241E] font-['Outfit'] tracking-tight">
                Cafe<span className="text-[#9BB196]">Go</span>
              </span>
              <span className="text-[10px] bg-[#EEF5EA] text-[#4F7344] px-2 py-0.5 rounded-full font-bold">
                3D World
              </span>
            </div>
            <p className="text-[10px] text-[#7A6453] hidden sm:block">
              Friend-Powered Discovery · Sage Minimalist Space
            </p>
          </div>
        </div>

        {/* Spatial Camera View Modes (from reference images) */}
        <div className="pointer-events-auto flex items-center gap-1.5 clay-bubble p-1.5 border border-white/80 shadow-md backdrop-blur-md">
          <button
            onClick={() => {
              setCameraMode('isometric');
              playSound('pop');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              cameraMode === 'isometric'
                ? 'bg-[#2C241E] text-white shadow-xs'
                : 'text-[#6B5546] hover:bg-black/5'
            }`}
            title="Overview angle inspired by architectural floorplan"
          >
            <Compass className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Isometric 3D</span>
          </button>

          <button
            onClick={() => {
              setCameraMode('follow');
              playSound('pop');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              cameraMode === 'follow'
                ? 'bg-[#2C241E] text-white shadow-xs'
                : 'text-[#6B5546] hover:bg-black/5'
            }`}
            title="Follow player walking in 3D"
          >
            <Move className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Follow Walk</span>
          </button>

          <button
            onClick={() => {
              setCameraMode('counter');
              playSound('pop');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              cameraMode === 'counter'
                ? 'bg-[#2C241E] text-white shadow-xs'
                : 'text-[#6B5546] hover:bg-black/5'
            }`}
            title="Barista Trishi station & pastry case"
          >
            <Coffee className="w-3.5 h-3.5 text-[#E07A5F]" />
            <span className="hidden md:inline">Fluted Bar</span>
          </button>

          <button
            onClick={() => {
              setCameraMode('lounge');
              playSound('pop');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              cameraMode === 'lounge'
                ? 'bg-[#2C241E] text-white shadow-xs'
                : 'text-[#6B5546] hover:bg-black/5'
            }`}
            title="Wavy Wall & Snake Plant Bench"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#9BB196]" />
            <span className="hidden md:inline">Wavy Lounge</span>
          </button>

          <div className="w-px h-5 bg-[#E8DFD3] mx-1" />

          {/* Sound Toggle */}
          <button
            onClick={() => setIsAudioMuted(!isAudioMuted)}
            className="p-1.5 rounded-xl text-[#7A6453] hover:bg-black/5 transition-colors cursor-pointer"
            title={isAudioMuted ? 'Unmute Sound' : 'Mute Sound'}
          >
            {isAudioMuted ? <VolumeX className="w-4 h-4 text-red-500" /> : <Volume2 className="w-4 h-4 text-[#819B72]" />}
          </button>
        </div>
      </div>

      {/* 3. CLOUD BUBBLE DISPLAY VIEW (Compact, puffy cloud bubble, quick to understand, no tips) */}
      {activePatron && (
        <div className="absolute top-20 md:top-24 left-1/2 -translate-x-1/2 z-30 pointer-events-none animate-fadeIn flex flex-col items-center max-w-[92%]">
          {/* Main Cloud Body */}
          <div className="pointer-events-auto bg-white/95 backdrop-blur-md px-4 py-2.5 sm:px-5 sm:py-3 rounded-full border border-white/90 shadow-[0_14px_30px_rgba(70,55,40,0.12),inset_0_2px_4px_rgba(255,255,255,0.9)] relative flex items-center gap-3 max-w-sm sm:max-w-md">
            
            {/* Puffy Cloud Lobes */}
            <div className="absolute -top-2 left-6 w-7 h-7 rounded-full bg-white/90 -z-10 pointer-events-none shadow-xs" />
            <div className="absolute -top-3.5 left-14 w-9 h-9 rounded-full bg-white/95 -z-10 pointer-events-none shadow-xs" />
            <div className="absolute -top-2 right-12 w-7 h-7 rounded-full bg-white/90 -z-10 pointer-events-none shadow-xs" />
            <div className="absolute -bottom-1 left-10 w-5 h-5 rounded-full bg-white/90 -z-10 pointer-events-none shadow-xs" />

            {/* Small Character Avatar */}
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-lg shadow-xs border-2 border-white shrink-0"
              style={{ backgroundColor: activePatron.avatarColor }}
            >
              <span className="select-none">{activePatron.avatarFace}</span>
            </div>

            {/* Compact, Quick Review Content */}
            <div className="flex-1 min-w-0 pr-1">
              <div className="flex items-center gap-1.5 leading-none mb-1">
                <span className="font-extrabold text-[#2C221B] text-xs font-['Outfit'] truncate">
                  {activePatron.name}
                </span>
                <span className="text-[10px] text-[#8A7565] bg-[#F2EDE4] px-1.5 py-0.5 rounded-full font-medium shrink-0">
                  {activePatron.tableLabel.split(' ')[0]}
                </span>
              </div>
              <p className="text-xs font-semibold text-[#2C221B] leading-snug">
                “{activePatron.quickReview || activePatron.quoteBubble.replace(/^[“"]|[”"]$/g, '')}”
              </p>
            </div>

            {/* Quick Dismiss button */}
            <button
              onClick={() => {
                setActivePatron(null);
                playSound('pop');
              }}
              className="w-6 h-6 rounded-full bg-[#FAF5EE] hover:bg-[#EAE2D6] text-[#7A6453] hover:text-[#2C221B] flex items-center justify-center text-[10px] font-bold shadow-xs shrink-0 cursor-pointer transition-colors"
              title="Close cloud"
            >
              ✕
            </button>
          </div>

          {/* Little trailing cloud thought bubbles pointing down */}
          <div className="flex flex-col items-center gap-1 mt-1 -ml-16 pointer-events-none">
            <div className="w-3.5 h-3.5 rounded-full bg-white/95 shadow-xs border border-white/80" />
            <div className="w-2 h-2 rounded-full bg-white/90 shadow-xs border border-white/80" />
          </div>
        </div>
      )}

      {/* 4. WALKING SHORTCUT HINT (Click floor or use controls) */}
      <div className="absolute bottom-24 left-6 z-20 hidden md:flex items-center gap-2 pointer-events-none">
        <div className="clay-bubble px-3 py-1.5 text-[11px] font-semibold text-[#6B5546] border border-white/80 backdrop-blur-xs flex items-center gap-1.5 shadow-sm">
          <Move className="w-3.5 h-3.5 text-[#9BB196]" />
          <span>Click anywhere on terrazzo floor or fluted bar to walk</span>
        </div>
      </div>

      {/* 5. INTERACTIVE STORY / WELCOME MODAL (Trishi's Counter Step-by-Step) */}
      {showStoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-sm animate-fadeIn">
          <div className="clay-card-warm max-w-lg w-full p-6 md:p-8 border-2 border-white shadow-2xl relative space-y-6">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#E8DFD3]">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-xl bg-[#9BB196] text-white flex items-center justify-center font-bold text-sm">
                  ☕
                </span>
                <div>
                  <h3 className="font-extrabold text-lg text-[#2C221B] font-['Outfit']">
                    Welcome to CafeGo
                  </h3>
                  <p className="text-xs text-[#7A6453]">Modern Sage-Minimalist Discovery</p>
                </div>
              </div>

              <button
                onClick={() => setShowStoryModal(false)}
                className="text-xs font-bold text-[#8A7565] hover:text-[#2C221B] px-2.5 py-1 rounded-xl bg-[#EAE2D6] cursor-pointer"
              >
                Skip to Free Roam
              </button>
            </div>

            {/* Step 1: Push Open Door */}
            {storyStep === 1 && (
              <div className="text-center space-y-5 py-4">
                <div className="w-20 h-20 mx-auto rounded-3xl bg-[#9BB196]/20 flex items-center justify-center text-[#9BB196] text-4xl shadow-inner">
                  🌿
                </div>
                <div>
                  <h4 className="text-xl font-bold text-[#2C221B]">Push open the oak cafe door...</h4>
                  <p className="text-xs md:text-sm text-[#6B5546] mt-2 max-w-sm mx-auto leading-relaxed">
                    Step inside the warm sage fluted room. In front is the illuminated fluted bar. On the left is the snake plant lounge with *"Maybe coffee is addicted to me?"*.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setStoryStep(2);
                    playSound('pop');
                  }}
                  className="clay-btn-primary px-7 py-3.5 rounded-2xl font-bold text-sm mx-auto flex items-center gap-2 cursor-pointer"
                >
                  <span>Walk Up to Barista Trishi</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Step 2: "Hi, I am Trishi, what can I call you?" */}
            {storyStep === 2 && (
              <div className="space-y-4 py-2">
                <div className="flex items-center gap-3 bg-[#FAF6EE] p-4 rounded-2xl border border-[#EDE4D6]">
                  <div className="text-4xl">👩🏽‍🍳</div>
                  <div>
                    <h5 className="font-extrabold text-sm text-[#2C221B]">Trishi (Head Barista)</h5>
                    <p className="text-xs text-[#5C4A3E] mt-0.5 leading-relaxed">
                      “Hi! I am <strong>Trishi</strong>. Welcome to CafeGo! Before I pull your single-origin espresso, what can I call you?”
                    </p>
                  </div>
                </div>

                <form onSubmit={handleNameSubmit} className="space-y-3 pt-2">
                  <label className="block text-xs font-bold uppercase text-[#7A6453]">Your Name / Nickname</label>
                  <input
                    type="text"
                    required
                    value={inputName}
                    onChange={(e) => setInputName(e.target.value)}
                    placeholder="e.g. Aarya, Chloe, Jordan..."
                    className="clay-inset w-full px-4 py-3 rounded-2xl text-sm font-semibold text-[#2C221B] focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="clay-btn-primary w-full py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Tell Trishi My Name</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </form>
              </div>
            )}

            {/* Step 3: Reviews popping up across spots */}
            {storyStep === 3 && (
              <div className="space-y-4 py-2 text-center">
                <div className="clay-bubble inline-block px-4 py-1 text-xs font-bold text-[#9BB196]">
                  Trishi smiles: “Delighted to meet you, {inputName || user.name}!”
                </div>

                <h4 className="text-base font-bold text-[#2C221B]">Authentic reviews are glowing around the cafe:</h4>

                <div className="grid grid-cols-3 gap-2.5 text-left text-xs">
                  <div className="p-3 bg-white rounded-xl border border-[#E8DFD3] space-y-1">
                    <span className="text-[10px] font-bold text-[#819B72]">🌿 Wavy Wall</span>
                    <p className="font-bold text-[#2C221B]">Good ambience</p>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-[#E8DFD3] space-y-1">
                    <span className="text-[10px] font-bold text-[#E07A5F]">☕ Counter</span>
                    <p className="font-bold text-[#2C221B]">Friendly staff</p>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-[#E8DFD3] space-y-1">
                    <span className="text-[10px] font-bold text-[#D4A373]">🥐 Pastry Case</span>
                    <p className="font-bold text-[#2C221B]">Nice coffee</p>
                  </div>
                </div>

                <button
                  onClick={triggerCoffeeSlide}
                  className="clay-btn-primary px-7 py-3 rounded-2xl font-bold text-sm mx-auto flex items-center gap-2 cursor-pointer mt-2"
                >
                  <span>Watch Trishi Place the Coffee on the Desk</span>
                  <Coffee className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Step 4: Coffee slides & Password Prompt */}
            {storyStep === 4 && (
              <div className="space-y-4 py-2">
                <div className="flex items-center gap-3 bg-[#FAF6EE] p-4 rounded-2xl border border-[#EDE4D6]">
                  <div className="text-3xl">☕</div>
                  <p className="text-xs text-[#5C4A3E] leading-relaxed">
                    *Trishi slides the steaming warm ceramic cup directly in front of you onto the marble counter.*
                    <br />
                    “Whisper your squad password to join our trusted circle!”
                  </p>
                </div>

                <form onSubmit={handlePasswordSubmit} className="space-y-3">
                  <label className="block text-xs font-bold uppercase text-[#7A6453]">Squad Passcode / Secret Word</label>
                  <input
                    type="password"
                    required
                    value={inputPassword}
                    onChange={(e) => setInputPassword(e.target.value)}
                    placeholder="Enter password..."
                    className="clay-inset w-full px-4 py-3 rounded-2xl text-sm font-semibold text-[#2C221B] focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="clay-btn-primary w-full py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Enter CafeGo Circle (+15 ☕ Tokens)</span>
                  </button>
                </form>
              </div>
            )}

          </div>
        </div>
      )}

      {/* Floating Replay Welcome Button if closed */}
      {!showStoryModal && (
        <button
          onClick={() => {
            setShowStoryModal(true);
            setStoryStep(2);
          }}
          className="absolute top-20 right-6 z-20 clay-bubble px-3 py-1.5 text-xs font-bold text-[#9BB196] border border-white/80 shadow-sm cursor-pointer hover:scale-105 transition-transform flex items-center gap-1.5"
        >
          <span>👩🏽‍🍳 Talk to Barista Trishi</span>
        </button>
      )}

    </div>
  );
};
