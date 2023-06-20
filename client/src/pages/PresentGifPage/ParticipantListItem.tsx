import { useState } from 'react'
import { User } from '../../types/types'
import Input from '../../components/Input'
import { Button } from '../../components/Button'
import { useForm, SubmitHandler } from 'react-hook-form'
import Tooltip from '../../components/Tooltip'
import DotDotDotAnimation from './DotDotDotAnimation'

interface ParticipantListItemProps {
  user: User
  isClientUser: boolean
  isCurrentUser: boolean
  updateSessionUser: (updatedUser: User, promoteToCreator?: boolean, callback?: () => void) => void
}

type Inputs = {
  changeNameInput: string
}

const inputRequirements = {
  required: { value: true, message: 'Name cannot be empty' },
  minLength: { value: 1, message: 'Name must be at least 4 characters' },
  maxLength: { value: 20, message: 'Name cannot be longer than 18 characters' },
}

const ParticipantListItem = ({ user, isCurrentUser, isClientUser, updateSessionUser }: ParticipantListItemProps) => {
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
      content={errors.changeNameInput ? errors.changeNameInput.message! : ''}
      displayArrow={false}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex items-center">
        <Input register={register('changeNameInput', inputRequirements)} style={{ padding: '8px 10px' }}></Input>
        <Button className="ml-4">Save</Button>
      </form>
    </Tooltip>
  )

  const Name = () => (
    <>
      <div className="flex items-center py-3">
        <div style={{ backgroundColor: user.gifId ? '#38B271' : '#E8D213' }} className="h-4 w-4 rounded mr-5"></div>
        {user.name ? (
          <p className="text-base font-semibold">{user.name}</p>
        ) : (
          <>
            <p className="text-base font-semibold pr-[0.3rem]">Joining user</p>
            <DotDotDotAnimation />
          </>
        )}
      </div>
      {isClientUser && (
        <Button
          className="opacity-30 hover:opacity-100"
          style={{ padding: '8px 8px' }}
          onClick={() => setIsEditing(true)}
        >
          <i className="fa-solid fa-pen text-gray-200"></i>
        </Button>
      )}
    </>
  )

  return (
    <div className={`flex items-center justify-between p-[1rem] rounded ${isCurrentUser && 'bg-secondary-gray'}`}>
      {isEditing ? <EditName /> : <Name />}
    </div>
  )
}
export default ParticipantListItem
