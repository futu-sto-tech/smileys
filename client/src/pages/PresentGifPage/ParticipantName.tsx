import { User } from '../../types/types'

interface ParticipantNameProps {
  user: User
  isCurrentUser: boolean
}

const ParticipantName = ({ user, isCurrentUser }: ParticipantNameProps) => {
  return (
    <div className={`flex items-center p-[1rem] rounded ${isCurrentUser && 'bg-secondary-gray'}`}>
      <div style={{ backgroundColor: user.gifId ? '#38B271' : '#E8D213' }} className="h-4 w-4 rounded mr-5"></div>
      <p className="text-base font-semibold">{user.name}</p>
    </div>
  )
}
export default ParticipantName
