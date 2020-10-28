import React from 'react'
import { Space, Tabs } from 'antd'

const { TabPane } = Tabs

function AdminSettings() {
  return (
    <div>
      <Tabs tabPosition='left'>
        <TabPane tab="SYSWATCHER API Settings" key="1">
          <Space style={{ marginLeft:'1rem', paddingTop: '.5rem' }}>
            <span style={{ float: 'left', marginRight: '.6rem' }}>Your Account is :</span>
          </Space>
        </TabPane>
      </Tabs>
    </div>
  )
}

export default AdminSettings
