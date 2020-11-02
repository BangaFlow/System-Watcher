import React, { useEffect, useRef } from 'react'
import './layout.css'
import { Layout, Menu, Space, Button, Dropdown } from 'antd'
import { UserOutlined, LockOutlined, SettingOutlined } from '@ant-design/icons'
import { Switch, Route, NavLink, RouteComponentProps } from 'react-router-dom'
import { logOutFetch, stayActiveFetch } from '../../services'
import IdleTimer from 'react-idle-timer'
import swal from 'sweetalert'
import { UserContext } from '../../helpers/UserContext'
import { routes } from './routes/routes'
import SideBarMenu from './Sidebar/SideBarMenu'

const handleLogout = async () => {
  await logOutFetch()
  .then(data => {
    console.log('Success:', data)
    localStorage.removeItem('user')
    window.location.href = '/'
  })
  .catch((error) => {
    console.error('Error:', error)
    swal("Network Error", JSON.parse(error).message.replace(/"/g, ''), "error")
  })
}
// ? Top Navbar Menu
const menu: JSX.Element = (
  <Menu >
    <Menu.Item>
      <NavLink to='/app/settings'>
        <SettingOutlined style={{ marginRight: '1rem'}} /> Settings
      </NavLink>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item>
      <Button type='dashed' icon={<LockOutlined />} onClick={ () => handleLogout() }>LogOut</Button>
    </Menu.Item>
  </Menu>
)

function AppLayout(props: RouteComponentProps) {

  const { Header, Content, Footer, Sider } = Layout
  const { match } = props
  // @ts-ignore
  const { user, setUser } = React.useContext(UserContext)

  const idleTimerRef = useRef(null)

  const onIdle = () => {
    swal({
      title: 'Idle TimeOut',
      text: 'Session will expire soon!',
      icon: 'warning',
      buttons: ['Stay', 'Log Out']
    })
    .then(async (active) => {
      if(active) {
        swal("You will be redirect to home screen now.", {
          icon: "success",
        });
        localStorage.removeItem('user')
        await handleLogout()
      } else {
        await stayActiveFetch()
        .catch((error) => {
          console.error('Error:', error)
          swal("Network Error", JSON.parse(error).message.replace(/"/g, ''), "error")
        })
      }
    })
  }

  const isActive = async () => {
    await stayActiveFetch()
        .catch((error) => {
          swal("Network Error", JSON.parse(error).message.replace(/"/g, ''), "error")
          .then( () => {
            setUser(null)
          })
        })
  }

useEffect(() => {
  isActive()
  // eslint-disable-next-line
}, [])
  
  return (
    <Layout style={{ minHeight: '100vh'}}>
      {/* // ! Side Bar Menu */}
      <Sider
        breakpoint="md"
        collapsedWidth="0"
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type)
        }}
      >
        <div className="logo" />
        <SideBarMenu />
      </Sider>
      <Layout>
        {/* // ! Top Nav Bar */}
        <Header className="site-layout-sub-header-background" style={{ padding: 0 }}>
          <Space style={{ float: 'right', marginRight: '5rem' }}>
            <span style={{ marginRight: '1.5rem', letterSpacing: '1.5px' }}> { user ? user.name :  'Unknown' }</span>
          <Dropdown overlay={menu} placement="bottomLeft" arrow>
            <Button icon={<UserOutlined />} shape='circle' />
          </Dropdown>
          </Space>
        </Header>
        {/* 24 // ! Main Content */}
        <Content style={{ margin: '48px 24px 0' }}>
          <div className="site-layout-background" style={{ padding: '24px 0' }}>
          <Switch>
            {routes.map((route, index) => (
              //* Render more <Route>s with the same paths as
              //* above, but different components this time.
              <Route
                key={index}
                path={`${match.url}${route.path}`}
                exact={route.exact}
                children={<route.sidebar />}
              />
            ))}  
          </Switch>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>TunisianCloud ©2020 Created by <em>Khaled Saidi</em></Footer>
      </Layout>
      <IdleTimer
      ref={idleTimerRef}
      timeout={25 * 60 * 1000}
      onIdle={onIdle}
      >
      </IdleTimer>
    </Layout>
  )
}

export default AppLayout
