import { Routes, Route, useLocation } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import Home from './pages/Home'
import Discography from './pages/Discography'
import About from './pages/About'
import Press from './pages/Press'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

const App = () => {
  const { pathname } = useLocation()
  const hideFooter = pathname === '/contact'

  return (
    <div className="film-grain">
      <ScrollToTop />
      <Navigation />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/discography" element={<Discography />} />
          <Route path="/about" element={<About />} />
          <Route path="/press" element={<Press />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!hideFooter && <Footer />}
    </div>
  )
}

export default App
