import { FunctionComponent, useState } from 'react'
import Form from './FeedbackForm'
import { useMutation } from 'react-query'
import axios from 'axios'
import { SERVER_URLS } from '../../consts/urls'
import { Button } from '../Button'
import useListenKeyDown from '../../hooks/useListenKeyDown'

interface FeedbackProps {}

const Feedback: FunctionComponent<FeedbackProps> = () => {
  const [open, setOpen] = useState(false)
  const [submittedFeedback, setSubmittedFeedback] = useState(false)
  useListenKeyDown('Escape', () => setOpen(false))

  const sendFeedback = useMutation((feedbackData: any) => axios.post(SERVER_URLS.SEND_FEEDBACK, feedbackData))

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
    <div
      onClick={handleModalClick}
      className="fixed text-white flex items-center justify-center inset-0 bg-black/50 z-40"
    >
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
      <div onClick={() => setOpen(true)} className="flex p-4 rounded bg-primary-gray hover:cursor-pointer">
        <div className="px-[4px] py-[2px] mr-4 text-black text-sm rounded" style={{ backgroundColor: '#F6E05E' }}>
          BETA
        </div>
        <p className="text-base text-white font-light underline opacity-80">Send feedback</p>
      </div>
      {open && <Modal />}
    </>
  )
}

export default Feedback
