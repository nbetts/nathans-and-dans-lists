import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import ListBoard from './components/list/ListBoard'
import SignIn from './components/auth/SignIn'

const App = (props) => {
  const { auth } = props;

  if (!auth.isLoaded) {
    return null;
  }

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

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth
  }
}

export default connect(mapStateToProps)(App)

