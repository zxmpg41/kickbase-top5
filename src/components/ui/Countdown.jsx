import { useEffect, useState } from 'react'

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState(30)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime === 1) {
          return 30
        } else {
          return prevTime - 1
        }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div>
      <h1>Next refresh: {timeLeft}s</h1>
    </div>
  )
}

export default Countdown
