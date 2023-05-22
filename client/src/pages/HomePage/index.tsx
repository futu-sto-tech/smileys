import { useContext, useEffect, useState } from 'react'
import AppContext from '../../shared/AppContext'
import { Button } from '../../components/Button'
import { IAppProvider } from '../../types/AppContext'
import { useNavigate } from 'react-router-dom'
import styles from './index.module.scss'
import Typewriter from 'typewriter-effect'
import classNames from 'classnames'

function HomePage() {
  const { user, createSession }: IAppProvider = useContext(AppContext)
  const navigate = useNavigate()

  function handleCreate() {
    createSession((newRoomId) => {
      navigate(`/create/${newRoomId}`)
    })
  }

  const typeWriterOptions = {
    strings: ['socialize', 'check-in', 'connect', 'gather', 'catch up', 'have fun', 'get together'],
    autoStart: true,
    loop: true,
    delay: 50,
  }

  const typeWriter = (
    <div className={styles.staticTypeWriterWrapper}>
      <Typewriter
        onInit={(typewriter) => {
          typewriter.pauseFor(2500).start()
        }}
        options={typeWriterOptions}
      />
    </div>
  )

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>A fun way for your remote</h1>
      <h1 className={`${styles.heading} ${styles.secondRow}`}>
        team to <span className={styles.typeWriter}>{typeWriter}</span>
      </h1>
      <Button onClick={handleCreate}>Create a New Session</Button>
    </div>
  )
}
export default HomePage
