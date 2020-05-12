const initState = {
  updateError: null
}

const listReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CREATE_LIST':
      return {
        ...state,
        updateError: null
      }
    case 'CREATE_LIST_ERROR':
      return {
        ...state,
        updateError: action.errorMessage
      }
    case 'UPDATE_LIST':
      return {
        ...state,
        updateError: null
      }
    case 'UPDATE_LIST_ERROR':
      return {
        ...state,
        updateError: action.errorMessage
      }
    default:
      return state;
  }
}

export default listReducer;