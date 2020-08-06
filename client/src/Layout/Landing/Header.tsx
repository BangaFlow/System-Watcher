import React from 'react'
import { Row, Col, Button, Form, Modal, Input, Checkbox } from 'antd'
import { NavLink } from 'react-router-dom'
import { Store } from 'antd/lib/form/interface'

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
}

const tailLayout = {
  wrapperCol: { offset: 6, span: 16 },
}

function Header() {

  const [form] = Form.useForm()

  const showModal = () => {
    Modal.confirm({
      title: 'Sign In',
      centered: true,
      icon: null,
      okButtonProps: { hidden: true },
      cancelButtonProps: { hidden: true },

      content: (
        <Form
          style={{
            paddingTop: '3rem',
          }}
          {...layout}
          name='basic'
          form={form}
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            label='Username'
            name='username'
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input placeholder='GoodCitizen12' />
          </Form.Item>

          <Form.Item
            label='Password'
            name='password'
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password placeholder='your password!' />
          </Form.Item>

          <Form.Item {...tailLayout} name='remember' valuePropName='checked'>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type='primary' htmlType='submit' danger>
              Submit
            </Button>
          </Form.Item>
        </Form>
      ),
      maskClosable: true,
      okText: 'Submit',
      cancelText: 'Cancel',
    })
  }

  // For the form inside the create modal
  const onFinish = (values: Store) => {
    console.log('These are form values :', values)
    form.resetFields()
	}
	
  return (
    <Row align='middle' style={{ padding: '1rem' }}>
      <Col span={10} offset={2}>
        <span style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
          <NavLink exact activeStyle={{ color: '#444444' }} to='/'>
            WATCHER
          </NavLink>
        </span>
      </Col>
      <Col span={8}>
        <Button
          type='link'
          style={{ fontWeight: 'bold', color: '#666666D9', fontSize: '1rem' }}
        >
          <NavLink activeStyle={{ color: '#444444' }} to='/contact'>
            Contact
          </NavLink>
        </Button>
        <Button
          type='link'
          style={{ fontWeight: 'bold', color: '#666666D9', fontSize: '1rem' }}
        >
          <NavLink activeStyle={{ color: '#444444' }} to='/about'>
            About
          </NavLink>
        </Button>
      </Col>
      <Col span={4}>
        <Button
          onClick={showModal}
          type='link'
          style={{ color: '#C32A2A', fontWeight: 'bold', fontSize: '1rem' }}
        >
          Log In
        </Button>
        <Button
          type='link'
          style={{
            color: '#E5E5E5',
            borderColor: '#C32A2A',
            backgroundColor: '#C32A2A',
            borderRadius: '5px',
            fontWeight: 'bold',
            lineHeight: '1rem',
            fontSize: '1rem',
          }}
        >
          Sign Up
        </Button>
      </Col>
    </Row>
  )
}

export default Header
