import dayjs from "dayjs"
import { useEffect } from "react"
import { Button, Card } from "react-bootstrap"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import {
  confStartLoading,
  confStartUpdate,
} from "../../redux/actions/conferences"

export const Conference = props => {
  const dispatch = useDispatch()
  const { id, name, date, quota, speakerName, attendees, location, role, uid } =
    props
  // console.log(typeof uid)
  const isAttendee = attendees.includes(uid)
  const conference = useSelector(state => state.conferences)
  const isLoading = conference?.isLoading
  const beAttendee = () => {
    if (!isAttendee) {
      dispatch(confStartUpdate({ ...props, attendees: [...attendees, uid] }))
    } else {
      dispatch(
        confStartUpdate({
          ...props,
          attendees: attendees.filter(att => att !== uid),
        }),
      )
    }
    dispatch(confStartLoading())
    dispatch(confStartLoading())
    dispatch(confStartLoading())
    dispatch(confStartLoading())
  }

  return (
    <Card className="shadow">
      <Card.Header>
        <Card.Title>
          <b>{name}</b>
        </Card.Title>
      </Card.Header>

      <Card.Body className="d-flex flex-column gap-2">
        <Card.Subtitle>
          <b>Date:</b> {dayjs(date).format("DD/MM/YY")}
        </Card.Subtitle>
        <Card.Subtitle>
          <b>Location:</b> {location}
        </Card.Subtitle>
        <Card.Subtitle>
          <b>Quota:</b> {quota}
        </Card.Subtitle>
        <Card.Subtitle>
          <b>By:</b> {speakerName}
        </Card.Subtitle>
        <Card.Subtitle>
          <b>Available quota:</b> {quota - attendees.length}
        </Card.Subtitle>
        {role === "attendant" ? (
          <Card.Footer>
            <Button
              onClick={beAttendee}
              className={isAttendee && "bg-error"}
              disabled={isLoading}
            >
              {isAttendee ? "Cancel" : "I'm in"}
            </Button>
          </Card.Footer>
        ) : null}
      </Card.Body>
    </Card>
  )
}
