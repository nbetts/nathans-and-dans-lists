import { createListSchema } from '../schemas/list.schemas'

export const createList = (list) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const { error } = createListSchema.validate(list);

    if (error) {
      dispatch({ type: 'CREATE_LIST_ERROR', errorMessage: error.message })
      return;
    }

    const firestore = getFirestore();
    const authorId = getState().firebase.auth.uid;

    firestore.collection('lists').add({
      ...list,
      authorId: authorId,
      createdAt: new Date()
    }).then(() => {
      dispatch({ type: 'CREATE_LIST', list })
    }).catch((error) => {
      dispatch({ type: 'CREATE_LIST_ERROR', error })
    })
  }
}
