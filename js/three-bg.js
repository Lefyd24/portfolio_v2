import * as THREE from 'three'

const prefersReducedMotion = () =>
  window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches

const isSmallViewport = () => window.innerWidth < 768

const isDarkMode = () => document.documentElement.classList.contains('dark')

const createLightModeScene = (scene) => {
  const particlesGeometry = new THREE.BufferGeometry()
  const particlesCount = isSmallViewport() ? 420 : 700
  const posArray = new Float32Array(particlesCount * 3)
  for (let i = 0; i < particlesCount * 3; i++) posArray[i] = (Math.random() - 0.5) * 16
  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3))

  const particlesMaterial = new THREE.PointsMaterial({
    size: 0.045,
    color: 0x14b8a6,
    transparent: true,
    opacity: 0.38,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  })

  const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial)
  scene.add(particlesMesh)

  const wireGeo = new THREE.IcosahedronGeometry(2.05, 5)
  const wireMat = new THREE.MeshBasicMaterial({
    color: 0x0f172a,
    wireframe: true,
    transparent: true,
    opacity: 0.09,
  })
  const wireMesh = new THREE.Mesh(wireGeo, wireMat)
  scene.add(wireMesh)

  return {
    particlesMesh,
    wireMesh,
    dispose: () => {
      particlesGeometry.dispose()
      particlesMaterial.dispose()
      wireGeo.dispose()
      wireMat.dispose()
    },
  }
}

const createDarkModeScene = (scene) => {
  const torusKnotGeo = new THREE.TorusKnotGeometry(1.2, 0.35, 64, 16)
  const torusMat = new THREE.MeshBasicMaterial({
    color: 0x0d9488,
    wireframe: true,
    transparent: true,
    opacity: 0.08,
  })
  const torusMesh = new THREE.Mesh(torusKnotGeo, torusMat)
  scene.add(torusMesh)

  return {
    torusMesh,
    dispose: () => {
      torusKnotGeo.dispose()
      torusMat.dispose()
    },
  }
}

export const initHeroThreeBackground = (canvasId) => {
  if (prefersReducedMotion()) return () => {}

  const canvas = document.getElementById(canvasId)
  if (!canvas) return () => {}

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.z = 5

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance',
  })

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setSize(window.innerWidth, window.innerHeight)

  let lightScene = null
  let darkScene = null
  const FADE_DURATION = 0.3
  let lightOpacity = isDarkMode() ? 0 : 1
  let darkOpacity = isDarkMode() ? 1 : 0

  const applyTheme = () => {
    const dark = isDarkMode()

    if (lightScene) {
      lightScene.particlesMesh.visible = true
      lightScene.wireMesh.visible = true
    }
    if (darkScene) {
      darkScene.torusMesh.visible = true
    }
    lightOpacity = dark ? 0 : 1
    darkOpacity = dark ? 1 : 0
  }

  lightScene = createLightModeScene(scene)
  darkScene = createDarkModeScene(scene)
  applyTheme()

  let mouseX = 0
  let mouseY = 0

  const handleMouseMove = (event) => {
    mouseX = event.clientX / window.innerWidth - 0.5
    mouseY = event.clientY / window.innerHeight - 0.5
  }

  window.addEventListener('mousemove', handleMouseMove, { passive: true })

  const scrollRoot = document.getElementById('scroll-root')
  let scrollY = 0

  const handleScroll = () => {
    scrollY = scrollRoot ? scrollRoot.scrollTop : window.scrollY
  }

  if (scrollRoot) scrollRoot.addEventListener('scroll', handleScroll, { passive: true })
  else window.addEventListener('scroll', handleScroll, { passive: true })

  const themeObserver = new MutationObserver(() => applyTheme())
  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class'],
  })

  const clock = new THREE.Clock()
  let raf = 0

  const lerp = (a, b, t) => a + (b - a) * Math.min(t, 1)
  const dt = 1 / 60

  const animate = () => {
    raf = window.requestAnimationFrame(animate)
    const elapsed = clock.getElapsedTime()
    const dark = isDarkMode()
    const targetLight = dark ? 0 : 1
    const targetDark = dark ? 1 : 0
    const fadeSpeed = dt / FADE_DURATION
    lightOpacity = lerp(lightOpacity, targetLight, fadeSpeed)
    darkOpacity = lerp(darkOpacity, targetDark, fadeSpeed)

    if (lightScene) {
      lightScene.particlesMesh.material.opacity = 0.38 * lightOpacity
      lightScene.wireMesh.material.opacity = 0.09 * lightOpacity
      lightScene.particlesMesh.rotation.y = -0.04 * elapsed
      lightScene.particlesMesh.rotation.x = -0.02 * elapsed
      lightScene.wireMesh.rotation.y += 0.0016
      lightScene.wireMesh.rotation.x += 0.0012
    }

    if (darkScene) {
      darkScene.torusMesh.material.opacity = 0.08 * darkOpacity
      darkScene.torusMesh.rotation.x += 0.0018
      darkScene.torusMesh.rotation.y += 0.0022
    }

    const targetX = mouseX * 0.65
    const targetY = -mouseY * 0.35 - scrollY * 0.00035
    camera.position.x += (targetX - camera.position.x) * 0.06
    camera.position.y += (targetY - camera.position.y) * 0.06

    renderer.render(scene, camera)
  }

  const handleResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  }

  window.addEventListener('resize', handleResize, { passive: true })

  animate()

  return () => {
    window.cancelAnimationFrame(raf)
    window.removeEventListener('mousemove', handleMouseMove)
    window.removeEventListener('resize', handleResize)
    if (scrollRoot) scrollRoot.removeEventListener('scroll', handleScroll)
    themeObserver.disconnect()
    lightScene?.dispose()
    darkScene?.dispose()
    renderer.dispose()
  }
}
