import styling from './FooterSocialLinks.module.scss'
import footerStyling from './index.module.scss'
import {
  SmileyLogo,
  InstagramLogo,
  TikTokLogo,
  YouTubeLogo,
  TwitterLogo,
} from '../../../components/CodeTextField/Logos/Logos'

const { footerTextStyling } = footerStyling
const { container, socialLinksContainerStyling, elementMargin } = styling

function FooterSocialLinks() {
  return (
    <div className={`${container} ${elementMargin}`}>
      <div className={elementMargin}>
        <SmileyLogo />
      </div>
      <div className={`${socialLinksContainerStyling} ${elementMargin}`}>
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
