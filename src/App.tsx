import Navigation from './components/Navigation'
import Hero from './components/Hero'
import Works from './components/Works'
import Discography from './components/Discography'
import About from './components/About'
import Press from './components/Press'
import Contact from './components/Contact'
import Footer from './components/Footer'

const App = () => {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <Works />
        <Discography />
        <About />
        <Press />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
