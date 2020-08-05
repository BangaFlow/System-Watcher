import React from 'react'
import { Layout, Form, Input, InputNumber, Button } from 'antd'
import { Store } from 'antd/lib/form/interface'

const layout = {
	labelCol: { span: 4 },
	wrapperCol: { span: 16 },
}

const validateMessages = {
	required: '${label} is required!',
	types: {
		email: '${label} is not validate email!',
		number: '${label} is not a validate number!',
	},
	number: {
		range: '${label} must be between ${min} and ${max}',
	},
}

function Contact() {

	const { Content } = Layout
	
	const onFinish = (values: Store) => {
		console.log(values)
	}

	return (
		<Content style={{ backgroundColor: '#F1F3F2', minHeight: '760px' }}>
			<div style={{ backgroundColor: '#FFF', width: '40%', margin: '0 auto', position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', paddingTop: '4em' }}>
				<Form {...layout} name='nest-messages' onFinish={onFinish} validateMessages={validateMessages} size='large' >
					<Form.Item name={['user', 'name']} label='Name' rules={[{ required: true }]}>
						<Input />
					</Form.Item>
					<Form.Item name={['user', 'email']} label='Email' rules={[{ type: 'email' }]}>
						<Input />
					</Form.Item>
					<Form.Item name={['user', 'age']} label='Age' rules={[{ type: 'number', min: 0, max: 99 }]}>
						<InputNumber />
					</Form.Item>
					<Form.Item name={['user', 'website']} label='Website'>
						<Input />
					</Form.Item>
					<Form.Item name={['user', 'introduction']} label='Introduction'>
						<Input.TextArea />
					</Form.Item>
					<Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 4 }}>
						<Button type='primary' htmlType='submit'>
							Submit
						</Button>
					</Form.Item>
				</Form>
			</div>
		</Content>
	)
}

export default Contact
