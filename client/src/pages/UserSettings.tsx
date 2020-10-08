import { Button, Tabs } from 'antd'
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

declare type User = {
  name?: string
  _id?: string
 }

const { TabPane } = Tabs;

function UserSettings() {

  const [user, setUser] = useState<User>({})

  useEffect(() => {
    // @ts-ignore
    setUser(JSON.parse(localStorage.getItem('user')))
  }, [])

  return (
    <>
    {
      user
      ?
      <div>
        <Tabs tabPosition='left'>
          <TabPane tab="Security Settings" key="1">
            <Button>Verify {user.name} </Button>
            <Button>Remove Account</Button>
          </TabPane>
        </Tabs>
      </div>
      :
      <div>
        <Button>
          <NavLink to='/'> Back Home</NavLink>
        </Button>
      </div>
    }
    </>
  )
}

export default UserSettings
