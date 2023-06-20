import { useEffect, useState } from 'react'

const useResolutionSupported = (minWidth: number) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const isSupportedResolution = windowWidth >= minWidth

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return isSupportedResolution
}

export default useResolutionSupported
