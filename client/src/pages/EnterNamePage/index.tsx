import { User } from '../../types/types'
import { useContext, useEffect, useState } from 'react'
import AppContext from '../../shared/AppContext'
import { Button } from '../../components/Button'
import styles from './EnterNamePage.module.scss'
import Input from '../../components/Input'
import { useNavigate, useParams } from 'react-router-dom'
import { IAppProvider } from '../../types/AppContext'

function EnterNamePage() {
  const { handleChangedName, user, setUser, session }: IAppProvider = useContext(AppContext)
  let { roomId } = useParams()
  const navigate = useNavigate()

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
        ></Input>
        <Button
          onClick={() => {
            handleChangedName()
            navigate(`/${roomId}`)
          }}
        >
          Continue
        </Button>
      </div>
    </div>
  )
}

export default EnterNamePage
