import { useState, Suspense, lazy } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const Dithering = lazy(() =>
  import('@paper-design/shaders-react').then((mod) => ({ default: mod.Dithering }))
)

const DitheringCTA = () => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden border border-amber/10 min-h-[500px] md:min-h-[550px] flex flex-col items-center justify-center">
        <Suspense fallback={<div className="absolute inset-0 bg-base" />}>
          <div className="absolute inset-0 z-0 pointer-events-none opacity-30 mix-blend-screen">
            <Dithering
              colorBack="#00000000"
              colorFront="#e8960a"
              shape="warp"
              type="4x4"
              speed={isHovered ? 0.6 : 0.2}
              className="size-full"
              minPixelRatio={1}
            />
          </div>
        </Suspense>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="relative z-10 px-6 max-w-3xl mx-auto text-center flex flex-col items-center"
        >
          <p className="text-amber text-[11px] tracking-[0.3em] uppercase mb-8">
            30 Years at the Board
          </p>

          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl text-cream tracking-wider leading-none mb-8">
            WORK WITH Q
          </h2>

          <p className="text-cream-muted text-sm md:text-base max-w-xl mb-12 leading-relaxed">
            Taking select projects. From mixing and production to original
            composition — reach out to start the conversation.
          </p>

          <Link
            to="/contact"
            className="inline-block text-amber text-xs tracking-[0.3em] uppercase hover:text-cream transition-colors duration-300 border border-amber/20 px-8 py-4 hover:border-amber/40"
          >
            Get in Touch &rarr;
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

export default DitheringCTA
