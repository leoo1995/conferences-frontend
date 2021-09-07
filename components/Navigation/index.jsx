import { CalendarPlus } from "@styled-icons/bootstrap"
import Link from "next/link"
import { useRouter } from "next/router"
import { Container, Nav, Navbar, Button } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { startLogout } from "../../redux/actions/auth"

export const Navigation = () => {
  const { uid, role, name } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const handleLogout = () => {
    dispatch(startLogout())
  }

  return (
    <Navbar collapseOnSelect expand="lg" variant="dark" bg="dark">
      <Container>
        <Link href="/">
          <Navbar.Brand as="a" href="">
            Hi {name}
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link href="/">
              <Nav.Link as="a" href="">
                Conferences
              </Nav.Link>
            </Link>
            <Link href={`/${uid}`}>
              <Nav.Link as="a" href="">
                My conferences
              </Nav.Link>
            </Link>

            {role === "speaker" && (
              <Link href={`/${uid}/create-new-conf`}>
                <Button as="a" hrer="">
                  <CalendarPlus size={24} />
                </Button>
              </Link>
            )}
          </Nav>
          <Nav>
            {!uid ? (
              <>
                <Link href="/login">
                  <Nav.Link as="a" href="">
                    Log in
                  </Nav.Link>
                </Link>
                <Link href="/register">
                  <Nav.Link as="a" href="">
                    Sign up
                  </Nav.Link>
                </Link>
              </>
            ) : (
              // <Link href="/login" onClick={handleLogout}>
              <Nav.Link onClick={handleLogout}>Log out</Nav.Link>
              // </Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
