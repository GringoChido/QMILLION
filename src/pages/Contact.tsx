import { useState, lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import { SpotifyIcon, InstagramIcon } from '../components/SocialIcons'
import usePageMeta from '../hooks/usePageMeta'

const SineWaveShader = lazy(() => import('../components/SineWaveShader'))

const socialLinks = [
  { label: 'Spotify', href: 'https://open.spotify.com/playlist/5LIK4EECx6fCIkjQESBbop', Icon: SpotifyIcon },
  { label: 'Instagram', href: 'https://instagram.com/qmillion1', Icon: InstagramIcon },
]

const Contact = () => {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  usePageMeta({
    title: 'Contact',
    description: 'Work with Qmillion. Taking select mixing, producing, and composing projects.',
    path: '/contact',
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const params = new URLSearchParams()
    formData.forEach((value, key) => params.append(key, value.toString()))

    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString(),
      })
      setSubmitted(true)
    } catch {
      setSubmitting(false)
    }
  }

  return (
    <section className="min-h-screen bg-base flex flex-col md:flex-row">
      {/* Left — Q Photo (55%) */}
      <div className="relative w-full md:w-[55%] h-[50vh] md:h-screen md:sticky md:top-0">
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
        <div className="hidden md:block absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-base to-transparent" />
        <div className="md:hidden absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-base to-transparent" />
      </div>

      {/* Right — Contact Form (45%) with sine wave shader */}
      <div className="relative w-full md:w-[45%] md:min-h-screen overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <Suspense fallback={<div className="w-full h-full bg-gradient-to-br from-base via-[#1a1208] to-base" />}>
            <SineWaveShader />
          </Suspense>
        </div>

        <div className="relative z-10 w-full px-8 md:px-16 lg:px-20 py-16 md:py-32">
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

            <p className="text-cream-muted text-base tracking-wide">
              Taking select projects. Reach out.
            </p>
          </motion.div>

          {/* Form or Thank You */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-10"
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <p className="text-amber text-[11px] tracking-[0.3em] uppercase mb-3">
                  Message Sent
                </p>
                <p className="text-cream text-sm leading-relaxed">
                  Q will be in touch. Thank you.
                </p>
              </motion.div>
            ) : (
              <form
                name="contact"
                method="POST"
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <input type="hidden" name="form-name" value="contact" />
                <p className="hidden">
                  <label>
                    <input name="bot-field" />
                  </label>
                </p>

                <div>
                  <label htmlFor="name" className="text-amber text-[11px] tracking-[0.3em] uppercase block mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    autoComplete="name"
                    className="w-full bg-transparent border-b border-cream/20 focus:border-amber text-cream text-base pb-2 outline-none transition-colors duration-300 min-h-[48px]"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="text-amber text-[11px] tracking-[0.3em] uppercase block mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    autoComplete="email"
                    className="w-full bg-transparent border-b border-cream/20 focus:border-amber text-cream text-base pb-2 outline-none transition-colors duration-300 min-h-[48px]"
                  />
                </div>

                <div>
                  <label htmlFor="project" className="text-amber text-[11px] tracking-[0.3em] uppercase block mb-2">
                    Project Type
                  </label>
                  <select
                    id="project"
                    name="project"
                    className="w-full bg-transparent border-b border-cream/20 focus:border-amber text-cream text-base pb-2 outline-none transition-colors duration-300 cursor-pointer min-h-[48px]"
                  >
                    <option value="mixing" className="bg-base text-cream">Mixing</option>
                    <option value="producing" className="bg-base text-cream">Producing</option>
                    <option value="composing" className="bg-base text-cream">Composing</option>
                    <option value="other" className="bg-base text-cream">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="text-amber text-[11px] tracking-[0.3em] uppercase block mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    className="w-full bg-transparent border-b border-cream/20 focus:border-amber text-cream text-base pb-2 outline-none transition-colors duration-300 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="text-amber text-xs tracking-[0.3em] uppercase border border-amber/20 px-8 py-4 hover:border-amber/40 hover:text-cream transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Sending...' : 'Send Message \u2192'}
                </button>
              </form>
            )}
          </motion.div>

          {/* Secondary — email + social */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="mt-14 pt-8 border-t border-dark-rule"
          >
            <p className="text-cream-muted/40 text-[11px] tracking-[0.2em] uppercase mb-3">
              Or email directly
            </p>
            <a
              href="mailto:hello@qmillion.com"
              className="text-cream text-sm hover:text-amber transition-colors duration-300"
            >
              hello@qmillion.com
            </a>

            <div className="flex items-center gap-5 mt-6">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="text-amber hover:text-cream transition-colors duration-300"
                >
                  <link.Icon size={22} />
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact
