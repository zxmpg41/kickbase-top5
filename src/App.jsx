import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui'
import { useEffect, useState } from 'react'
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
    <>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Rank</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Live Points</TableHead>
            <TableHead>Total Points</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((user, i) => (
            <TableRow key={user.id}>
              <TableCell>{i + 1}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.livePoints}</TableCell>
              <TableCell>{user.totalPoints}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}

export default App
