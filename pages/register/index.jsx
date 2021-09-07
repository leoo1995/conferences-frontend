import { useRouter } from "next/router"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Swal from "sweetalert2"
import { useForm } from "../../hooks/useForm"
import Input from "../../components/Input"
import Layout from "../../components/Layout"
import { startRegister } from "../../redux/actions/auth"
import { Col, Row } from "react-bootstrap"

const register = () => {
  const dispatch = useDispatch()
  const { uid, checking } = useSelector(state => state.auth)
  const router = useRouter()
  useEffect(() => {
    console.log(uid)
    if (uid) {
      router.push("/")
    }
  }, [uid])
  const [state, handleChange] = useForm({
    name: { value: "", isValid: null },
    email: { value: "", isValid: null },
    password: { value: "", isValid: null },
    confirmPassword: { value: "", isValid: null },
    role: { value: "", isValid: null },
  })
  const { name, email, password, confirmPassword, role } = state

  const handleSubmit = e => {
    e.preventDefault()

    if (!name.isValid)
      return Swal.fire("Error", "Valid name is required", "error")
    if (!email.isValid)
      return Swal.fire("Error", "Valid email is required", "error")
    if (!password.isValid)
      return Swal.fire("Error", "Valid password is required", "error")

    if (!role.value.trim())
      return Swal.fire("Error", "Role is required", "error")
    if (password.value !== confirmPassword.value)
      return Swal.fire("Error", "Passwords have to match", "error")
    dispatch(startRegister(state))
  }
  return (
    <Layout>
      <Row>
        <Col
          as="form"
          sm={6}
          className="container my-5 p-4 rounded shadow"
          onSubmit={handleSubmit}
        >
          <Input
            type="text"
            name="name"
            inputName={name}
            handleChange={handleChange}
            label="Name:"
            placeholder="Enter a name"
          />
          <Input
            type="email"
            name="email"
            inputName={email}
            handleChange={handleChange}
            label="Email:"
            placeholder="Enter an email"
          />
          <Input
            type="password"
            name="password"
            inputName={password}
            handleChange={handleChange}
            label="Password:"
            placeholder="password"
          />
          <Input
            type="password"
            name="confirmPassword"
            inputName={confirmPassword}
            handleChange={handleChange}
            label="Confirm password:"
            placeholder="confirm the password"
          />

          <div className="form-group">
            <label htmlFor="select-role-register">Role:</label>
            <select
              className="form-select"
              name="role"
              value={role.value}
              onChange={handleChange}
              id="select-role-register"
            >
              <option value="">Select a role</option>
              <option value="speaker">Speaker</option>
              <option value="attendant">Attendant</option>
            </select>
          </div>
          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-primary mt-2">
              Create account
            </button>
          </div>
        </Col>
      </Row>
    </Layout>
  )
}
export default register
