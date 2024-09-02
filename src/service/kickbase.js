export const getLivePoints = async () => {
  const response = await fetch(
    'https://api.kickbase.com/leagues/2114006/live',
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
  const response = await fetch('https://api.kickbase.com/leagues', {
    headers: { authorization: 'Bearer ' + import.meta.env.VITE_TOKEN },
  })
  const data = await response.json()

  return {
    id: data.leagues[0].id,
    name: data.leagues[0].name,
    logo: data.leagues[0].ci,
  }
}

// export const login = async (email, password) => {
//   const response = await fetch('https://api.kickbase.com/user/login', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       email: email,
//       password: password,
//       ext: false,
//     }),
//   })
//   const loginData = await response.json()
//   return loginData.token
// }
