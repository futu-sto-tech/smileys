import { User } from '../../types/types'
import { useContext, useEffect, useState } from 'react'
import AppContext from '../../shared/AppContext'
import { Button } from '../../components/Button'
import styles from './EnterNamePage.module.scss'
import Input from '../../components/Input'
import { useNavigate, useParams } from 'react-router-dom'
import { IAppProvider } from '../../types/AppContext'

function EnterNamePage() {
  const { handleChangedName, user, setUser, joinSession, session, updateSessionUser }: IAppProvider =
    useContext(AppContext)
  let { roomId } = useParams()
  const navigate = useNavigate()

  function handleContinue() {
    handleChangedName()
    if (!session && roomId) {
      joinSession(roomId, () => {
        navigate(`/browse/${roomId}`)
      })
    } else {
      //The session is created with an unnamed user, so the creator has user.name and session.creator updated
      if (session?.creator.id === user.id) {
        updateSessionUser(user, true)
      } else {
        updateSessionUser(user, false)
      }
      navigate(`/browse/${roomId}`)
    }
  }

  return (
    <div className={styles.container}>
      <h1>Hey, welcome to your team's smileys session!</h1>
      <p>Your name will be visible to other participants.</p>
      <div className={styles.nameForm}>
        <Input
          className={styles.input}
          placeholder={'Enter your name'}
          onChange={(e) => {
            setUser({ ...user, name: e.target.value })
          }}
          onEnter={handleContinue}
        ></Input>
        <Button onClick={handleContinue}>Continue</Button>
      </div>
    </div>
  )
}

export default EnterNamePage
