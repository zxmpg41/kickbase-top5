export const getLivePoints = async () => {
  const response = await fetch(
    'https://api.kickbase.com/v4/leagues/2114006/live',
    {
      headers: { authorization: 'Bearer ' + import.meta.env.VITE_TOKEN },
    }
  )
  const data = await response.json()
  const ranks = data.u.sort((a, b) => b.t - a.t)
  return formatData(ranks)
}

const formatData = (data) => {
  const formatedData = data.map((user) => {
    return {
      id: user.id,
      name: user.n,
      livePoints: user.t,
      totalPoints: user.st,
      players: user.pl.map((player) => {
        return {
          id: player.id,
          teamId: player.tid,
          name: `${player.fn} ${player.n}`,
          points: player.t,
        }
      }),
    }
  })

  formatedData.forEach((user) => {
    user.players.sort((a, b) => b.points - a.points)
  })

  return formatedData
}

export const getLeague = async () => {
  const response = await fetch(
    'https://api.kickbase.com/v4/leagues/selection',
    {
      headers: { authorization: 'Bearer ' + import.meta.env.VITE_TOKEN },
    }
  )
  const data = await response.json()

  return {
    id: data.it[0].i,
    name: data.it[0].n,
    logo: data.it[0].f,
  }
}
