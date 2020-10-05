import React, { useState } from 'react'
import { Form, Alert, Tooltip, Input, Button, Select } from 'antd'
import { Store } from 'antd/lib/form/interface'
import { ArrowRightOutlined, ArrowLeftOutlined } from '@ant-design/icons'
import MapContext from '../../helpers/MapContext'
import { addReportFetch } from '../../services'

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

declare type location = {
	lat: number
	lng: number
}

function Report({userLocation} : {userLocation: location}) {

  const [form] = Form.useForm()
	const [alert, setAlert] = useState('')
	const [loadGeo, setLoadGeo] = useState(false)
	const [loading, setLoading] = useState(false)
	// @ts-ignore 
	// eslint-disable-next-line
	const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))
	const [validateStatus, setValidateStatus] = useState<'warning' | 'error' | 'success' | 'validating' | undefined>('warning')
	const mapContext = React.useContext(MapContext)
	const { Option } = Select

	const onFinish = async (values: Store) => {
		// const address = values.state.replace(/\//g, ',')
		setLoading(true)
		setValidateStatus('validating')
		const { map, platform } = mapContext
		
		if(map && platform){
			const service = platform.getSearchService();
			const displayedObjects = map.getObjects()
			map.removeObjects(displayedObjects.slice(1, displayedObjects.length))

			service.browse({
				at: `${userLocation.lat},${userLocation.lng}`,
				name: values.agencyName,
				in: `circle:${userLocation.lat},${userLocation.lng};r=2000`,
				categories: values.agency,
				limit: '1'
			}, (result: any) => {
				// Add a marker for each location found
				if (result.items.length > 0) {
					const item = result.items[0]
					console.log(item)
					const lineString = new H.geo.LineString()
					lineString.pushPoint(userLocation)
					lineString.pushPoint(item.position)
					const marker = new H.map.Marker(item.position)
					map.addObject(marker)
					map.addObject(new window.H.map.Polyline(
						lineString, { style: { lineWidth: 4 }}
					))
					const point1 = lineString.extractPoint(0)
					const point2 = lineString.extractPoint(1)
					const distance = point1.distance(point2).toFixed(2)
					if (parseInt(distance) <= 50) {
						setValidateStatus('success')
						form.setFieldsValue({distance})
						addReportFetch(values.problem, values.state, item.address.label, userLocation, { lat: item.access[0].lat, lng: item.access[0].lng }, parseInt(distance), user._id)
						.then(data => {
							console.log('Success:', data)
							setLoading(false)
							form.resetFields()
						})
						.catch((error) => {
							console.error('Error:', error)
							setAlert(JSON.parse(error).message.replace(/"/g, ''))
							setLoading(false)
							// swal("ERROR", error.toString(), "error")
						})
					} else {
						setLoading(false)
						setValidateStatus('error')
						form.setFieldsValue({distance: distance + ' is greater than 50.00 meters!'})
					} 
				} else {
					form.setFieldsValue({distance: 'There\'s no such agency at a radius of 2km'})
					setValidateStatus('error')
					setLoading(false)
				}
			})
		}
	}

	const reverseGeocode = () => {
		setLoadGeo(true)
		const { map, platform } = mapContext

		if(map && platform){
		const service = platform.getSearchService()
		service.reverseGeocode({
			at: `${userLocation.lat},${userLocation.lng}`
		}, (data: any) => {
			const address = data.items[0].address
			const currentLocation = [address.countryName, address.county, address.city, address.district, address.street]
			form.setFieldsValue({state: currentLocation.reduce((item1, item2, index ) => {
			return item1 + (typeof currentLocation[index] === 'string' ? '/' + item2 : '' )
			}) })
			setLoadGeo(false)
		}, (err: any) => console.log(err))
		}
	}	

  return (
		<div style={{ padding: '16px 16px 0', textAlign: 'left'}}>
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
					rules={[{ required: true, message: 'Please press locate button!', whitespace: true }]}
				>
					<Input.Search readOnly prefix='TUN  ' loading={loadGeo} enterButton="Locate" placeholder='Press locate to fill the address'  onSearch={() => reverseGeocode()} />
				</Form.Item>

				<Form.Item
					label="Agency"
					hasFeedback
					required
				>
					<Input.Group compact>
						<Form.Item
							name='agency'
							noStyle
							rules={[{ required: true, message: 'Agency is required' }]}
							hasFeedback
						>
							<Select placeholder="Select Agency Type">
								<Option value="700-7000-0107">Bank</Option>
								<Option value="700-7450-0114">Poste</Option>
								<Option value="700-7010-0108">ATM</Option>
							</Select>
						</Form.Item>
						<Form.Item
							name='agencyName'
							noStyle
							rules={[{ required: true, message: 'Agency Name is required' }]}
						>
							<Input style={{ width: '50%'}} placeholder="Agency Name" />
						</Form.Item>
					</Input.Group>
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
					<Select placeholder='Select a problem' allowClear>
            <Option key='1' value="system is down">System is down</Option>
            <Option key='2' value="hors service">Hors Service</Option>
            <Option key='3' value="closed">Closed</Option>
          </Select>
				</Form.Item>
				<Form.Item
					name="distance"
					label="Distance"
					hasFeedback
					validateStatus={validateStatus}
				>
					<Input placeholder='You must be at distance <= 50.00 meters' suffix='Meters' disabled />
				</Form.Item>
				<Form.Item
				{...tailLayout}
				>
					<Button icon={ <ArrowLeftOutlined />} type="primary">Cancel</Button>
					<Button style={{ backgroundColor: "#5ea758", borderColor: '#5ea758', float: 'right'}} icon={ <ArrowRightOutlined />} loading={loading} type="primary" htmlType='submit' >Confirm</Button>
				</Form.Item>
			</Form>
		</div>
  )
}

export default Report
