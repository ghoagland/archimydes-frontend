
const initialState = []

const storiesReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'ADD_STORY': {
      return [...state, action.payload]
    }

    case 'LOAD_STORIES': {
      return action.payload
    }

    case 'UPDATE_STORY_STATUS_BY_ID': {
      const cb = (story) => {
        if(story.id === action.payload.id) {
          return { ... story, status: action.payload.status }
        }
        return story
      }
      console.log(action, state, state.map(cb))
      return state.map(cb)
    }
    default:
      return state;
  }


}

export default storiesReducer
