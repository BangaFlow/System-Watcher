import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom'
import './index.css';
import Loader from './helpers/Loader';

const App = React.lazy(() =>
  import('./App')
)

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Suspense fallback={<Loader />}>
        <App />
      </Suspense>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
