import React, { createContext } from 'react'
import {
  Switch,
  Route, NavLink
} from 'react-router-dom'
import './App.css'
import Loader from './helpers/Loader'
import Footer from './Layout/Landing/Footer'
import Header from './Layout/Landing/Header'
import { useCycle } from 'framer-motion'
import MobileMenu from './Layout/Landing/MobileMenu'
import ResetPassword from './pages/ResetPassword'
import Verify from './components/auth/Verify'
import { Button, Result } from 'antd'

const Landing = React.lazy(() => 
  import(/* webpackChunkName: "Nav" */ './Layout/Landing/Hero')
)

const Contact = React.lazy(() => 
  import(/* webpackChunkName: "Contact" */ './pages/Contact')
)

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
            <Route path="/forget/:slug">
              <ResetPassword />
            </Route>
            <Route path="/email/:slug">
              <Verify />  
            </Route>
            <Route exact path="/">
              <Landing />
            </Route>
            <Route path="*">
              <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={<Button type="primary"><NavLink to='/'>Back Home</NavLink></Button>}
              />
            </Route>
        </Switch>
        <MobileMenu />
      </MenuContext.Provider>
      <Footer />
    </div>
  )
}

export default App
