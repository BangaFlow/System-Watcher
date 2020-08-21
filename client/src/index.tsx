import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './index.less'
import Loader from './helpers/Loader'

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
          <Route path='/app' render={ props => <AppLayout {...props} />} />
          <Route path='/'>
            <App />
          </Route>
        </Switch>
      </Suspense>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
