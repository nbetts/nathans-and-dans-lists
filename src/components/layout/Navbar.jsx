import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../../store/actions/auth.actions'

const Navbar = (props) => {
  const { auth } = props;
  
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark navbar-padding">
      <Link to="/" className="navbar-brand">Nathan and Dan's Lists</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto">
          { auth.uid ? (
            <li className="nav-item"><NavLink className="nav-link" to="/" onClick={props.signOut}>Sign out</NavLink></li>
          ) : (
            <li className="nav-item"><NavLink className="nav-link" to="/signin">Sign in</NavLink></li>
          )}
        </ul>
      </div>
    </nav>
  )
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)