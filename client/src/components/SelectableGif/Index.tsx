import { useNavigate } from 'react-router-dom'
import { Gif } from '../Gif'
import { useContext, useState } from 'react'
import AppContext from '../../shared/AppContext'
import { IAppProvider } from '../../types/AppContext'
import styles from './Selectable.module.scss'
import { Session } from '../../types/types'

interface SelectableGifProps {
  url: string
  id: string
  height: number
  session: Session
}

export function SelectableGif({ url, id, height, session }: SelectableGifProps) {
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const { user, setUser }: IAppProvider = useContext(AppContext)
  return (
    <div
      onClick={() => {
        navigate(`/${session.code}/${id}`)
      }}
    >
      {loading && <div style={{ height: height * (400 / 200) }} className={`${styles.placeholder} ${styles.gif}`} />}
      <img
        src={url}
        className={styles.gif}
        onLoad={() => {
          setLoading(false)
        }}
      />
    </div>
  )
}
