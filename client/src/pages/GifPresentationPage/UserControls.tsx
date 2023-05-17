import styles from './UserControls.module.scss'
import { Button } from '../../components/Button'

function UserControls() {
  return (
    <div className={styles.userControlContainer}>
      <Button>Button</Button>
      <Button>Button</Button>
      <Button>Button</Button>
    </div>
  )
}

export default UserControls
