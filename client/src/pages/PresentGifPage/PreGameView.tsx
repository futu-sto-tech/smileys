import { Button } from '../../components/Button'
import Tooltip from '../../components/Tooltip'
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
    const handleCopy = () => {
      navigator.clipboard.writeText(`${window.location.hostname}/${code}`)
    }

  return (
    <div className="flex w-full h-full justify-center items-center p-[15px]">
      {isCreator ? (
        <div className={`${styles.background} flex flex-col bg-white h-full w-full rounded px-[40px] py-[20px]`}>
          <h1 className="text-md">You're running this session!</h1>
          <h2 className="text-base mb-[12.5px]">Next you might want to ...</h2>
          <div className="flex flex-col gap-[10px]">
            <ListItem>
              <div className="font-bold border-solid text-base py-[2px] px-[9px] rounded">1.</div>
              <p className="font-bold text-base">
                Invite your team by sharing this link:{' '}
                <Tooltip content={<p>Copied!</p>} triggerOnClick>
                  <span className="text-blue-800 cursor-pointer" onClick={handleCopy}>{`${window.location.hostname}/${code}`}</span>
                </Tooltip>
              </p>
            </ListItem>
            <ListItem>
              <div className="font-bold border-solid text-base py-[2px] px-[9px] rounded">2.</div>
              <p className="font-bold text-base mr-2">Share your screen using your favourite video tool</p>
              <a href="https://meet.google.com/" target="_blank">
                <img
                  className="mr-[4px] mt-[3px]"
                  src="/assets/images/gmeet.png"
                  height="18px"
                  alt="google meet logo"
                />
              </a>
              <a href="https://pwa.zoom.us/wc/" target="_blank">
                <img className=" mr-[1px] mt-[3px]" height="18px" src="/assets/images/zoom.png" alt="" />
              </a>
              <a href="https://teams.microsoft.com/" target="_blank">
                <img className="ml-[1px] mt-[3px]" height="18px" src="/assets/images/teams.png" alt="" />
              </a>
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
