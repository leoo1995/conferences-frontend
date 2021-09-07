import { useRouter } from "next/router"
import { useEffect } from "react"
import { Card, Spinner } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Layout from "../../../../components/Layout"
import { userStartLoading } from "../../../../redux/actions/auth"
import { confStartLoading } from "../../../../redux/actions/conferences"

const attendees = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(userStartLoading())
    dispatch(confStartLoading())
  }, [dispatch])
  const { confs } = useSelector(s => s.conferences)
  const { users } = useSelector(s => s.auth)
  const { query } = useRouter()
  const { conferenceId } = query
  const conference = confs?.find(conf => conf?.id === conferenceId)
  const attendees = conference?.attendees
  const attendeesUser = attendees?.map(att =>
    users?.find(user => user?.id === att),
  )

  if (!confs && !users)
    return (
      <Layout>
        <Spinner animation="border" variant="primary" />
      </Layout>
    )
  return (
    <Layout>
      {attendeesUser?.map(attN => {
        return <Card key={attN?.id}>{attN?.name}</Card>
      })}
    </Layout>
  )
}

export default attendees
