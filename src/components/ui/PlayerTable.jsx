import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui'
import { getPlayerPoints } from '@/service/kickbase'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import TeamIcon from './teamicon'

export const PlayerTable = ({ userId }) => {
  const [data, setData] = useState([])

  const updateData = async () => {
    if (userId === undefined) {
      return
    }
    const resp = await getPlayerPoints(userId)
    if (resp) {
      setData(resp)
    }
  }

  useEffect(() => {
    updateData()
  }, []) // eslint-disable-line

  useEffect(() => {
    const timer = setInterval(() => {
      updateData()
    }, 30 * 1000)

    return () => clearInterval(timer)
  }, []) // eslint-disable-line

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Rank</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Points</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.length > 0 &&
          data.map((player, i) => (
            <TableRow
              key={i}
              className={
                i < 5 &&
                'bg-rose-100 hover:bg-rose-200 dark:bg-rose-500 dark:hover:bg-rose-400'
              }
            >
              <TableCell>{i + 1}</TableCell>
              <TableCell>
                <div
                  style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <TeamIcon teamId={player.teamId} />
                  {player.name}
                </div>
              </TableCell>
              <TableCell>{player.points}</TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  )
}

PlayerTable.propTypes = {
  userId: PropTypes.string.isRequired,
}
