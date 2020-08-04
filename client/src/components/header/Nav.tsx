import React from 'react'
import { NavLink } from 'react-router-dom'

function Nav() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <NavLink exact to="/" activeClassName="hurray">Home</NavLink>
          </li>
          <li>
            <NavLink to="/about" activeClassName="hurray">About</NavLink>
          </li>
          <li>
            <NavLink to="/users" activeClassName="hurray">Users</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Nav
