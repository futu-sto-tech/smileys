import { useState } from 'react'
import Tooltip from '../Tooltip'

interface CopyButtonProps {
  text: string
}

function CopyButton({ text }: CopyButtonProps) {
  const [hasCopied, setHasCopied] = useState(false)

  function handleClick() {
    navigator.clipboard.writeText(text)
    setHasCopied(true)
    setTimeout(() => {
      setHasCopied(false)
    }, 2000)
  }

  return (
    <Tooltip triggerOnClick content={<p>Copied!</p>}>
      <button
        onClick={handleClick}
        style={{fontSize: '14px', transform: 'translateY(-2px)'}}
      className="pl-[4px] pr-[7px] py-[5px] rounded bg-primary-green border-primary-green border-solid border-0 cursor-pointer hover:bg-black active:bg-gray-300"
      >
        <i className="fa-solid fa-clone ml-[5px] text-white"></i>
      </button>
    </Tooltip>
  )
}

export default CopyButton
