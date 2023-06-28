import { Outlet, useLocation } from 'react-router-dom'
import Footer from './Footer'
import styling from './index.module.scss'
import NavBar from './Navbar'
import ResolutionNotSupported from './ResolutionNotSupported'
import useResolutionSupported from '../../hooks/useResolutionSupported'
import { useEffect } from 'react'
import CookieBanner from '../../components/CookieBanner'

const { navStyle, footerStyle, contentStyle, mainStyle } = styling

interface LayoutProps {
  children: React.ReactElement[] | React.ReactElement
}

function Layout() {
  const location = useLocation()
  const resolutionSupported = useResolutionSupported(1000)
  if (!resolutionSupported) return <ResolutionNotSupported />

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [location])

  return (
    <>
      <CookieBanner />
      <GoogleAnalytics />
      <main className={mainStyle}>
        <NavBar />
        <div className={contentStyle}>
          <Outlet />
        </div>
        <Footer />
      </main>
    </>
  )
}

export default Layout
