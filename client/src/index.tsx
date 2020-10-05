import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import './index.less'
import Loader from './helpers/Loader'
import { PrivateRoute } from './helpers/PrivateRoute'

const AppLayout = React.lazy(() =>
  import('./Layout/App/AppLayout')
)

const App = React.lazy(() =>
  import('./App')
)

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Suspense fallback={<Loader />}>
        <Switch>
          <PrivateRoute path='/app' component={ (props: any) => <AppLayout {...props} />} />
          {/* <Route path='/app' component={ (props: any) => <AppLayout {...props} />}/> */}
          <Route path='/'>
            {
              // @ts-ignore TODO: To be secured with State Context
            !!JSON.parse(localStorage.getItem('user')) 
            ? 
            <Redirect to='/app' />
            : 
            <App /> 
            }
          </Route>
        </Switch>
      </Suspense>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
