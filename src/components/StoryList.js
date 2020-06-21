import React, { Component } from 'react'
import { Table, Form } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { getStories } from '../store'
import { Link } from 'react-router-dom'

const ticketTypeOptions = [
  { text: 'enhancement', value: 'enhancement' },
  { text: 'bugfix', value: 'bugfix' },
  { text: 'development', value: 'development' },
  { text: 'QA', value: 'QA' }
]


class StoryList extends Component {
  state = {
    sortBy: 'id',
    filterBy: 'none',
    isAdmin: localStorage.getItem('role') === 'Admin'
  }

  componentDidMount() {
    if(!this.props.stories.length) this.props.getStories();
  }

  sortStories(stories) {
    // sorts by id asc
    const sortByIdCallback = (a, b) => (a.id - b.id)
    // sorts by priority desc
    const sortByComplexityCallback = (a, b) => {
      const priorityValues = { low: 2, mid: 1, high: 0 }

      return priorityValues[a.complexity] - priorityValues[b.complexity]
    }
    // choose appropriate sorting callback
    const callback = this.state.sortBy === 'complexity'
      ? sortByComplexityCallback
      : sortByIdCallback;
      return [...stories].sort(callback)

  }

  filterStories(stories) {
    const { filterBy } = this.state
    if(filterBy !== 'none') {
      return stories.filter(story => (story.type === filterBy))
    }
    return stories
  }

  generateStoryTableRows() {
    const filteredStories = this.filterStories(this.props.stories)
    const sortedAndFilteredStories = this.sortStories(filteredStories)
    return sortedAndFilteredStories.map((story) => StoryTableRow(story, this.props.history, this.state.isAdmin))
  }

  handleSortByChange = (evt) => {
    this.setState({ sortBy: evt.target.innerText })
  }
  handleFilterByChange = (evt) => {
    this.setState({ filterBy: evt.target.innerText })
  }


  render() {
    const { sortBy, filterBy } = this.state;
    return(
      <div>
        <h1>My Stories</h1>
        <Form>
          <Form.Select
            label='Sort by'
            value={ sortBy }
            name='sortBy'
            options={[
              { text: 'id', value: 'id'},
              { text: 'complexity', value: 'complexity'}
            ]}
            onChange={ this.handleSortByChange }
          />
          <Form.Select
            label='Filter by type'
            value={ filterBy }
            name='filterBy'
            options={[
              {text: 'none', value: 'none'},
              ...ticketTypeOptions
            ] }
            onChange={ this.handleFilterByChange }
            placeholder='none'
          />
        </Form>


        <Table celled selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>ID</Table.HeaderCell>
              <Table.HeaderCell>Summary</Table.HeaderCell>
              <Table.HeaderCell>Description</Table.HeaderCell>
              <Table.HeaderCell>Type</Table.HeaderCell>
              <Table.HeaderCell>Complexity</Table.HeaderCell>
              <Table.HeaderCell>Estimated Hours</Table.HeaderCell>
              <Table.HeaderCell>Cost</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            { this.generateStoryTableRows() }
          </Table.Body>
        </Table>
      </div>
    )
  }
}

function StoryTableRow(story, history, isAdmin) {
  let colorValue = null

  // sets row colors for Admin users
  if(isAdmin) {
    switch(story.status) {
      case ('accepted'): {
        colorValue = 'positive'
        break;
      }
      case('rejected'): {
        colorValue = 'negative'
        break;
      }
      default: {
        colorValue = 'active'
        break;
      }
    }
  }

  return (
    <Table.Row key={ story.id } onClick={() => history.push(`/stories/${story.id}`)} {...{ [colorValue]: true }}>
        <Table.Cell>{ story.id }</Table.Cell>
        <Table.Cell>{ story.summary }</Table.Cell>
        <Table.Cell>{ story.description }</Table.Cell>
        <Table.Cell>{ story.type }</Table.Cell>
        <Table.Cell>{ story.complexity }</Table.Cell>
        <Table.Cell>{ story.estimatedHrs }</Table.Cell>
        <Table.Cell>{ story.cost }</Table.Cell>
    </Table.Row>
  )
}

const mapState = ({ user, stories }) => ({ user, stories });
const mapDispatch = { getStories }

export default connect(mapState, mapDispatch)(StoryList)
