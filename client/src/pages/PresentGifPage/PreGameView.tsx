import { Button } from '../../components/Button'
import styles from './PreGameView.module.scss'

interface PreGameViewProps {
  startGame: () => void
  isCreator: boolean
  code: string
}

const ListItem = ({ children }: { children: React.ReactNode }) => (
  <div className="flex gap-[9px] items-center bg-white/80 border-solid w-fit p-[9px] rounded">{children}</div>
)

function PreGameView({ startGame, isCreator, code }: PreGameViewProps) {
  console.log(code)
  return (
    <div className="flex w-full h-full justify-center items-center p-[15px]">
      {isCreator ? (
        <div className={`${styles.background} flex flex-col bg-white h-full w-full rounded px-[40px] py-[20px]`}>
          <h1 className="text-xl">You're running this session!</h1>
          <h2 className="text-base mb-[12.5px]">Next you might want to ...</h2>
          <div className="flex flex-col gap-[10px]">
            <ListItem>
              <div className="font-bold border-solid text-base py-[2px] px-[9px] rounded">1.</div>
              <p className="font-bold text-base">
                Invite your team:{' '}
                <a className="text-blue-800" href={`${window.location.hostname}/${code}`}>
                  {`${window.location.hostname}/${code}`}
                </a>
              </p>
            </ListItem>
            <ListItem>
              <div className="font-bold border-solid text-base py-[2px] px-[9px] rounded">2.</div>
              <p className="font-bold text-base mr-2">Share your screen using your favourite video tool</p>
              <img src="/assets/images/gmeet.png" alt="" />
              <img className="ml-1" src="/assets/images/teams.png" alt="" />
              <img className="ml-1" height={'33px'} src="/assets/images/zoom.png" alt="" />
            </ListItem>
            <ListItem>
              <div className="font-bold border-solid text-base py-[2px] px-[9px] rounded">3.</div>
              <p className="font-bold text-base">Start the session</p>
            </ListItem>
            <Button onClick={startGame}>Start</Button>
          </div>
        </div>
      ) : (
        <p className="text-white text-2xl font-semibold">Waiting for host to start 🏖</p>
      )}
    </div>
  )
}

export default PreGameView
