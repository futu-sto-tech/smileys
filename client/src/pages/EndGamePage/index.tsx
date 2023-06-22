import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/Button'
import Confetti from 'react-confetti'
import { useEffect, useRef, useState } from 'react'

function EndGamePage() {
  const [seconds, setSeconds] = useState(0)
  const [randomValue, setRandomValue] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds + 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const changeTimer = setInterval(() => {
      setRandomValue(Math.round(Math.random() * 2 - 1))
    }, 2000)

    return () => clearInterval(changeTimer)
  }, [])

  const navigate = useNavigate()

  const confettiHalfWidth = 100

  const endGameGifs = [
    'https://media.giphy.com/media/DffShiJ47fPqM/giphy.gif',
    'https://media.giphy.com/media/xUA7aR5A5KCsZFgqK4/giphy.gif',
    'https://media.giphy.com/media/MNmyTin5qt5LSXirxd/giphy.gif',
    'https://media.giphy.com/media/vvbGMpbhZMcHSsD50w/giphy.gif',
    'https://media.giphy.com/media/joSNxeswxuc74Juo8X/giphy.gif',
    'https://media.giphy.com/media/oGO1MPNUVbbk4/giphy.gif',
    'https://media.giphy.com/media/pNpONEEg3pLIQ/giphy.gif',
    'https://media.giphy.com/media/8UF0EXzsc0Ckg/giphy.gif',
  ]

  const randomGifUrlRef = useRef(endGameGifs[Math.floor(Math.random() * endGameGifs.length)])

  return (
    <>
      <Confetti
        gravity={0}
        opacity={0.8}
        initialVelocityY={{ min: 0, max: 10 }}
        initialVelocityX={{ min: -7, max: 7 }}
        style={{ zIndex: 0 }}
      />
      <div className="flex flex-col p-20 pb-10 items-center bg-gray-50 rounded shadow-lg z-10">
        <h1>Thanks for joining!</h1>
        <p className="text-md pb-10">
          Now go kick ass and chew bubble gum <span className="text-lg">🍬</span>
        </p>
        <img height={400} src={randomGifUrlRef.current} alt="" />
        <Button
          className="mt-10"
          onClick={() => {
            navigate('/')
          }}
        >
          Go to homepage
        </Button>
      </div>
    </>
  )
}

export default EndGamePage
