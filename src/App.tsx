import Header from './components/Header'
import Intro from './components/Intro'
import AboutMe from './components/AboutMe'
import Skills from './components/Skills'
import Experience from './components/Experiences'
import TabBar from './components/TabBar'
import Projects from './components/Projects'
// import Contact from './components/Contact'
// import Footer from './components/Footer'
import ReturnToTop from './components/ReturnToTop'

function App() {
  return (
    <>
      <Header />
      <Intro />
      <AboutMe />
      <Skills />
      <Experience />
      <TabBar activeTab="projects" onTabChange={() => {}} />
      <Projects />

      {/* <Contact />
      <Footer /> */}
      <ReturnToTop />
    </>
  )
}

export default App
