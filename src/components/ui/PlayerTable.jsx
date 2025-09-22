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
import TeamIcon from './TeamIcon'
import KEEPERS from '@/service/keepers.json'

export const PlayerTable = ({ userId }) => {
  const [data, setData] = useState([])
  const [isKeeperTop3, setIsKeeperTop3] = useState(false)

  const getKeeperInTop3 = (players) => {
    return players
      .slice(0, 3)
      .some((player) => KEEPERS.some((keeper) => keeper.id === player.id))
  }

  const updateData = async () => {
    if (userId === undefined) {
      return
    }
    const resp = await getPlayerPoints(userId)
    if (resp) {
      setData(resp)
      setIsKeeperTop3(getKeeperInTop3(resp))
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

  console.log(data)

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
              className={[
                i < 3 &&
                  'bg-rose-100 hover:bg-rose-200 dark:bg-rose-500 dark:hover:bg-rose-400',
                i === 3 &&
                  isKeeperTop3 &&
                  'bg-orange-100 hover:bg-orange-200 dark:bg-orange-500 dark:hover:bg-orange-400',
              ]}
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
