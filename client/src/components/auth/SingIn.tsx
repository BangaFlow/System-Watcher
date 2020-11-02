import React, { useState } from 'react'
import { Alert, Button, Checkbox, Form, Input, Modal } from 'antd'
import { Store } from 'antd/lib/form/interface'
import { loginFetch } from '../../services'
import ForgetPassword from './ForgetPassword'
import { useHistory } from 'react-router-dom'
import { UserContext } from '../../helpers/UserContext'

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

function SingIn({visible, setVisible}: { visible: boolean, setVisible: React.Dispatch<React.SetStateAction<boolean>>}) {
	const [formLogIn] = Form.useForm()
	const [alert, setAlert] = useState('')
	const [forget, setForget] = useState(false)
	const [loading, setLoading] = useState(false)
	const history = useHistory()
	const { setUser } = React.useContext(UserContext)


  const switchPass = () => {
		setForget(!forget)
	}
	
	// Handle the login moodal footer elements actions
  const handleOk = () => {
		formLogIn.submit()
  }

  const handleCancel = () => {
		setVisible(false)
		setForget(false)
		formLogIn.resetFields()
	}

	// For the form inside the log in modal
	const onFinishLog = async (values: Store) => {
		setLoading(true)
		await loginFetch(values.email, values.password)
		.then( (data: any) => {
			setLoading(false)
			setUser(data)
			formLogIn.resetFields()
			history.push('/app')
		})
		.catch((error) => {
			console.error('Error:', error)
			setAlert(JSON.parse(error).message.replace(/"/g, ''))
			setLoading(false)
			// swal("ERROR", error.toString(), "error")
		})
	}
	
	return (
		<Modal
			title={forget ? 'Recover Password' : 'Sing In'}
			visible={visible}
			centered
			okText='Sing In'
			cancelText='Go Back'
			onOk={handleOk}
			onCancel={handleCancel}
			okButtonProps={{disabled: forget ? true : false}}
			confirmLoading={loading}
	  >
	  {
			forget 
			? 
			<ForgetPassword />
			:
			<Form
				style={{
					paddingTop: '3rem',
				}}
				{...layout}
				name='basic'
				form={formLogIn}
				initialValues={{ remember: true }}
				onFinish={onFinishLog}
				onKeyPress={ (event) => { if (event.charCode === 13) formLogIn.submit() }}
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
				<Form.Item {...tailLayout} name='remember' valuePropName='checked'>
				 <Button type='link' onClick={() => switchPass()}><strong>Forget Password ?</strong></Button>
				</Form.Item>
			</Form>
			}
	  </Modal>
	)
}

export default SingIn
