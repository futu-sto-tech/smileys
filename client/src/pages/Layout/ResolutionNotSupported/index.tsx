import styling from './index.module.scss'

function ResolutionNotSupported() {
  return (
    <div className={styling.notSupported}>
      <h1>
        We only support desktop screen sizes... <span className='text-[30px]'>😢</span>
      </h1>
    </div>
  )
}

export default ResolutionNotSupported
