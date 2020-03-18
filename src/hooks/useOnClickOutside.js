import { useRef, useEffect, useCallback } from "react"

const useOnClickOutside = (handler, active = true) => {
  const ref = useRef()

  const listener = useCallback(
    e => {
      if (ref.current && !ref.current.contains(e.target)) {
        handler(e)
      }
    },
    [ref, handler]
  )

  useEffect(() => {
    if (active) {
      document.addEventListener("click", listener)
    } else {
      document.removeEventListener("click", listener)
    }

    return () => {
      document.removeEventListener("click", listener)
    }
  }, [listener, active])

  return ref
}

export default useOnClickOutside
