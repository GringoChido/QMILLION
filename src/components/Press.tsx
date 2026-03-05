import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

interface PressItem {
  publication: string
  headline: string
  url: string
  year: string
}

const pressItems: PressItem[] = [
  {
    publication: 'Grammy.com',
    headline: 'Best R&B Album — Robert Glasper Experiment',
    url: '#',
    year: '2013',
  },
  {
    publication: 'Billboard',
    headline: 'The Engineers Behind The Sound of Modern Jazz',
    url: '#',
    year: '2016',
  },
  {
    publication: 'NPR Music',
    headline: 'Tiny Desk Sessions — Behind The Board',
    url: '#',
    year: '2018',
  },
  {
    publication: 'Tape Op Magazine',
    headline: 'Analog Mixing In A Digital World',
    url: '#',
    year: '2019',
  },
]

const Press = () => {
  return (
    <section id="press" className="py-24 md:py-32 bg-studio-black text-cream">
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-4 mb-16">
            <h2 className="font-headline text-4xl md:text-5xl">Press</h2>
            <span className="flex-1 h-px bg-muted-gold/30" />
          </div>
        </motion.div>

        <div className="space-y-0">
          {pressItems.map((item, i) => (
            <motion.a
              key={item.headline}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group flex items-start md:items-center justify-between py-6 border-b border-cream/10 hover:border-muted-gold/40 transition-colors duration-300"
            >
              <div className="flex-1">
                <p className="text-xs text-muted-gold tracking-widest uppercase mb-2">
                  {item.publication} — {item.year}
                </p>
                <p className="font-headline text-lg md:text-xl group-hover:text-muted-gold transition-colors duration-300">
                  {item.headline}
                </p>
              </div>
              <ArrowUpRight
                size={20}
                className="text-cream/20 group-hover:text-muted-gold transition-colors duration-300 ml-4 mt-1 flex-shrink-0"
              />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Press
