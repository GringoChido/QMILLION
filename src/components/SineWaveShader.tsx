import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const SineWaveShader = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return
    const canvas = canvasRef.current
    const parent = canvas.parentElement
    if (!parent) return

    const vertexShader = `
      attribute vec3 position;
      void main() {
        gl_Position = vec4(position, 1.0);
      }
    `

    // Brand-tinted sine wave — amber (#e8960a) glow
    const fragmentShader = `
      precision highp float;
      uniform vec2 resolution;
      uniform float time;
      uniform float xScale;
      uniform float yScale;
      uniform float distortion;

      void main() {
        vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);

        float d = length(p) * distortion;

        float rx = p.x * (1.0 + d);
        float gx = p.x;
        float bx = p.x * (1.0 - d);

        float r = 0.05 / abs(p.y + sin((rx + time) * xScale) * yScale);
        float g = 0.05 / abs(p.y + sin((gx + time) * xScale) * yScale);
        float b = 0.05 / abs(p.y + sin((bx + time) * xScale) * yScale);

        // Tint to amber: boost red, moderate green, suppress blue
        gl_FragColor = vec4(
          r * 0.91,
          g * 0.59,
          b * 0.08,
          1.0
        );
      }
    `

    const scene = new THREE.Scene()
    const renderer = new THREE.WebGLRenderer({ canvas })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setClearColor(new THREE.Color(0x111111))

    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, -1)

    const uniforms = {
      resolution: { value: [parent.clientWidth, parent.clientHeight] },
      time: { value: 0.0 },
      xScale: { value: 1.0 },
      yScale: { value: 0.5 },
      distortion: { value: 0.05 },
    }

    const positions = new THREE.BufferAttribute(
      new Float32Array([
        -1, -1, 0, 1, -1, 0, -1, 1, 0,
        1, -1, 0, -1, 1, 0, 1, 1, 0,
      ]),
      3
    )
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', positions)

    const material = new THREE.RawShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      side: THREE.DoubleSide,
    })

    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    let animationId: number

    const handleResize = () => {
      if (!parent) return
      const w = parent.clientWidth
      const h = parent.clientHeight
      renderer.setSize(w, h, false)
      uniforms.resolution.value = [w, h]
    }

    handleResize()

    const animate = () => {
      uniforms.time.value += 0.01
      renderer.render(scene, camera)
      animationId = requestAnimationFrame(animate)
    }
    animate()

    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', handleResize)
      scene.remove(mesh)
      geometry.dispose()
      material.dispose()
      renderer.dispose()
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
}

export default SineWaveShader
