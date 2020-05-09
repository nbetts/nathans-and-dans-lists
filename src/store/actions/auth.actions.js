import { signInSchema } from '../schemas/auth.schemas'

export const signIn = (credentials) => {
  return (dispatch, getState, { getFirebase }) => {
    const { error } = signInSchema.validate(credentials);

    if (error) {
      dispatch({ type: 'SIGN_IN_ERROR', errorMessage: error.message })
      return;
    }

    const firebase = getFirebase();

    firebase.auth().signInWithEmailAndPassword(
      credentials.emailAddress,
      credentials.password
    ).then(() => {
      dispatch({ type: 'SIGN_IN_SUCCESS' })
    }).catch((error) => {
      dispatch({ type: 'SIGN_IN_ERROR', errorMessage: error.message })
    })
  }
}

export const signOut = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    firebase.auth().signOut().then(() => {
      dispatch({ type: 'SIGN_OUT_SUCCESS' })
    })
  }
}
