import styling from './Layout.module.scss'

const { navStyle, footerStyle, contentStyle, mainStyle } = styling

interface LayoutProps {
  children: React.ReactElement[] | React.ReactElement
}

function Layout({ children }: LayoutProps) {
  return (
    <>
      <main className={mainStyle}>
        <nav className={navStyle}>Nav</nav>
        <div className={contentStyle}>{children}</div>
        <div className={footerStyle}>footer</div>
      </main>
    </>
  )
}

export default Layout
