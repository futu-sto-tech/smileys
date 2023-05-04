import { User } from '../../@types/types'
import { useContext, useEffect, useState } from 'react'
import AppContext, { AppProviders } from '../../shared/AppContext'
import { Button } from '../Button'
import styles from './NameForm.module.scss'
import Input from '../Input'

export function NameForm() {
  const { handleChangedName, user, setUser }: AppProviders = useContext(AppContext)
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
          }}
        >
          Continue
        </Button>
      </div>
    </div>
  )
}
