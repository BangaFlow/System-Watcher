import React, { useContext, useState } from 'react'
import { MenuToggle } from './MenuToggle'
import { Button, Form, Modal, Input, Checkbox, Tooltip, Alert } from 'antd'
import { NavLink } from 'react-router-dom'
import { Store } from 'antd/lib/form/interface'
import './header.css'
import { motion } from 'framer-motion'
import { MenuContext } from '../../App'
import { loginFetch, logOutFetch, registerFetch } from '../../services'
import swal from 'sweetalert'

const layout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
}

const tailLayout = {
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
      offset: 6,
    },
  },
}

function Header() {
  const {open, setOpen} = useContext(MenuContext)
  const [formLogIn] = Form.useForm()
  const [formSignUp] = Form.useForm()
  const [visibleLog, setVisibleLog] = useState(false)
  const [visibleSignUp, setVisibleSign] = useState(false)
  const [alert, setAlert] = useState('')

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

  const showModalLogIN = () => {
    setVisibleLog(true)
  }

  const showModalSingUp = () => {
    setVisibleSign(true)
  }

  // Handle the login moodal footer elements actions
  const handleOk = () => {
    formLogIn.submit()
  }

  const handleCancel = () => {
    setVisibleLog(false)
    formLogIn.resetFields()
  }

   // Handle the sing up moodal footer elements actions
   const handleSignOk = () => {
    formSignUp.submit()
  }

  const handleSignCancel = () => {
    setVisibleSign(false)
    formSignUp.resetFields()
  }

  // For the form inside the log in modal
  const onFinishLog = async (values: Store) => {
    console.log('These are form values :', values)
    await loginFetch(values.email, values.password)
    .then(data => {
        console.log('Success:', data)
        //   window.location.href = '/'
        //   formLogIn.resetFields()
    })
    .catch((error) => {
      console.error('Error:', error)
      setAlert(JSON.parse(error).message.replace(/"/g, ''))
      // swal("ERROR", error.toString(), "error")
    })
  }
  
  // For the form inside the sign up modal
  const onFinishSign = async (values: Store) => {
    console.log('These are form values :', values)
    await registerFetch(values.name, values.email, values.password, values.passwordConfirmation)
    .then(data => {
        console.log('Success:', data)
        //   window.location.href = '/'
        //   formLogIn.resetFields()
    })
    .catch((error) => {
      console.error('Error:', error)
      setAlert(JSON.parse(error).message.replace(/"/g, ''))
      // swal("ERROR", error.toString(), "error")
    })
	}
	
  return (
    <div className='header__container'>
      <div className='flex--item'>
        <span>
            <NavLink exact className='header--text header--logo' onClick={ () => handleLogout() } to='/'>
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
          onClick={showModalLogIN}
          type='link'
          className='header--text button--text'
        >
          Log In
        </Button>
        <Button
        onClick={showModalSingUp}
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
      <Modal
        title='Sign In'
        visible={visibleLog}
        centered
        okText='Sign In'
        cancelText='Go Back'
        onOk={handleOk}
        onCancel={handleCancel}
      >
      <Form
          style={{
            paddingTop: '3rem',
          }}
          {...layout}
          name='basic'
          form={formLogIn}
          initialValues={{ remember: true }}
          onFinish={onFinishLog}
        >
          {!!alert && 
          <Form.Item
          {...tailLayout}
          >
            <Alert message={alert} type="error" showIcon closable onClose={() => setAlert('')} />
          </Form.Item>
          }
          <Form.Item
            name='email'
            label="E-mail"
            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ]}
            hasFeedback
          >
            <Input placeholder='client@domain.tn' />
          </Form.Item>

          <Form.Item
            label='Password'
            name='password'
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              }
            ]}
            hasFeedback
          >
            <Input.Password placeholder='your password!' />
          </Form.Item>

          <Form.Item {...tailLayout} name='remember' valuePropName='checked'>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title='Sign Up'
        visible={visibleSignUp}
        centered
        okText='Sign Up'
        cancelText='Go Back'
        onOk={handleSignOk}
        onCancel={handleSignCancel}
      >
      <Form
          style={{
            paddingTop: '3rem',
          }}
          {...layout}
          name='basic'
          form={formSignUp}
          initialValues={{ remember: true }}
          onFinish={onFinishSign}
        >
          {!!alert && 
          <Form.Item
          {...tailLayout}
          >
            <Alert message={alert} type="error" showIcon closable onClose={() => setAlert('')} />
          </Form.Item>
          }
          <Form.Item
            name="name"
            label={
                <Tooltip title="What do you want others to call you?">  
                  <span>
                  Full Name&nbsp;
                  </span>
                </Tooltip>
            }
            rules={[{ required: true, message: 'Please input your username!', whitespace: true }]}
            hasFeedback
          >
            <Input placeholder='Foulen Ben Foulen' />
          </Form.Item>

          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ]}
            hasFeedback
          >
            <Input placeholder='abc@example.tn' />
          </Form.Item>

          <Form.Item
             name="password"
             label="Password"
             rules={[
               {
                 required: true,
                 message: 'Please input your password!',
               },
               {
                 pattern: /^(?=\S*[a-z])(?=\S*[A-Z])(?=\S*\d)(?=\S*[^\w\s])\S{8,30}$/,
                 message: 'Must have at least one lowercase letter, one uppercase letter, one digit and one special character.'
               }
             ]}
            hasFeedback
          >
            <Input.Password placeholder='your password!' />
          </Form.Item>
          <Form.Item
            name="passwordConfirmation"
            label="Re-type"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject('The two passwords that you entered do not match!');
                },
              }),
            ]}
          >
            <Input.Password placeholder='your password confirm!' />
          </Form.Item>

          <Form.Item {...tailLayout} name='remember' valuePropName='checked'>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default Header
