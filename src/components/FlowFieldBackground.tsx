import { useEffect, useRef } from 'react'

interface FlowFieldBackgroundProps {
  className?: string
  color?: string
  trailOpacity?: number
  particleCount?: number
  speed?: number
}

class Particle {
  x: number
  y: number
  vx: number
  vy: number
  age: number
  life: number
  width: number
  height: number
  speed: number

  constructor(width: number, height: number, speed: number) {
    this.width = width
    this.height = height
    this.speed = speed
    this.x = Math.random() * width
    this.y = Math.random() * height
    this.vx = 0
    this.vy = 0
    this.age = 0
    this.life = Math.random() * 200 + 100
  }

  update(mouseX: number, mouseY: number) {
    const angle =
      (Math.cos(this.x * 0.005) + Math.sin(this.y * 0.005)) * Math.PI

    this.vx += Math.cos(angle) * 0.2 * this.speed
    this.vy += Math.sin(angle) * 0.2 * this.speed

    const dx = mouseX - this.x
    const dy = mouseY - this.y
    const distance = Math.sqrt(dx * dx + dy * dy)
    const interactionRadius = 150

    if (distance < interactionRadius) {
      const force = (interactionRadius - distance) / interactionRadius
      this.vx -= dx * force * 0.05
      this.vy -= dy * force * 0.05
    }

    this.x += this.vx
    this.y += this.vy
    this.vx *= 0.95
    this.vy *= 0.95

    this.age++
    if (this.age > this.life) this.reset()

    if (this.x < 0) this.x = this.width
    if (this.x > this.width) this.x = 0
    if (this.y < 0) this.y = this.height
    if (this.y > this.height) this.y = 0
  }

  reset() {
    this.x = Math.random() * this.width
    this.y = Math.random() * this.height
    this.vx = 0
    this.vy = 0
    this.age = 0
    this.life = Math.random() * 200 + 100
  }

  draw(ctx: CanvasRenderingContext2D, color: string) {
    ctx.fillStyle = color
    const alpha = 1 - Math.abs(this.age / this.life - 0.5) * 2
    ctx.globalAlpha = alpha
    ctx.fillRect(this.x, this.y, 1.5, 1.5)
  }
}

const FlowFieldBackground = ({
  className = '',
  color = '#e8960a',
  trailOpacity = 0.12,
  particleCount = 500,
  speed = 0.8,
}: FlowFieldBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = container.clientWidth
    let height = container.clientHeight
    let particles: Particle[] = []
    let animationFrameId: number
    const mouse = { x: -1000, y: -1000 }

    const init = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.scale(dpr, dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`

      particles = []
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(width, height, speed))
      }
    }

    const animate = () => {
      ctx.fillStyle = `rgba(17, 17, 17, ${trailOpacity})`
      ctx.fillRect(0, 0, width, height)

      for (const p of particles) {
        p.update(mouse.x, mouse.y)
        p.draw(ctx, color)
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    const handleResize = () => {
      width = container.clientWidth
      height = container.clientHeight
      init()
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }

    const handleMouseLeave = () => {
      mouse.x = -1000
      mouse.y = -1000
    }

    init()
    animate()

    window.addEventListener('resize', handleResize)
    container.addEventListener('mousemove', handleMouseMove)
    container.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('resize', handleResize)
      container.removeEventListener('mousemove', handleMouseMove)
      container.removeEventListener('mouseleave', handleMouseLeave)
      cancelAnimationFrame(animationFrameId)
    }
  }, [color, trailOpacity, particleCount, speed])

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full bg-base overflow-hidden ${className}`}
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  )
}

export default FlowFieldBackground
