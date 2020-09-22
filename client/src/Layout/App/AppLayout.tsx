import React from 'react'
import './layout.css'
import { Layout, Menu, Space, Button, Dropdown } from 'antd'
import { UserOutlined, LockOutlined, SettingOutlined, AliwangwangOutlined, HistoryOutlined, AlertOutlined, HomeOutlined } from '@ant-design/icons'
import { Switch, Route, NavLink, RouteComponentProps } from 'react-router-dom'
import { logOutFetch } from '../../services'
import swal from 'sweetalert'
import History from '../../components/report/History'
import Map from '../../components/location/Map'
import Home from '../../components/report/Home'

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
      <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
        <SettingOutlined style={{ marginRight: '1rem'}} /> Settings
      </a>
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
  
  return (
    <Layout>
      <Sider
        breakpoint="md"
        collapsedWidth="0"
        // onBreakpoint={broken => {
        //   console.log(broken)
        // }}
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
            <span style={{ marginRight: '1.5rem', letterSpacing: '1.5px' }}>Khaled Saidi</span>
          <Dropdown overlay={menu} placement="bottomLeft" arrow>
            <Button icon={<UserOutlined />} shape='circle' />
          </Dropdown>
          </Space>
        </Header>
        <Content style={{ margin: '48px 24px 0' }}>
          {/* 24 */}
          <div className="site-layout-background" style={{ padding: '24px 0', minHeight: '80.8vh' }}>
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
    </Layout>
  )
}

export default AppLayout
