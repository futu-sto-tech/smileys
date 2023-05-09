import styles from './Input.module.scss'

interface InputProps {
  className?: string
  children?: React.ReactNode
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
}

function Input(props: InputProps) {
  return (
    <input onChange={props.onChange} className={`${props.className} ${styles.input}`} placeholder={props.placeholder}>
      {props.children}
    </input>
  )
}

export default Input
