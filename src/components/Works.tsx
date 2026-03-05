import { motion } from 'framer-motion'

interface Project {
  title: string
  artist: string
  role: string
  year: string
  image: string
}

const projects: Project[] = [
  {
    title: 'Black Radio',
    artist: 'Robert Glasper Experiment',
    role: 'Mixing',
    year: '2012',
    image: '/images/albums/black-radio.jpg',
  },
  {
    title: 'Live',
    artist: 'Derrick Hodge',
    role: 'Producer / Mixer',
    year: '2014',
    image: '/images/albums/derrick-hodge.jpg',
  },
  {
    title: 'Where Beautiful Things Grow',
    artist: 'Lalah Hathaway',
    role: 'Mixing',
    year: '2015',
    image: '/images/albums/lalah-hathaway.jpg',
  },
  {
    title: 'Emily\'s D+Evolution',
    artist: 'Esperanza Spalding',
    role: 'Mixing',
    year: '2016',
    image: '/images/albums/esperanza-spalding.jpg',
  },
  {
    title: 'ArtScience',
    artist: 'Robert Glasper Experiment',
    role: 'Mixing',
    year: '2016',
    image: '/images/albums/artscience.jpg',
  },
  {
    title: 'Colour of You',
    artist: 'Derrick Hodge',
    role: 'Producer / Mixer',
    year: '2017',
    image: '/images/albums/colour-of-you.jpg',
  },
]

const Works = () => {
  return (
    <section id="works" className="py-24 md:py-32 film-grain">
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-4 mb-16">
            <h2 className="font-headline text-4xl md:text-5xl">Selected Works</h2>
            <span className="flex-1 h-px bg-muted-gold/30" />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group cursor-pointer"
            >
              {/* Album artwork */}
              <div className="aspect-square bg-analog-brown/20 overflow-hidden mb-4">
                <div className="w-full h-full bg-analog-brown/10 flex items-center justify-center text-analog-brown/40 font-headline text-sm group-hover:scale-105 transition-transform duration-500">
                  {/* Replace with actual album art */}
                  <span className="text-center px-4">{project.title}</span>
                </div>
              </div>

              <h3 className="font-headline text-lg">{project.title}</h3>
              <p className="text-studio-black/60 text-sm mt-1">{project.artist}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-xs text-muted-gold tracking-widest uppercase">{project.role}</span>
                <span className="text-studio-black/30">·</span>
                <span className="text-xs text-studio-black/40">{project.year}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Works
