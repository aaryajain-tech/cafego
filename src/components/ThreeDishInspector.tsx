import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeDishInspectorProps {
  dishType: 'croissant' | 'coffee' | 'tiramisu' | 'dosa';
  height?: number;
}

export const ThreeDishInspector: React.FC<ThreeDishInspectorProps> = ({
  dishType,
  height = 200,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;
    const width = container.clientWidth;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 1.4, 3.2);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffeedd, 1.8);
    dirLight.position.set(2, 4, 3);
    scene.add(dirLight);

    const dishGroup = new THREE.Group();
    scene.add(dishGroup);

    // Plate
    const plateGeo = new THREE.CylinderGeometry(1.1, 0.9, 0.08, 24);
    const plateMat = new THREE.MeshStandardMaterial({ color: '#FAF6EE', roughness: 0.3 });
    const plateMesh = new THREE.Mesh(plateGeo, plateMat);
    plateMesh.position.y = -0.3;
    dishGroup.add(plateMesh);

    if (dishType === 'croissant') {
      const croissantGeo = new THREE.TorusGeometry(0.5, 0.25, 16, 24, Math.PI * 1.4);
      const croissantMat = new THREE.MeshStandardMaterial({ color: '#D48C46', roughness: 0.6 });
      const croissantMesh = new THREE.Mesh(croissantGeo, croissantMat);
      croissantMesh.rotation.x = Math.PI / 2;
      croissantMesh.position.y = -0.05;
      dishGroup.add(croissantMesh);
    } else if (dishType === 'coffee') {
      const cupGeo = new THREE.CylinderGeometry(0.35, 0.3, 0.8, 20);
      const cupMat = new THREE.MeshStandardMaterial({ color: '#E07A5F', roughness: 0.4 });
      const cupMesh = new THREE.Mesh(cupGeo, cupMat);
      cupMesh.position.y = 0.1;
      dishGroup.add(cupMesh);
    } else if (dishType === 'tiramisu') {
      const cakeGeo = new THREE.BoxGeometry(0.8, 0.5, 0.8);
      const cakeMat = new THREE.MeshStandardMaterial({ color: '#F7E7CE', roughness: 0.6 });
      const cakeMesh = new THREE.Mesh(cakeGeo, cakeMat);
      dishGroup.add(cakeMesh);
    } else {
      const rollGeo = new THREE.CylinderGeometry(0.2, 0.2, 1.0, 16);
      const rollMat = new THREE.MeshStandardMaterial({ color: '#DCA258', roughness: 0.6 });
      const rollMesh = new THREE.Mesh(rollGeo, rollMat);
      rollMesh.rotation.z = Math.PI / 2;
      dishGroup.add(rollMesh);
    }

    const animate = () => {
      animIdRef.current = requestAnimationFrame(animate);
      dishGroup.rotation.y += 0.012;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      if (animIdRef.current) cancelAnimationFrame(animIdRef.current);
      if (rendererRef.current && rendererRef.current.domElement) {
        container.removeChild(rendererRef.current.domElement);
      }
      scene.clear();
    };
  }, [dishType, height]);

  return <div ref={mountRef} className="w-full flex items-center justify-center cursor-grab" style={{ height }} />;
};
