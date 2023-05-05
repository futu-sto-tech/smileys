import styles from './Button.module.scss'

export interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {}

export function Button(props: ButtonProps) {
  return (
    <button className={`${props.className} ${styles.button}`} {...props}>
      {props.children}
    </button>
  )
}
