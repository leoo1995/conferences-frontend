import { combineReducers } from "redux"
import { authReducer } from "./authReducer"
import { conferencesReducer } from "./conferencesReducer"

export const rootReducer = combineReducers({
  auth: authReducer,
  conferences: conferencesReducer
})
