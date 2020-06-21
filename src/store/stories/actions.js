/* ACTION TYPES */
const ADD_STORY = 'ADD_STORY'
const LOAD_STORIES = 'LOAD_STORIES'
const UPDATE_STORY_STATUS_BY_ID = 'UPDATE_STORY_STATUS_BY_ID'

/* ACTION CREATORS */
export const addStory = (story) => ({ type: ADD_STORY, payload: story })
export const loadStories = (stories) => ({ type: LOAD_STORIES, payload: stories })
export const updateStatusByStoryId = (id, newStatus) => ({
  type: UPDATE_STORY_STATUS_BY_ID,
  payload: { id, status: newStatus }
})


/* THUNK CREATORS */
export const postStory = (story) => (dispatch) => {
  return fetch('http://localhost:3000/api/v1/stories', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      authorization: localStorage.getItem('token')
    },
    body: JSON.stringify(story)
  })
  .then((r) => r.json())
  .then((newStory) => {
    if(!newStory.hasOwnProperty('error')) {
      dispatch(addStory(newStory))
    }
    return newStory
  })
  .catch(console.error)
}

export const getStories = () => (dispatch) => {
  return fetch('http://localhost:3000/api/v1/stories', {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      authorization: localStorage.getItem('token')
    }
  })
  .then((r) => r.json())
  .then((stories) => dispatch(loadStories(stories)))
  .catch(console.error)
}


// move to better location, no dispatch
export const getStoryById = (id) => (dispatch) => {
  return fetch(`http://localhost:3000/api/v1/stories/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      authorization: localStorage.getItem('token')
    }
  })
  .then((r) => r.json())
  .catch(console.error)
}
