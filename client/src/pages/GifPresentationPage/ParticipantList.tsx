import styles from './ParticipantList.module.scss'
import { Button, ButtonColor } from '../../components/Button'
import { User } from '../../types/types'

interface ParticipantListProps {
  users: User[]
  presenterIndex: number
  updateSessionPresenter: (index: number) => void
}

function ParticipantList({ users, presenterIndex, updateSessionPresenter }: ParticipantListProps) {
  function isCurrentUser(user: User) {
    return user.id === users[presenterIndex].id
  }

  const isFirstPresenter = presenterIndex <= 0
  const isLastPresenter = presenterIndex >= users.length - 1

  function handleNext() {
    if (!isLastPresenter) updateSessionPresenter(presenterIndex + 1)
  }

  function handleBack() {
    if (!isFirstPresenter) updateSessionPresenter(presenterIndex - 1)
  }

  return (
    <div className={styles.menuContainer}>
      <div>
        <h1>Participants</h1>
        {users.map((user, i) => {
          return (
            <div className={`${styles.nameContainer} ${isCurrentUser(user) ? styles.highlightUser : ''}`} key={i}>
              <div style={{ backgroundColor: user.gifId ? '#38B271' : '#E8D213' }} className={styles.statusDot}></div>
              <p className={styles.name}>{user.name}</p>
            </div>
          )
        })}
      </div>
      <div className={styles.navigationButtonsContainer}>
        <Button buttonColor={isFirstPresenter ? ButtonColor.Gray : ButtonColor.White} onClick={handleBack}>
          <img
            src="../../../../assets/icons/arrowLeft.svg"
            alt="back"
            style={isFirstPresenter ? {} : { filter: 'brightness(0)' }}
          />{' '}
          Back
        </Button>
        <Button buttonColor={isLastPresenter ? ButtonColor.Gray : ButtonColor.White} onClick={handleNext}>
          Next{' '}
          <img
            src="../../../../assets/icons/arrowRight.svg"
            alt="next"
            style={isLastPresenter ? {} : { filter: 'brightness(0)' }}
          />
        </Button>
      </div>
    </div>
  )
}

export default ParticipantList
