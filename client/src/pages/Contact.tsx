import React from 'react'
import { Layout, Form, Input, Button } from 'antd'
import { motion } from 'framer-motion'
import { Store } from 'antd/lib/form/interface'
import './contact.css'

const layout = {
	labelCol: { span: 24 },
	wrapperCol: { span: 24 },
}

function Contact() {

	const { Content } = Layout
	
	const onFinish = (values: Store) => {
		console.log(values)
	}

	return (
		<Content className='contact__container'>
		<motion.div
			className='contact__form'
			animate={{x: ['100vw', '0vw'], opacity: [0, 1]}}
			transition={{duration: 1, ease: 'easeOut', delay: .2}}
		>
			<Form {...layout} name='nest-messages' onFinish={onFinish} size='large' layout='vertical'>
				<Form.Item>
					<h1>Contact Us</h1>
				</Form.Item>
				<Form.Item name={['user', 'name']} label={<strong className='contact--text'>Name</strong>} rules={[{ required: true }]}>
					<Input />
				</Form.Item>
				<Form.Item name={['user', 'email']} label={<strong className='contact--text'>Email</strong>} rules={[{ type: 'email' }]}>
					<Input />
				</Form.Item>
				<Form.Item name={['user', 'introduction']} label={<strong className='contact--text'>Introduction</strong>}>
					<Input.TextArea autoSize={{minRows: 6, maxRows: 10}} />
				</Form.Item>
				<Form.Item>
					<Button  className='contact--text'type='primary' htmlType='submit'>
						Submit
					</Button>
				</Form.Item>
			</Form>
		</motion.div>
			
		</Content>
	)
}

export default Contact
