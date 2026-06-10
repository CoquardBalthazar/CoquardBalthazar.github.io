import  { useState, useEffect } from 'react'
function ReturnToTop() {
    const [isVisible, setIsVisible] = useState(false)

    useEffect( () => {
        const handleScroll = () => {
            setIsVisible(window.scrollY > 250)
        }
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    // Function to scroll to the top
    const scrollToTop = () => {
        window.scrollTo({top : 0, behavior : 'smooth'})
    }


  return (
    <div id="return-to-top" className={isVisible ? 'visible' : ''} onClick={scrollToTop}>
      <img src="/assets/btn-return-top.svg" alt="Return to Top" />
    </div>
  )
}

export default ReturnToTop
