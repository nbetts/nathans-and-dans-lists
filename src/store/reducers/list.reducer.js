const initState = {}

const listReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CREATE_LIST':
      return {
        ...state,
        listError: null
      }
    case 'CREATE_LIST_ERROR':
      return {
        ...state,
        listError: action.errorMessage
      }
    default:
      return state;
  }
}

export default listReducer;