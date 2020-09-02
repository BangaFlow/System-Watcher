import React, { useState, useEffect } from 'react'
import { useLocation, NavLink } from 'react-router-dom'
import queryString from 'query-string'
import { Alert, Button } from 'antd'
import { verifyFetch } from '../../services'
import '../../pages/reset_password.css'

declare interface alertAntd {
	message: string
	type: "success" | "info" | "warning" | "error" | undefined
}

function Verify() {

	const location = useLocation()
	const queryParams = queryString.parse(location.search)
	const id = queryParams.id
  const token = queryParams.token
  const expires = queryParams.expires
  const signature = queryParams.signature

	const initialAlert: alertAntd = {message: '', type: 'error'}

	const [alert, setAlert] = useState(initialAlert)
	

	// For the form inside the log in modal
	const onFinish = async () => {
		console.log(queryParams)
		await verifyFetch(id!.toString(), token!.toString(), expires!.toString(), signature!.toString())
		.then(data => {
			console.log('Success:', data)
			//   window.location.href = '/'
			setAlert({ message: 'You have successfully verified your account, you may now log in.', type: 'success'})
		})
		.catch((error) => {
			console.error('Error:', error)
			setAlert({...initialAlert, message: JSON.parse(error).message.replace(/"/g, '')})
			// swal("ERROR", error.toString(), "error")
		})
  }
  
  useEffect(() => {
		onFinish()
		// eslint-disable-next-line
  }, [])

	return (
		<div style={{ paddingTop: '3rem', textAlign: 'center'}} className='forget__background'>
			<div 	className='forget__forground'>
				{!!alert.message &&  <Alert style={{ width: '100%'}} message={alert.message} type={alert.type} showIcon /> }
				{
					alert.type === 'error' 
					? 
					<Button type='dashed' style={{ marginTop: '4rem'}}>
						<NavLink to='/'>Go To Home</NavLink>
					</Button> 
					: 
					null
				}
			</div>
		</div>
	)
}

export default Verify
