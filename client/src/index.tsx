import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom'
import './index.less'
import Loader from './helpers/Loader'
import { UserContext, UserProvider } from './helpers/UserContext'
import { PrivateRoute } from './helpers/PrivateRoute'

const App = React.lazy(() =>
  import('./App')
)

const AppLayout = React.lazy(() =>
  import('./Layout/App/AppLayout')
)

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Suspense fallback={<Loader />}>
        <UserProvider>
          <Switch>
            <PrivateRoute path='/app' component={ (props: any) => <AppLayout {...props} />} />
            <Route path ='/'>
              <UserContext.Consumer>
                {
                  ({user}: any) => Object.entries(user).length === 0 ? <App /> : <Redirect to='/app' />
                }
              </UserContext.Consumer>
            </Route>
          </Switch>
        </UserProvider>     
      </Suspense>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
