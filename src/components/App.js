import React, { Component }from 'react';
import { Switch, Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import Login from './Login'
import StoryForm from './StoryForm'
import StoryList from './StoryList'
import { getStories } from '../store'


class App extends Component {

  componentDidMount() {
    const loggedIn = !!localStorage.getItem('token')
    if(loggedIn) {
      this.props.getStories()
    }
  }

  render() {

    const loggedIn = !!localStorage.getItem('token')
    if (!loggedIn && this.props.location.pathname !== '/login') {
      this.props.history.push('/login')
    }


    return (
      <div id="app-container">
        <Switch>
          <Route path="/login" component={ Login } />
          { loggedIn && (
            <Switch>
              <Route path='/stories/create' component={ StoryForm } />
              <Route path='/stories/:id' component={ StoryForm } />
              <Route path='/stories' component={ StoryList } /> 
            </Switch>
          )}
        </Switch>
      </div>
    );
  }
}

const mapDispatch = { getStories }
export default withRouter(connect(null, mapDispatch)(App));
