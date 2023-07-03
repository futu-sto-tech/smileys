import styles from './ParticipantList.module.scss'
import { Button } from '../../components/Button'
import { Session, User, UserGifsByIdMap } from '../../types/types'
import ParticipantListItem from './ParticipantListItem'
import { useEffect } from 'react'

interface ParticipantListProps {
  users: User[]
  clientUser: User
  presenterIndex: number
  updateSessionPresenter: (previous?: boolean) => void
  gameStarted: boolean
  isCreator: boolean
  session: Session
  updateSessionUser: (updatedUser: User, promoteToCreator?: boolean, callback?: () => void) => void
  userGifsByIdMap?: UserGifsByIdMap
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

  function userHasPresented(user: User) {
    return (
      !!session.presentOrder.find((presentedUser) => presentedUser.id === user.id) &&
      session.users[presenterIndex].id !== user.id
    )
  }

  return (
    <div className={styles.participantContainer}>
      <div className="flex flex-col overflow-auto">
        <h1 className={styles.participants}>Participants</h1>
        <div className="flex flex-col overflow-auto">
          {users.map((user, i) => (
            <ParticipantListItem
              hasPresented={userHasPresented(user)}
              key={`user-${user.gifId}-${i}`}
              user={user}
              isClientUser={isClientUser(user, clientUser)}
              updateSessionUser={updateSessionUser}
              isCurrentUser={isCurrentUser(user)}
            />
          ))}
        </div>
      </div>

      <div className={styles.navigationButtonsContainer}>
        {gameStarted && isCreator && (
          <>
            {' '}
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
          </>
        )}
      </div>
    </div>
  )
}

export default ParticipantList
