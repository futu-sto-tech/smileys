import styles from './Gif.module.scss'

export function Gif({ url }: { url: string }) {
  return <img src={url} className={styles.gif} />
}
