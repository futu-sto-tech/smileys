import styling from './FooterLinks.module.scss'
import footerStyling from './Footer.module.scss'

const { footerTextStyling } = footerStyling
const { container, textMarginBottomStyling } = styling

function FooterLinks() {
  return (
    <div className={container}>
      <div className={`${footerTextStyling} ${textMarginBottomStyling}`}>
        <ul>
          <li>About</li>
          <li>Smileys</li>
          <li>Futurice</li>
          <li>Contact us</li>
        </ul>
      </div>
    </div>
  )
}

export default FooterLinks
