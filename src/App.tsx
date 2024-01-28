import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import { UserList } from './components/UserList'
import { SortBy, type User } from './types/types.d'

const App: React.FunctionComponent = () => {
  const [users, setUsers] = useState<User[]>([])
  const [showColors, setShowColors] = useState(false)
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE)
  const [filterCountry, setFilterCountry] = useState<string | null>(null)

  // useRef es para guardar un valor que se comparta entre renderizados, pero que al cambiar no vuelva a renderizar el componente, tambien sirve para guardar un elemento del dom
  const originalUsers = useRef<User[]>([])

  const toggleColors = () => {
    setShowColors(!showColors)
  }

  const toggleSortByCountry = () => {
    const newSortingValue = sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE
    setSorting(newSortingValue)
  }

  const handleReset = () => {
    setUsers(originalUsers.current)
  }


  const handleDelete = (email: string) => {
    const filteredUsers = users.filter((user) => {
      return user.email !== email
    })

    setUsers(filteredUsers)

  }

  const handleChangeSort = (sort: SortBy) => {
    setSorting(sort)
  }

  useEffect(() => {
    fetch('https://randomuser.me/api?results=100')
      .then(async res => await res.json())
      .then(res => {
        setUsers(res.results)
        originalUsers.current = res.results
      }).catch(err => {
        console.error(err)
      })
  }, [])

  const filteredUsers =useMemo(() =>{

    console.log("calculate filterUsers")

    return typeof filterCountry === "string" && filterCountry.length > 0
      ? users.filter(user =>{
        return user.location.country.toLowerCase().includes(filterCountry.toLowerCase()
      )})
      : users
  }, [users, filterCountry]) 



  // aca decimeos que memorice el valor de la constante sortedUsers y no cambie ni lo vuelva a calcular entre renderizados, a menos que el valor de filteredUsers o sortByCountry cambie
  const sortedUsers = useMemo(() => {
    console.log("calculate sortedUsers")

    if (sorting === SortBy.NONE) return filteredUsers
  
   /*  return sorting
      ? [...filteredUsers].sort(
        (a, b) => { // sort muta el array original, lo cual no puedo vovler a obtener el original sin ordenar, por eso debemos usar destructuracion (spread operator)
          // localeCompare compoara dos string teniendo en cuenta el idioma y todo (acentos y demas), structuredClone(users) (copia profunda), users.toSorted() (nuevo en js)
          return a.location.country.localeCompare(b.location.country)
        })
    : filteredUsers */
    const compareProperties: Record<string, (user: User) => any> = {
      [SortBy.COUNTRY]: user => user.location.country,
      [SortBy.NAME]: user => user.name.first,
      [SortBy.LAST]: user => user.name.last
    }

    return filteredUsers.toSorted((a, b) => {
      const extractProperty = compareProperties[sorting]
      return extractProperty(a).localeCompare(extractProperty(b))
    })
  }
  
  , [filteredUsers, sorting])



  return (
    <>
      <div className='App'>
        <h1>Prueba técnica</h1>
        {/* {JSON.stringify(users)} */}
        <header>
          <button onClick={toggleColors}>
            Colorear filas
          </button>
          <button onClick={toggleSortByCountry}>
          {sorting === SortBy.COUNTRY ? 'No ordenar por país' : 'Ordenar por país'}
          </button>
          <button onClick={handleReset}>
            Resetear estado
          </button>
          <input type="text" placeholder='Filtra por país' onChange={(e)=>{setFilterCountry(e.target.value)}} />
        </header>
        <main>
          <UserList changeSorting={handleChangeSort} showColors={showColors} users={sortedUsers} deleteUser={handleDelete}/>
        </main>
      </div>
    </>
  )
}

export default App
