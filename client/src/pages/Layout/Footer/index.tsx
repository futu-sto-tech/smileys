import styling from './index.module.scss'
import FooterLinks from './FooterLinks'
import FooterSocialLinks from './FooterSocialLinks'
import DevContacts from './DevContacts'

const { containerStyling, footerSectionStyling, footerTextStyling } = styling

function Footer() {
  return (
    <footer className={containerStyling}>
      <FooterSocialLinks />
      <FooterLinks />
      <DevContacts />
    </footer>
  )
}

export default Footer
