import React, { useState, useEffect } from 'react'
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
	const [loc, setLoc] = useState('')

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

	function getLocation() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((position) => {
				console.log(position)
				setLoc(position.coords.latitude +','+ position.coords.longitude)
			},
			(error) => {
				switch(error.code) {
					case error.PERMISSION_DENIED:
						window.alert("User denied the request for Geolocation.")
						break;
					case error.POSITION_UNAVAILABLE:
						window.alert("Location information is unavailable.")
						break;
					case error.TIMEOUT:
						window.alert("The request to get user location timed out.")
						break;
					default:
						window.alert("An unknown error occurred.")
						break;
				}
			}
			)
		} else {
			setLoc("Geolocation is not supported by this browser.")
		}
	}
	
	useEffect(() => {
		getLocation()
	}, [])

  return (
		<>
		<div style={{ width: '100%', textAlign: 'center'}} >
			<label style={{ marginRight: '15rem'}}> Your Current Position: </label>
			<img style={{margin: '1rem auto'}} alt='google maps' src={"https://maps.googleapis.com/maps/api/staticmap?center=" + loc + "&zoom=14&size=400x300&sensor=false&markers=color:red%7C"+ loc +"&key=AIzaSyDb8QZJCD-MmS9L2tJkMW30bxKnsqZ6ZRc"} />
		</div>
    <Form
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
				name="state"
				label={
						<Tooltip title="Which city you are at now?">  
							<span>
							State - City &nbsp;
							</span>
						</Tooltip>
				}
				rules={[{ required: true, message: 'Please input your username!', whitespace: true }]}
				hasFeedback
			>
				<Input placeholder='Ariana - Arianna Soghra' />
			</Form.Item>

			<Form.Item
				name="agency"
				label="Agency"
				rules={[
					{
						required: true,
						message: 'Please input your E-mail!',
					},
				]}
				hasFeedback
			>
				<Input placeholder='POSTE' />
			</Form.Item>

			<Form.Item
				 name="problem"
				 label="Problem"
				 rules={[
					 {
						 required: true,
						 message: 'Please state the reason behind this report!',
					 },
				 ]}
				hasFeedback
			>
				<Input placeholder='system is down' />
			</Form.Item>
			<Form.Item
				name="location"
				label="Location"
				hasFeedback
				validateStatus='validating'
				rules={[
					{
						required: true,
						message: 'Please let us verify your position!',
					},
				]}
			>
				<Input placeholder={loc} />
			</Form.Item>
			<Form.Item
			label=' '
			{...tailLayout}
			>
				<Button icon={ <ArrowLeftOutlined />} type="primary" htmlType='submit' >Cancel</Button>
				<Button style={{ backgroundColor: "#5ea758", borderColor: '#5ea758', float: 'right'}} icon={ <ArrowRightOutlined />} type="primary" htmlType='submit' >Confirm</Button>
			</Form.Item>
		</Form>
		</>
  )
}

export default Report
