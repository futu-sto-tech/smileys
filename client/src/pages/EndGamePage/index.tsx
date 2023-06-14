import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/Button'

function EndGamePage() {
  const navigate = useNavigate()
  return (
    <>
      <h1>Room Ended!</h1>
      <Button
        onClick={() => {
          navigate('/')
        }}
      >
        Go to homepage
      </Button>
    </>
  )
}

export default EndGamePage
