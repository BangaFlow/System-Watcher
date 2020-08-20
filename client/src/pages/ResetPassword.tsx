import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import queryString from 'query-string'
import { Button, Form, Input, Alert } from 'antd'
import { Store } from 'antd/lib/form/interface'
import './reset_password.css'
import { changeFetch } from '../services'
import { RightOutlined } from '@ant-design/icons'

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

	const location = useLocation()
	const queryParams = queryString.parse(location.search)
	const id = queryParams.id
	const token = queryParams.token

	const [form] = Form.useForm()
	const [loading, setLoading] = useState(false)
	const [alert, setAlert] = useState('')

	// For the form inside the log in modal
	const onFinish = async (values: Store) => {
		console.log('These are form values :', values)
		console.log(queryParams)
		setLoading(true)
		await changeFetch(id!.toString(), token!.toString(), values.password, values.passwordConfirmation)
		.then(data => {
			console.log('Success:', data)
			setLoading(false)
			//   window.location.href = '/'
			form.resetFields()
		})
		.catch((error) => {
			console.error('Error:', error)
			setLoading(false)
			setAlert(JSON.parse(error).message.replace(/"/g, ''))
			form.resetFields()
			// swal("ERROR", error.toString(), "error")
		})
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
				{!!alert && 
				<Form.Item
				{...tailLayout}
				>
					<Alert message={alert} type="error" showIcon closable onClose={() => setAlert('')} />
				</Form.Item>
				}
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
					<Input.Password style={{ fontFamily: 'Arial'}} placeholder='Type new password' />
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
					<Input.Password style={{ fontFamily: 'Arial'}} placeholder='Re-type new password' />
				</Form.Item>
				<Form.Item {...tailLayout}>
				 <Button icon={<RightOutlined />} loading={loading} htmlType='submit'>Save Changes</Button>
				</Form.Item>
			</Form>
		</div>
	)
}

export default ResetPassword
