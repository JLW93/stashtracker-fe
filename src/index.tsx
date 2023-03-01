import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';

import './main.css'
import { Home, Stashes, About } from './components'

const props = "StashTracker"

ReactDOM.render(
  <React.StrictMode>
    {/* <FirebaseAppProvider firebaseConfig={ firebaseConfig }> */}
      <Provider store={ store }>
        <Router>
          <Switch>

          <Route exact path='/'>
            <Home title={ props } />
          </Route>
          <Route path='/stashes'>
            <Stashes />
          </Route>
          <Route path='/about'>
            <About />
          </Route>
          <Route path='/signup'>
            {/* <Signup /> */}
          </Route>
          <Route path='/signin'>
            {/* <Signin /> */}
          </Route>

          </Switch>
        </Router>
      </Provider>
    {/* </FirebaseAppProvider> */}
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
