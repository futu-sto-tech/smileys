import { ChangeEvent, useContext, useState } from 'react'
import { SmileyLogo } from '../../../components/SVGs/Logos'
import Input from '../../../components/Input'
import styles from './index.module.scss'
import { Button } from '../../../components/Button'
import AppContext from '../../../shared/AppContext'
import { IAppProvider } from '../../../types/AppContext'
import { Link, useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import classNames from 'classnames'
import * as serverService from '../../../services/server'
import { ApiError } from '../../../types/errors'
import FeedbackForm from '../../../components/Feedback'

function Navbar() {
  const [roomId, setRoomId] = useState('')
  const [error, setError] = useState<ApiError>()
  const { user, joinSession }: IAppProvider = useContext(AppContext)
  const navigate = useNavigate()
  let location = useLocation()

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const lowerCase = e.target.value.toUpperCase()
    const latinized = lowerCase.replace(/[^A-Z]/, '')
    if (lowerCase !== latinized) setError(new Error('Unsupported character'))
    setRoomId(latinized)
    e.target.value = latinized
  }

  async function handleJoin() {
    const { err, data } = await serverService.checkIfSessionExists(roomId)

    if (err) return setError(err)
    if (!data) return setError(new Error("Room doesn't exist"))

    if (!user.name) {
      navigate(`/name/${roomId}`)
    } else {
      data &&
        joinSession(roomId, () => {
          navigate(`/browse/${roomId}`)
        })
    }
  }

  // Remove after bug is fixed
  // Bug: End page -> click on logo -> Create new session -> App navigates to /end
  const isOnEndPage = location.pathname.includes('/end')
  console.log('isOnEndPage', isOnEndPage)

  const showFeedbackForm = location.pathname.match(/\/.{4}$/)

  const cx = classNames({
    [`${styles.navbarContainer}`]: true,
    [`${styles.homeLayout}`]: location && location.pathname === '/',
    [`${styles.logo_centered}`]:
      (location && location.pathname.includes('/create')) ||
      location.pathname.includes('/browse') ||
      location.pathname.includes('/end') ||
      location.pathname.includes('/name') ||
      //  18 is the length of the characters in the giphy api url
      location.pathname.match(/.+\/.{18}$/),
  })

  const codeInputContainer = (
    <div className={styles.codeInputContainer}>
      <div className={styles.inputContainerText}>Join your team here</div>
      <Input placeholder="Enter room code" onChange={handleInputChange} error={error} onEnter={handleJoin}></Input>
      <Button onClick={handleJoin} size="large">
        Join
      </Button>
    </div>
  )

  return (
    <nav className={cx}>
      {isOnEndPage ? (
        <SmileyLogo color="black" className={styles.smileysLogo} />
      ) : (
        <Link to={isOnEndPage ? '' : '/'}>
          <SmileyLogo color="black" className={styles.smileysLogo} />
        </Link>
      )}
      {showFeedbackForm && <FeedbackForm />}
      {location && location.pathname === '/' ? codeInputContainer : null}
    </nav>
  )
}

export default Navbar
