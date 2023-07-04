import { useState } from 'react'
import Tooltip from '../../../components/Tooltip'

function DevContacts() {
  const devMail = 'smileys-futurice@gmail.com'

  function handleClick() {
    navigator.clipboard.writeText(devMail)
  }

  return (
    <div>
      <p className={'text-base'}>Have questions or feedback?</p>
      <p className={'text-base'}>
        Contact us at{' '}
        <Tooltip triggerOnClick content={'Copied!'}>
          <span
            className={'text-base cursor-pointer underline'}
            onClick={() => {
              handleClick()
            }}
          >
            {devMail}
          </span>
        </Tooltip>
      </p>
    </div>
  )
}

export default DevContacts
