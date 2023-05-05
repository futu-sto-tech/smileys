import styles from './Input.module.scss'

export interface InputProps extends React.ComponentPropsWithoutRef<'input'> {}

function Input(props: InputProps) {
  return (
    <input className={`${props.className} ${styles.input}`} {...props}>
      {props.children}
    </input>
  )
}

export default Input
