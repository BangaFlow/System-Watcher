import React, { useState, useEffect } from 'react'

type User = {
  id: number,
  firstName: string,
  lastName: string
}

function User() {

  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch('http://localhost:5000/api/users')
    .then(res => res.json())
    .then(data =>setUsers(data))
  }, [])
  
  return (
    <ul>
      {
        users.length > 0 
        ?
        users.map((user: User) => <li key={user.id}>{ user.firstName } { user.lastName }</li>)
        : 
        null
      }
    </ul>
  )
}

export default User
