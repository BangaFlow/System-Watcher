import React from 'react'
import ReactLogo from '../../assets/images/undraw_Surveillance.svg'
import './hero.css'
import { motion } from 'framer-motion'

function Landing() {

  return (
    <div className='hero__wrapper' >
      <div className='hero__container child--1'>
        <motion.h1 
          className="hero--text hero__title"
          animate={{ y: ['90px', '0px'], opacity: [0, 1], transition: { delay: .5, ease: "easeInOut", duration: 2}}}
        >
          The system down tracking <br/> tool you'll enjoy using
        </motion.h1>
        <motion.p 
          className="hero--text hero__paragraph"
          animate={{ y: ['90px', '0px'], opacity: [0, 1], transition: { delay: .5, ease: "easeInOut", duration: 2}}}
        >
          Linear helps streamline software projects, sprints, tasks, and bug
          tracking. It's built for high-performance teams.
        </motion.p>
      </div>
      <motion.div
       className='hero__container child--2'
       animate={{ opacity: [0, 1], transition: { delay: .2, duration: 2, ease: [.6, .01, -0.05, .9]}}}
      >
        <img
          className="hero__image"
          src={ReactLogo}
          alt='Eye & a human'
        />
      </motion.div>
    </div>
  )
}

export default Landing
