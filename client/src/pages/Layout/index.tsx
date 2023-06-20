import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import styling from './index.module.scss'
import NavBar from './Navbar'
import ResolutionNotSupported from './ResolutionNotSupported'
import useResolutionSupported from '../../hooks/useResolutionSupported'

const { navStyle, footerStyle, contentStyle, mainStyle } = styling

interface LayoutProps {
  children: React.ReactElement[] | React.ReactElement
}

function Layout() {
  const resolutionSupported = useResolutionSupported(1000)
  if (!resolutionSupported) return <ResolutionNotSupported />

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
