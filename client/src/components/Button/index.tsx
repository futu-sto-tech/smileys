import styles from './Button.module.scss'

export enum ButtonColor {
  Green = 'green',
  Black = 'black',
  White = 'white',
}
export interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  buttonColor?: ButtonColor
}

function mapColorToCSSClassName(color: ButtonColor | undefined) {
  switch (color) {
    case ButtonColor.Green:
      return styles.green
    case ButtonColor.Black:
      return styles.black
    case ButtonColor.White:
      return styles.white
    default:
      return styles.green
  }
}

export function Button(props: ButtonProps) {
  return (
    <button
      {...props}
      className={`${styles.button} 
      ${mapColorToCSSClassName(props.buttonColor)} 
      ${props.className ? props.className : ''}`}
    >
      {props.children}
    </button>
  )
}
