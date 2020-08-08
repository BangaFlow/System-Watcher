import React, { createContext } from 'react'
import {
  Switch,
  Route
} from 'react-router-dom'
import './App.css'
import Loader from './helpers/Loader'
import Footer from './Layout/Landing/Footer'
import Header from './Layout/Landing/Header'
import { motion, useCycle } from 'framer-motion'

const Landing = React.lazy(() => 
  import(/* webpackChunkName: "Nav" */ './Layout/Landing/Hero')
)

const Contact = React.lazy(() => 
  import(/* webpackChunkName: "Contact" */ './pages/Contact')
)

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

type IMenu = {
  open: boolean,
  setOpen: () => void
}

// Context Creation
export const MenuContext = createContext<IMenu>({open: false, setOpen: () => {}})


function App() {

  const [isOpen, toggleOpen] = useCycle(false, true)

  
  return (
    <div>
      <MenuContext.Provider value={{ open: isOpen, setOpen: toggleOpen }}>
      <Header />
      <Switch>
          <Route path="/about">
            <Loader />
          </Route>
          <Route path="/contact">
            <Contact />
          </Route>
          <Route path="/">
            <Landing />
          </Route>
      </Switch>
      </MenuContext.Provider>
        <motion.div
          className='overlay'
          initial={false}
          animate={isOpen ? "open" : "closed"}
          variants={sidebar}
        >
          <ul style={{display: "flex", listStyle: "none", flexDirection: "column", color: 'white', alignItems:'center', minHeight: '10vh', paddingTop: '2vh'}}>
            <li style={{flex: 'auto'}} ><a href='/'>Home</a></li>
            <li style={{flex: 'auto'}} ><a href='/about'>About</a></li>
          </ul>
        </motion.div>
      <Footer />
    </div>
  )
}

export default App
