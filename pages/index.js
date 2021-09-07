import { useRouter } from "next/router"
import { useEffect } from "react"
import { Container } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { Conference } from "../components/Conference"
import Layout from "../components/Layout"
import { confStartLoading } from "../redux/actions/conferences"

export default function Home() {
  const { auth, conferences } = useSelector(state => state)
  const { uid, role } = auth
  const { confs } = conferences

  const dispatch = useDispatch()
  const router = useRouter()
  useEffect(() => {
    // console.log(uid)
    if (!uid) {
      router.push("/login")
    }
  }, [uid])
  useEffect(() => {
    dispatch(confStartLoading())
  }, [dispatch])

  return (
    <Layout>
      <h1>Conferences</h1>

      <Container className="d-flex gap-4 ">
        {confs
          ?.filter(conf => conf.state === "activated")
          .map(({ id, name, date, quota, location, speaker, attendees }) => {
            return (
              <Conference
                key={id}
                id={id}
                name={name}
                date={date}
                location={location}
                quota={quota}
                attendees={attendees}
                speakerName={speaker?.name}
                role={role}
                uid={uid}
              />
            )
          })}
      </Container>
    </Layout>
  )
}
