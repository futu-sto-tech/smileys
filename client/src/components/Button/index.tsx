import styles from './Button.module.scss'

export interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {}

export function Button(props: ButtonProps) {
  return (
    <button onClick={props.onClick} className={`${props.className} ${styles.button}`}>
      {props.children}
    </button>
  )
}
