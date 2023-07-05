import { useEffect, useState } from 'react'

type Key = 'Escape' | 'Enter' | 'Space'

const useListenKeyDown = (key: Key, onKeyDown: () => void) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === key) {
        onKeyDown()
      }
    }

    // Attach the event listener when the component mounts
    document.addEventListener('keydown', handleKeyDown)

    // Detach the event listener when the component unmounts
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])
}
export default useListenKeyDown
