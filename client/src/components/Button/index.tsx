import styles from './Button.module.scss'

export enum ButtonColor {
  Green = 'green',
  Black = 'black',
  White = 'white',
  Gray = 'gray',
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
    case ButtonColor.Gray:
      return styles.gray
    default:
      return styles.green
  }
}

export function Button(props: ButtonProps) {
  const { buttonColor, ...nativeProps } = props
  return (
    <button
      {...nativeProps}
      className={`${styles.button} 
      ${mapColorToCSSClassName(props.buttonColor)} 
      ${props.className ? props.className : ''}`}
    >
      {props.children}
    </button>
  )
}
