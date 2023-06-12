import styles from './UserControls.module.scss'
import { Button } from '../../components/Button'
import { IAppProvider } from '../../types/AppContext'
import AppContext from '../../shared/AppContext'
import { useContext } from 'react'

interface UserControlsProps {
  isCreator: boolean
}

function UserControls({ isCreator }: UserControlsProps) {
  const { deleteSession }: IAppProvider = useContext(AppContext)
  const restrictToCreator = isCreator ? 'block' : 'none'
  return (
    <div className={styles.userControlContainer}>
      {/* <Button>Button</Button>
      <Button>Button</Button> */}
      <Button style={{ display: restrictToCreator }} buttonColor="red" onClick={deleteSession}>
        End Session
      </Button>
    </div>
  )
}

export default UserControls
