import { useRef, useEffect, useState, memo } from 'react'
import * as THREE from 'three'

const vertexShader = `
  void main() {
    gl_Position = vec4(position, 1.0);
  }
`

const fragmentShader = `
  precision highp float;
  uniform vec2 u_resolution;
  uniform float u_time;
  uniform float u_glitch_intensity;
  uniform float u_rgb_shift;
  uniform float u_scanline_density;
  uniform float u_scanline_opacity;
  uniform vec3 u_base_color;

  float random(vec2 p) {
    return fract(sin(dot(p.xy, vec2(12.9898, 78.233))) * 43758.5453);
  }

  float noise(float p) {
    return random(vec2(p, p * 2.0));
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;

    // Glitch displacement
    float glitch_time = floor(u_time * 10.0);
    float glitch_amount = noise(glitch_time) * u_glitch_intensity * 0.1;
    if (fract(uv.y * 10.0 + noise(glitch_time) * 100.0) > 0.95) {
      uv.x += glitch_amount;
    }

    // Chromatic aberration (RGB shift)
    vec2 uv_r = uv + vec2(u_rgb_shift, 0.0);
    vec2 uv_g = uv;
    vec2 uv_b = uv - vec2(u_rgb_shift, 0.0);

    float pattern_r = step(0.5, fract(uv_r.x * 5.0 + u_time));
    float pattern_g = step(0.5, fract(uv_g.x * 5.0 + u_time));
    float pattern_b = step(0.5, fract(uv_b.x * 5.0 + u_time));

    vec3 color = vec3(pattern_r, pattern_g, pattern_b);
    color *= u_base_color;

    // Scanlines
    float scanline = sin(uv.y * u_scanline_density) * 0.5 + 0.5;
    color *= mix(1.0, scanline, u_scanline_opacity);

    // Film grain
    color += (random(uv + u_time) - 0.5) * 0.05;

    gl_FragColor = vec4(color, 1.0);
  }
`

interface DigitalGlitchProps {
  baseColor?: string
  speed?: number
  glitchIntensity?: number
  rgbShift?: number
  scanlineDensity?: number
  scanlineOpacity?: number
}

const DigitalGlitch = memo(({
  baseColor = '#e8960a',
  speed = 0.15,
  glitchIntensity = 0.3,
  rgbShift = 0.005,
  scanlineDensity = 800,
  scanlineOpacity = 0.15,
}: DigitalGlitchProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [supported, setSupported] = useState(true)
  const threeRef = useRef<{
    renderer?: THREE.WebGLRenderer
    scene?: THREE.Scene
    camera?: THREE.OrthographicCamera
    uniforms?: Record<string, THREE.IUniform>
    clock?: THREE.Clock
    speed?: number
  }>({})

  useEffect(() => {
    if (!containerRef.current) return

    const testCanvas = document.createElement('canvas')
    if (!testCanvas.getContext('webgl') && !testCanvas.getContext('experimental-webgl')) {
      setSupported(false)
      return
    }

    const container = containerRef.current
    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
    const renderer = new THREE.WebGLRenderer()

    const w = container.clientWidth
    const h = container.clientHeight
    renderer.setSize(w, h)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    const uniforms: Record<string, THREE.IUniform> = {
      u_time: { value: 0.0 },
      u_resolution: { value: new THREE.Vector2(w, h) },
      u_base_color: { value: new THREE.Color(baseColor) },
      u_glitch_intensity: { value: glitchIntensity },
      u_rgb_shift: { value: rgbShift },
      u_scanline_density: { value: scanlineDensity },
      u_scanline_opacity: { value: scanlineOpacity },
    }

    const geometry = new THREE.PlaneGeometry(2, 2)
    const material = new THREE.ShaderMaterial({ uniforms, vertexShader, fragmentShader })
    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    const clock = new THREE.Clock()
    threeRef.current = { renderer, scene, camera, uniforms, clock, speed }

    const handleResize = () => {
      const cw = container.clientWidth
      const ch = container.clientHeight
      renderer.setSize(cw, ch)
      uniforms.u_resolution.value.set(cw, ch)
    }
    window.addEventListener('resize', handleResize)

    let animationId: number
    const animate = () => {
      uniforms.u_time.value = clock.getElapsedTime() * (threeRef.current.speed ?? 0.15)
      renderer.render(scene, camera)
      animationId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', handleResize)
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
      geometry.dispose()
      material.dispose()
      renderer.dispose()
    }
  }, [])

  useEffect(() => {
    const { uniforms } = threeRef.current
    if (!uniforms) return
    uniforms.u_base_color.value = new THREE.Color(baseColor)
    uniforms.u_glitch_intensity.value = glitchIntensity
    uniforms.u_rgb_shift.value = rgbShift
    uniforms.u_scanline_density.value = scanlineDensity
    uniforms.u_scanline_opacity.value = scanlineOpacity
    threeRef.current.speed = speed
  }, [baseColor, glitchIntensity, rgbShift, scanlineDensity, scanlineOpacity, speed])

  if (!supported) return null

  return <div ref={containerRef} className="absolute inset-0 w-full h-full" />
})

export default DigitalGlitch
