import styles from './ParticipantList.module.scss'
import { Button } from '../../components/Button'
import { Session, User } from '../../types/types'
import ParticipantListItem from './ParticipantListItem'

interface ParticipantListProps {
  users: User[]
  clientUser: User
  presenterIndex: number
  updateSessionPresenter: (previous?: boolean) => void
  gameStarted: boolean
  isCreator: boolean
  session: Session
  updateSessionUser: (updatedUser: User, promoteToCreator?: boolean, callback?: () => void) => void
}

function ParticipantList({
  users,
  clientUser,
  presenterIndex,
  updateSessionPresenter,
  gameStarted,
  isCreator,
  session,
  updateSessionUser,
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

  function handleNext() {
    if (!isLastPresenter) updateSessionPresenter()
  }

  function handleBack() {
    if (!isFirstPresenter) updateSessionPresenter(true)
  }

  function isClientUser(user: User, clientUser: User) {
    return user.id === clientUser.id
  }

  return (
    <div className={styles.participantContainer}>
      <div>
        <h1 className={styles.participants}>Participants</h1>
        {users.map((user, i) => (
          <ParticipantListItem
            user={user}
            isClientUser={isClientUser(user, clientUser)}
            updateSessionUser={updateSessionUser}
            isCurrentUser={isCurrentUser(user)}
          />
        ))}
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
