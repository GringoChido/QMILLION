import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { SpotifyIcon, InstagramIcon } from './SocialIcons'

const navLinks = [
  { label: 'Discography', href: '/discography' },
  { label: 'About', href: '/about' },
  { label: 'Press', href: '/press' },
  { label: 'Contact', href: '/contact' },
]

const socialLinks = [
  { label: 'Spotify', href: 'https://open.spotify.com/playlist/5LIK4EECx6fCIkjQESBbop', Icon: SpotifyIcon },
  { label: 'Instagram', href: 'https://instagram.com/qmillion1', Icon: InstagramIcon },
]

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setIsOpen(false)
  }, [location])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 ${isOpen ? 'z-[60]' : 'z-50'} transition-all duration-500 ${
          scrolled || isOpen ? 'bg-base/80 backdrop-blur-md' : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-5 flex items-center justify-between">
          {/* Wordmark */}
          <Link to="/" className="font-display text-2xl md:text-3xl text-cream tracking-wide">
            QMILLION
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-8">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className={`text-xs tracking-[0.2em] uppercase transition-colors duration-300 ${
                      location.pathname === link.href
                        ? 'text-amber'
                        : 'text-cream-muted hover:text-cream'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Social icons */}
            <div className="flex items-center gap-4 ml-4 pl-4 border-l border-dark-rule">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="text-amber-muted hover:text-amber transition-colors duration-300"
                >
                  <link.Icon size={18} />
                </a>
              ))}
            </div>

            {/* CTA */}
            <Link
              to="/contact"
              className="text-xs tracking-[0.2em] uppercase text-amber border border-amber/30 px-5 py-2 hover:border-amber/50 hover:text-cream transition-all duration-300"
            >
              Work with Q
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-cream"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile fullscreen menu — sibling to nav, not nested inside */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[55] bg-base flex flex-col justify-center px-8 md:hidden"
          >
            <ul className="space-y-5">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.1 + i * 0.1,
                    duration: 0.7,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <Link
                    to={link.href}
                    className={`font-display text-5xl tracking-wide transition-colors duration-300 ${
                      location.pathname === link.href
                        ? 'text-amber'
                        : 'text-cream hover:text-amber'
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 + navLinks.length * 0.1 + 0.15, duration: 0.8 }}
              className="flex gap-6 mt-12 pt-8 border-t border-dark-rule"
            >
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="text-amber-muted hover:text-amber transition-colors duration-300"
                >
                  <link.Icon size={24} />
                </a>
              ))}
            </motion.div>

            {/* Mobile CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 + navLinks.length * 0.1 + 0.3, duration: 0.8 }}
              className="mt-8"
            >
              <Link
                to="/contact"
                className="inline-block text-sm tracking-[0.2em] uppercase text-amber border border-amber/30 px-8 py-4 hover:border-amber/50 hover:text-cream transition-all duration-300"
              >
                Work with Q &rarr;
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navigation
