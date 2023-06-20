import styles from './UserControls.module.scss'
import { Button } from '../../components/Button'
import { IAppProvider } from '../../types/AppContext'
import AppContext from '../../shared/AppContext'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

interface UserControlsProps {
  isCreator: boolean
}

function UserControls({ isCreator }: UserControlsProps) {
  const { deleteSession }: IAppProvider = useContext(AppContext)
  const navigate = useNavigate()
  const restrictToCreator = isCreator ? 'block' : 'none'

  function handleEndSession() {
    deleteSession()
    navigate('/end')
  }

  return (
    <div style={{ display: restrictToCreator }} className={styles.userControlContainer}>
      <Button buttonColor="red" onClick={handleEndSession}>
        End Session
      </Button>
    </div>
  )
}

export default UserControls
