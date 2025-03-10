import classes from 'Components/Authentication/PasswordInput.module.scss'
import eyeOff from 'assets/Icons/eye-off.svg'
import eyeOn from 'assets/Icons/eye.svg'
import { useState } from 'react'
import TextInput from 'Layout/TextInput'

const PasswordInput = (props) => {
  const { initiateFocus, focusRef, noneRef } = props
  const [showPassword, setShowPassword] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [error, setError] = useState(false)

  return (
    <div className={`${classes.box} ${props.className}`}>
      <div className={`${classes.password} ${error && classes.password_error}`}>
        <TextInput
          type={showPassword ? 'text' : 'password'}
          text={props.text}
          className={classes.password_input}
          validation={props.validation}
          errorMessage={props.errorMessage}
          enteredInput={props.enteredInput}
          setInput={props.setInput}
          inputValidity={props.inputValidity}
          setFocus={(value) => setIsFocused(value)}
          hasError={props.hasError}
          error={(value) => setError(value)}
          maxLength={props.maxLength}
          name={props.name}
          initiateFocus={initiateFocus}
          focusRef={focusRef}
          noneRef={noneRef}
        />
        {!showPassword && (
          <img
            src={eyeOff}
            alt="eye-off-icon"
            className={classes.eye}
            onClick={() => {
              setShowPassword(true)
            }}
          />
        )}
        {showPassword && (
          <img
            src={eyeOn}
            alt="eye-on-icon"
            className={classes.eye}
            onClick={() => {
              setShowPassword(false)
            }}
          />
        )}
      </div>
    </div>
  )
}
export default PasswordInput
