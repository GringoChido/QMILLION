import { motion } from 'framer-motion'
import DitheringCTA from '../components/DitheringCTA'
import usePageMeta from '../hooks/usePageMeta'

const About = () => {
  usePageMeta({
    title: 'About',
    description: 'Thirty years at the board. Grammy Award-winning mixer, producer, and composer. From Kingston to Los Angeles — the sonic architect behind modern jazz and R&B.',
    path: '/about',
  })

  return (
    <>
      {/* Hero — full bleed Q photo */}
      <section className="relative h-[80vh] md:h-screen overflow-hidden">
        <img
          src="/images/142-qmillion-01_optimized.jpg"
          alt="Q at the console"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-base via-base/40 to-transparent" />

        <div className="absolute inset-0 flex items-end">
          <div className="max-w-[1400px] mx-auto w-full px-6 md:px-10 pb-16 md:pb-24">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.3 }}
              className="text-amber text-xs tracking-[0.3em] uppercase mb-4"
            >
              About
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.5 }}
              className="font-display text-[14vw] md:text-[10vw] leading-[0.85] text-cream tracking-wider"
            >
              QMILLION
            </motion.h1>
          </div>
        </div>
      </section>

      {/* The Statement */}
      <section className="bg-textured-alt py-24 md:py-36 px-6 md:px-10">
        <div className="max-w-[900px] mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1.5 }}
            className="font-display text-3xl md:text-5xl lg:text-6xl text-cream leading-[1.15] tracking-wide"
          >
            Some people mix records. Q builds worlds. From Kingston to Los Angeles,
            from Blue Note to the studio, the frequencies he moves are felt before
            they are understood.
          </motion.p>
        </div>
      </section>

      {/* The Approach */}
      <section className="bg-textured py-20 md:py-28 px-6 md:px-10">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
          <div className="md:col-span-4">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="text-amber text-xs tracking-[0.3em] uppercase"
            >
              The Approach
            </motion.p>
          </div>
          <motion.div
            className="md:col-span-7"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <div className="space-y-6 text-cream-muted text-sm leading-relaxed">
              <p>
                Thirty years at the board. Thousands of sessions. A Grammy on
                the shelf and a philosophy built on one principle: every
                frequency must earn its place.
              </p>
              <p>
                Q's approach begins with listening — not just to the music, but
                to the space inside it. His mixes are built on technical
                precision: gain staging that preserves the dynamic range of a
                live performance, frequency decisions made with surgical
                clarity, and a low-end philosophy rooted in the understanding
                that bass is felt before it's heard. On Black Radio, that meant
                giving Robert Glasper's piano room to breathe while anchoring
                the rhythm section with weight that moved through walls. That
                record didn't just win a Grammy — it shifted what jazz could
                sound like in the 21st century.
              </p>
              <p>
                Where most engineers treat mixing as a technical process, Q
                treats it as a compositional act. He brings the same
                intentionality to a Keyon Harrold trumpet phrase as he does to
                an Afrobeat arrangement for Seun Kuti. The tools change. The
                standard doesn't.
              </p>
              <p>
                From the Neve console to the digital domain, his technical
                fluency is matched only by his restraint. He knows what not to
                add. He knows when the session is telling you something. And
                after three decades working across jazz, hip-hop, R&B,
                dancehall, and film — he's still the person serious artists
                call when the music has to be right.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Photo Moment — studio session */}
      <section className="bg-textured py-12 md:py-20 px-6 md:px-10">
        <div className="max-w-[1000px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1.2 }}
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <img
                src="/images/142-qmillion-02_optimized.jpg"
                alt="Q in a studio session"
                className="w-full h-full object-cover"
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  outline: '1px solid rgba(232,220,200,0.12)',
                  outlineOffset: '-12px',
                }}
              />
            </div>
            <p className="text-cream-muted/30 text-xs tracking-wider mt-4">
              Los Angeles, CA
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA — Dithering shader */}
      <section className="bg-base py-20 md:py-28 px-6 md:px-10">
        <div className="max-w-[1400px] mx-auto">
          <DitheringCTA />
        </div>
      </section>
    </>
  )
}

export default About
