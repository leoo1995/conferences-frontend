import classNames from "classnames"
import { useRef } from "react"

export default function Input({
  type,
  inputName,
  name = "",
  placeholder,
  handleChange,
  label = "",
}) {
  const inputRef = useRef(null)
  const handleOpenFileInput = () => {
    inputRef.current.focus()
  }
  const isConfirmPassword = name === "confirmPassword"
  return (
    <div className="form-group">
      <label onClick={handleOpenFileInput}>{label}</label>
      <input
        ref={inputRef}
        name={name}
        value={inputName.value}
        onChange={handleChange}
        type={type}
        className={classNames("form-control", {
          "is-valid": !isConfirmPassword && inputName?.isValid,
          "is-invalid":
            !isConfirmPassword && !inputName?.isValid && inputName.value.length,
        })}
        aria-describedby={name}
        placeholder={placeholder}
      />
      {type === "password" ? (
        <small className="text-muted">Must be 6-20 characters long.</small>
      ) : null}
    </div>
  )
}
