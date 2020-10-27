import { notification, Space, Tabs, Tag, Typography } from 'antd'
import React, { useEffect } from 'react'
import swal from 'sweetalert'
import { UserContext } from '../helpers/UserContext'
import { resendFetch } from '../services'

const { TabPane } = Tabs
const { Link } = Typography

function UserSettings() {

  // @ts-ignore
  const { user } = React.useContext(UserContext)

  const handleResened = async () => {
    await resendFetch(user.email)
    .catch((error) => {
      console.error('Error:', error)
      swal("Network Error", JSON.parse(error).message.replace(/"/g, ''), "error")
    })
  }

  useEffect(() => {
    if(!user.verifiedAt) {
      notification.warn({ 
        message: 'Account Verification', 
        description: 
        <p>
          You must verify your account, use the following link to resend verification link. <br/>
          <Link onClick= {() => handleResened()}>
            Send Activation Link
          </Link>
        </p>
      })
    }
    // eslint-disable-next-line
  }, [user])
  return (
    <>
      <div>
        <Tabs tabPosition='left'>
          <TabPane tab="Security Settings" key="1">
            <Space style={{ marginLeft:'1rem', paddingTop: '.5rem' }}>
              <span style={{ float: 'left', marginRight: '.6rem' }}>Your Account is :</span>
              { 
              user.verifiedAt 
              ? 
              <Tag color='green'>Verified</Tag> 
              :
              <Tag color='volcano'>Not Verified</Tag>
              }
            </Space>
          </TabPane>
        </Tabs>
      </div>
    </>
  )
}

export default UserSettings
