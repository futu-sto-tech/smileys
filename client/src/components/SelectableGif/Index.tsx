import { useNavigate } from 'react-router-dom'
import { Gif } from '../Gif'
import { useContext, useState } from 'react'
import AppContext from '../../shared/AppContext'
import { IAppProvider } from '../../types/AppContext'
import styles from './Selectable.module.scss'

export function SelectableGif({ url, id, height }: { url: string; id: string; height: number }) {
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const { session }: IAppProvider = useContext(AppContext)
  return (
    <div
      onClick={() => {
        session && navigate(`/${session.code}/${id}`)
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
