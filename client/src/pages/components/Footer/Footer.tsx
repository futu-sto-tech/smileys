import styling from './Footer.module.scss'
import FooterSocialLinks from './FooterSocialLinks'

const { containerStyling, footerSectionStyling, footerTextStyling } = styling

function Footer() {
  return (
    <footer className={containerStyling}>
      <FooterSocialLinks />
      <FooterSocialLinks />
      <FooterSocialLinks />
    </footer>
  )
}

export default Footer
