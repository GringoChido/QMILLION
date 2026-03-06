import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6">
      <h1 className="font-display text-[20vw] md:text-[14vw] text-cream/10 leading-none tracking-wider">
        404
      </h1>
      <p className="text-cream-muted text-sm tracking-wider uppercase mt-4">
        Page not found
      </p>
      <Link
        to="/"
        className="mt-8 text-amber text-xs tracking-[0.2em] uppercase hover:text-cream transition-colors duration-300"
      >
        Back to Home &rarr;
      </Link>
    </section>
  )
}

export default NotFound
