import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import ListBoard from './components/list/ListBoard'
import SignIn from './components/auth/SignIn'

const App = (props) => {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="page-content">
        <Switch>
          <Route exact path="/" component={ListBoard} />
          <Route path="/signin" component={SignIn} />
          <Redirect exact to={'/'} />
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App