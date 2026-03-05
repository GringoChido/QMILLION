import { motion } from 'framer-motion'
import { Mail, Instagram } from 'lucide-react'

const Contact = () => {
  return (
    <section id="contact" className="py-24 md:py-32 film-grain">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4 mb-8">
              <h2 className="font-headline text-4xl md:text-5xl">Contact</h2>
              <span className="flex-1 h-px bg-muted-gold/30" />
            </div>

            <p className="text-lg text-studio-black/60 mb-12 leading-relaxed">
              For mixing, production, and collaboration inquiries.
            </p>

            <div className="space-y-6">
              <a
                href="mailto:hello@qmillion.com"
                className="group flex items-center gap-4 text-lg hover:text-muted-gold transition-colors duration-300"
              >
                <Mail size={20} className="text-muted-gold" />
                <span>hello@qmillion.com</span>
              </a>

              <a
                href="https://instagram.com/qmillion"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 text-lg hover:text-muted-gold transition-colors duration-300"
              >
                <Instagram size={20} className="text-muted-gold" />
                <span>@qmillion</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact
