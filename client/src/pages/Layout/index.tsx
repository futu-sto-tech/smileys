import { Outlet } from 'react-router-dom'
import Footer from './Footer/Footer'
import styling from './Layout.module.scss'

const { navStyle, footerStyle, contentStyle, mainStyle } = styling

interface LayoutProps {
  children: React.ReactElement[] | React.ReactElement
}

function Layout() {
  return (
    <main className={mainStyle}>
      {/* <nav className={navStyle}>Nav</nav> */}
      <div className={contentStyle}>
        <Outlet />
      </div>
      <Footer />
    </main>
  )
}

export default Layout
