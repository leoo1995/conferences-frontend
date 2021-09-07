import { Button, Col, Form, Row } from "react-bootstrap"
import dayjs from "dayjs"
import Layout from "../../../components/Layout"
import { useForm } from "../../../hooks/useForm"
import { useDispatch, useSelector } from "react-redux"
import { confStartAddNew } from "../../../redux/actions/conferences"

const createNewConf = () => {
  const dispatch = useDispatch()
  const { uid } = useSelector(s => s.auth)
  const [state, handleChange] = useForm({
    name: { value: "", isValid: null },
    location: { value: "", isValid: null },
    quota: { value: "", isValid: null },
    date: { value: "", isValid: null },
  })
  const { name, date, quota, location } = state
  const handleSubmit = e => {
    e.preventDefault()
    dispatch(confStartAddNew({ ...state, user: uid }))
  }
  return (
    <Layout>
      <Row className="justify-content-center">
        <Col sm="4">
          <Form onSubmit={handleSubmit} className="shadow p-4 mt-5">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Row className="align-items-center">
                <Col sm="2">
                  <Form.Label>Title:</Form.Label>
                </Col>
                <Col sm={10}>
                  <Form.Control
                    name="name"
                    value={name.value}
                    onChange={handleChange}
                    type="text"
                    placeholder="Name of conference"
                  />
                </Col>
              </Row>
            </Form.Group>
            <Form.Group>
              <Row className="align-items-center">
                <Col sm="2" className="align-items-center">
                  <Form.Label>Date:</Form.Label>
                </Col>
                <Col sm={10}>
                  <input
                    type="date"
                    name="date"
                    value={date.value}
                    onChange={handleChange}
                    min={Date.now()}
                  ></input>
                </Col>
              </Row>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Row className="align-items-center">
                <Col sm="2">
                  <Form.Label>Location:</Form.Label>
                </Col>
                <Col sm={10}>
                  <Form.Control
                    value={location.value}
                    onChange={handleChange}
                    name="location"
                    type="text"
                    placeholder="Name of the location"
                  />
                </Col>
              </Row>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Row className="align-items-center">
                <Col sm="2">
                  <Form.Label>Quota:</Form.Label>
                </Col>
                <Col sm={10}>
                  <Form.Control
                    value={quota.value}
                    onChange={handleChange}
                    name="quota"
                    type="number"
                    placeholder="Name of the location"
                  />
                </Col>
              </Row>
            </Form.Group>
            <Row>
              <Button column="true" variant="primary" type="submit">
                Make Conference
              </Button>
            </Row>
          </Form>
        </Col>
      </Row>
    </Layout>
  )
}

export default createNewConf
