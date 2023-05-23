import classNames from 'classnames'
import styles from './index.module.scss'

type ButtonColor = 'green' | 'black' | 'white' | 'gray' | 'red'
type ButtonSize = 'small' | 'medium' | 'large'

export interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  buttonColor?: ButtonColor
  size?: ButtonSize
}

export function Button(props: ButtonProps) {
  const { buttonColor, ...nativeProps } = props

  const cx = classNames([
    `${styles.button}`,
    `${mapColorToCSSClassName(buttonColor)}`,
    `${mapSizeToCSSClassName(props.size)}`,
    `${props.className}`,
  ])

  return (
    <button {...nativeProps} className={cx}>
      {props.children}
    </button>
  )
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

function mapSizeToCSSClassName(size: ButtonSize | undefined) {
  switch (size) {
    case 'small':
      return styles.small
    case 'medium':
      return styles.medium
    case 'large':
      return styles.large
    default:
      return styles.medium
  }
}
