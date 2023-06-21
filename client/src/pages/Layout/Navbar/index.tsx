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
    }

    data &&
      joinSession(roomId, () => {
        navigate(`browse/${roomId}`)
      })
  }

  const cx = classNames({
    [`${styles.navbarContainer}`]: true,
    [`${styles.homeLayout}`]: location && location.pathname === '/',
    [`${styles.logo_centered}`]: location && location.pathname.includes('/create'),
    [`${styles.logo_centered}`]: location && location.pathname.includes('/browse'),
    //  18 is the length of the characters in the giphy api url
    [`${styles.logo_centered}`]: location && location.pathname.match(/.+\/.{18}$/),
  })

  const codeInputContainer = (
    <div className={styles.codeInputContainer}>
      <div className={styles.inputContainerText}>Join your team here</div>
      <Input placeholder="Enter room code" onChange={handleInputChange} error={error}></Input>
      <Button onClick={handleJoin} size="large">
        Join
      </Button>
    </div>
  )

  return (
    <nav className={cx}>
      <Link to="/">
        <SmileyLogo color="black" className={styles.smileysLogo} />
      </Link>
      {location && location.pathname === '/' ? codeInputContainer : null}
    </nav>
  )
}

export default Navbar
