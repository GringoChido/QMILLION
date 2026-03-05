import { motion } from 'framer-motion'

const About = () => {
  return (
    <section id="about" className="py-24 md:py-32 film-grain">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-start">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="aspect-[4/5] bg-analog-brown/10 overflow-hidden"
          >
            <div className="w-full h-full flex items-center justify-center text-analog-brown/30 font-headline text-sm">
              {/* Replace with Q portrait photo */}
              Portrait Photo
            </div>
          </motion.div>

          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex items-center gap-4 mb-8">
              <h2 className="font-headline text-4xl md:text-5xl">About</h2>
              <span className="flex-1 h-px bg-muted-gold/30" />
            </div>

            <div className="space-y-6 text-lg leading-relaxed text-studio-black/70">
              <p>
                Qmillion is a Grammy Award winning producer, mixer, and composer whose
                work sits at the intersection of jazz, hip hop, and soul.
              </p>
              <p>
                Known for his deep studio discipline and musical intuition, he has
                helped shape records for artists including Robert Glasper, Lalah
                Hathaway, Esperanza Spalding, and Derrick Hodge.
              </p>
              <p>
                His mixes are built with patience, precision, and an ear for emotion —
                blending analog craft with modern production.
              </p>
            </div>

            <div className="mt-12 pt-8 border-t border-muted-gold/20">
              <p className="text-sm tracking-widest uppercase text-muted-gold mb-4">
                Notable Collaborations
              </p>
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-studio-black/50">
                <span>Robert Glasper</span>
                <span>Lalah Hathaway</span>
                <span>Esperanza Spalding</span>
                <span>Derrick Hodge</span>
                <span>Common</span>
                <span>Bilal</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About
