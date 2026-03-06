import { motion } from 'framer-motion'
import { SpotifyIcon, InstagramIcon } from '../components/SocialIcons'
import SineWaveShader from '../components/SineWaveShader'

const socialLinks = [
  { label: 'Spotify', href: 'https://open.spotify.com/playlist/5LIK4EECx6fCIkjQESBbop', Icon: SpotifyIcon },
  { label: 'Instagram', href: 'https://instagram.com/qmillion1', Icon: InstagramIcon },
]

const Contact = () => {
  return (
    <section className="min-h-screen bg-base flex flex-col md:flex-row">
      {/* Left — Q Photo (55%) */}
      <div className="relative w-full md:w-[55%] h-[50vh] md:h-screen">
        <img
          src="/images/142-qmillion-02_optimized.jpg"
          alt="Q in the studio"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            outline: '1px solid rgba(232,220,200,0.12)',
            outlineOffset: '-12px',
          }}
        />
        {/* Gradient fade on right edge for desktop */}
        <div className="hidden md:block absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-base to-transparent" />
        {/* Gradient fade on bottom for mobile */}
        <div className="md:hidden absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-base to-transparent" />
      </div>

      {/* Right — Contact Info (45%) with sine wave shader */}
      <div className="relative w-full md:w-[45%] flex items-center md:h-screen overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <SineWaveShader />
        </div>
        <div className="relative z-10 w-full px-8 md:px-16 lg:px-20 py-16 md:py-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3 }}
          >
            <h1 className="font-display text-6xl md:text-7xl lg:text-[80px] text-cream tracking-wider leading-none">
              WORK
              <br />
              WITH Q
            </h1>

            <div className="w-12 h-px bg-amber mt-8 mb-6" />

            <p className="text-cream-muted text-sm tracking-wide">
              Taking select projects. Reach out.
            </p>
          </motion.div>

          {/* Email */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-14"
          >
            <p className="text-amber text-[11px] tracking-[0.3em] uppercase mb-3">
              Email
            </p>
            <a
              href="mailto:hello@qmillion.com"
              className="text-cream text-lg md:text-xl hover:text-amber transition-colors duration-300"
            >
              hello@qmillion.com
            </a>
          </motion.div>

          {/* Social Icons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="mt-14 flex items-center gap-5"
          >
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="text-amber hover:text-cream transition-colors duration-300"
              >
                <link.Icon size={28} />
              </a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact
