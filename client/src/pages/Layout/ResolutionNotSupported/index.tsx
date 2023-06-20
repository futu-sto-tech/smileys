import styling from './index.module.scss'

function ResolutionNotSupported() {
  return (
    <div className={styling.notSupported}>
      <h1>This screen size is not supported.</h1>
    </div>
  )
}

export default ResolutionNotSupported
