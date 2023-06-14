import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/Button'
import Confetti from 'react-confetti'

function EndGamePage() {
  const navigate = useNavigate()

  const confettiHalfWidth = 100

  return (
    <>
      <Confetti
        confettiSource={{
          x: screen.width / 2 - confettiHalfWidth,
          y: screen.height * 0.9,
          w: confettiHalfWidth,
          h: 0,
        }}
        initialVelocityY={{ min: -15, max: -1 }}
        initialVelocityX={{ min: -7, max: 7 }}
        style={{ zIndex: 0 }}
      />
      <h1>Smileys Session - Completed!</h1>
      <p style={{ fontSize: '2rem', margin: '15px 0 15px 0' }}>Thank you for joining us in this session!</p>
      <p style={{ fontSize: '2rem', textAlign: 'center' }}>
        We're thrilled to announce that the host has successfully concluded the game, making it a fantastic success.
        Your presence and participation have been instrumental in creating a truly celebratory atmosphere, and we can't
        wait to have you join us for more exciting events in the future!
      </p>
      <Button
        style={{ marginTop: 200 }}
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
