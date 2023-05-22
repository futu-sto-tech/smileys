import { useContext, useState } from 'react'
import { SmileyLogo } from '../../../components/CodeTextField/Logos/Logos'
import Input from '../../../components/Input'
import styles from './index.module.scss'
import { Button } from '../../../components/Button'
import AppContext from '../../../shared/AppContext'
import { IAppProvider } from '../../../types/AppContext'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

function Navbar() {
  const [roomId, setRoomId] = useState('')
  const { user, joinSession }: IAppProvider = useContext(AppContext)
  const navigate = useNavigate()
  let location = useLocation()

  function handleJoin() {
    if (user.name) {
      joinSession(roomId, () => {
        navigate(`/${roomId}`)
      })
    } else {
      navigate(`/name/${roomId}`)
    }
  }

  return (
    <nav className={styles.navbarContainer}>
      <SmileyLogo color="black" className={styles.smileysLogo} />
      <div className={styles.codeInputContainer}>
        <div className={styles.inputContainerText}>Join your team here</div>
        <Input
          placeholder="Code"
          onChange={(e) => {
            setRoomId(e.target.value)
          }}
        ></Input>
        <Button onClick={handleJoin}>Join</Button>
      </div>
    </nav>
  )
}

export default Navbar
