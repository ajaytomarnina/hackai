import { useEffect, useRef } from 'react'

const useClickOutside = (handler) => {
  const domNodeRef = useRef()

  useEffect(() => {
    const tempHandler = (event) => {
      if (!domNodeRef.current?.contains(event.target)) {
        handler()
      }
    }

    document.addEventListener('mousedown', tempHandler)

    return () => {
      document.removeEventListener('mousedown', tempHandler)
    }
  })

  return domNodeRef
}

export default useClickOutside
