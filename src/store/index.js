import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import userReducer from './user/reducer';
import storiesReducer from './stories/reducer'


const rootReducer = combineReducers({
  user: userReducer,
  stories: storiesReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
export * from './user/actions'
export * from './stories/actions'
