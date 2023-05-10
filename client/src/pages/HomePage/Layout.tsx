import Footer from '../components/Footer/Footer'
import styling from './Layout.module.scss'

const { navStyle, footerStyle, contentStyle, mainStyle } = styling

interface LayoutProps {
  children: React.ReactElement[] | React.ReactElement
}

function Layout({ children }: LayoutProps) {
  return (
    <>
      <main className={mainStyle}>
        {/* <nav className={navStyle}>Nav</nav> */}
        <div className={contentStyle}>{children}</div>
        <Footer />
      </main>
    </>
  )
}

export default Layout
