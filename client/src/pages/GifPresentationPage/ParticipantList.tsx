import styles from './ParticipantList.module.scss'
import { Button } from '../../components/Button'
import { Session, User } from '../../types/types'
import { IAppProvider } from '../../types/AppContext'
import { useContext } from 'react'
import AppContext from '../../shared/AppContext'

interface ParticipantListProps {
  users: User[]
  presenterIndex: number
  updateSessionPresenter: (previous?: boolean) => void
  gameStarted: boolean
  isCreator: boolean
  session: Session
}

function ParticipantList({
  users,
  presenterIndex,
  updateSessionPresenter,
  gameStarted,
  isCreator,
  session,
}: ParticipantListProps) {
  function isCurrentUser(user: User) {
    return user.id === users[presenterIndex].id
  }

  function getIsLastPresenter() {
    if (!session.presentOrder.length) return true
    if (session.users.filter((user) => !!user.gifId).length > session.presentOrder.length) {
      return false
    }
    if (session.users[presenterIndex].id !== session.presentOrder[session.presentOrder.length - 1].id) {
      return false
    }
    return true
  }

  const isFirstPresenter = session.presentOrder.length
    ? session.presentOrder[0].id === session.users[session.presenterIndex].id
    : true
  const isLastPresenter = getIsLastPresenter()

  console.log({ presentOrder: session.presentOrder, isFirstPresenter, isLastPresenter })
  function handleNext() {
    if (!isLastPresenter) updateSessionPresenter()
  }

  function handleBack() {
    if (!isFirstPresenter) updateSessionPresenter(true)
  }

  return (
    <div className={styles.participantContainer}>
      <div>
        <h1 className={styles.participants}>Participants</h1>
        {users.map((user, i) => {
          return (
            <div className={`${styles.nameContainer} ${isCurrentUser(user) ? styles.highlightUser : ''}`} key={i}>
              <div style={{ backgroundColor: user.gifId ? '#38B271' : '#E8D213' }} className={styles.statusDot}></div>
              <p className={styles.name}>{user.name}</p>
            </div>
          )
        })}
      </div>
      {gameStarted && isCreator && (
        <div className={styles.navigationButtonsContainer}>
          <Button buttonColor={isFirstPresenter ? 'gray' : 'white'} onClick={handleBack}>
            <img
              src="../../../../assets/icons/arrowLeft.svg"
              alt="back"
              style={isFirstPresenter ? {} : { filter: 'brightness(0)' }}
              height={10}
              width={10}
            />{' '}
            Back
          </Button>
          <Button buttonColor={isLastPresenter ? 'gray' : 'white'} onClick={handleNext}>
            Next{' '}
            <img
              src="../../../../assets/icons/arrowRight.svg"
              alt="next"
              style={isLastPresenter ? {} : { filter: 'brightness(0)' }}
              height={10}
              width={10}
            />
          </Button>
        </div>
      )}
    </div>
  )
}

export default ParticipantList
