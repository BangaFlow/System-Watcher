import React from 'react'
import './layout.css'
import { Layout, Menu, Space, Button, Dropdown } from 'antd'
import { UploadOutlined, UserOutlined, VideoCameraOutlined, LockOutlined, SettingOutlined, AliwangwangOutlined } from '@ant-design/icons'
import { Switch, Route, NavLink, RouteComponentProps } from 'react-router-dom'
import { logOutFetch } from '../../services'
import swal from 'sweetalert'


const handleLogout = async () => {
  await logOutFetch()
  .then(data => {
    console.log('Success:', data)
      window.location.href = '/'
  })
  .catch((error) => {
    console.error('Error:', error)
    swal("Network Error", JSON.parse(error).message.replace(/"/g, ''), "error")
  })
}

const menu = (
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
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={broken => {
          console.log(broken)
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type)
        }}
      >
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<UserOutlined />}>
            <NavLink to='/app'>Home</NavLink>
          </Menu.Item>
          <Menu.Item key="2" icon={<VideoCameraOutlined />}>
            <NavLink to='/app/about'>About</NavLink>
          </Menu.Item>
          <Menu.Item key="3" icon={<UploadOutlined />}>
            nav 3
          </Menu.Item>
          <Menu.Item key="4" icon={<UserOutlined />}>
            nav 4
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header className="site-layout-sub-header-background" style={{ padding: 0 }}>
          <Space style={{ float: 'right', marginRight: '5rem' }}>
            <span>Khaled Saidi</span>
          <Dropdown overlay={menu} placement="bottomLeft" arrow>
            <Button icon={<UserOutlined />} shape='circle' />
          </Dropdown>
          </Space>
        </Header>
        <Content style={{ margin: '24px 16px 0' }}>
          <div className="site-layout-background" style={{ padding: 24, minHeight: '83.3vh' }}>
          <Switch>
            <Route exact path={`${match.url}/about`} >
              <div>Content About</div>
            </Route>
            <Route path='/'>
              <div>Content Home</div>
            </Route>
          </Switch>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>TunisianCloud ©2020 Created by <em>Khaled Saidi</em></Footer>
      </Layout>
    </Layout>
  )
}

export default AppLayout
