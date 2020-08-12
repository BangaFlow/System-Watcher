import React, { useContext } from 'react'
import { motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import { MenuContext } from '../../App'
import './mobile.css'

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 / 10}% at 95% 5%)`,
    display: 'block',
    transition: {
      type: 'spring',
      stiffness: 20,
      restDelta: 2
    }
  }),
  closed: {
    clipPath: 'circle(0% at 93.8% 3%)',
    display: 'block',
    transition: {
      delay: 0.5,
      type: 'spring',
      stiffness: 400,
      damping: 40
    }
  }
}

const spanVariants = {
	closed: {
		y: -20,
		opacity: 0,
		scale: 0.9,
		transition: {
			delay: 0,
			duration: .3,
			ease: 'easeIn'
		}
	}, 
	open: {
		y: 0,
		opacity: 1,
		scale: 1,
		transition: {
			delay: .5,
			duration: .3,
			ease: 'easeOut'
		}
	}
}

function MobileMenu() {

  const {open, setOpen} = useContext(MenuContext)
	
	return (
		<motion.div
			className='overlay'
			initial={false}
			animate={open ? 'open' : 'closed'}
			variants={sidebar}
		>
      <nav className='menu menu--mohe'>
		<div className='menu__item'>
			<p className='menu__item-name'>------------ Watcher ------------</p>
		</div>
		<NavLink className='menu__item' to='/' onClick={() => setOpen()}>
			<motion.span
			initial={false}
			animate={open ? 'open': 'closed'}
			variants={spanVariants}
			className='menu__item-name'>Home</motion.span>
		</NavLink>
		<NavLink className='menu__item' to='/contact' onClick={() => setOpen()}>
			<motion.span 
			initial={false}
			animate={open ? 'open': 'closed'}
			variants={spanVariants}
			className='menu__item-name'>Contact</motion.span>
		</NavLink>
		<NavLink className='menu__item' to='/about' onClick={() => setOpen()}>
			<motion.span 
			initial={false}
			animate={open ? 'open': 'closed'}
			variants={spanVariants}
			className='menu__item-name'>About</motion.span>
		</NavLink>
	</nav>
		</motion.div>
	)
}

export default MobileMenu
