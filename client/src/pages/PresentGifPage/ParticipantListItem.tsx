import { useState } from 'react'
import { User } from '../../types/types'
import Input from '../../components/Input'
import { Button } from '../../components/Button'
import { useForm, SubmitHandler } from 'react-hook-form'
import Tooltip from '../../components/Tooltip'
import DotDotDotAnimation from './DotDotDotAnimation'
import { nameInputValidation } from '../../configs/inputValidations'

interface ParticipantListItemProps {
  user: User
  isClientUser: boolean
  isCurrentUser: boolean
  updateSessionUser: (updatedUser: User, promoteToCreator?: boolean, callback?: () => void) => void
  hasPresented: boolean
}

type Inputs = {
  changeNameInput: string
}

const ParticipantListItem = ({
  user,
  isCurrentUser,
  isClientUser,
  updateSessionUser,
  hasPresented,
}: ParticipantListItemProps) => {
  const [isEditing, setIsEditing] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    updateSessionUser({ ...user, name: data.changeNameInput })
    setIsEditing(false)
  }

  const EditName = () => (
    <Tooltip
      open={!!errors.changeNameInput}
      content={errors.changeNameInput ? <p>{errors.changeNameInput.message!}</p> : <p></p>}
      displayArrow={false}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex items-center">
        <Input register={register('changeNameInput', nameInputValidation)} style={{ padding: '8px 10px' }}></Input>
        <Button className="ml-4">Save</Button>
      </form>
    </Tooltip>
  )

  const Name = () => (
    <>
      <div className="flex grow overflow-hidden items-center py-3 w-full">
        <div style={{ backgroundColor: user.gifId ? '#38B271' : '#E8D213' }} className="h-4 w-4 rounded mr-5"></div>
        <p className="text-base font-semibold truncate pr-[0.5rem]">{user.name ? user.name : 'Joining user'}</p>

        {!user.gifId && <DotDotDotAnimation className="self-end pb-[0.5rem]" />}
      </div>

      <div className="flex gap-2 items-center pl-2">
        {' '}
        {isClientUser && (
          <Button
            className="opacity-30 hover:opacity-100"
            style={{ padding: '8px 8px' }}
            onClick={() => setIsEditing(true)}
          >
            <i className="fa-solid fa-pen text-gray-200"></i>
          </Button>
        )}
        {
          <img
            className={`rounded opacity-${hasPresented ? '100' : '0'}`}
            src={user.gifThumbnailUrl}
            height={33.5}
          ></img>
        }
      </div>
    </>
  )

  return (
    <div
      className={`flex items-center justify-between p-[1rem] rounded ${isCurrentUser && 'bg-secondary-gray'} w-full`}
    >
      {isEditing ? <EditName /> : <Name />}
    </div>
  )
}
export default ParticipantListItem
