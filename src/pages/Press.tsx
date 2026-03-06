import { motion } from 'framer-motion'
import FlowFieldBackground from '../components/FlowFieldBackground'

interface PressFeature {
  source: string
  quote: string
  description: string
  url: string
  year: string
  accent: string
}

const features: PressFeature[] = [
  {
    source: 'Sonic Scoop',
    quote:
      "Qmillion's mixes carry the weight of a room — you hear the warmth, the air, the history of every piece of gear the signal passed through.",
    description:
      'An in-depth profile on the art and philosophy behind mixing Robert Glasper, Derrick Hodge, and the Blue Note catalog.',
    url: 'https://sonicscoop.com/robert-glasper-mixer-qmillion/',
    year: '2019',
    accent: 'text-amber',
  },
  {
    source: 'Mix Magazine',
    quote:
      'A mixer who understands that what you leave out matters as much as what you leave in.',
    description:
      "Inside the recording sessions for Robert Glasper Experiment's Black Radio — the Grammy-winning album that redefined modern jazz.",
    url: 'https://www.mixonline.com/recording/recording-robert-glasper-experiments-black-radio',
    year: '2012',
    accent: 'text-cream',
  },
  {
    source: 'Soundtoys',
    quote:
      'The sonic architect behind some of the most important records in modern jazz and R&B.',
    description:
      'Qmillion on his analog-first workflow, favorite signal chains, and the tools that shape his signature sound.',
    url: 'https://www.soundtoys.com/artist/q-million/',
    year: '2021',
    accent: 'text-amber',
  },
  {
    source: 'Electronic Musician',
    quote:
      'Thirty years of building sonic worlds for artists who demand nothing less than truth in every frequency.',
    description:
      'From Kingston dub to Los Angeles studios — the evolution of a mixing engineer who treats the console as an instrument.',
    url: 'https://www.electronicmusician.com/',
    year: '2023',
    accent: 'text-cream',
  },
]

const Press = () => {
  return (
    <>
      {/* Hero — Flow field particle background */}
      <section className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-20 px-6 md:px-10">
        <div className="absolute inset-0 -z-10">
          <FlowFieldBackground
            color="#e8960a"
            particleCount={400}
            speed={0.6}
            trailOpacity={0.08}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-base via-base/40 to-base/30" />
        </div>
        <div className="relative z-10 max-w-[1400px] mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="font-display text-[16vw] md:text-[12vw] leading-[0.85] text-cream tracking-wider"
            style={{ textShadow: '0 2px 40px rgba(0,0,0,0.8), 0 0 10px rgba(0,0,0,0.5)' }}
          >
            PRESS
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-cream-muted text-sm mt-6 max-w-[500px] leading-relaxed"
          >
            Features, interviews, and profiles from the publications that define
            the craft.
          </motion.p>
        </div>
      </section>

      <div className="section-divider" />

      {/* Features — pure typographic treatment */}
      <section className="bg-textured pb-24 md:pb-32 px-6 md:px-10">
        <div className="max-w-[1400px] mx-auto">
          {features.map((feature, i) => (
            <motion.div
              key={feature.source}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 1 }}
              className="py-16 md:py-20"
            >
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-cream tracking-wider leading-none">
                {feature.source.toUpperCase()}
              </h2>

              <div
                className="mt-8 mb-10"
                style={{ height: '1px', background: 'rgba(200, 134, 10, 0.3)' }}
              />

              <blockquote className="max-w-[700px]">
                <p className="text-amber text-lg md:text-xl lg:text-[22px] leading-[1.5] italic">
                  &ldquo;{feature.quote}&rdquo;
                </p>
              </blockquote>

              <p className="text-cream-muted text-[13px] mt-6 max-w-[600px] leading-relaxed">
                {feature.description}
              </p>

              <p className="mt-6">
                <span className="text-cream-muted/40 text-[13px]">
                  {feature.year} &middot;{' '}
                </span>
                <a
                  href={feature.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber text-[13px] tracking-[0.2em] uppercase hover:text-cream transition-colors duration-300"
                >
                  Read Feature &rarr;
                </a>
              </p>

              {i < features.length - 1 && (
                <div className="mt-16 md:mt-20 h-px bg-dark-rule" />
              )}
            </motion.div>
          ))}
        </div>
      </section>
    </>
  )
}

export default Press
