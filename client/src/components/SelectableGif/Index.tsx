import { useNavigate } from 'react-router-dom'
import { Gif } from '../Gif'
import { useContext } from 'react'
import AppContext from '../../shared/AppContext'

export function SelectableGif({ url, id }: { url: string; id: string }) {
  const navigate = useNavigate()
  const { session } = useContext(AppContext)
  return (
    <div
      onClick={() => {
        navigate(`/${session.code}/${id}`)
      }}
    >
      <Gif url={url} />
    </div>
  )
}
