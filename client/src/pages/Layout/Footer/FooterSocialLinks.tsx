import styling from './FooterSocialLinks.module.scss'
import footerStyling from './index.module.scss'
import { SmileyLogo, InstagramLogo, TikTokLogo, YouTubeLogo, TwitterLogo } from '../../../components/SVGs/Logos'

const { footerTextStyling } = footerStyling
const { container, socialLinksContainerStyling, elementMargin } = styling

function FooterSocialLinks() {
  return (
    <div className={`${container}`}>
      <div className={elementMargin}>
        <SmileyLogo />
      </div>
      <div className={`${socialLinksContainerStyling} ${elementMargin}`}>
        <a href="https://twitter.com/futurice">
          <TwitterLogo />
        </a>
        <a href="https://www.instagram.com/futurice/">
          <InstagramLogo />
        </a>
        <a href="https://www.youtube.com/@Futurice-Official">
          <YouTubeLogo />
        </a>
      </div>
    </div>
  )
}

export default FooterSocialLinks
