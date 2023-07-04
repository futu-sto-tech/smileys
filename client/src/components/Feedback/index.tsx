import { FunctionComponent, useState } from 'react'
import Form from './FeedbackForm'
import { SmileyLogo } from '../SVGs/Logos'

interface FeedbackFormProps {}

const FeedbackForm: FunctionComponent<FeedbackFormProps> = () => {
  const [open, setOpen] = useState(false)
  const onSubmit = () => {
    setOpen(false)
  }

  const Modal = () => (
    // Background
    <div className="fixed flex items-center justify-center inset-0 bg-black/50 z-40">
      <div className="bg-primary-gray p-10 rounded z-50">
        <span className="text-base">We love feedback! 💛</span>
        <Form onSubmit={onSubmit} />
      </div>
    </div>
  )

  return (
    <>
      <div
        className="absolute flex flex-col items-end top-[30px] left-[-20px] text-white rounded p-[12px]"
        style={{ backgroundColor: '#333333' }}
      >
        <div className="flex items-center">
          <SmileyLogo height={30} color="#F6E05E" />
          <div
            className="px-[8px] py-[4px] text-black text-base rounded ml-[-10px]"
            style={{ backgroundColor: '#F6E05E' }}
          >
            BETA
          </div>
        </div>
        <div className="relative mt-[10px]">
          <span className="text-base font-light underline opacity-80" onClick={() => setOpen(true)}>
            Send feedback
          </span>
          {open && <Modal />}
        </div>
      </div>
    </>
  )
}

export default FeedbackForm
