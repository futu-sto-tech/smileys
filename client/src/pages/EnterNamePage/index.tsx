import { useContext, useEffect, useState } from 'react'
import AppContext from '../../shared/AppContext'
import { Button } from '../../components/Button'
import styles from './EnterNamePage.module.scss'
import Input from '../../components/Input'
import { useNavigate, useParams } from 'react-router-dom'
import { IAppProvider } from '../../types/AppContext'
import { SubmitHandler, useForm } from 'react-hook-form'
import Tooltip from '../../components/Tooltip'
import { nameInputValidation } from '../../configs/inputValidations'

type Inputs = {
  changeNameInput: string
}

function EnterNamePage() {
  const { handleChangedName, user, joinSession, session, sessionEnded, updateSessionUser }: IAppProvider =
    useContext(AppContext)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<Inputs>()

  let { roomId } = useParams()
  const navigate = useNavigate()

  const name = watch('changeNameInput')

  useEffect(() => {
    handleChangedName(name)
  }, [name])

  const onSubmit: SubmitHandler<Inputs> = () => {
    if (!session && !sessionEnded && roomId) {
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
      <h1>Welcome!</h1>
      <p className='text-[18px] mb-[30px] text-center'>Your name will be visible to other participants.</p>

      <div className={styles.nameForm}>
        <Tooltip
          open={!!errors.changeNameInput}
          content={errors.changeNameInput ? <p>{errors.changeNameInput.message!}</p> : <p></p>}
          displayArrow={false}
        >
          <form onSubmit={handleSubmit(onSubmit)} className="flex">
            <Input
              register={register('changeNameInput', nameInputValidation)}
              className={styles.input}
              placeholder={'Enter your name'}
            ></Input>
            <Button className='ml-[10px]'>Continue</Button>
          </form>
        </Tooltip>
      </div>
    </div>
  )
}

export default EnterNamePage
