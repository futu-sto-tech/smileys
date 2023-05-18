import styles from './Button.module.scss'

type ButtonColor = 'green' | 'black' | 'white' | 'gray' | 'red'

export interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  buttonColor?: ButtonColor
}

function mapColorToCSSClassName(color: ButtonColor | undefined) {
  switch (color) {
    case 'green':
      return styles.green
    case 'black':
      return styles.black
    case 'white':
      return styles.white
    case 'gray':
      return styles.gray
    case 'red':
      return styles.red
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
