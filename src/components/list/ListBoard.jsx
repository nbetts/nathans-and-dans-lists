import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { firestoreConnect } from 'react-redux-firebase'
import { createList, updateList } from '../../store/actions/list.actions'
import List from './List'

class ListBoard extends Component {
  state = {
    newListTitle: '',
    newListDescription: '',
  }

  createList = () => {
    const { newListTitle, newListDescription } = this.state;

    if (newListTitle && newListDescription) {
      this.props.createList({
        title: newListTitle,
        description: newListDescription
      })

      this.setState({
        newListTitle: '',
        newListDescription: '',
      }) 
    }
  }

  render() {
    const { newListTitle, newListDescription } = this.state;
    const { auth, lists, updateError } = this.props;

    if (!auth.uid) {
      return <Redirect to={'/signin'} />
    }

    return (
      <div className="container my-5">
        <div className="card col-md-4 ml-auto mr-auto mb-4">
          <div className="card-body">
            <h2 className="card-title">Create a List</h2>
            <input type="text" className="text-dark form-control py-4 px-0 border-0 text-truncate mb-1 list-title" placeholder="Title" value={newListTitle} onChange={(e) => this.setState({ newListTitle: e.target.value })} />
            <input type="text" className="text-dark form-control py-4 px-0 border-0 text-truncate" placeholder="Description" value={newListDescription} onChange={(e) => this.setState({ newListDescription: e.target.value })} />

            <button className="btn btn-outline-primary mt-3 mb-1" type="button" onClick={this.createList}>Create</button>
          </div>
        </div>
        <div className="my-5"></div>
        <p className="text-center text-danger my-5">{updateError}</p>
        <div className="card-columns">
          { lists && lists.map(list => (
            <List key={list.id} list={list} updateList={(list) => this.props.updateList(list)} />
          ))}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    lists: state.firestore.ordered.lists,
    items: state.firestore.ordered.lists,
    updateError: state.list.updateError
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createList: (list) => dispatch(createList(list)),
    updateList: (list) => dispatch(updateList(list)),
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: 'lists', orderBy: ['createdAt', 'desc'] },
    { collection: 'items', orderBy: ['createdAt', 'desc'] },
  ])
)(ListBoard)