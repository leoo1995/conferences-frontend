import { useState } from "react"
const regex = {
  name: /^[a-zA-ZÀ-ÿ\s]{4,30}$/, // Letras y espacios, pueden llevar acentos.
  password: /^.{6,12}$/, // 6 a 12 digitos.
  // email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
  email:
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
}
export const useForm = (form = {}) => {
  const [state, setState] = useState(form)
  const isValid = (value, type) => {
    switch (type) {
      case "text":
        return regex.name.test(value)

      case "email":
        return regex.email.test(value)

      case "password":
        return regex.password.test(value)

      default:
        return !!value
    }
  }
  const handleChange = ({ target }) => {
    setState(s => ({
      ...s,
      [target.name]: {
        value: target.value,
        isValid: isValid(target.value, target.type),
      },
    }))
  }
  return [state, handleChange]
}
