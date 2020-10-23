import React from 'react'

export interface UserContext {
  email: String
	name: String
	password: String
  verifiedAt: Date
  createdAt: Date
  updatedAt: Date
}

const UserContext = React.createContext({} as UserContext)

export default UserContext