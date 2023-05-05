import styles from './Button.module.scss'

export interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {}

export function Button(props: ButtonProps) {
  return (
    <button {...props} className={`${props.className} ${styles.button}`}>
      {props.children}
    </button>
  )
}
