import { FormEvent, FunctionComponent, useState } from 'react'
import Form from './FeedbackForm'
import { SmileyLogo } from '../SVGs/Logos'
import { useMutation } from 'react-query'
import axios from 'axios'
import { SERVER_URLS } from '../../consts/urls'
import { Button } from '../Button'
import useListenKeyDown from '../../hooks/useListenKeyDown'

interface FeedbackFormProps {}

const FeedbackForm: FunctionComponent<FeedbackFormProps> = () => {
  const [open, setOpen] = useState(false)
  const [submittedFeedback, setSubmittedFeedback] = useState(false)
  useListenKeyDown('Escape', () => setOpen(false))

  const sendFeedback = useMutation((feedbackData: any) => {
    return axios.post(SERVER_URLS.SEND_FEEDBACK, feedbackData)
  })

  const onSubmit = (event: any) => {
    const data = { feedback: event.target[0].value, mail: event.target[1].value }
    sendFeedback.mutate(data)
    setSubmittedFeedback(true)
  }

  const closeFeedback = () => {
    setOpen(false)
    setSubmittedFeedback(false)
  }

  const handleModalClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) closeFeedback()
  }

  const Modal = () => (
    // Background
    <div onClick={handleModalClick} className="fixed flex items-center justify-center inset-0 bg-black/50 z-40">
      {!submittedFeedback ? (
        <div className="bg-primary-gray p-10 rounded z-50">
          <span className="text-base">We love feedback! 💛</span>
          <Form onSubmit={onSubmit} onClose={closeFeedback} />
        </div>
      ) : (
        <div className="flex flex-col gap-10 items-center bg-primary-gray py-10 px-[100px] rounded z-50">
          <div className="text-lg">Thanks for your feedback! 🙏</div>
          <img height={400} src="https://media.giphy.com/media/cdNSp4L5vCU7aQrYnV/giphy.gif" alt="" />
          <Button onClick={closeFeedback}>Close</Button>
        </div>
      )}
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
          <span
            className="text-base font-light underline opacity-80 hover:cursor-pointer"
            onClick={() => setOpen(true)}
          >
            Send feedback
          </span>
          {open && <Modal />}
        </div>
      </div>
    </>
  )
}

export default FeedbackForm
