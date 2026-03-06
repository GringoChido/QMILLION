import { useEffect, useRef } from 'react'
import * as THREE from 'three'

interface PaperMeshBackgroundProps {
  className?: string
  speed?: number
}

const PaperMeshBackground = ({
  className = '',
  speed = 0.4,
}: PaperMeshBackgroundProps) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false })
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

    // Organic mesh gradient: dark base with amber/gold blobs
    const fragmentShader = `
      precision mediump float;
      uniform float iTime;
      uniform vec2 iResolution;
      varying vec2 vUv;

      // Simplex-like noise
      vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

      float snoise(vec2 v) {
        const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                           -0.577350269189626, 0.024390243902439);
        vec2 i  = floor(v + dot(v, C.yy));
        vec2 x0 = v - i + dot(i, C.xx);
        vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod289(i);
        vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
        vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
        m = m * m;
        m = m * m;
        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 ox = floor(x + 0.5);
        vec3 a0 = x - ox;
        m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
        vec3 g;
        g.x = a0.x * x0.x + h.x * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
        return 130.0 * dot(m, g);
      }

      void main() {
        vec2 uv = vUv;
        float aspect = iResolution.x / iResolution.y;
        vec2 p = uv;
        p.x *= aspect;

        float t = iTime;

        // Multiple noise layers for organic movement
        float n1 = snoise(p * 1.5 + vec2(t * 0.15, t * 0.1));
        float n2 = snoise(p * 2.5 - vec2(t * 0.12, -t * 0.08));
        float n3 = snoise(p * 0.8 + vec2(-t * 0.05, t * 0.15));

        float blend = n1 * 0.5 + n2 * 0.3 + n3 * 0.2;

        // Brand colors
        vec3 darkBase = vec3(0.067, 0.067, 0.067);    // #111111
        vec3 darkBrown = vec3(0.1, 0.06, 0.02);       // #1a0f05
        vec3 warmBrown = vec3(0.165, 0.1, 0.03);      // #2a1a08
        vec3 amber = vec3(0.91, 0.59, 0.04);          // #e8960a

        // Gradient mixing with noise
        vec3 color = darkBase;
        color = mix(color, darkBrown, smoothstep(-0.3, 0.2, blend));
        color = mix(color, warmBrown, smoothstep(0.0, 0.5, blend));
        color = mix(color, amber, smoothstep(0.3, 0.8, blend) * 0.4);

        // Subtle vignette
        vec2 vigUv = uv - 0.5;
        float vig = 1.0 - dot(vigUv, vigUv) * 0.5;
        color *= vig;

        gl_FragColor = vec4(color, 1.0);
      }
    `

    const uniforms = {
      iTime: { value: 0 },
      iResolution: { value: new THREE.Vector2() },
    }

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
    })

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
      uniforms.iTime.value = clock.getElapsedTime() * speed
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
  }, [speed])

  return <div ref={containerRef} className={`absolute inset-0 w-full h-full ${className}`} />
}

export default PaperMeshBackground
