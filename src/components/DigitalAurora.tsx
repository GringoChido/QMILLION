import { useRef, useEffect } from 'react'

interface InteractiveShaderProps {
  flowSpeed?: number
  colorIntensity?: number
  noiseLayers?: number
  mouseInfluence?: number
}

const InteractiveShader = ({
  flowSpeed = 0.4,
  colorIntensity = 1.2,
  noiseLayers = 4.0,
  mouseInfluence = 0.3,
}: InteractiveShaderProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mousePos = useRef({ x: 0.5, y: 0.5 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext('webgl')
    if (!gl) return

    const vertexShaderSource = `
      attribute vec2 aPosition;
      void main() {
        gl_Position = vec4(aPosition, 0.0, 1.0);
      }
    `

    // Brand-colored aurora: amber (#e8960a), cream (#e8dcc8), warm gold tones
    const fragmentShaderSource = `
      precision highp float;
      uniform vec2 iResolution;
      uniform float iTime;
      uniform vec2 iMouse;
      uniform float uFlowSpeed;
      uniform float uColorIntensity;
      uniform float uNoiseLayers;
      uniform float uMouseInfluence;

      #define MARCH_STEPS 32

      mat2 rot(float a) {
        float s = sin(a), c = cos(a);
        return mat2(c, -s, s, c);
      }

      float hash(vec2 p) {
        p = fract(p * vec2(123.34, 456.21));
        p += dot(p, p + 45.32);
        return fract(p.x * p.y);
      }

      float fbm(vec3 p) {
        float f = 0.0;
        float amp = 0.5;
        for (int i = 0; i < 8; i++) {
          if (float(i) >= uNoiseLayers) break;
          f += amp * hash(p.xy);
          p *= 2.0;
          amp *= 0.5;
        }
        return f;
      }

      float map(vec3 p) {
        vec3 q = p;
        q.z += iTime * uFlowSpeed;
        vec2 mouse = (iMouse.xy / iResolution.xy - 0.5) * 2.0;
        q.xy += mouse * uMouseInfluence;
        float f = fbm(q * 2.0);
        f *= sin(p.y * 2.0 + iTime) * 0.5 + 0.5;
        return clamp(f, 0.0, 1.0);
      }

      void main() {
        vec2 uv = (gl_FragCoord.xy - 0.5 * iResolution.xy) / iResolution.y;
        vec3 ro = vec3(0, -1, 0);
        vec3 rd = normalize(vec3(uv, 1.0));
        vec3 col = vec3(0);
        float t = 0.0;

        // Brand palette
        vec3 amber = vec3(0.91, 0.59, 0.04);
        vec3 cream = vec3(0.91, 0.86, 0.78);
        vec3 warmGold = vec3(0.85, 0.45, 0.05);

        for (int i = 0; i < MARCH_STEPS; i++) {
          vec3 p = ro + rd * t;
          float density = map(p);
          if (density > 0.0) {
            float phase = p.y * 1.5 + iTime * 0.3;
            vec3 auroraColor = mix(amber, warmGold, sin(phase) * 0.5 + 0.5);
            auroraColor = mix(auroraColor, cream, sin(phase * 0.7 + 1.5) * 0.2 + 0.1);
            col += auroraColor * density * 0.1 * uColorIntensity;
          }
          t += 0.1;
        }

        gl_FragColor = vec4(col, 1.0);
      }
    `

    const compileShader = (source: string, type: number) => {
      const shader = gl.createShader(type)
      if (!shader) return null
      gl.shaderSource(shader, source)
      gl.compileShader(shader)
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        gl.deleteShader(shader)
        return null
      }
      return shader
    }

    const vertexShader = compileShader(vertexShaderSource, gl.VERTEX_SHADER)
    const fragmentShader = compileShader(fragmentShaderSource, gl.FRAGMENT_SHADER)
    if (!vertexShader || !fragmentShader) return

    const program = gl.createProgram()
    if (!program) return
    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return

    gl.useProgram(program)

    const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1])
    const vertexBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)

    const aPosition = gl.getAttribLocation(program, 'aPosition')
    gl.enableVertexAttribArray(aPosition)
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0)

    const iResolutionLocation = gl.getUniformLocation(program, 'iResolution')
    const iTimeLocation = gl.getUniformLocation(program, 'iTime')
    const iMouseLocation = gl.getUniformLocation(program, 'iMouse')
    const uFlowSpeedLocation = gl.getUniformLocation(program, 'uFlowSpeed')
    const uColorIntensityLocation = gl.getUniformLocation(program, 'uColorIntensity')
    const uNoiseLayersLocation = gl.getUniformLocation(program, 'uNoiseLayers')
    const uMouseInfluenceLocation = gl.getUniformLocation(program, 'uMouseInfluence')

    const startTime = performance.now()
    let animationFrameId: number

    const handleMouseMove = (e: MouseEvent) => {
      if (!canvas) return
      const rect = canvas.getBoundingClientRect()
      mousePos.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      }
    }
    window.addEventListener('mousemove', handleMouseMove)

    const resizeCanvas = () => {
      canvas.width = canvas.clientWidth
      canvas.height = canvas.clientHeight
      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
      gl.uniform2f(iResolutionLocation, gl.canvas.width, gl.canvas.height)
    }
    window.addEventListener('resize', resizeCanvas)
    resizeCanvas()

    const renderLoop = () => {
      if (!gl || gl.isContextLost()) return
      const currentTime = performance.now()
      gl.uniform1f(iTimeLocation, (currentTime - startTime) / 1000.0)
      gl.uniform2f(
        iMouseLocation,
        mousePos.current.x * canvas.width,
        (1.0 - mousePos.current.y) * canvas.height
      )
      gl.uniform1f(uFlowSpeedLocation, flowSpeed)
      gl.uniform1f(uColorIntensityLocation, colorIntensity)
      gl.uniform1f(uNoiseLayersLocation, noiseLayers)
      gl.uniform1f(uMouseInfluenceLocation, mouseInfluence)
      gl.drawArrays(gl.TRIANGLES, 0, 6)
      animationFrameId = requestAnimationFrame(renderLoop)
    }
    renderLoop()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', handleMouseMove)
      if (gl && !gl.isContextLost()) {
        gl.deleteProgram(program)
        gl.deleteShader(vertexShader)
        gl.deleteShader(fragmentShader)
        gl.deleteBuffer(vertexBuffer)
      }
    }
  }, [flowSpeed, colorIntensity, noiseLayers, mouseInfluence])

  return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full opacity-50" />
}

const DigitalAurora = () => (
  <div className="absolute inset-0 -z-10 w-full h-full bg-base" aria-hidden>
    <InteractiveShader
      flowSpeed={0.3}
      colorIntensity={0.8}
      noiseLayers={4.0}
      mouseInfluence={0.3}
    />
    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-base via-base/40 to-base/30" />
  </div>
)

export default DigitalAurora
