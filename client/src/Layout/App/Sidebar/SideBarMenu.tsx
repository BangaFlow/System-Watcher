import React from 'react'
import { Menu } from 'antd'
import { NavLink } from 'react-router-dom'
import { AlertOutlined, HistoryOutlined, HomeOutlined } from '@ant-design/icons'

function SideBarMenu() {
  return (
    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
      <Menu.Item key="1" icon={<HomeOutlined />}>
        <NavLink to='/app'>Home</NavLink>
      </Menu.Item>
      <Menu.Item key="2" icon={<AlertOutlined />}>
        <NavLink to='/app/report'>Report</NavLink>
      </Menu.Item>
      <Menu.Item key="3" icon={<HistoryOutlined />}>
        <NavLink to='/app/history'>History</NavLink>
      </Menu.Item>
    </Menu>
  )
}

export default SideBarMenu
