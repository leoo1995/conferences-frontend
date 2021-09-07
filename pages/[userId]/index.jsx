import Link from "next/link"
import { useDispatch, useSelector } from "react-redux"
import { CalendarPlus } from "@styled-icons/bootstrap/CalendarPlus"
import { Col, Container, Row, Button } from "react-bootstrap"
import Layout from "../../components/Layout"
import { ConferenceSpeaker } from "../../components/ConferenceSpeaker"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { confStartLoading } from "../../redux/actions/conferences"
import { Conference } from "../../components/Conference"

const user = () => {
  const { auth, conferences } = useSelector(state => state)
  const { uid, role } = auth
  const { confs } = conferences

  const dispatch = useDispatch()
  const router = useRouter()
  useEffect(() => {
    console.log(uid)
    if (!uid) {
      router.push("/login")
    }
  }, [uid])
  useEffect(() => {
    dispatch(confStartLoading())
    // console.log(confs)
  }, [dispatch])
  return (
    <Layout>
      <Container className="">
        <Row className="">
          <Col sm={10}>
            <h2 className="text-align center">My conferences</h2>
          </Col>
          <Col sm="2">
            <Link href={`/${uid}/create-new-conf`}>
              <Button as="a" hrer="">
                <CalendarPlus size={24} />
              </Button>
            </Link>
          </Col>
        </Row>
        <Row className="d-flex">
          <Col>
            {role !== "attendant"
              ? confs
                  ?.filter(conf => conf.speaker._id === uid)
                  .map(conf => {
                    console.log(conf)
                    return <ConferenceSpeaker key={conf.id} {...conf} />
                  })
              : confs
                  ?.filter(conf => conf.attendees.includes(uid))
                  .map(conf => {
                    console.log(conf)
                    return <Conference key={conf.id} {...conf} />
                  })}
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}

export default user
