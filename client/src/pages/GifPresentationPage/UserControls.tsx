import styles from './UserControls.module.scss'
import { Button } from '../../components/Button'

interface UserControlsProps {
  isCreator: boolean
}

function UserControls({ isCreator }: UserControlsProps) {
  const restrictToCreator = isCreator ? 'block' : 'none'
  return (
    <div className={styles.userControlContainer}>
      <Button>Button</Button>
      <Button>Button</Button>
      <Button style={{ display: restrictToCreator }} buttonColor="red">
        End Session
      </Button>
    </div>
  )
}

export default UserControls
