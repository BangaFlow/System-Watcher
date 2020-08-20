import React, { useState } from 'react'
import { Input, Form, Alert, Tooltip, Modal } from 'antd'
import { registerFetch } from '../../services'
import { Store } from 'antd/lib/form/interface'

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

function SingUp({visible, setVisible}: { visible: boolean, setVisible: React.Dispatch<React.SetStateAction<boolean>>}) {

	const [form] = Form.useForm()
	const [alert, setAlert] = useState('')
	
	// Handle the sing up moodal footer elements actions
	const handleSignOk = () => {
    form.submit()
  }

  const handleSignCancel = () => {
    setVisible(false)
    form.resetFields()
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
		<Modal
		title='Sign Up'
		visible={visible}
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
			form={form}
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
		</Form>
	</Modal>
	)
}

export default SingUp
