import React, { useContext, useState } from 'react'
import { MenuToggle } from './MenuToggle'
import { Button } from 'antd'
import { NavLink } from 'react-router-dom'
import './header.css'
import { motion } from 'framer-motion'
import { MenuContext } from '../../App'
import SingIn from '../../components/auth/SingIn'
import SingUp from '../../components/auth/SingUp'



function Header() {
  const {open, setOpen} = useContext(MenuContext)
 
  const [visibleLog, setVisibleLog] = useState(false)
  const [visibleSignUp, setVisibleSign] = useState(false)

  const showModalLogIN = () => {
    setVisibleLog(true)
  }

  const showModalSingUp = () => {
    setVisibleSign(true)
  }
	
  return (
    <div className='header__container'>
      <div className='flex--item'>
        <span>
            <NavLink exact className='header--text header--logo' to='/'>
              WATCHER
            </NavLink>
        </span>
      </div>
      <div className='flex--item'>
        <Button
          type='link'
          className='header--text header--link'
        >
          <NavLink activeClassName='link--active' to='/contact'>
            Contact
          </NavLink>
        </Button>
        <Button
          type='link'
          className='header--text header--link'
        >
          <NavLink activeClassName='link--active' to='/about'>
            About
          </NavLink>
        </Button>
      </div>
      <div className='flex--item'>
        <Button
          onClick={showModalLogIN}
          type='link'
          className='header--text button--text'
        >
          Log In
        </Button>
        <Button
        onClick={showModalSingUp}
          type='link'
          className='header--button header--text button--text'
        >
          Sign Up
        </Button>
      </div>
      <motion.div 
        className='flex--item hidden--menu'
        initial={false}
        animate={open ? "open" : "closed"}
        >
        <MenuToggle toggle={() => setOpen()} />
      </motion.div>
      <SingIn visible={visibleLog} setVisible={setVisibleLog} />
      <SingUp visible={visibleSignUp} setVisible={setVisibleSign} />
    </div>
  )
}

export default Header
