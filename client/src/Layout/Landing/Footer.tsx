import React from 'react'
import { Layout } from 'antd'

function Footer() {

	const { Footer } = Layout
	
	return (
    <Footer 
    style={{ 
      textAlign: 'center', 
      backgroundColor: "#FFF", 
      padding: '2rem',
      width: '100%',
      position: 'fixed',
      bottom: '0',
      left: '0'
      }}>
      <strong>Tunisian Cloud</strong> ©2020 Created by <em>Saidi Khaled</em>
    </Footer>
  )
}

export default Footer
