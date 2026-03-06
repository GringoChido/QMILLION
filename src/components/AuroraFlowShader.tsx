import { useEffect, useRef } from 'react'
import * as THREE from 'three'

interface AuroraFlowShaderProps {
  amplitude?: number
  frequency?: number
  className?: string
}

const AuroraFlowShader = ({
  amplitude = 0.3,
  frequency = 4.0,
  className = '',
}: AuroraFlowShaderProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const materialRef = useRef<THREE.ShaderMaterial | null>(null)

  useEffect(() => {
    const mat = materialRef.current
    if (mat) {
      mat.uniforms.uAmplitude.value = amplitude
      mat.uniforms.uFrequency.value = frequency
    }
  }, [amplitude, frequency])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
    const clock = new THREE.Clock()

    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `

    // Brand-colored aurora: amber (#e8960a) to warm cream (#e8dcc8)
    const fragmentShader = `
      precision mediump float;
      uniform vec2 iResolution;
      uniform float iTime;
      uniform float uAmplitude;
      uniform float uFrequency;
      varying vec2 vUv;

      float ridge(float x) {
        return abs(2.0 * fract(x) - 1.0);
      }

      void main() {
        vec2 p = vUv - 0.5;
        p.x *= iResolution.x / iResolution.y;

        float y = p.y + iTime * 0.1;
        float wave = ridge((p.x * uFrequency) + sin(y * 2.0 + iTime * 0.5));

        float alpha = smoothstep(uAmplitude, uAmplitude + 0.02, wave)
                    - smoothstep(uAmplitude + 0.02, uAmplitude + 0.04, wave);

        // Brand palette: amber to warm cream
        vec3 amber = vec3(0.91, 0.59, 0.04);
        vec3 warmGold = vec3(0.85, 0.45, 0.05);
        vec3 cream = vec3(0.91, 0.86, 0.78);

        vec3 color = mix(amber, warmGold, vUv.y);
        color = mix(color, cream, sin(vUv.x * 3.14 + iTime * 0.3) * 0.3 + 0.15);

        // Dark base background
        vec3 bg = vec3(0.067, 0.067, 0.067);
        vec3 final_color = mix(bg, color, alpha);

        gl_FragColor = vec4(final_color, 1.0);
      }
    `

    const uniforms = {
      iTime: { value: 0 },
      iResolution: { value: new THREE.Vector2() },
      uAmplitude: { value: amplitude },
      uFrequency: { value: frequency },
    }

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
    })
    materialRef.current = material

    const geometry = new THREE.PlaneGeometry(2, 2)
    const quad = new THREE.Mesh(geometry, material)
    scene.add(quad)

    const onResize = () => {
      const w = container.clientWidth
      const h = container.clientHeight
      renderer.setSize(w, h)
      uniforms.iResolution.value.set(w, h)
    }
    window.addEventListener('resize', onResize)
    onResize()

    let animationId: number
    const animate = () => {
      uniforms.iTime.value = clock.getElapsedTime()
      renderer.render(scene, camera)
      animationId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', onResize)
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
      material.dispose()
      geometry.dispose()
      renderer.dispose()
    }
  }, [])

  return <div ref={containerRef} className={`absolute inset-0 w-full h-full ${className}`} />
}

export default AuroraFlowShader
