import { useNavigate } from 'react-router-dom'
import { Gif } from '../Gif'
import { useContext, useEffect, useRef, useState } from 'react'
import AppContext from '../../shared/AppContext'
import { IAppProvider } from '../../types/AppContext'
import styles from './Selectable.module.scss'
import { Session } from '../../types/types'

interface SelectableGifProps {
  downsampled_url: string
  original_url: string
  id: string
  height: number
  session: Session
}

export function SelectableGif({ original_url, downsampled_url, id, height, session }: SelectableGifProps) {
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()
  const [isVisible, setIsVisible] = useState(false)
  const imageRef = useRef(null)

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0,
    }

    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting)
    }, options)

    if (imageRef.current) {
      observer.observe(imageRef.current)
    }

    return () => {
      if (imageRef.current) {
        observer.unobserve(imageRef.current)
      }
    }
  }, [])

  return (
    <div
      ref={imageRef}
      onClick={() => {
        navigate(`/${session.code}/${id}`)
      }}
    >
      <div style={{ height: height * (400 / 200) }} className={`${styles.placeholder} ${styles.gif}`}>
        {isVisible && (
          <>
            {isLoading ? (
              <img
                src={downsampled_url}
                className={styles.gif}
                alt={`GIPHY ${id}`}
                onLoad={() => {
                  setIsLoading(false)
                }}
                data-testid="selectable-gif"
              />
            ) : (
              <img data-testid="selectable-gif" src={original_url} className={styles.gif} alt={`GIPHY ${id}`} />
            )}
          </>
        )}
      </div>
    </div>
  )
}
