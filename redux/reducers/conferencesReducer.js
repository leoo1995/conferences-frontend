import types from "../types"

const initialCondition = {
  isLoading: false,
  confs: [],
}
export const conferencesReducer = (state = initialCondition, action) => {
  const { type, payload } = action
  switch (type) {
    case types.CONF_CONFS_LOADED:
      return { ...state, confs: payload }
    case types.CONF_IS_LOADING:
      return { ...state, isLoading: true }
    case types.CONF_LOADING_FINISH:
      return { ...state, isLoading: false }
    default:
      return state
  }
}
