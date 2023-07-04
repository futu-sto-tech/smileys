import { Outlet, useLocation } from 'react-router-dom'
import Footer from './Footer'
import styling from './index.module.scss'
import NavBar from './Navbar'
import ResolutionNotSupported from './ResolutionNotSupported'
import useResolutionSupported from '../../hooks/useResolutionSupported'
import { useEffect } from 'react'
import CookieBanner from '../../components/CookieBanner'
import useLocalStorage from 'use-local-storage'
import { TRACKING_ID } from '../../consts/envs'
import ReactGA from 'react-ga4'
import FeedbackForm from '../../components/Feedback'

const { navStyle, footerStyle, contentStyle, mainStyle } = styling

interface LayoutProps {
  children: React.ReactElement[] | React.ReactElement
}

function Layout() {
  const location = useLocation()
  const resolutionSupported = useResolutionSupported(1000)
  if (!resolutionSupported) return <ResolutionNotSupported />

  // Google analytics
  const [allowTracking, _] = useLocalStorage<boolean>('allowTracking', false)

  useEffect(() => {
    if (allowTracking && TRACKING_ID) ReactGA.initialize(TRACKING_ID)
  }, [])

  useEffect(() => {
    if (allowTracking && TRACKING_ID) ReactGA.send({ hitType: 'pageview', page: window.location.pathname })
    window.scrollTo({ top: 0 })
  }, [location])

  return (
    <>
      <CookieBanner />
      <main className={mainStyle}>
        <FeedbackForm />
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
