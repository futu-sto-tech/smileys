import React, { useEffect, useState } from 'react'
import styles from './index.module.css'
import useLocalStorage from 'use-local-storage'
import { Button } from '../Button'
import { TRACKING_ID } from '../../consts/envs'
import ReactGA from 'react-ga4'

enum showBannerStates {
  Unset = 'unset',
  Hide = 'hide',
  Show = 'show',
}

const CookieBanner: React.FC<{}> = () => {
  const [showCookieBanner, setShowCookieBanner] = useState<showBannerStates>(showBannerStates.Unset)
  const [_, setAllowTracking] = useLocalStorage<boolean>('allowTracking', false)
  const [readMore, setReadMore] = useState<boolean>(false)

  useEffect(() => {
    if (showCookieBanner === showBannerStates.Unset) {
      setShowCookieBanner((localStorage.getItem('showCookieBanner') as showBannerStates) || showBannerStates.Show)
    }
  }, [])

  function handleAccept() {
    setAllowTracking(true)
    TRACKING_ID && ReactGA.initialize(TRACKING_ID)
    setShowCookieBanner(showBannerStates.Hide)
    localStorage.setItem('showCookieBanner', showBannerStates.Hide)
  }

  function handleDecline() {
    setAllowTracking(false)
    setShowCookieBanner(showBannerStates.Hide)
    localStorage.setItem('showCookieBanner', showBannerStates.Hide)
  }

  if (showCookieBanner !== showBannerStates.Show) return <></>
  return (
    <>
      <div className={styles.transparent_background}>
        {!readMore ? (
          <div className={styles.flyInAnimation}>
            <div className={styles.cookie_banner_overlay}>
              <div className={styles.cookie_banner_container}>
                <div className={styles.cookie_banner_notice}>
                  <h1 className={styles.header}>Cookie Notice</h1>
                  <p className={styles.text}>
                    We use analytical cookies to improve your experience on this website. Do you agree to the use of
                    anonymous analytical cookies?
                  </p>

                  <p style={{ marginTop: 20 }} className={styles.text}>
                    Read more about our cookie policy{' '}
                    <span
                      onClick={() => {
                        setReadMore(true)
                      }}
                      className={styles.read_more_link}
                    >
                      here.
                    </span>
                  </p>

                  <div className={styles.buttons_container}>
                    <div className={styles.button_spacing}>
                      <Button onClick={handleDecline}>Avvisa</Button>
                    </div>
                    <Button onClick={handleAccept}>Acceptera</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className={styles.read_more_overlay}>
              <div className={styles.cookie_banner_container}>
                <div className={styles.read_more_title_container}>
                  <h1 className={styles.header}>Cookie Policy</h1>
                  <div
                    className={styles.cross_icon_wrapper}
                    onClick={() => {
                      setReadMore(false)
                    }}
                  >
                    <img src={'/assets/icons/crossIcon.svg'} alt="cross icon" />
                  </div>
                </div>

                <h2 className={styles.header_small}>What are cookies?</h2>
                <p className={styles.text}>
                  We use cookies on our website to improve the user experience and gather information about how our
                  website is used. Cookies are small data files that are stored on your device when you visit our
                  website.
                </p>

                <h2 className={styles.header_small}>Analytical cookies</h2>
                <p className={styles.text}>
                  We only use analytical cookies on our website. These cookies help us collect data on how visitors
                  interact with our website, which helps us improve it and make it more user-friendly. We use Google
                  Analytics to collect and analyze this data.
                </p>

                <h2 className={styles.header_small}>Personal information</h2>
                <p className={styles.text}>
                  We do not use cookies to collect personal information about our visitors, and we do not share the
                  information with third parties.
                </p>

                <h2 className={styles.header_small}>If you accept</h2>
                <p className={styles.text}>
                  By accepting analytical cookies, you consent to our use of cookies in accordance with this policy.
                </p>

                <h2 className={styles.header_small}>Disabling cookies</h2>
                <p className={styles.text}>
                  You can disable cookies by changing the settings in your web browser. Contact us if you have any
                  questions or would like more information about our cookie policy.
                </p>

                <div className={styles.buttons_container}>
                  <div className={styles.button_spacing}>
                    <Button onClick={handleDecline}>Avvisa</Button>
                  </div>
                  <Button onClick={handleAccept}>Acceptera</Button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default CookieBanner
