import { useEffect, useState } from 'react'

export function useMediaTablet() {
  const [isDesktop, setIsDesktop] = useState(false)

  /* useEffect(() => {
    const mediaHandler = (e: UIEvent): void => {
      if (window.innerWidth > 1024) {
        setIsDesktop(true)
      } else {
        setIsDesktop(false)
      }
    }
    window.addEventListener('resize', mediaHandler)

    return () => {
      window.removeEventListener('resize', mediaHandler)
    }
  }, []) */
  useEffect(() => {
    const desktop = `(min-width:1024px)`
    const mediaHandler = (e: MediaQueryListEvent): void => {
      if (e.matches) {
        setIsDesktop(true)
      } else {
        setIsDesktop(false)
      }
    }
    const mediaObject = window.matchMedia(desktop)
    mediaObject.addEventListener('change', mediaHandler)
  }, [])

  return isDesktop
}
