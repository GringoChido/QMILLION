import { motion } from 'framer-motion'
import AlbumCover from '../components/AlbumCover'
import { AlbumThumb } from '../components/AlbumCover'
import DigitalAurora from '../components/DigitalAurora'

interface Credit {
  artist: string
  album: string
  role: string
  year: string
  grammy?: boolean
}

interface FeaturedAlbum extends Credit {
  note: string
  tint: 'amber' | 'green' | 'red'
}

const featured: FeaturedAlbum[] = [
  {
    artist: 'Robert Glasper Experiment',
    album: 'Black Radio',
    role: 'Mixing',
    year: '2012',
    grammy: true,
    note: 'Grammy Award — Best R&B Album',
    tint: 'amber',
  },
  {
    artist: 'Robert Glasper Experiment',
    album: 'Black Radio 2',
    role: 'Mixing',
    year: '2013',
    grammy: true,
    note: 'Grammy Nominated',
    tint: 'green',
  },
  {
    artist: 'R+R=Now',
    album: 'Collagically Speaking',
    role: 'Mixing',
    year: '2018',
    note: '#1 Billboard Jazz',
    tint: 'red',
  },
  {
    artist: 'Seun Kuti',
    album: 'Black Times',
    role: 'Mixing',
    year: '2018',
    note: 'Afrobeat meets the future',
    tint: 'amber',
  },
  {
    artist: 'Esperanza Spalding',
    album: "Emily's D+Evolution",
    role: 'Mixing',
    year: '2016',
    grammy: true,
    note: 'Grammy Winner',
    tint: 'green',
  },
]

const archiveJazzSoul: Credit[] = [
  { artist: 'Robert Glasper', album: 'Covered', role: 'Mixing', year: '2015' },
  { artist: 'Robert Glasper Experiment', album: 'ArtScience', role: 'Mixing', year: '2016' },
  { artist: 'Derrick Hodge', album: 'Live Today', role: 'Producer / Mixer', year: '2014' },
  { artist: 'Derrick Hodge', album: 'The Second', role: 'Mixing', year: '2016' },
  { artist: 'Keyon Harrold', album: 'The Mugician', role: 'Mixing', year: '2017' },
  { artist: 'Chris Dave and the Drumhedz', album: 'Chris Dave and the Drumhedz', role: 'Mixing', year: '2018' },
  { artist: 'Lalah Hathaway', album: 'Where It All Begins', role: 'Mixing', year: '2011' },
]

const archiveHipHopRnb: Credit[] = [
  { artist: 'Jill Scott', album: 'Woman', role: 'Mixing', year: '2015' },
  { artist: 'Common', album: "Nobody's Smiling", role: 'Mixing', year: '2014' },
  { artist: 'Bilal', album: 'A Love Surreal', role: 'Mixing', year: '2013' },
  { artist: 'Tweet', album: 'Charlene', role: 'Mixing', year: '2016' },
  { artist: 'Kurupt', album: 'Space Boogie', role: 'Mixing', year: '2012' },
  { artist: 'Jillian Speer', album: 'Wet With Fire', role: 'Production & Mixing', year: '2019' },
  { artist: 'Robert Glasper', album: 'Fuck Yo Feelings', role: 'Mixing', year: '2019' },
]

const archiveDancehall: Credit[] = [
  { artist: 'Beenie Man', album: 'Undisputed', role: 'Mixing', year: '2006' },
  { artist: 'Wayne Wonder', album: 'Foreva', role: 'Mixing', year: '2007' },
]

const archiveCategories = [
  { title: 'Jazz & Soul', credits: archiveJazzSoul },
  { title: 'Hip Hop & R&B', credits: archiveHipHopRnb },
  { title: 'Dancehall & Afrobeat', credits: archiveDancehall },
  { title: 'Film & Television', credits: [] as Credit[] },
]

const CreditRow = ({ credit, index }: { credit: Credit; index: number }) => (
  <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.03 }}
    className="flex items-center gap-3 py-3 border-b border-dark-rule/60 group hover:border-amber/30 transition-colors duration-300"
  >
    <AlbumThumb album={credit.album} size={40} />
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-2">
        {credit.grammy && (
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber flex-shrink-0" />
        )}
        <span className="text-cream text-sm group-hover:text-amber transition-colors duration-300 truncate">
          {credit.artist}
        </span>
      </div>
      <span className="text-cream-muted text-sm italic truncate block">{credit.album}</span>
    </div>
    <div className="hidden md:block flex-shrink-0">
      <span className="text-amber/70 text-xs tracking-wider uppercase">{credit.role}</span>
    </div>
    <div className="flex-shrink-0 text-right">
      <span className="text-cream-muted/30 text-xs tabular-nums">{credit.year}</span>
    </div>
  </motion.div>
)

const Discography = () => {
  return (
    <>
      {/* Page hero — Aurora shader background */}
      <section className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-20 px-6 md:px-10">
        <DigitalAurora />
        <div className="relative z-10 max-w-[1400px] mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="font-display text-[14vw] md:text-[11vw] leading-[0.85] text-cream tracking-wider"
            style={{ textShadow: '0 2px 40px rgba(0,0,0,0.8), 0 0px 10px rgba(0,0,0,0.5)' }}
          >
            DISCOGRAPHY
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="flex items-center gap-3 mt-6"
          >
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber" />
            <span className="text-amber text-xs tracking-[0.2em] uppercase">Grammy Award</span>
          </motion.div>
        </div>
      </section>

      <div className="section-divider" />

      {/* FEATURED ALBUMS */}
      <section className="bg-textured py-20 md:py-28 px-6 md:px-10">
        <div className="max-w-[1400px] mx-auto">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-amber text-xs tracking-[0.3em] uppercase mb-16"
          >
            Featured
          </motion.p>

          <div className="space-y-0">
            {/* Featured 1: Black Radio — full width */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 1 }}
              className="pb-20 md:pb-28"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
                <div className="md:col-span-5">
                  <div className="film-frame aspect-square max-w-[300px] md:max-w-[400px] mx-auto md:mx-0">
                    <AlbumCover
                      album={featured[0].album}
                      tint={featured[0].tint}
                      className="w-full h-full"
                    />
                  </div>
                </div>
                <div className="md:col-span-7">
                  {featured[0].grammy && (
                    <div className="flex items-center gap-2 mb-4">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber" />
                      <span className="text-amber text-xs tracking-[0.2em] uppercase">{featured[0].note}</span>
                    </div>
                  )}
                  <h3 className="font-display text-5xl md:text-6xl lg:text-7xl text-cream tracking-wide leading-none">
                    {featured[0].album}
                  </h3>
                  <p className="text-cream-muted text-sm mt-3">{featured[0].artist}</p>
                  <p className="text-cream-muted/40 text-xs mt-2">
                    {featured[0].role} &middot; {featured[0].year}
                  </p>
                </div>
              </div>
            </motion.div>

            <div className="section-divider" />

            {/* Featured 2-5: alternating grid */}
            {featured.slice(1).map((album, i) => {
              const isReversed = i % 2 === 0
              return (
                <motion.div
                  key={album.album}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 1 }}
                  className="py-16 md:py-24"
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
                    <div className={`md:col-span-4 ${isReversed ? 'md:order-2' : 'md:order-1'}`}>
                      <div className="film-frame aspect-square max-w-[280px] md:max-w-[400px] mx-auto md:mx-0">
                        <AlbumCover
                          album={album.album}
                          tint={album.tint}
                          className="w-full h-full"
                        />
                      </div>
                    </div>
                    <div className={`md:col-span-8 ${isReversed ? 'md:order-1' : 'md:order-2'}`}>
                      {album.grammy && (
                        <div className="flex items-center gap-2 mb-3">
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber" />
                          <span className="text-amber text-xs tracking-[0.2em] uppercase">{album.note}</span>
                        </div>
                      )}
                      {!album.grammy && (
                        <p className="text-amber text-xs tracking-[0.2em] uppercase mb-3">{album.note}</p>
                      )}
                      <h3 className="font-display text-4xl md:text-5xl text-cream tracking-wide leading-none">
                        {album.album}
                      </h3>
                      <p className="text-cream-muted text-sm mt-3">{album.artist}</p>
                      <p className="text-cream-muted/40 text-xs mt-2">
                        {album.role} &middot; {album.year}
                      </p>
                    </div>
                  </div>
                  {i < featured.length - 2 && (
                    <div className="section-divider mt-16 md:mt-24" />
                  )}
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ARCHIVE */}
      <section className="bg-textured-alt py-20 md:py-28 px-6 md:px-10">
        <div className="max-w-[1400px] mx-auto">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-amber text-xs tracking-[0.3em] uppercase mb-16"
          >
            Archive
          </motion.p>

          <div className="space-y-20 md:space-y-28">
            {archiveCategories.map((category) => (
              <div key={category.title}>
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1 }}
                  className="mb-8 pb-4 border-b border-amber-muted/20"
                >
                  <h2 className="font-display text-3xl md:text-4xl text-amber tracking-wider">
                    {category.title}
                  </h2>
                </motion.div>

                {category.credits.length > 0 ? (
                  <div>
                    {category.credits.map((credit, i) => (
                      <CreditRow key={credit.album} credit={credit} index={i} />
                    ))}
                  </div>
                ) : (
                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="text-cream-muted/40 text-sm italic"
                  >
                    Credits forthcoming
                  </motion.p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default Discography
