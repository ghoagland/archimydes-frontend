import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'
import { connect } from 'react-redux'

import { loginUser } from '../store';

class Login extends Component {
  state = {
    isAdmin: false,
    email: '',
    password: ''
  }

  handleRoleChange = (evt, { value }) => this.setState({
    isAdmin: (value === 'admin')
  })

  handleInputChange = (evt) => this.setState({
    [evt.target.name] : evt.target.value
  })

  handleSubmit = (evt) => {
    evt.preventDefault();
    this.props.loginUser(this.state)
      .then(role => {
        if (role === 'Admin') {
          this.props.history.push('/stories/review')
        } else if (role === 'user') {
          this.props.history.push('/stories/create')
        }
      })
  }

  render() {
    const { isAdmin } = this.state
    return (
      <Form onSubmit={this.handleSubmit}>
        <h1>Login</h1>
        <Form.Group inline>
          <label>Log in as</label>
          <Form.Radio
            label='User'
            value='user'
            checked={ !isAdmin }
            onChange={this.handleRoleChange}
          />
          <Form.Radio
            label='Admin'
            value='admin'
            checked={ isAdmin }
            onChange={this.handleRoleChange}
          />
        </Form.Group>
        <Form.Field>
          <label>Email</label>
          <input placeholder='Email' name='email' onChange={this.handleInputChange}/>
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input placeholder='Password' name='password' type='password' onChange={this.handleInputChange}/>
        </Form.Field>
        <Form.Button type='submit'>Submit</Form.Button>
      </Form>
  )}
}

const mapDispatchToProps = { loginUser }


export default connect(null, mapDispatchToProps)(Login)
