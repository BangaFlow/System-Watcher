import React, { useState } from 'react'
import { Form, Alert, Tooltip, Input, Button } from 'antd';
import { Store } from 'antd/lib/form/interface';
import { ArrowRightOutlined, ArrowLeftOutlined } from '@ant-design/icons';

const layout = {
  labelCol: {
    xs: { span: 24 },
    lg: {
      span: 12,
      offset: 6,
    },
  },
  wrapperCol: {
    xs: { span: 24 },
    lg: {
      span: 12,
      offset: 6,
    },
  },
}

const tailLayout = {
  wrapperCol: {
    xs: {
      span: 24,
    },
    lg: {
      span: 12,
      offset: 6,
    },
  },
}

function Report() {

  const [form] = Form.useForm()
  const [alert, setAlert] = useState('')

	const onFinish = async (values: Store) => {
		console.log('These are form values :', values)
		// await registerFetch(values.name, values.email, values.password, values.passwordConfirmation)
		// .then(data => {
		// 		console.log('Success:', data)
		// 		form.resetFields()
		// 		history.push('/app')
		// })
		// .catch((error) => {
		// 	console.error('Error:', error)
		// 	setAlert(JSON.parse(error).message.replace(/"/g, '')) 
		// 	// swal("ERROR", error.toString(), "error")
		// })
	}

  return (
    <Form
			style={{
				paddingTop: '8rem',
			}}
			{...layout}
			name='basic'
			form={form}
			onFinish={onFinish}
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
			<Form.Item
			label=' '
			{...tailLayout}
			>
				<Button icon={ <ArrowLeftOutlined />} type="primary" htmlType='submit' >Cancel</Button>
				<Button style={{ backgroundColor: "#5ea758", borderColor: '#5ea758', float: 'right'}} icon={ <ArrowRightOutlined />} type="primary" htmlType='submit' >Confirm</Button>
			</Form.Item>
		</Form>
  )
}

export default Report
