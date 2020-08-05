import React from 'react'
import ReactLogo from '../../assets/images/undraw_Surveillance.svg'
import { Row, Col } from 'antd'
import './hero.css'

function Landing() {

  return (
    <>
      <Row align='top' style={{ padding: '1rem' }}>
        <Col 
        xs={{ span: 24, offset: 0, order: 2 }} 
        sm={{ span: 24, offset: 0, order: 2 }} 
        md={{ span: 10, offset: 2, order: 1 }} 
        lg={{ span: 10, offset: 2, order: 1 }} 
        xl={{ span: 10, offset: 2, order: 1 }} 
        >
          <h1 className="hero hero__title">
            The system down tracking <br /> tool you'll enjoy using
          </h1>
          <p className="hero hero__paragraph">
            Linear helps streamline software projects, sprints, tasks, and bug
            tracking. It's built for high-performance teams.
          </p>
        </Col>
        <Col 
        xs={{span: 24, order: 1}} 
        sm={{span: 24, order: 1}} 
        md={11} 
        lg={11} 
        xl={11}
        >
          <img
            className="hero__image"
            src={ReactLogo}
            alt='Eye'
          />
        </Col>
      </Row>
    </>
  )
}

export default Landing
