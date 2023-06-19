import { useState } from 'react'
import { User } from '../../types/types'
import Input from '../../components/Input'
import { Button } from '../../components/Button'

interface ParticipantListItemProps {
  user: User
  isCurrentUser: boolean
}

const ParticipantListItem = ({ user, isCurrentUser }: ParticipantListItemProps) => {
  const [isEditing, setIsEditing] = useState(false)

  const EditName = () => (
    <div className="flex items-center">
      <Input style={{ padding: '8px 10px' }}></Input>
      <Button className="ml-4">Save</Button>
    </div>
  )
  const Name = () => (
    <>
      <div className="flex items-center py-3">
        <div style={{ backgroundColor: user.gifId ? '#38B271' : '#E8D213' }} className="h-4 w-4 rounded mr-5"></div>
        <p className="text-base font-semibold">{user.name}</p>
      </div>
      <div className="p-3 cursor-pointer bg-gray-300/20 rounded ml-5">
        <i className="fa-solid fa-pen text-black"></i>
      </div>
    </>
  )

  return (
    <div className={`flex items-center justify-between p-[1rem] rounded ${isCurrentUser && 'bg-secondary-gray'}`}>
      {isEditing ? <EditName /> : <Name />}
    </div>
  )
}
export default ParticipantListItem
