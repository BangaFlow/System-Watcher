import React from 'react'
import ReactLogo from '../../assets/images/undraw_Surveillance.svg'
import './hero.css'

function Landing() {

  return (
    <div className='hero__wrapper' >
      <div className='hero__container child--1'>
        <h1 className="hero--text hero__title">
          The system down tracking <br/> tool you'll enjoy using
        </h1>
        <p className="hero--text hero__paragraph">
          Linear helps streamline software projects, sprints, tasks, and bug
          tracking. It's built for high-performance teams.
        </p>
      </div>
      <div className='hero__container child--2'>
        <img
          className="hero__image"
          src={ReactLogo}
          alt='Eye'
        />
      </div>
    </div>
  )
}

export default Landing
