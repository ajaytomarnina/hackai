import { useState, useEffect } from 'react'
import classes from 'Layout/Button.module.scss'
import clsx from 'clsx'
import { forwardRef } from 'react'

const Button = forwardRef((props, ref) => {
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (props.loader === true) {
      setLoading(true)
    } else if (props.loader === false) {
      let time = 3000
      if (props.apiError?.status >= 400) time = 0
      const timer = setTimeout(() => {
        setLoading(false)
      }, time)

      return () => {
        clearTimeout(timer)
      }
    }
  }, [props.loader])

  return (
    <button
      onClick={props.onClick}
      disabled={props.disabled}
      className={clsx(classes.btn, props.className, props.btnClass, 'gap-2')}
      ref={ref}
      style={props.style}
    >
      {props.icon !== undefined && (
        <img
          src={props.icon}
          alt={`${props.text}-icon`}
          className={clsx('w-8 h-8 ml-3', props.btnClassIcon)}
        />
      )}
      {(props.loader || loading) && (
        <svg
          class="animate-spin -ml-1 mr-3 h-8 w-8 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
            stroke-dasharray="64"
            stroke-dashoffset="0"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
      <div className={clsx(classes.text, props.btnClassText)}>{props.text}</div>
    </button>
  )
})
export default Button
