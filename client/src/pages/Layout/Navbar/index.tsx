import { useContext, useState } from 'react'
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

  async function handleJoin() {
    const { err } = await serverService.checkIfSessionExists(roomId)

    if (err) return setError(err)

    if (!user.name) {
      navigate(`/name/${roomId}`)
    }

    joinSession(roomId, () => {
      navigate(`/${roomId}`)
    })
  }

  const cx = classNames({
    [`${styles.navbarContainer}`]: true,
    [`${styles.homeLayout}`]: location && location.pathname === '/',
    [`${styles.creationLayout}`]: location && location.pathname.includes('/create'),
  })

  const codeInputContainer = (
    <div className={styles.codeInputContainer}>
      <div className={styles.inputContainerText}>Join your team here</div>
      <Input
        placeholder="Enter room code"
        onChange={(e) => {
          setRoomId(e.target.value)
        }}
        error={error}
      ></Input>
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
