import { Provider, useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import "../styles/globals.css"
import "bootstrap/dist/css/bootstrap.min.css"
import { useRouter } from "next/router"
import { store } from "../redux/store"
import { createWrapper } from "next-redux-wrapper"
import { startChecking } from "../redux/actions/auth"
import { Container, Spinner } from "react-bootstrap"

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const dispatch = useDispatch()
  const { checking, uid } = useSelector(state => state.auth)
  useEffect(() => {
    dispatch(startChecking())
  }, [dispatch])
  useEffect(() => {
    if (!uid) router.push("/login")
  }, [uid])
  if (checking)
    return (
      <Container className=" margin-auto d-flex justify-content-center align-items-center">
        <Spinner animation="border" variant="primary" lg />
      </Container>
    )
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}
const makeStore = () => store
const wrapper = createWrapper(makeStore)
export default wrapper.withRedux(MyApp)
