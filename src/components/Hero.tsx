import { motion } from 'framer-motion'

const Hero = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-studio-black">
      {/* Video background — replace src with actual video */}
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-60"
          poster="/images/hero-poster.jpg"
        >
          <source src="/video/hero-loop.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-studio-black/80 via-studio-black/30 to-studio-black/50" />
      </div>

      {/* Hero content */}
      <div className="relative z-10 h-full flex flex-col justify-end pb-24 px-6 max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <h1 className="font-headline text-5xl md:text-7xl text-cream leading-tight">
            Qmillion
          </h1>
          <p className="text-cream/80 text-lg md:text-xl mt-4 tracking-wide">
            Producer. Mixer. Sonic Architect.
          </p>
          <div className="flex items-center gap-3 mt-6">
            <span className="w-8 h-px bg-muted-gold" />
            <p className="text-muted-gold text-sm tracking-widest uppercase">
              Grammy Award Winner — Robert Glasper Experiment
            </p>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <div className="w-px h-12 bg-cream/30" />
      </motion.div>
    </section>
  )
}

export default Hero
