import React , { useLayoutEffect, useState } from 'react'
import { Layout, Form, Input, Button } from 'antd'
import { motion } from 'framer-motion'
import { Store } from 'antd/lib/form/interface'
import './contact.css'

const layout = {
	labelCol: { span: 24 },
	wrapperCol: { span: 24 },
}

function useWindowSize() {
	const [size, setSize] = useState([0, 0]);
	useLayoutEffect(() => {
	  function updateSize() {
		setSize([window.innerWidth, window.innerHeight]);
	  }
	  window.addEventListener('resize', updateSize);
		//? we call it so upon render takes effect
		updateSize();
	  return () => window.removeEventListener('resize', updateSize);
	}, [])
	return size
  }

function Contact() {

	const [width] = useWindowSize()

	const { Content } = Layout
	
	const onFinish = (values: Store) => {
		console.log(values)
	}

	const flex = width < 1200 ?  '90%' : '40%'

	return (
		<Content className='contact__container'>
		<motion.div
			// style={{ flexBasis: width < 1400 ? '60%' : '40%' }}
			className='contact__form'
			// animate={{x: ['100vw', '0vw'], opacity: [0, 1]}}
			animate = {{flexBasis: flex}}
			transition={{duration: 1, ease: 'easeOut', delay: .2}}
		>
			<Form {...layout} name='nest-messages' onFinish={onFinish} size='large' layout='vertical'>
				<Form.Item>
					<h1>Contact Us</h1>
				</Form.Item>
				<Form.Item name='name' label={<strong className='contact--text'>Name</strong>} rules={[{ required: true }]}>
					<Input />
				</Form.Item>
				<Form.Item name='email' label={<strong className='contact--text'>Email</strong>} rules={[{ type: 'email' }]}>
					<Input />
				</Form.Item>
				<Form.Item name={['user', 'introduction']} label={<strong className='contact--text'>Introduction</strong>}>
					<Input.TextArea autoSize={{minRows: 6, maxRows: 10}} />
				</Form.Item>
				<Form.Item>
					<Button className='contact__button'type='primary' htmlType='submit'>
						Submit
					</Button>
				</Form.Item>
			</Form>
		</motion.div>
			
		</Content>
	)
}

export default Contact
