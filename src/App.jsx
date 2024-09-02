import { useEffect, useState } from 'react'
import { Header, UserItem } from './components/ui'
import { getLivePoints } from './service/kickbase'

function App() {
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      return await getLivePoints()
    }

    fetchData().then((resp) => {
      if (resp) {
        setData(resp)
      }
    })
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
