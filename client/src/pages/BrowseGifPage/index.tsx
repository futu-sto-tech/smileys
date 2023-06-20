import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AppContext from '../../shared/AppContext'
import { GifList } from '../../components/GifList'
import styles from './index.module.scss'
import Input from '../../components/Input'
import { IAppProvider } from '../../types/AppContext'
import { Session } from '../../types/types'
interface RoomPageProps {
  session: Session
}

function BrowseGifPage({ session }: RoomPageProps) {
  const { setGifSearchTerm }: IAppProvider = useContext(AppContext)

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGifSearchTerm(e.target.value)
  }

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <h1>How are you doing?</h1>
        <p className={styles.subtitle}>Pick a GIF to describe your mood </p>
        <Input
          onChange={handleSearch}
          className={styles.input}
          style={{
            backgroundImage: `url(/assets/icons/searchIcon.svg)`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: '1.2rem center',
            backgroundSize: '2rem',
            paddingLeft: '40px',
          }}
          placeholder={'happy, stressful, confusing'}
        ></Input>
      </div>
      <GifList className={styles.gifList} session={session} />
    </div>
  )
}

export default BrowseGifPage
