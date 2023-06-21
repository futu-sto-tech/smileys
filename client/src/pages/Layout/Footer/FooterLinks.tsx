import { FuturiceLogo } from '../../../components/SVGs/Logos'
import styling from './FooterLinks.module.scss'
import footerStyling from './index.module.scss'

const { footerTextStyling } = footerStyling
const { container, textMarginBottomStyling } = styling

function FooterLinks() {
  return (
    <div className={container}>
      <div className={`${footerTextStyling} ${textMarginBottomStyling}`}>
        <a href="https://futurice.com/" target="_blank">
          <FuturiceLogo />
        </a>
        <div className={footerTextStyling}>
          <p>Smileys is a</p>
          <p>Futurice product.</p>
        </div>
      </div>
    </div>
  )
}

export default FooterLinks
