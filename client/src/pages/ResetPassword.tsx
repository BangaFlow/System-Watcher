import React from 'react'
import { Button, Form, Input } from 'antd'
import { Store } from 'antd/lib/form/interface'
import './reset_password.css'
const layout = {
  labelCol: {
	xs: { span: 24 },
	sm: { offset: 6 , span: 12 },
  },
  wrapperCol: {
	xs: { span: 24 },
	sm: { offset: 6 , span: 12 },
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

function ResetPassword() {

	const [form] = Form.useForm()

	// For the form inside the log in modal
	const onFinish = async (values: Store) => {
		console.log('These are form values :', values)
	}

	return (
		<div className='forget__background'>
			<Form
				style={{
					paddingTop: '3rem',
				}}
				{...layout}
				form={form}
				onFinish={onFinish}
				className='forget__forground'
				layout='vertical'
			>
				<Form.Item
					name='password'
					label="Password"
					rules={[
						{
							required: true,
							message: 'Please input your E-mail!',
						},
						{
							pattern: /^(?=\S*[a-z])(?=\S*[A-Z])(?=\S*\d)(?=\S*[^\w\s])\S{8,30}$/,
							message: 'Must have at least one lowercase letter, one uppercase letter, one digit and one special character.'
						}
					]}
					hasFeedback
				>
					<Input.Password placeholder='New password' />
				</Form.Item>

				<Form.Item
					label='Re-type'
					name='passwordConfirmation'
					dependencies={['password']}
					rules={[
						{
							required: true,
							message: 'Please input your password confirmation!',
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
					hasFeedback
				>
					<Input.Password placeholder='Password Confirmation' />
				</Form.Item>
				<Form.Item {...tailLayout}>
				 <Button htmlType='submit'>Save Changes</Button>
				</Form.Item>
			</Form>
		</div>
	)
}

export default ResetPassword
