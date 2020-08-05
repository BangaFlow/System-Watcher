import React from 'react'
import ReactLogo from '../../assets/images/undraw_Surveillance.svg'
import { Row, Col } from 'antd'

function Landing() {

  return (
    <>
      <Row align='top' style={{ padding: '1rem' }}>
        <Col span={10} offset={2}>
          <h1
            style={{
              width: '55%',
              textAlign: 'left',
              color: '#4A4A4A',
              fontFamily: "'Montserrat', sans-serif",
              fontSize: '2.4vw',
              paddingTop: '7rem'
            }}
          >
            The system down tracking <br /> tool you'll enjoy using
          </h1>
          <p
            style={{
              width: '55%',
              textAlign: 'left',
              color: '#434A54',
              fontFamily: 'Pridi',
              fontWeight: 'normal',
              fontSize: '1.2vw',
              paddingTop: '1.4rem'
            }}
          >
            Linear helps streamline software projects, sprints, tasks, and bug
            tracking. It's built for high-performance teams.
          </p>
        </Col>
        <Col span={11}>
          <img
            src={ReactLogo}
            alt='Eye'
            style={{
              maxWidth: '100%',
              height: 'auto',
              paddingTop: '10em',
              paddingRight: '3rem'
            }}
          />
        </Col>
      </Row>
    </>
  )
}

export default Landing
