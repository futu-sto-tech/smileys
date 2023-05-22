import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import styling from './Layout.module.scss'
import NavBar from './Navbar'

const { navStyle, footerStyle, contentStyle, mainStyle } = styling

interface LayoutProps {
  children: React.ReactElement[] | React.ReactElement
}

function Layout() {
  return (
    <main className={mainStyle}>
      <NavBar />
      <div className={contentStyle}>
        <Outlet />
      </div>
      <Footer />
    </main>
  )
}

export default Layout
