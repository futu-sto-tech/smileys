import { memo, useEffect } from 'react'
import ReactGA from 'react-ga4'
import { useLocation } from 'react-router-dom'
import useLocalStorage from 'use-local-storage'
import { TRACKING_ID } from '../../consts/envs'

const GoogleAnalytics = () => {
  const location = useLocation()
  const [allowTracking, _] = useLocalStorage<boolean>('allowTracking', false)

  useEffect(() => {
    console.log('Yeah boi')
    ReactGA.send({ hitType: 'pageview', page: window.location.pathname })
  }, [location])

  // prevent rendering tracking if user doesn't allow tracking cookies or there is no TRACKING_ID
  if (!allowTracking || !TRACKING_ID) return null

  return <></>
}
export default memo(GoogleAnalytics)
