import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import queryString from 'query-string'
import { Alert } from 'antd'
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

	const [loading, setLoading] = useState(false)
	const [alert, setAlert] = useState(initialAlert)
	

	// For the form inside the log in modal
	const onFinish = async () => {
		console.log(queryParams)
		setLoading(true)
		await verifyFetch(id!.toString(), token!.toString(), expires!.toString(), signature!.toString())
		.then(data => {
			console.log('Success:', data)
			setLoading(false)
			//   window.location.href = '/'
			setAlert({ message: 'You have successfully verified your account, you may now log in.', type: 'success'})
		})
		.catch((error) => {
			console.error('Error:', error)
			setLoading(false)
			setAlert({...initialAlert, message: JSON.parse(error).message.replace(/"/g, '')})
			// swal("ERROR", error.toString(), "error")
		})
  }
  
  useEffect(() => {
    onFinish()
  }, [])

	return (
		<div style={{ paddingTop: '3rem', textAlign: 'center'}} className='forget__background'>
      {!!alert.message &&
        <div 	className='forget__forground'>
          <Alert style={{ width: '100%'}} message={alert.message} type={alert.type} showIcon closable onClose={() => setAlert(initialAlert)} />
        </div>
      }
		</div>
	)
}

export default Verify
