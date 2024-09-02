export const getLivePoints = async () => {
  const token = import.meta.env.VITE_TOKEN

  const response = await fetch(
    'https://api.kickbase.com/leagues/2114006/live',
    {
      headers: { authorization: 'Bearer ' + token },
    }
  )
  const data = await response.json()
  const ranks = data.u.sort((a, b) => b.t - a.t)
  return formatData(ranks)
}

const formatData = (data) => {
  return data.map((user) => {
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
}

// [
//     {
//         name: 'Kevin',
//         livePoints: 0,
//         totalPoints: 0,
//         players: [
//             {
//                 id: 1683,
//                 name: 'Florian Müller',
//                 points: 0
//             }
//         ]
//     }
// ]

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
