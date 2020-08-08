import React, { useContext } from 'react'
import { MenuToggle } from './MenuToggle'
import { Button, Form, Modal, Input, Checkbox } from 'antd'
import { NavLink } from 'react-router-dom'
import { Store } from 'antd/lib/form/interface'
import './header.css'
import { motion } from 'framer-motion'
import { MenuContext } from '../../App'

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
}

const tailLayout = {
  wrapperCol: { offset: 6, span: 16 },
}

function Header() {
  const {open, setOpen} = useContext(MenuContext)
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
    <div className='header__container'>
      <div className='flex--item'>
        <span>
            <NavLink exact className='header--text header--logo' to='/'>
              WATCHER
            </NavLink>
        </span>
      </div>
      <div className='flex--item'>
        <Button
          type='link'
          className='header--text header--link'
        >
          <NavLink activeClassName='link--active' to='/contact'>
            Contact
          </NavLink>
        </Button>
        <Button
          type='link'
          className='header--text header--link'
        >
          <NavLink activeClassName='link--active' to='/about'>
            About
          </NavLink>
        </Button>
      </div>
      <div className='flex--item'>
        <Button
          onClick={showModal}
          type='link'
          className='header--text button--text'
        >
          Log In
        </Button>
        <Button
          type='link'
          className='header--button header--text button--text'
        >
          Sign Up
        </Button>
      </div>
      <motion.div 
        className='flex--item hidden--menu'
        initial={false}
        animate={open ? "open" : "closed"}
        >
        <MenuToggle toggle={() => setOpen()} />
        
      </motion.div>
    </div>
  )
}

export default Header
