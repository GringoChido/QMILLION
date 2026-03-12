import { Suspense, lazy } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import Home from './pages/Home'

const Discography = lazy(() => import('./pages/Discography'))
const About = lazy(() => import('./pages/About'))
const Press = lazy(() => import('./pages/Press'))
const Contact = lazy(() => import('./pages/Contact'))
const NotFound = lazy(() => import('./pages/NotFound'))

const App = () => {
  const { pathname } = useLocation()
  const hideFooter = pathname === '/contact'

  return (
    <div className="film-grain">
      <a href="#main-content" className="skip-to-content">
        Skip to content
      </a>
      <ScrollToTop />
      <Navigation />
      <main id="main-content">
        <Suspense fallback={<div className="min-h-screen bg-base" />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/discography" element={<Discography />} />
            <Route path="/about" element={<About />} />
            <Route path="/press" element={<Press />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      {!hideFooter && <Footer />}
    </div>
  )
}

export default App
