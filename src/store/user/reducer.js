
const initialState = {
  id: null,
  firstName: '',
  lastName: '',
  role: ''
}
const userReducer = (state = initialState, action) => {
  switch(action.type) {
    case('SET_USER'): {
      return action.payload
    }
    default:
      return state
  }
}

export default userReducer
