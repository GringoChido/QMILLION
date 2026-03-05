import { motion } from 'framer-motion'

interface Credit {
  artist: string
  album: string
  role: string
  year: string
}

const credits: Credit[] = [
  { artist: 'Robert Glasper Experiment', album: 'Black Radio', role: 'Mixing', year: '2012' },
  { artist: 'Robert Glasper Experiment', album: 'Black Radio 2', role: 'Mixing', year: '2013' },
  { artist: 'Derrick Hodge', album: 'Live Today', role: 'Producer / Mixer', year: '2014' },
  { artist: 'Lalah Hathaway', album: 'Where Beautiful Things Grow', role: 'Mixing', year: '2015' },
  { artist: 'Esperanza Spalding', album: "Emily's D+Evolution", role: 'Mixing', year: '2016' },
  { artist: 'Robert Glasper Experiment', album: 'ArtScience', role: 'Mixing', year: '2016' },
  { artist: 'Derrick Hodge', album: 'Colour of You', role: 'Producer / Mixer', year: '2017' },
  { artist: 'Robert Glasper', album: 'Fuck Yo Feelings', role: 'Mixing', year: '2019' },
]

const Discography = () => {
  return (
    <section id="discography" className="py-24 md:py-32 bg-analog-brown text-cream">
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-4 mb-16">
            <h2 className="font-headline text-4xl md:text-5xl">Discography</h2>
            <span className="flex-1 h-px bg-muted-gold/30" />
          </div>
        </motion.div>

        <div className="space-y-0">
          {credits.map((credit, i) => (
            <motion.div
              key={`${credit.album}-${credit.year}`}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="grid grid-cols-12 gap-4 py-5 border-b border-cream/10 items-baseline group hover:border-muted-gold/30 transition-colors duration-300"
            >
              <span className="col-span-1 text-sm text-cream/30 font-body">{credit.year}</span>
              <span className="col-span-4 md:col-span-4 font-headline text-base group-hover:text-muted-gold transition-colors duration-300">
                {credit.artist}
              </span>
              <span className="col-span-4 md:col-span-5 text-cream/60 text-sm italic">
                {credit.album}
              </span>
              <span className="col-span-3 md:col-span-2 text-xs text-muted-gold tracking-widest uppercase text-right">
                {credit.role}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Discography
