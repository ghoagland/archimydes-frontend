/* ACTION TYPES */
const SET_USER = 'SET_USER'

/* ACTION CREATORS */
export const setUser = (user) => ({ type: SET_USER, payload: user })



/* THUNK CREATORS */
export const loginUser = (userInfo) => (dispatch) => {
  return fetch('http://localhost:3000/api/v1/signin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(userInfo)
  })
  .then(r => r.json())
  .then(({ id, firstName, lastName, role, token }) => {

    // set user on state
    dispatch(setUser({id, firstName, lastName, role }))

    // add token to localStorage
    localStorage.setItem('token', token)
    localStorage.setItem('role', role)

    // allows component to redirect based on role
    return role
  })
  .catch(console.error)
}
