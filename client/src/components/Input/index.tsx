import { SocketError } from '../../types/Error'
import styles from './index.module.scss'

interface InputProps {
  className?: string
  children?: React.ReactNode
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  error?: SocketError
}

function Input(props: InputProps) {
  return (
    <div className={styles.inputWrapper}>
      <input onChange={props.onChange} className={`${props.className} ${styles.input}`} placeholder={props.placeholder}>
        {props.children}
      </input>
      {props.error && <div className={styles.error}>{props.error.message}</div>}
    </div>
  )
}

export default Input
