import classes from 'Pages/Authentication/Login.module.scss'
import TextInput from 'Layout/TextInput'
import {
  Form,
  redirect,
  useNavigation,
  useSearchParams,
  useSubmit,
} from 'react-router-dom'
import Button from 'Layout/Button'
import { useEffect, useState, useRef } from 'react'
import PasswordInput from 'Components/Authentication/PasswordInput'
import { useDispatch, useSelector } from 'react-redux'
import { LoginActions, AuthActions } from 'Store/auth-redux'
import { baseUrl } from 'constants/Network'
import clsx from 'clsx'

const emailValidation = [
  (value) => value.trim() !== '',
  (value) => /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value),
]
const Login = (props) => {
  const submit = useSubmit()
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const [wrongInput, setWrongInput] = useState(false)
  const [clicked, setClicked] = useState(false)
  const [searchParam, setSearchParam] = useSearchParams()

  let loginType = searchParam.get('mode')

  const emailInput = useSelector((state) => state.login.emailInput)
  const isEmailValid = useSelector((state) => state.login.isEmailValid)
  const passwordInput = useSelector((state) => state.login.passwordInput)
  const isPasswordValid = useSelector((state) => state.login.isPasswordValid)
  const isMobileValid = useSelector((state) => state.login.isMobileValid)
  const mobileNumberInput = useSelector(
    (state) => state.login.mobileNumberInput
  )
  const mobileCodeInput = useSelector((state) => state.login.mobileCodeInput)
  const focusRef = useRef(null)
  const noneRef = useRef(null)

  const handleFocus = () => {
    if (focusRef.current) {
      focusRef.current.focus()
    }
  }

  useEffect(() => {
    if (localStorage.getItem('error')) {
      dispatch(AuthActions.setShowBackendError(true))
    } else dispatch(AuthActions.setShowBackendError(false))
  }, [localStorage.getItem('error')])

  let invalidForm = !(
    ((loginType?.toLowerCase() !== 'mobile' && isEmailValid) ||
      (loginType?.toLowerCase() === 'mobile' && isMobileValid)) &&
    isPasswordValid
  )
  const isSubmitting = navigation.state === 'submitting'

  const formSubmitHandler = (event) => {
    event.preventDefault()
    setClicked(true)
    dispatch(AuthActions.setShowBackendError(false))

    if (invalidForm) {
      handleFocus()
      setWrongInput(true)
      return
    }
    setWrongInput(false)
    submit(
      {
        email: emailInput,
        mobile: `${mobileCodeInput} ${mobileNumberInput}`,
        password: passwordInput,
      },
      { method: 'POST' }
    )
    setWrongInput(true)
  }

  return (
    <div className={`${classes.login} ${props.className}`}>
      <div className={clsx(classes.header)}>Sign in to your account with:</div>

      <Form className={classes.form} onSubmit={formSubmitHandler}>
        <TextInput
          type="text"
          text="Email Address"
          className={classes.input}
          errorMessage="Please enter a valid email address"
          validation={emailValidation}
          inputValidity={(value) =>
            dispatch(LoginActions.setEmailValidity(value))
          }
          setInput={(value) => {
            setClicked(true)
            dispatch(LoginActions.setEmailInput(value))
          }}
          enteredInput={emailInput}
          hasError={
            wrongInput && loginType?.toLowerCase() !== 'mobile' && !isEmailValid
          }
          maxLength={128}
          name="email"
          initiateFocus={!isEmailValid}
          focusRef={focusRef}
          noneRef={noneRef}
        />
        <PasswordInput
          className={classes.password}
          text={'Password'}
          inputValidity={(value) =>
            dispatch(LoginActions.setPasswordValidity(value))
          }
          setInput={(value) => {
            setClicked(true)
            dispatch(LoginActions.setPasswordInput(value))
          }}
          errorMessage="Please enter a valid password"
          isValid={true}
          validation={[(value) => value !== '']}
          enteredInput={passwordInput}
          hasError={wrongInput && !isPasswordValid}
          maxLength={30}
          name="password"
          initiateFocus={(isEmailValid || isMobileValid) && !isPasswordValid}
          focusRef={focusRef}
          noneRef={noneRef}
        />
        <Button
          text={isSubmitting ? 'Signing in...' : 'Sign in'}
          disabled={isSubmitting}
          className={`
                        ${classes.btn}
                        ${
                          isSubmitting ||
                          (clicked && (!isPasswordValid || !isEmailValid))
                            ? classes.disabled
                            : classes.abled
                        }
                    `}
        />
      </Form>
    </div>
  )
}
export default Login

export async function action({ request, params }) {
  const data = await request.formData()

  const loginData = {
    username: data.get('email') || data.get('mobile'),
    password: data.get('password'),
  }

  try {
    const response = await fetch(baseUrl.api + `/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
      credentials: 'include',
    })

    if (!response.ok) {
      throw new Error('API call failed')
    }

    localStorage.removeItem('error')
    const responseData = await response.json()
    localStorage.setItem(
      'username',
      responseData?.data?.username || 'Anonymous'
    )
    localStorage.setItem('isRefresh', true)
    console.log('responseData')
    return redirect('/dashboard')
  } catch (error) {
    // Fallback to dummy login
    console.log('error')

    return new Promise((resolve) => {
      setTimeout(() => {
        // Dummy validation logic
        if (
          loginData.username === 'test@example.com' &&
          loginData.password === 'password'
        ) {
          localStorage.removeItem('error')
          localStorage.setItem('username', loginData.username)
          localStorage.setItem('isRefresh', true)
          resolve(redirect('/dashboard'))
          console.log('redirect')
        } else {
          localStorage.setItem(
            'error',
            Math.floor(100000 + Math.random() * 900000)
          )
          resolve(redirect('/dashboard'))
          resolve({ ok: true })
          console.log('error 2')
        }
      }, 1000) // Simulate a 1-second delay
    })
  }
}
