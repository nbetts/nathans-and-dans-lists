import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { firestoreConnect } from 'react-redux-firebase'

class Dashboard extends Component {
  render() {
    const { auth, lists } = this.props;

    // if (!auth.uid) {
    //   return <Redirect to={'/signin'} />
    // }

    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">Cras justo odio</li>
                <li className="list-group-item">Dapibus ac facilisis in</li>
                <li className="list-group-item">Vestibulum at eros</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    lists: state.firestore.ordered.lists,
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'lists', orderBy: ['createdAt', 'desc'] },
  ])
)(Dashboard)