import { ApiError } from '../../types/errors'
import styles from './index.module.scss'
import { UseFormRegisterReturn } from 'react-hook-form'

interface InputProps {
  className?: string
  children?: React.ReactNode
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onEnter?: () => void
  placeholder?: string
  error?: ApiError
  style?: {}
  register?: UseFormRegisterReturn
  id?: string
}

function Input(props: InputProps) {
  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && props.onEnter) {
      props.onEnter()
    }
  }

  return (
    <div className={styles.inputWrapper}>
      <input
        onChange={props.onChange}
        onKeyDown={handleKeyDown}
        className={`${props.className} ${styles.input}`}
        style={props.style}
        placeholder={props.placeholder}
        id={props.id}
        {...props.register}
        autoFocus
      >
        {props.children}
      </input>
      {props.error && <div className={styles.error}>{props.error.message}</div>}
    </div>
  )
}

export default Input
