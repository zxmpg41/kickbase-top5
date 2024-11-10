import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui'
import PropTypes from 'prop-types'

export const PlayerTable = ({ players }) => {
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
        {players.length > 0 &&
          players.map((player, i) => (
            <TableRow
              key={player.id}
              className={
                i < 5 &&
                'bg-rose-100 hover:bg-rose-200 dark:bg-rose-500 dark:hover:bg-rose-400'
              }
            >
              <TableCell>{i + 1}</TableCell>
              <TableCell>{player.name}</TableCell>
              <TableCell>{player.points}</TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  )
}

PlayerTable.propTypes = {
  players: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      points: PropTypes.number,
      teamId: PropTypes.number,
    })
  ).isRequired,
}
