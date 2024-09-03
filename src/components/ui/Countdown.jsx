import { RefreshCw } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from '.'
import './Countdown.css'

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState(30)
  const [isReset, setIsReset] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime === 1) {
          setIsReset(true)
          setTimeout(() => setIsReset(false), 1000)
          return 30
        } else {
          return prevTime - 1
        }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <Button className="relative" variant="ghost" disabled>
      <div className="absolute text-xs font-extrabold">{timeLeft}</div>
      <RefreshCw size={34} className={isReset ? 'rotate' : ''} />
    </Button>
  )
}

export default Countdown
