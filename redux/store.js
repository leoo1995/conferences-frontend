import { createStore, applyMiddleware } from "redux"
import { authReducer } from "./reducers/authReducer"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import { rootReducer } from "./reducers"

const initialState = {}
const middleware = [thunk]
export const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)
