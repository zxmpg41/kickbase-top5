import { useEffect, useState } from 'react'
import { Header, UserItem } from './components/ui'
import { getRanks } from './service/kickbase'

function App() {
  const [data, setData] = useState([])

  const updateData = async () => {
    const resp = await getRanks()
    if (resp) {
      setData(resp)
    }
  }

  useEffect(() => {
    updateData()
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      updateData()
    }, 30 * 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="p-4">
      <Header />

      <div className="space-y-2">
        {data.map((user, i) => (
          <UserItem key={user.id} userData={user} rank={i + 1} />
        ))}
      </div>
    </div>
  )
}

export default App
