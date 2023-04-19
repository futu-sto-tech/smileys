import styling from './FooterSocialLinks.module.scss'
import footerStyling from './Footer.module.scss'
import {
  SmileyLogo,
  InstagramLogo,
  TikTokLogo,
  YouTubeLogo,
  TwitterLogo,
} from '../../../components/CodeTextField/Logos/Logos'

const { footerTextStyling } = footerStyling
const { container, socialLinksContainerStyling, elementStyling } = styling

function FooterSocialLinks() {
  return (
    <div className={`${container} ${elementStyling}`}>
      <div className={elementStyling}>
        <SmileyLogo />
      </div>
      <div className={`${socialLinksContainerStyling} ${elementStyling}`}>
        <TwitterLogo />
        <InstagramLogo />
        <YouTubeLogo />
        <TikTokLogo />
      </div>
      <div className={footerTextStyling}>
        <p>Smileys is a</p>
        <p>Futurice product.</p>
      </div>
    </div>
  )
}

export default FooterSocialLinks
