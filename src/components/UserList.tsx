import { SortBy, type User } from '../types/types.d'

interface Props {
  changeSorting: (sort: SortBy) => void
  deleteUser: (email:string) => void
  showColors: boolean
  users: User[]
}

export const UserList = ({ users, showColors,deleteUser, changeSorting }: Props) => {
  return (
    <table width="100%">
      <thead>
        <tr>
          <th>Foto</th>
          <th className='pointer' onClick={()=>changeSorting(SortBy.NAME)}>Nombre</th>
          <th className='pointer' onClick={()=>changeSorting(SortBy.LAST)}>Apellido</th>
          <th className='pointer' onClick={()=>changeSorting(SortBy.COUNTRY)}>País</th>
          <th>Acciones</th>
        </tr>
      </thead>

      <tbody className={showColors ? "table--showColors" : "table"}>
        {
          users.map((user, index) => {
            // esta es otra forma sin el className del tbody
            // const backgroundColor = index % 2 === 0 ? '#333' : '#555'
            // const color = showColors ? backgroundColor : 'transparent'
            // style={{ backgroundColor: color }} agregar esto al tr

            return (
              <tr key={user.email} >
                <td><img src={user.picture.thumbnail} /></td>
                <td >{user.name.first}</td>
                <td>{user.name.last}</td>
                <td >{user.location.country}</td>
                <td><button onClick={()=> {deleteUser(user.email)}}>Borrar</button></td>
              </tr>
            )
          })
        }
      </tbody>
    </table>
  )
}

// table, thead, tbody <--- SON LA CLAVE
// tr <--- ROW
// th <--- CELDAS DEL HEADER
// Td <--- CELL (celdas)
