import React, { Component } from 'react'
import moment from 'moment'
import { v4 as uuidv4 } from 'uuid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'

class List extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: {...props.list},
      newItemTitle: '',
      untouchedList: {...props.list},
      newChanges: false,
    }
  }

  saveChanges = () => {
    const { list, newChanges } = this.state;

    if (newChanges) {
      console.log('here');
      this.props.updateList(list)
  
      this.setState({
        untouchedList: Object.assign({}, list),
        newChanges: false,
      })
    }
  }

  undoList = () => {
    const { untouchedList } = this.state;

    this.setState({
      list: Object.assign({}, untouchedList),
      newChanges: false,
    })
  }

  updateField = (field, value) => {
    const { list } = this.state;
    list[field] = value;

    this.setState({
      list,
      newChanges: true,
    });
  }

  addItem = (e) => {
    e.preventDefault();
    console.log(this.state)

    if (this.state.newItemTitle) {
      const { list, newItemTitle } = this.state;

      list.items = [...list.items, {
        id: uuidv4(),
        title: newItemTitle,
        isCompleted: false,
      }];

      this.setState({
        list,
        newItemTitle: '',
        newChanges: true,
      })
    }
  }

  updateItem = (itemId, field, value) => {
    const { list } = this.state;
    list.items[list.items.findIndex(item => item.id === itemId)][field] = value;

    this.setState({
      list,
      newChanges: true,
    });
  }

  deleteItem = (itemId) => {
    let { list } = this.state;
    list.items = list.items.filter(item => item.id !== itemId);

    this.setState({
      list,
      newChanges: true,
    });
  }
  
  render() {
    const { list, newItemTitle, newChanges } = this.state;

    return (
      <div className="card">
        <div className="card-body">
          <input type="text" className="text-dark form-control py-4 px-0 border-0 text-truncate mb-1 list-title" placeholder="Title" value={list.title} onChange={(e) => this.updateField('title', e.target.value)} />
          <input type="text" className="text-dark form-control py-4 px-0 border-0 text-truncate mb-3" placeholder="Description" value={list.description} onChange={(e) => this.updateField('description', e.target.value)} />

          <div>
            { list.items && list.items.map(item => (
              <div key={item.id} className="input-group my-2">
                <input type="text" className={`form-control py-4 text-truncate ${item.isCompleted ? 'bg-success text-white border-success' : ''}`} placeholder="Item"
                  value={item.title} onChange={(e) => this.updateItem(item.id, 'title', e.target.value)} />
                <div className="input-group-append">
                  <button className="btn btn-outline-success list-button" type="button" onClick={() => this.updateItem(item.id, 'isCompleted', !item.isCompleted)}>
                    <FontAwesomeIcon icon={faCheck} />
                  </button>
                </div>
                <div className="input-group-append">
                  <button className="btn btn-outline-danger list-button" type="button" onClick={() => this.deleteItem(item.id)}>
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                </div>
              </div>
            ))}

            <form onSubmit={this.addItem}>
              <input type="text" className="form-control py-4 text-truncate" placeholder="Add an item" value={newItemTitle} onChange={(e) => this.setState({ newItemTitle: e.target.value })} />
            </form>
          </div>

          <button className={`btn btn-outline-primary my-3 ${newChanges ? 'mr-2' : 'd-none'}`} type="button" onClick={this.undoList}>Undo</button>
          <button className={`btn btn-outline-primary my-3 ${newChanges ? '' : 'd-none'}`} type="button" onClick={this.saveChanges}>Save Changes</button>

          <p className="card-text mt-3">
            <small className="text-muted">{list.updatedAt ? `Last updated ${moment(list.updatedAt).calendar()}` : null}</small>
          </p>
        </div>
      </div>
    )
  }
}

export default List