import React, { useRef } from 'react'
import './layout.css'
import { Layout, Menu, Space, Button, Dropdown, Result } from 'antd'
import { UserOutlined, LockOutlined, SettingOutlined, AliwangwangOutlined, HistoryOutlined, AlertOutlined, HomeOutlined } from '@ant-design/icons'
import { Switch, Route, NavLink, RouteComponentProps } from 'react-router-dom'
import { logOutFetch, stayActiveFetch } from '../../services'
import IdleTimer from 'react-idle-timer'
import swal from 'sweetalert'
import History from '../../components/report/History'
import Map from '../../components/location/Map'
import Home from '../../components/report/Home'
import UserSettings from '../../pages/UserSettings'
import { UserContext } from '../../helpers/UserContext'

// ? Sidebar Routes
const routes = [
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
    extra={<Button type="primary"><NavLink to='/app'>Back Home</NavLink></Button>}
  />
  }
]

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

const menu: JSX.Element = (
  <Menu >
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
      <AliwangwangOutlined style={{ marginRight: '1rem'}} /> Profile
      </a>
    </Menu.Item>
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
  const { user } = React.useContext(UserContext)

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
  
  return (
    <Layout style={{ minHeight: '100vh'}}>
      <Sider
        breakpoint="md"
        collapsedWidth="0"
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type)
        }}
      >
        <div className="logo" />
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
      </Sider>
      <Layout>
        <Header className="site-layout-sub-header-background" style={{ padding: 0 }}>
          <Space style={{ float: 'right', marginRight: '5rem' }}>
            <span style={{ marginRight: '1.5rem', letterSpacing: '1.5px' }}> { user ? user.name :  'Unknown' }</span>
          <Dropdown overlay={menu} placement="bottomLeft" arrow>
            <Button icon={<UserOutlined />} shape='circle' />
          </Dropdown>
          </Space>
        </Header>
        <Content style={{ margin: '48px 24px 0' }}>
          {/* 24 */}
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
