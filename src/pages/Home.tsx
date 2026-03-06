import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import ScrollMarquee from '../components/ScrollMarquee'
import WaveShader from '../components/WaveShader'
import DigitalGlitch from '../components/DigitalGlitch'
import PaperMeshBackground from '../components/PaperMeshBackground'
import AuroraFlowShader from '../components/AuroraFlowShader'

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
  return (
    <>
      {/* HERO — Full screen video */}
      <section className="relative h-screen w-full overflow-hidden bg-textured">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/images/hero-fallback.jpg"
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
            className="font-display text-[16vw] md:text-[12vw] leading-[0.85] text-cream tracking-wider"
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
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
              className="w-px h-8 bg-amber-muted/40"
            />
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
          <section className={`${d.bg} relative overflow-hidden min-h-[70vh] py-[120px] px-6 md:px-10`}>
            {/* Per-section shader backgrounds */}
            {d.title === 'MIXING' && (
              <div className="absolute inset-0 opacity-20">
                <DigitalGlitch
                  baseColor="#e8960a"
                  speed={0.12}
                  glitchIntensity={0.25}
                  rgbShift={0.004}
                  scanlineDensity={900}
                  scanlineOpacity={0.12}
                />
              </div>
            )}
            {d.title === 'PRODUCING' && (
              <div className="absolute inset-0 opacity-30">
                <PaperMeshBackground speed={0.3} />
              </div>
            )}
            {d.title === 'COMPOSING' && (
              <div className="absolute inset-0 opacity-25">
                <AuroraFlowShader amplitude={0.3} frequency={4.0} />
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
                <h2
                  className="font-display text-cream tracking-wider leading-none"
                  style={{ fontSize: '120px' }}
                >
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

      {/* FREQUENCIES — WebGL shader */}
      <section className="relative overflow-hidden bg-textured-alt py-28 md:py-40 px-6 md:px-10">
        <div className="absolute inset-0 opacity-60">
          <WaveShader />
        </div>
        <div className="relative z-10 max-w-[1400px] mx-auto text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2 }}
            className="font-display text-[8vw] md:text-[5vw] text-cream/80 tracking-widest leading-none"
          >
            THE FREQUENCIES HE MOVES ARE FELT
            <br />
            BEFORE THEY ARE UNDERSTOOD
          </motion.p>
        </div>
      </section>
    </>
  )
}

export default Home
