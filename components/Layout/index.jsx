import Head from "next/head"
import { Container } from "react-bootstrap"
import { Navigation } from "../Navigation"

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>Conferences system</title>
      </Head>
      <Navigation />
      <Container>{children}</Container>
    </>
  )
}

export default Layout
