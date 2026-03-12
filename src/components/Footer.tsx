import { Link } from 'react-router-dom'
import { SpotifyIcon, InstagramIcon } from './SocialIcons'

const navLinks = [
  { label: 'Discography', to: '/discography' },
  { label: 'About', to: '/about' },
  { label: 'Press', to: '/press' },
  { label: 'Contact', to: '/contact' },
]

const socialLinks = [
  { label: 'Spotify', href: 'https://open.spotify.com/playlist/5LIK4EECx6fCIkjQESBbop', Icon: SpotifyIcon },
  { label: 'Instagram', href: 'https://instagram.com/qmillion1', Icon: InstagramIcon },
]

const Footer = () => {
  return (
    <footer className="bg-base px-6 md:px-10 py-12">
      <div className="max-w-[1400px] mx-auto space-y-5">
        {/* Nav row */}
        <div className="flex flex-wrap gap-x-4 gap-y-2">
          {navLinks.map((link, i) => (
            <span key={link.to} className="flex items-center gap-4">
              <Link
                to={link.to}
                className="font-mono text-[11px] text-cream-muted/60 hover:text-amber tracking-[0.15em] uppercase transition-colors duration-300"
              >
                {link.label}
              </Link>
              {i < navLinks.length - 1 && (
                <span className="text-cream-muted/20 text-[11px]">&middot;</span>
              )}
            </span>
          ))}
        </div>

        {/* Social row */}
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber hover:text-cream transition-colors duration-300"
              aria-label={link.label}
            >
              <link.Icon size={20} />
            </a>
          ))}
        </div>

        {/* Copyright */}
        <p className="font-mono text-[10px] text-muted tracking-[0.15em]">
          &copy; {new Date().getFullYear()} Qmillion
        </p>

        <p className="font-mono text-[10px] text-muted/60 tracking-[0.1em]">
          Built by{' '}
          <a
            href="https://untold.works"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-amber transition-colors duration-300"
          >
            Untold.works
          </a>
        </p>
      </div>
    </footer>
  )
}

export default Footer
