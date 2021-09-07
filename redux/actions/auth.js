import Swal from "sweetalert2"
import { fetchToken, fetchTokenLess } from "../../helpers/fetch"
import types from "../types"

export const startLogin = (email, password) => async dispatch => {
  const emailValue = email.value
  const passwordValue = password.value
  const res = await fetchTokenLess(
    "auth",
    {
      email: emailValue,
      password: passwordValue,
    },
    "POST",
  )
  const body = await res.json()
  if (body.ok) {
    localStorage.setItem("token", body.token)
    localStorage.setItem("token-init-date", new Date().getTime())
    dispatch(
      login({
        uid: body.uid,
        name: body.name,
        role: body.role,
      }),
    )
  } else {
    Swal.fire("Error", body.msg, "error")
  }
}

export const startLogout = () => async dispatch => {
  localStorage.clear()
  dispatch(logout())
}
export const userStartLoading = () => async dispatch => {
  try {
    const res = await fetchToken("auth")
    const body = await res.json()
    const { users } = body
    // console.log(res)
    if (body.ok) {
      dispatch(usersLoaded(users))
    } else {
      Swal.fire("error", body.msg, "error")
    }
  } catch (e) {
    console.error(e)
  }
}

export const startRegister = ({
  name,
  email,
  password,
  confirmPassword,
  role,
}) => {
  return async dispatch => {
    const newUser = {
      name: name.value,
      email: email.value,
      password: password.value,
      confirmPassword: confirmPassword.value,
      role: role.value,
    }
    const res = await fetchTokenLess("auth/new", { ...newUser }, "POST")
    const body = await res.json()
    if (body.ok) {
      localStorage.setItem("token", body.token)
      localStorage.setItem("token-init-date", new Date().getTime())
      dispatch(
        login({
          uid: body.uid,
          name: body.name,
        }),
      )
    } else {
      if (body.msg === "It already exists an user with this email")
        return Swal.fire("Error", body.msg, "error")
    }
  }
}

export const startChecking = () => async dispatch => {
  const res = await fetchToken("auth/renew")
  const body = await res.json()
  if (body.ok) {
    localStorage.setItem("token", body.token)
    localStorage.setItem("token-init-date", new Date().getTime())
    dispatch(
      login({
        uid: body.uid,
        name: body.name,
      }),
    )
  } else {
    dispatch(checkingFinish())
  }
}
const usersLoaded = users => ({
  type: types.AUTH_USERS_LOADED,
  payload: users,
})
export const checkingFinish = () => ({ type: types.AUTH_CHECKING_FINISH })

export const login = user => ({
  type: types.AUTH_LOGIN,
  payload: user,
})
export const logout = () => ({ type: types.AUTH_LOGOUT })
