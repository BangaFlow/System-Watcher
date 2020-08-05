import React from 'react'
import {
  Switch,
  Route
} from 'react-router-dom'
import './App.css'
import Loader from './helpers/Loader'
import Footer from './Layout/Landing/Footer'
import Header from './Layout/Landing/Header'

const User = React.lazy(() => 
  import(/* webpackChunkName: "User" */ './components/users/User')
)

const Landing = React.lazy(() => 
  import(/* webpackChunkName: "Nav" */ './Layout/Landing/Hero')
)

function App() {
  return (
    <div>
      <Header />
      <Switch>
          <Route path="/about">
            <Loader />
          </Route>
          <Route path="/users">
            <User />
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
