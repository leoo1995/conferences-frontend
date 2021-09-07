import classNames from "classnames"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { Button, Col, Row } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Swal from "sweetalert2"
import Layout from "../../components/Layout"
import { useForm } from "../../hooks/useForm"
import { login as signIn, startLogin } from "../../redux/actions/auth"
const login = () => {
  const { uid } = useSelector(state => state.auth)
  const router = useRouter()
  useEffect(() => {
    console.log(uid)
    if (uid) {
      router.push("/")
    }
  }, [uid])
  const [{ email, password }, handleChange] = useForm({
    email: { value: "" },
    password: { value: "" },
  })
  const dispatch = useDispatch()

  const handleSubmit = event => {
    event.preventDefault()
    if (!email.value.trim())
      return Swal.fire("Error", "Email is required", "error")
    if (!password.value.trim())
      return Swal.fire("Error", "password is required", "error")

    dispatch(startLogin(email, password))
  }

  return (
    <Layout>
      <Row className="justify-content-md-center">
        <Col
          as="form"
          sm="4"
          onSubmit={handleSubmit}
          className=" my-5 p-4 rounded shadow"
        >
          <div className="form-group">
            <label htmlFor="input-email-login">Email:</label>
            <input
              name="email"
              value={email.value}
              onChange={handleChange}
              type="email"
              className={classNames("form-control", {
                "is-valid": false,
                "is-invalid": false,
              })}
              id="input-email-login"
              aria-describedby="emailHelp"
              placeholder="Enter email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="input-password-login">Password:</label>
            <input
              name="password"
              type="password"
              value={password.value}
              onChange={handleChange}
              className={classNames("form-control", {
                "is-valid": false,
                "is-invalid": false,
              })}
              id="input-password-login"
              placeholder="Password"
            />
            <small className="text-muted">Must be 6-20 characters long.</small>
          </div>
          <div className="d-grid mt-2">
            <Button type="submit" variant="primary" size="lg">
              Sign in
            </Button>
          </div>
        </Col>
      </Row>
    </Layout>
  )
}
export default login
