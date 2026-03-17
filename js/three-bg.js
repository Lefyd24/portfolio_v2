import * as THREE from 'three';

export function initThreeBackground(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 5;

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true
  });
  
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);

  // Add some ambient particles
  const particlesGeometry = new THREE.BufferGeometry();
  const particlesCount = 700;
  
  const posArray = new Float32Array(particlesCount * 3);
  for(let i = 0; i < particlesCount * 3; i++) {
    // Spread them out across scene
    posArray[i] = (Math.random() - 0.5) * 15;
  }
  
  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
  
  const material = new THREE.PointsMaterial({
    size: 0.05,
    color: 0x4d8f97, // petrol-300
    transparent: true,
    opacity: 0.6,
    blending: THREE.AdditiveBlending
  });

  const particlesMesh = new THREE.Points(particlesGeometry, material);
  scene.add(particlesMesh);

  // Add a subtle wireframe sphere
  const sphereGeo = new THREE.IcosahedronGeometry(2, 6);
  const sphereMat = new THREE.MeshBasicMaterial({
    color: 0x1a6f79, // petrol-500
    wireframe: true,
    transparent: true,
    opacity: 0.15
  });
  const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
  scene.add(sphereMesh);

  // Mouse interactivity
  let mouseX = 0;
  let mouseY = 0;
  
  window.addEventListener('mousemove', (event) => {
     mouseX = (event.clientX / window.innerWidth - 0.5);
     mouseY = (event.clientY / window.innerHeight - 0.5);
  });

  // Scroll Interactivity (for parallax)
  let scrollY = window.scrollY;
  window.addEventListener('scroll', () => {
     scrollY = window.scrollY;
  });

  // Animation Loop
  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    const elapsedTime = clock.getElapsedTime();

    // Rotate particles slowly
    particlesMesh.rotation.y = -0.05 * elapsedTime;
    particlesMesh.rotation.x = -0.02 * elapsedTime;

    // Rotate sphere and react to mouse
    sphereMesh.rotation.y += 0.002;
    sphereMesh.rotation.x += 0.002;
    
    // Parallax effect with mouse
    camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.05;
    camera.position.y += (-mouseY * 0.5 - camera.position.y) * 0.05;
    
    // Parallax with scroll
    camera.position.y = -scrollY * 0.001;

    renderer.render(scene, camera);
  }

  animate();

  // Handle Resize
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });
}
