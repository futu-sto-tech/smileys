import styles from './UserControls.module.scss'
import { Button } from '../../components/Button'

function UserControls() {
  return (
    <div className={styles.userControlContainer}>
      <Button>Next</Button>
      <Button>Next</Button>
      <Button>Next</Button>
    </div>
  )
}

export default UserControls
