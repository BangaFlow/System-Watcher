import React, { useState, useEffect } from 'react'
import { Layout } from 'antd'

type User = {
  id: number,
  firstName: string,
  lastName: string
}

function User() {

  const [users, setUsers] = useState([])
  const { Content } = Layout

  useEffect(() => {
    fetch('http://localhost:5000/api/users')
    .then(res => res.json())
    .then(data =>setUsers(data))
  }, [])
  
  return (
    <Content style={{
      height: "100%",
      
    }} >
      <ul>
        {
          users.length > 0 
          ?
          users.map((user: User) => <li key={user.id}>{ user.firstName } { user.lastName }</li>)
          : 
          null
        }
      </ul>
    </Content>
  )
}

export default User
