import { useState, useEffect, useRef } from 'react'

export function useTimer() {
  const [time, setTime] = useState(0)
  const timerId = useRef(0)
  const [isCounting, setIsCounting] = useState(false)

  useEffect(() => {
    if (isCounting) {
      timerId.current = setInterval(() => {
        setTime(_time => _time + 1)
      }, 1000)
    } else {
      clearInterval(timerId.current)
    }
    return () => clearInterval(timerId.current)
  }, [isCounting])

  const start = () => setIsCounting(true)
  const stop = () => setIsCounting(false)
  const reset = () => setTime(0)

  return {start, stop, reset, time}
}