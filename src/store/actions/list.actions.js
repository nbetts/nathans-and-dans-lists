import { newListSchema, existingListSchema } from '../schemas/list.schemas'

export const createList = (list) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const currentTime = Date.now();
    list.createdAt = currentTime;
    list.updatedAt = currentTime;
    list.items = [];

    const { error } = newListSchema.validate(list);

    if (error) {
      dispatch({ type: 'CREATE_LIST_ERROR', errorMessage: error.message })
    } else {
      getFirestore().collection('lists').add(list).then(() => {
        dispatch({ type: 'CREATE_LIST', list })
      }).catch((error) => {
        dispatch({ type: 'CREATE_LIST_ERROR', errorMessage: error.message })
      })
    }
  }
}

export const updateList = (list) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    list.updatedAt = Date.now();

    const { error } = existingListSchema.validate(list);

    if (error) {
      dispatch({ type: 'UPDATE_LIST_ERROR', errorMessage: error.message })
    } else {
      getFirestore().collection('lists').doc(list.id).set(list).then(() => {
        dispatch({ type: 'UPDATE_LIST', list })
      }).catch((error) => {
        dispatch({ type: 'UPDATE_LIST_ERROR', errorMessage: error.message })
      })
    }
  }
}
