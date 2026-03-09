import { lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import ScrollMarquee from '../components/ScrollMarquee'
import usePageMeta from '../hooks/usePageMeta'

const WaveShader = lazy(() => import('../components/WaveShader'))
const DigitalGlitch = lazy(() => import('../components/DigitalGlitch'))
const PaperMeshBackground = lazy(() => import('../components/PaperMeshBackground'))
const AuroraFlowShader = lazy(() => import('../components/AuroraFlowShader'))

const ShaderFallback = ({ gradient }: { gradient: string }) => (
  <div className={`w-full h-full ${gradient}`} />
)

const pressPreview = [
  {
    source: 'Sonic Scoop',
    snippet: 'The warmth, the air, the history of every piece of gear...',
    accent: 'border-l-amber',
    textAccent: 'text-amber',
  },
  {
    source: 'Mix Magazine',
    snippet: 'What you leave out matters as much as what you leave in.',
    accent: 'border-l-cream/30',
    textAccent: 'text-cream',
  },
  {
    source: 'Soundtoys',
    snippet: 'The sonic architect behind modern jazz and R&B.',
    accent: 'border-l-green',
    textAccent: 'text-green',
  },
]

const disciplines = [
  {
    number: '01',
    title: 'MIXING',
    copy: 'Grammy-winning mixes. Analog warmth, digital precision. From Blue Note jazz to Afrobeat — every frequency placed with intention. The board is the instrument.',
    bg: 'bg-mixing-glow',
  },
  {
    number: '02',
    title: 'PRODUCING',
    copy: 'Building sonic worlds from the ground up. Shaping arrangements, curating musicians, guiding the vision from concept to final master. The architect of the session.',
    bg: 'bg-producing-glow',
  },
  {
    number: '03',
    title: 'COMPOSING',
    copy: 'Original scores for film and television. The same ear that shapes a Grammy-winning mix applied to narrative storytelling — where every note serves the story.',
    bg: 'bg-composing-glow',
  },
]

const Home = () => {
  usePageMeta({
    description: 'Grammy Award winning producer, mixer, and composer. Work spanning jazz, hip hop, and soul with artists including Robert Glasper, Lalah Hathaway, and Esperanza Spalding.',
    path: '/',
  })

  return (
    <>
      {/* HERO — Full screen video */}
      <section className="relative h-screen w-full overflow-hidden bg-textured">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/images/qmillion-1.jpg"
          className="absolute inset-0 w-full h-full object-cover object-center"
        >
          <source src="/videos/Q_2.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/55" />

        <div className="relative z-10 h-full flex flex-col justify-end pb-20 md:pb-28 px-6 md:px-10 max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 0.3 }}
          >
            <p className="text-amber text-xs tracking-[0.4em] uppercase mb-4">
              Grammy Award Winner
            </p>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[clamp(3.5rem,12vw,12rem)] leading-[0.85] text-cream tracking-wider"
          >
            QMILLION
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 1.2 }}
            className="text-cream-muted text-xs tracking-[0.3em] uppercase mt-6"
          >
            Producer &middot; Mixer &middot; Composer
          </motion.p>
        </div>

        <motion.div
          className="absolute bottom-0 left-0 right-0 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
        >
          <div className="h-px bg-dark-rule" />
          <div className="flex justify-center py-4">
            <div className="flex items-end gap-[2px]">
              {[10, 16, 22, 16, 10].map((h, i) => (
                <motion.div
                  key={i}
                  animate={{ scaleY: [0.35, 1, 0.35] }}
                  transition={{
                    repeat: Infinity,
                    duration: 2.5,
                    delay: i * 0.15,
                    ease: 'easeInOut',
                  }}
                  className="w-px origin-bottom bg-amber-muted/40"
                  style={{ height: h }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      <div className="section-divider" />

      {/* SCROLLING MARQUEE */}
      <ScrollMarquee />

      <div className="section-divider" />

      {/* DISCIPLINE SECTIONS — each with unique shader background */}
      {disciplines.map((d, i) => (
        <div key={d.title}>
          <section className={`${d.bg} relative overflow-hidden min-h-[50vh] md:min-h-[70vh] py-16 md:py-[120px] px-6 md:px-10`}>
            {d.title === 'MIXING' && (
              <div className="absolute inset-0 opacity-20">
                <Suspense fallback={<ShaderFallback gradient="bg-gradient-to-b from-[#1a1208] to-base" />}>
                  <DigitalGlitch
                    baseColor="#e8960a"
                    speed={0.12}
                    glitchIntensity={0.25}
                    rgbShift={0.004}
                    scanlineDensity={900}
                    scanlineOpacity={0.12}
                  />
                </Suspense>
              </div>
            )}
            {d.title === 'PRODUCING' && (
              <div className="absolute inset-0 opacity-30">
                <Suspense fallback={<ShaderFallback gradient="bg-gradient-to-br from-[#1a1a0f] via-base to-[#0f0a05]" />}>
                  <PaperMeshBackground speed={0.3} />
                </Suspense>
              </div>
            )}
            {d.title === 'COMPOSING' && (
              <div className="absolute inset-0 opacity-25">
                <Suspense fallback={<ShaderFallback gradient="bg-gradient-to-t from-base via-[#1a1208] to-[#1a1812]" />}>
                  <AuroraFlowShader amplitude={0.3} frequency={4.0} />
                </Suspense>
              </div>
            )}
            <div className="relative z-10 max-w-[1400px] mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 1 }}
              >
                <p className="text-amber text-xs tracking-[0.3em] uppercase mb-6">
                  {d.number}
                </p>
                <h2 className="font-display text-[clamp(3.5rem,12vw,7.5rem)] text-cream tracking-wider leading-none">
                  {d.title}
                </h2>
                <div
                  className="mt-8 mb-8 max-w-[480px]"
                  style={{ height: '1px', background: 'rgba(200, 134, 10, 0.3)' }}
                />
                <p className="text-cream-muted text-sm leading-[1.8] max-w-[480px]">
                  {d.copy}
                </p>
                <Link
                  to="/discography"
                  className="inline-block mt-8 text-amber text-xs tracking-[0.2em] uppercase hover:text-cream transition-colors duration-300"
                >
                  View Discography &rarr;
                </Link>
              </motion.div>
            </div>
          </section>

          {i < disciplines.length - 1 && <div className="section-divider" />}
        </div>
      ))}

      <div className="section-divider" />

      {/* PRESS PREVIEW */}
      <section className="bg-textured-alt py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-[1400px] mx-auto">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-amber text-xs tracking-[0.3em] uppercase mb-16"
          >
            Press
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {pressPreview.map((item, i) => (
              <motion.div
                key={item.source}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className={`border-l-2 ${item.accent} pl-6 py-2`}
              >
                <p className={`${item.textAccent} text-xs tracking-[0.3em] uppercase mb-3`}>
                  {item.source}
                </p>
                <p className="text-cream-muted text-sm leading-relaxed italic">
                  &ldquo;{item.snippet}&rdquo;
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="mt-12 pt-8 border-t border-dark-rule"
          >
            <Link
              to="/press"
              className="text-amber text-xs tracking-[0.3em] uppercase hover:text-cream transition-colors duration-300"
            >
              View All Press &rarr;
            </Link>
          </motion.div>
        </div>
      </section>

      <div className="section-divider" />

      {/* FREQUENCIES — WebGL shader + CTA */}
      <section className="relative overflow-hidden bg-textured-alt py-28 md:py-40 px-6 md:px-10">
        <div className="absolute inset-0 opacity-60">
          <Suspense fallback={<ShaderFallback gradient="bg-gradient-to-br from-[#1a1208] via-base to-[#0f0a05]" />}>
            <WaveShader />
          </Suspense>
        </div>
        <div className="relative z-10 max-w-[1400px] mx-auto text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2 }}
            className="font-display text-[clamp(1.75rem,5vw,4.5rem)] text-cream/80 tracking-widest leading-none"
          >
            THE FREQUENCIES HE MOVES ARE FELT
            <br />
            BEFORE THEY ARE UNDERSTOOD
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-12"
          >
            <Link
              to="/contact"
              className="inline-block text-amber text-xs tracking-[0.3em] uppercase border border-amber/20 px-8 py-4 hover:border-amber/40 hover:text-cream transition-all duration-300"
            >
              Work with Q &rarr;
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}

export default Home
