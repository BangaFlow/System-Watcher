import React, { useState } from 'react'
import { Form, Alert, Input, Button } from 'antd'
import { Store } from 'antd/lib/form/interface'
import { forgetFetch } from '../../services'
import { ArrowRightOutlined } from '@ant-design/icons'

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

function ForgetPassword() {
	const [form] = Form.useForm()
	const [alert, setAlert] = useState('')

	// For the form inside the log in modal
	const onFinish = async (values: Store) => {
		console.log('These are form values :', values)
		await forgetFetch(values.email)
		.then(data => {
				console.log('Success:', data)
				const success = JSON.stringify(data)
				setAlert(JSON.parse(success).message.replace(/"/g, ''))
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
		<Form
		style={{
			paddingTop: '3rem',
		}}
		{...layout}
		name='forgetPass'
		form={form}
		onFinish={onFinish}
	>
		{!!alert && 
		<Form.Item
		{...tailLayout}
		>
			<Alert message={alert} type="warning" showIcon closable onClose={() => setAlert('')} />
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
		{...tailLayout}
		>
			<Button style={{ backgroundColor: "#5ea758", borderColor: '#5ea758'}} icon={ <ArrowRightOutlined />} type="primary" htmlType='submit' >Recover</Button>
		</Form.Item>
	</Form>
	)
}

export default ForgetPassword
