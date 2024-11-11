import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'

const TeamIcon = ({ teamId }) => {
  const [imagePath, setImagePath] = useState('')

  useEffect(() => {
    import(`../../assets/teams/${teamId}.png`)
      .then((image) => setImagePath(image.default))
      .catch((err) =>
        console.error(`Failed to load image for team ${teamId}`, err)
      )
  }, [teamId])

  return imagePath ? (
    <img src={imagePath} width={24} alt={`Team ${teamId}`} />
  ) : null
}

TeamIcon.propTypes = {
  teamId: PropTypes.string.isRequired,
}

export default TeamIcon
