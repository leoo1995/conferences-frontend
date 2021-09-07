import Swal from "sweetalert2"
import { fetchToken } from "../../helpers/fetch"
import types from "../types"

export const confStartAddNew = conf => async dispatch => {
  const newConf = {
    ...conf,
    name: conf.name.value,
    location: conf.location.value,
    quota: conf.quota.value,
    date: conf.date.value,
  }
  const res = await fetchToken("conferences", newConf, "POST")
  const body = await res.json()
  // console.log(body)
  dispatch(confAddNew(newConf))
}
export const confStartLoading = () => async dispatch => {
  try {
    const res = await fetchToken("conferences")
    const body = await res.json()
    const { conferences } = body
    dispatch(eventsLoaded(conferences))
  } catch (e) {
    console.error(e)
  }
}

export const confStartUpdate = conf => async dispatch => {
  try {
    // console.log(conf)
    dispatch(confIsLoading())
    const res = await fetchToken(`conferences/${conf.id}`, conf, "PUT")
    const body = await res.json()
    // console.log(body)
    if (body.ok) {
      dispatch(confUpdated(conf))
      dispatch(confLoadingIsFinish())
    } else {
      dispatch(confLoadingIsFinish())

      Swal.fire("error", body.msg, "error")
    }
  } catch (error) {
    console.error(error)
  }
}
// export const confStartIsLoading =() =>{}
const confIsLoading = () => ({
  type: types.CONF_IS_LOADING,
})

const confLoadingIsFinish = () => ({
  type: types.CONF_LOADING_FINISH,
})
const confUpdated = conf => ({
  type: types.CONF_UPDATED,
  payload: conf,
})

const eventsLoaded = confs => ({
  type: types.CONF_CONFS_LOADED,
  payload: confs,
})
const confAddNew = conf => ({
  type: types.CONF_ADD_NEW,
  payload: conf,
})
