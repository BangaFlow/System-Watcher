import React, { useEffect, useState } from 'react'
import { Button, Form, Input, InputNumber, List, Tabs } from 'antd'
import { SettingsFetch } from '../services';


const { TabPane } = Tabs

const list = [
  {
    loading: false
  }
]

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 4 },
};
const tailLayout = {
  wrapperCol: { offset: 1, span: 3 },
};

function AdminSettings() {

  const [hideForm, setHideForm] = useState<boolean>(true)
  const [settings, setSettings] = useState([])

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const loadData = async () => {
    SettingsFetch().then((data: any) => setSettings(data))
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <div>
      <Tabs tabPosition='left' >
        <TabPane tab="API Settings" key="1">
        {
          hideForm
          ?
          <List
          itemLayout="horizontal"
          dataSource={list}
          style={{ paddingRight: '1.4rem'}}
          renderItem={item => (
            <List.Item
              actions={[<a key="list-loadmore-edit" onClick={() => setHideForm(!hideForm)}>Modify</a>, <a key="list-loadmore-more">more</a>]}
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
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item
                label="API KEY"
                name="apiKey"
                rules={[{ required: true, message: 'Please input your username!' }]}
              >
                <Input placeholder="Secret Key" />
              </Form.Item>
        
              <Form.Item
                label="Disatnce"
                name="distance"
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <InputNumber min={1} max={100} />
              </Form.Item>

              <Form.Item
                label="Search Radius"
                name="radius"
                required={false}
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <InputNumber min={1} max={10000} />
              </Form.Item>
              <Form.Item
                label="Hold Time Between Reports"
                name="holdTime"
                required={false}
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <InputNumber min={1} max={10000} />
              </Form.Item>
        
              <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
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
