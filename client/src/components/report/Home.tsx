import React, { Suspense, useEffect, useState } from 'react'
import { List, Avatar, Space, Spin, Badge } from 'antd'
import { MessageOutlined, LikeOutlined, StarOutlined, MehOutlined } from '@ant-design/icons'
import { ReportFetch } from '../../services'

type Report = {
  id: string,
  type: string,
  agencyLocationText: string,
}

function Home() {

  const [listData, setListData] = useState([])
  // for (let i = 0; i < 5; i++) {
  //   listData.push({
  //     title: `Anonymous ${i}`,
  //     description:
  //       '.البنك الوطني الفلاحي, الجريصة, تونس',
  //     content:
  //       'system is down.',
  //   })
  // }

  const IconText = ({icon, text}: {icon: any, text: any}) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  )

  useEffect(() => {
    ReportFetch()
    .then((data: any) => setListData(data))
  }, [])

  return (
    <div style={{ padding: '0 24px'}}>
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: page => {
            console.log(page);
          },
          pageSize: 3,
        }}
        dataSource={listData}
        footer={
          <div>
            <Badge color="#f50" status="processing" text={<b>Live Tracking</b>} /> reports
          </div>
        }
        renderItem={ (item: Report, index) => (
          <Suspense fallback={<div className="example">
            <Spin />
          </div>}>
          <List.Item
            key={item.id}
            actions={[
              <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
              <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
              <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
            ]}
            extra={
              <img
                width={272}
                alt="logo"
                src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
              />
            }
          >
            <List.Item.Meta
              avatar={<Avatar icon={<MehOutlined />} />}
              title={`Anonymous ${index}`}
              description={'.' + item.agencyLocationText}
            />
            {item.type + '.'}
          </List.Item>
          </Suspense>
          
        )}
      />
    </div>
  )
}

export default Home
