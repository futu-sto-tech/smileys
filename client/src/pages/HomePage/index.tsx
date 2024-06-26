import { useContext, useState } from 'react'
import AppContext from '../../shared/AppContext'
import { Button } from '../../components/Button'
import { IAppProvider } from '../../types/AppContext'
import { useNavigate } from 'react-router-dom'
import styles from './index.module.scss'
import Typewriter from 'typewriter-effect'

function HomePage() {
  const { createSession }: IAppProvider = useContext(AppContext)
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  function handleCreate() {
    setIsLoading(true)
    createSession((roomId) => {
      setIsLoading(false)
      navigate(`/create/${roomId}`)
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
      <h1 className={styles.heading}>A way for your remote</h1>
      <h1 className={`${styles.heading} ${styles.secondRow}`}>
        team to <span className={styles.typeWriter}>{typeWriter}</span>
      </h1>
      <h2>
        Create your own room to make your meetings less informal and build better connections in your virtual team.
      </h2>
      <Button
        buttonColor={isLoading ? 'gray' : 'green'}
        disabled={isLoading}
        size="large"
        className={`${styles.createAnewRoomButton}`}
        onClick={handleCreate}
        isLoading={isLoading}
        data-testid="first-create-room-button"
      >
        Create a room
      </Button>
      <img height={'750px'} className={styles.laptop} src="../../assets/images/laptop.png" />
      <h1 className={`${styles.heading} ${styles.getStarted}`}>Get started with your team</h1>
      <div className={styles.getStartedContainer}>
        <div className={styles.step}>
          <span className={`fa-stack fa-sm ${styles.numberedIcon}`}>
            <i className="fa fa-circle fa-stack-2x" style={{ color: 'var(--primary-green)' }}></i>
            <i className="fa fa-stack-1x">1</i>
          </span>
          Create a room
        </div>
        <div className={styles.step}>
          <span className={`fa-stack fa-sm ${styles.numberedIcon}`}>
            <i className="fa fa-circle fa-stack-2x" style={{ color: 'var(--primary-green)' }}></i>
            <i className="fa fa-stack-1x">2</i>
          </span>
          Share link
        </div>
        <div className={styles.step}>
          <span className={`fa-stack fa-sm ${styles.numberedIcon}`}>
            <i className="fa fa-circle fa-stack-2x" style={{ color: 'var(--primary-green)' }}></i>
            <i className="fa fa-stack-1x">3</i>
          </span>
          Schedule meeting
        </div>
      </div>
      <Button size="large" className={styles.createAnewRoomButton} onClick={handleCreate}>
        Create a room
      </Button>
    </div>
  )
}
export default HomePage
