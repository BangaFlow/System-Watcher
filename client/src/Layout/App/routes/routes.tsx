import React from 'react'
import {  Button, Result } from 'antd'
import { NavLink } from 'react-router-dom'
import Home from '../../../components/report/Home'
import History from '../../../components/report/History'
import Map from '../../../components/location/Map'
import UserSettings from '../../../pages/UserSettings'
//? SideBar Routes For ADMIN
const adminRoutes = [
  {
    path: '/',
    exact: true,
    sidebar: () => <h1>ADMIN SETTINGS</h1>
  }
]

// ? Sidebar Routes For USER

export const routes = [
  {
    path: '/',
    exact: true,
    sidebar: () => <Home />
  },
  {
    path: '/history',
    sidebar: () => <History />,
  },
  {
    path: '/report',
    sidebar: () => <div style={{ width: '100%'}} >
                    <Map/>
                  </div>,
  },
  {
    path: '/settings',
    sidebar: () => <UserSettings />
  },
  {
    path: '*',
    sidebar: () => <Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    extra={
      <Button type="primary">
        <NavLink to='/app'>
          Back Home
        </NavLink>
      </Button>}
  />
  }
]