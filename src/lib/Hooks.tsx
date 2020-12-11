import { useEffect, useState } from 'react'

export function useMediaPoint() {
  const [isDesktop, setIsDesktop] = useState(false)
  const [isPhone, setIsPhone] = useState(false)
  useEffect(() => {
    const desktop = `(min-width:1024px)`
    const phone = `(min-width: 540px)`
    const deskViewPort = window.matchMedia(desktop)
    const phoneViewPort = window.matchMedia(phone)
    const mediaHandler = () => {
      if (deskViewPort.matches) {
        setIsDesktop(true)
      } else {
        setIsDesktop(false)
      }

      if (phoneViewPort.matches) {
        setIsPhone(true)
      } else {
        setIsPhone(false)
      }
    }

    window.addEventListener('resize', mediaHandler)
    window.addEventListener('load', mediaHandler)

    return () => {
      window.removeEventListener('resize', mediaHandler)
      window.removeEventListener('load', mediaHandler)
    }
  }, [])

  return { isDesktop, isPhone }
}

export function useMediaPhone() {
  const [isPhone, setIsPhone] = useState(false)

  useEffect(() => {
    const phone = `(min-width:540px)`
    const mediaHandler = (e: MediaQueryListEvent): void => {
      if (e.matches) {
        setIsPhone(true)
      } else {
        setIsPhone(false)
      }
    }
    const mediaObject = window.matchMedia(phone)
    mediaObject.addEventListener('change', mediaHandler)
    return () => {
      mediaObject.removeEventListener('change', mediaHandler)
    }
  }, [])

  return isPhone
}
