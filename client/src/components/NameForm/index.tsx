import { User } from '../../@types/types'
import { useContext, useEffect, useState } from 'react'
import AppContext from '../../shared/AppContext'
import { Button } from '../Button'

export function NameForm() {
  const { saveUser, user, setUser } = useContext(AppContext)
  return (
    <div>
      <h2>What's your name?</h2>
      <input
        placeholder={'Name'}
        onChange={(e) => {
          setUser({ ...user, name: e.target.value })
        }}
      ></input>
      <Button
        text={'next'}
        onClick={() => {
          saveUser(user)
        }}
      />
    </div>
  )
}
