import styling from './index.module.scss'

function ResolutionNotSupported() {
  return (
    <div className={styling.notSupported}>
      <h1 className={`${styling.notSupportedHeading} text-[20px]`}>Welcome to the Smileys beta!</h1>
      <h2 className={`${styling.notSupportedHeading} text-[20px]`}>Enjoy the full experience on</h2>
      <h2 className={`${styling.notSupportedHeading} text-[20px]`}>
        <span className="text-[30px]">desktop 🥳</span>
      </h2>
      <img
        className="mt-[10px]"
        key={`mobile-gify`}
        width={'300px'}
        src="https://media.giphy.com/media/8FuLBRxtL7nwCchUcd/giphy.gif"
      />
    </div>
  )
}

export default ResolutionNotSupported
