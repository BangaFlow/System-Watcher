import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Button, Form, Input, InputNumber, List, Tabs } from 'antd'
import { SettingsFetch, updateSettingsFetch } from '../services'


const { TabPane } = Tabs

const list = [
  {
    loading: false
  }
]

const layout = {
  labelCol: { 
    xs: { span: 24 },
    lg: { span: 8}
   },
  wrapperCol: { 
    xs: { span: 24 },
    lg: { span: 8}
   },
}

const tailLayout = {
  wrapperCol: { 
    xs: {span: 24},
    lg: { 
      span: 8
    }
  },
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

function AdminSettings() {

  const [form] = Form.useForm()
  const [hideForm, setHideForm] = useState<boolean>(true)
  const [settings, setSettings] = useState({})
  const [width] = useWindowSize()

  const tabPos = width < 426 ?  'top' : 'left'


  const onFinish = (values: any) => {
    console.log('Success:', values)
    //@ts-ignore
    updateSettingsFetch(settings._id, values.apiKey, values.distance, values.radius, values.holdTime)
    .then((data: any) => {
      if (data.message === 'ok') {

      }
    })
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  }

  const loadData = async () => {
    SettingsFetch().then((data: any) => setSettings(data))
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <div>
      <Tabs tabPosition={tabPos} style={{padding: '0 1rem'}}>
        <TabPane tab="API Settings" key="1">
        {
          hideForm
          ?
          <List
          itemLayout="horizontal"
          dataSource={list}
          renderItem={item => (
            <List.Item
            // eslint-disable-next-line
              actions={[<a key="list-loadmore-edit" onClick={() => setHideForm(!hideForm)}>Modify</a>]}
            >
                <List.Item.Meta
                  title="API KEY"
                  description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                />
            </List.Item>
          )}
          />
          :
          <>
            <h2>API Settings</h2>
            <Form
              {...layout}
              name="basic"
              layout="vertical"
              initialValues={settings}
              form={form}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item
                label="API KEY"
                name="apiKey"
                hasFeedback 
                rules={[{ required: true, message: 'Please input the API Key!' }]}
              >
                <Input placeholder="Secret Key" />
              </Form.Item>
        
              <Form.Item
                label="Disatnce"
                name="distance"
                required={false}
                hasFeedback 
                rules={[
                  { required: true, message: 'Please provide the distance to validate.' },
                  { type: 'number', message: 'Please distance needs to be a number.'}
                ]}
              >
                <InputNumber min={1} max={100} />
              </Form.Item>

              <Form.Item
                label="Search Radius"
                name="radius"
                required={false}
                hasFeedback 
                rules={[
                  { required: true, message: 'Please provide the search radius.' },
                  { type: 'number', message: 'Please radius needs to be a number.'}
                ]}
              >
                <InputNumber min={1} max={10000} />
              </Form.Item>
              <Form.Item
                label="Hold Time Between Reports"
                name="holdTime"
                required={false}
                hasFeedback 
                rules={[
                  { required: true, message: 'Please provide the hold time between each report.' },
                  { type: 'number', message: 'Please time needs to be in numbers.'}
                ]}
              >
                <InputNumber min={1} max={10000} />
              </Form.Item>
        
              <Form.Item {...tailLayout}>
                <Button style={{ color: 'black', float: 'left'}} onClick={() => setHideForm(!hideForm)}>
                  Cancel
                </Button> 
                <Button style={{ float: 'right'}} type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </>
        }
        </TabPane>
      </Tabs>
    </div>
  )
}

export default AdminSettings
