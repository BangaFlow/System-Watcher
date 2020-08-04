import React, { useState } from 'react'
import { Button, Modal, Form, Input, Checkbox } from 'antd'
import {
  Switch,
  Route
} from 'react-router-dom'
import './App.css'
import { Store } from 'antd/lib/form/interface'

const User = React.lazy(() => 
  import(/* webpackChunkName: "User" */ './components/users/User')
)

const Nav = React.lazy(() => 
  import(/* webpackChunkName: "Nav" */ './components/header/Nav')
)

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
}

const tailLayout = {
  wrapperCol: { offset: 6, span: 16 },
}

function App() {
  return (
    <div>
      <Nav />
      <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/users">
            <User />
          </Route>
          <Route path="/">
            <Home />
          </Route>
      </Switch>
    </div>
  )
}

function Home() {

  const [visible, setVisible] = useState(false)
  const [form] = Form.useForm()

  const showModal = () => {
    setVisible(true)
  }

  const handleCancel = () => {
    form.resetFields()
    setVisible(false)
  }

  // For the form inside the create modal
  const onFinish = (values: Store) => {
    console.log("These are form values :", values)
    form.resetFields()
  }

  return (
  <div>
    <h2>Home</h2>
    <Button onClick={showModal}>Sign In</Button>
    <Modal
      title={null}
      visible={visible}
      onCancel={handleCancel}
      footer={null}
      centered
    >
      <Form
      style={{paddingTop: "3rem"}}
      {...layout}
      name="basic"
      form={form}
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item {...tailLayout} name="remember" valuePropName="checked">
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
    </Modal>
  </div>
  )
}

function About() {
  return <h2>About</h2>
}

export default App
