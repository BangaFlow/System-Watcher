import React from 'react'
import {
  Switch,
  Route
} from 'react-router-dom'
import './App.css'
import Loader from './helpers/Loader'
import Footer from './Layout/Landing/Footer'
import Header from './Layout/Landing/Header'

const Landing = React.lazy(() => 
  import(/* webpackChunkName: "Nav" */ './Layout/Landing/Hero')
)

const Contact = React.lazy(() => 
  import(/* webpackChunkName: "Contact" */ './pages/Contact')
)

function App() {
  return (
    <div>
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
      <Footer />
    </div>
  )
}

export default App
