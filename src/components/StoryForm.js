import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'
import { connect } from 'react-redux'

import { postStory, getStoryById, updateStatusByStoryId } from '../store'

const ticketTypeOptions = [
  { text: 'enhancement', value: 'enhancement' },
  { text: 'bugfix', value: 'bugfix' },
  { text: 'development', value: 'development' },
  { text: 'QA', value: 'QA' }
]

const ticketComplexityOptions = [
  { text: 'low', value: 'low' },
  { text: 'mid', value: 'mid' },
  { text: 'high', value: 'high' }
]

class StoryForm extends Component {
  state = {
    id: 0,
    summary: '',
    description: '',
    type: '',
    cost: '',
    complexity: '',
    estimatedHrs: '',
    isAdmin: localStorage.getItem('role') === 'Admin'
  }

  componentDidMount() {
    // fetches story for review
    const { params } = this.props.match
    if(params && !isNaN(params.id)) {
      this.props.getStoryById(params.id)
      .then((userStory) => this.setState({...userStory, isAdmin: true}))
    } else if (params && params.id) {
      // redirect if invalid id
      this.props.history.push('/stories')
    }
  }

  // ------------------------ CHANGE HANDLERS ------------------------
  handleInputChange = (evt) => this.setState({
    [evt.target.name]: evt.target.value
  })

  handleCostInputChange = (evt) => {
    const numericInput = evt.target.value.slice(1)
    if(!isNaN(numericInput)){ this.setState({ cost: numericInput }) }
  }
  handleTypeSelectChange = (evt) => this.setState({ type: evt.target.innerText })
  handleComplexitySelectChange = (evt) => this.setState({
    complexity: evt.target.innerText
  })

  //------------------------ SUBMIT HANDLERS ------------------------
  handleSubmit = (evt) => {
    evt.preventDefault()
    if(!this.state.isAdmin){
      this.handlePostSubmit(evt)
    } else {
      //update status on state and redirect to stories page
      this.handleStatusSubmit(evt)
    }

  }

  handlePostSubmit = (evt) => {
    this.props.postStory(this.state)
    .then((res) => {
      if(!res.hasOwnProperty('error')) {
        this.props.history.push('/stories')
      } else {
      // TODO: Error message
      }
    })
  }

  handleStatusSubmit = (evt) => {
    this.props.updateStatusByStoryId(this.state.id, 'accepted')
    this.props.history.push('/stories')
  }

  // ------------------------ CLICK HANDLERS ------------------------

  handleRejectionClick = (evt) => {
    evt.preventDefault()
    this.props.updateStatusByStoryId(this.state.id, 'rejected')
    this.props.history.push('/stories')
  }

  // ------------------------ HELPERS ------------------------
  renderButtonsBasedOnRole() {
    if(this.state.isAdmin) {
      return (
        <Form.Group>
          <Form.Button positive>Accept</Form.Button>
          <Form.Button negative onClick={ this.handleRejectionClick }>Reject</Form.Button>
        </Form.Group>
      )
    } else {
      return <Form.Button type='submit'>Submit</Form.Button>
    }
  }


  render() {

    // NOTE: The post method does not do anything with the estimatedHrs and cost
    // information at the moment in the API and this information therefore does
    // not persist.

    const {
      summary,
      description,
      type,
      complexity,
      estimatedHrs,
      cost,
      isAdmin
    } = this.state
    const readOnlyIfAdmin = { readOnly:  isAdmin }
    const disableIfAdmin = { disabled:  isAdmin }

    return (
      <Form onSubmit={ this.handleSubmit }>
        <h1>Create a story</h1>
        <Form.Input required { ...readOnlyIfAdmin }
          label='Summary'
          value={ summary }
          name='summary'
          onChange={ this.handleInputChange }
          /*error='Please enter a summary'*/
        />
        <Form.TextArea  required { ...readOnlyIfAdmin }
          label='Description'
          value={ description }
          name='description'
          onChange={ this.handleInputChange }
        />
        <Form.Group widths='equal'>
          <Form.Select required { ...disableIfAdmin } /* FIX: req. not running on validation */
            label='Type'
            value={ type }
            name='type'
            onChange={ this.handleTypeSelectChange }
            options={ ticketTypeOptions }
            placeholder='Ticket type'
            /*  error={{ content:'Please select a ticket type'} } */
          />
        <Form.Select required { ...disableIfAdmin }
            label='Complexity'
            value={ complexity }
            name='complexity'
            onChange={ this.handleComplexitySelectChange }
            options={ ticketComplexityOptions }
            placeholder='Ticket complexity'
          />
        </Form.Group>
        <Form.Group widths='equal'>
          <Form.Input { ...readOnlyIfAdmin }
          label='Estimated Time'
          value={ estimatedHrs }
          name='estimatedHrs'
          onChange={ this.handleInputChange }
          placeholder='Estimated hours'
          />
          <Form.Input { ...readOnlyIfAdmin }
            label='Cost'
            value={ `$${cost}` } /* FIX: Not currently tab-navigation friendly */
            name='cost'
            onChange={ this.handleCostInputChange }
            placeholder='Cost'
          />
        </Form.Group>
        { this.renderButtonsBasedOnRole() }
      </Form>
    )
  }
}

const mapState = ({ user }) => ({ user })
const mapDispatch = { postStory, getStoryById, updateStatusByStoryId }
export default connect(mapState, mapDispatch)(StoryForm)
