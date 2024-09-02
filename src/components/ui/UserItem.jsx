import PropTypes from 'prop-types'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Card,
  PlayerTable,
} from '.'

export const UserItem = ({ userData, rank }) => {
  return (
    <Card className="pr-4">
      <Accordion collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger className="hover:no-underline py-2">
            <div className="px-4 flex justify-between w-full items-center">
              <div className="flex text-lg font-semibold space-x-1">
                <div>{`${rank}.`}</div>
                <div>{userData.name}</div>
              </div>
              <div className="flex items-end flex-col text-lg">
                <div className="flex space-x-1">
                  <div>Live Points:</div>
                  <div className="font-semibold">{userData.livePoints}</div>
                </div>
                <div className="flex space-x-1 text-muted-foreground text-sm">
                  <div>Total Points:</div>
                  <div>{userData.totalPoints}</div>
                </div>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4">
            <PlayerTable players={userData.players} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  )
}

UserItem.propTypes = {
  userData: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    livePoints: PropTypes.number.isRequired,
    totalPoints: PropTypes.number.isRequired,
    players: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        points: PropTypes.number.isRequired,
        teamId: PropTypes.string,
      })
    ),
  }).isRequired,
  rank: PropTypes.number,
}
