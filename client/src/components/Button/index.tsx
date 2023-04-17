export function Button({ text, onClick }: { text: string; onClick: React.MouseEventHandler<HTMLButtonElement> }) {
  return <button onClick={onClick}>{text}</button>
}
