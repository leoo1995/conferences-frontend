import dayjs from "dayjs"
import Link from "next/link"
import classNames from "classnames"
import { Button, Card } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import {
  confStartLoading,
  confStartUpdate,
} from "../../redux/actions/conferences"

export const ConferenceSpeaker = props => {
  const dispatch = useDispatch()
  const { isLoading } = useSelector(state => state.conferences)
  const {
    id,
    name,
    date,
    quota,
    speakerName,
    attendees,
    location,
    state,
    speaker,
  } = props
  const alternateStateConference = () => {
    dispatch(
      confStartUpdate({
        ...props,
        state: state === "activated" ? "desactivated" : "activated",
      }),
    )
    dispatch(confStartLoading())
    dispatch(confStartLoading())
    dispatch(confStartLoading())
    dispatch(confStartLoading())
  }
  return (
    <Card
      className={classNames("mt-3 d-flex", {
        "bg-warning": state === "desactivated",
      })}
    >
      <Card.Header>
        <Card.Title>{name}</Card.Title>
      </Card.Header>

      <Card.Body className="d-flex flex-column">
        <Card.Subtitle>
          {dayjs(date).format("HH:mm[ - ]DD/MM/YY")}
        </Card.Subtitle>
        <Card.Subtitle>{location}</Card.Subtitle>
        <Card.Subtitle>Quota: {quota}</Card.Subtitle>
        <Card.Subtitle>By: {speakerName}</Card.Subtitle>
        <Card.Subtitle>
          Available quota: {quota - attendees.length}
        </Card.Subtitle>
        <Card.Footer className="d-flex gap-3 px-0">
          <Button
            onClick={alternateStateConference}
            disabled={attendees.length || isLoading}
          >
            {state === "activated" ? "Desactivate" : "Activate"}
          </Button>

          <Link href={`/${speaker._id}/${id}/attendees`}>
            <Button as="a">{"attendees"}</Button>
          </Link>
        </Card.Footer>
      </Card.Body>
    </Card>
  )
}
