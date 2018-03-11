import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import routers from '../router'

import 'normalize.css/normalize.css'
import 'font-awesome/css/font-awesome.min.css'
import './App.css'

import Header from '../Header'
import NotFound from '../NotFound'
import Footer from '../Footer'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="blog">
          <div className="blog-wrapper">
            <Header />
            <Switch>
              {
                routers.map((router, index) => (
                  <Route key={index} path={router.path} exact={router.path === '/'} component={router.component} />
                ))
              }
              <Route component={NotFound} />
            </Switch>
          </div>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
