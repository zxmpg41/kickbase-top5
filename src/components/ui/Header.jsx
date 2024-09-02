import { getLeague } from '@/service/kickbase'
import { useEffect, useState } from 'react'
import { ModeToggle } from '.'

export const Header = () => {
  const [league, setLeague] = useState()

  useEffect(() => {
    const fetchData = async () => {
      return await getLeague()
    }
    fetchData().then((resp) => {
      if (resp) {
        setLeague(resp)
      }
    })
  }, [])

  return (
    <header className="bg-gray-800 text-white p-4 rounded-lg mb-2 flex justify-between">
      <div className="flex flex-row items-center space-x-2">
        <img src={league?.logo} alt="logo" className="w-10 h-10 rounded-full" />
        <h1 className="text-2xl font-bold">{league?.name}</h1>
      </div>
      <ModeToggle />
    </header>
  )
}
