import styling from './index.module.scss'
import FooterLinks from './FooterLinks'
import FooterSocialLinks from './FooterSocialLinks'

const { containerStyling, footerSectionStyling, footerTextStyling } = styling

function Footer() {
  return (
    <footer className={containerStyling}>
      <FooterSocialLinks />
      <FooterLinks />
    </footer>
  )
}

export default Footer
