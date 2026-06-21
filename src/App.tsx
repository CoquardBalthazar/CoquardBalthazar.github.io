import { lazy, Suspense } from 'react'
import Header from './components/Header'
import Intro from './components/Intro'
import AboutMe from './components/AboutMe'

const ThreeDemo = lazy(() => import('./components/ThreeDemo'))
import Skills from './components/Skills'
import Experience from './components/Experiences'
import Work from './components/Work'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ReturnToTop from './components/ReturnToTop'

function App() {
  return (
    <>
      <Header />
      <Intro />
      <Suspense fallback={<div style={{ height: '60vh', background: 'var(--dark)' }} />}>
        <ThreeDemo />
      </Suspense>
      <AboutMe />
      <Skills />
      <Experience />
      <Work />
      <Contact />
      <Footer />
      <ReturnToTop />
    </>
  )
}

export default App
