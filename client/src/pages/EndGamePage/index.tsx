import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/Button'
import Confetti from 'react-confetti'
import { useContext, useRef } from 'react'
import AppContext from '../../shared/AppContext'
import { IAppProvider } from '../../types/AppContext'

function EndGamePage() {
  const { setSessionEnded }: IAppProvider = useContext(AppContext)
  const navigate = useNavigate()

  const endGameGifs = [
    'https://media.giphy.com/media/DffShiJ47fPqM/giphy.gif',
    'https://media.giphy.com/media/xUA7aR5A5KCsZFgqK4/giphy.gif',
    'https://media.giphy.com/media/MNmyTin5qt5LSXirxd/giphy.gif',
    'https://media.giphy.com/media/vvbGMpbhZMcHSsD50w/giphy.gif',
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
      <div className="flex flex-col p-20 pb-10 items-center bg-primary-gray rounded shadow-lg z-10">
        <h1 className="text-white">Thanks for joining!</h1>
        <p className="text-white text-md pb-10">
          Now go kick ass and chew bubble gum <span className="text-lg">🍬</span>
        </p>
        <img height={400} src={randomGifUrlRef.current} alt="" />
        <Button
          className="mt-10"
          onClick={() => {
            setSessionEnded(false)
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
