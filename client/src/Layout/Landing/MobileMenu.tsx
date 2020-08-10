import React from 'react'
import { motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 / 10}% at 95% 5%)`,
    display: 'block',
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2
    }
  }),
  closed: {
    clipPath: "circle(0% at 93.8% 3%)",
    display: 'block',
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 400,
      damping: 40
    }
  }
}

function MobileMenu({isOpen} : { isOpen: boolean}) {
	
	return (
		<motion.div
			className='overlay'
			initial={false}
			animate={isOpen ? "open" : "closed"}
			variants={sidebar}
		>
			<ul style={{display: "flex", listStyle: "none", flexDirection: "column", color: 'white', alignItems:'center', minHeight: '10vh', paddingTop: '2vh'}}>
				<li style={{flex: 'auto'}} ><a href='/'>Home</a></li>
				<li style={{flex: 'auto'}} ><NavLink to='/about'>About</NavLink></li>
			</ul>
		</motion.div>
	)
}

export default MobileMenu
