import React from 'react'
import { Tooltip, Button } from 'antd'
import { GithubOutlined, LinkedinOutlined } from '@ant-design/icons';


const details = () => {
  return (
    <>
      <Button size="large" style={{ color: 'whitesmoke', fontWeight: 'bold'}} type="link" href="https://github.com/BangaFlow" target="_blank" icon={<GithubOutlined />}>Github</Button> <br/>
      <Button size="large" style={{ color: '#008ad6', fontWeight: 'bold'}} type="link" href="https://www.linkedin.com/in/bangaflow" target="_blank" icon={<LinkedinOutlined />}>LinkedIn</Button> 
    </>
  )
}

function Footer() {
	
	return (
    <div 
    style={{ 
      textAlign: 'center', 
      backgroundColor: "#FFF", 
      padding: '2rem'
      }}>
      <strong>Tunisian Cloud</strong> ©2020 Created by <Tooltip title={details}><em>Saidi Khaled</em></Tooltip>
    </div>
  )
}

export default Footer
