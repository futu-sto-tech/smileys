import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/Button'
import styles from './index.module.scss'

function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <div className={styles.container}>
      <p className="text-xl font-bold">Page not found 😢</p>
      <Button
        style={{ marginTop: 200 }}
        onClick={() => {
          navigate('/')
        }}
      >
        Go to homepage
      </Button>
    </div>
  )
}

export default NotFoundPage
