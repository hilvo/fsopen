import anecdoteService from '../services/anecdotes'

/*
const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]
*/

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

export const voteOf = (anecdote) => {
  return async dispatch => {
    const votedAnecdote = await anecdoteService.addVote(anecdote)
    dispatch({
      type: 'VOTE',
      data: votedAnecdote,
    })
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote,
      votes: 0
    })
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export const showCreation = (content, time) => {
  return async dispatch => {
    dispatch({
      type: 'SHOW_NEW_ANECDOTE',
      data: {
        content,
      }
    })
    setTimeout(() => {
      dispatch(hideNotification())
    }, time*1000
    )
  }
}

export const showVote = (content, time, timeOuts) => {

  return async dispatch => {
    dispatch({
      type: 'VOTE_ANECDOTE',
      data: {
        content,
      }
    })
    setTimeout(() => {
        dispatch(hideNotification())
      }, time*1000
    )
  }
}


export const hideNotification = () => {
  const content = ''
  return {
    type: 'HIDE_NOTIFICATION',
    data: {
      content,
    }
  }
}

//const initialState = anecdotesAtStart.map(asObject)

const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch(action.type) {
    case 'VOTE':
      const id = action.data.id
      const voteToChange = state.find(n => n.id === id)
      const changedVote = {
        ...voteToChange,
        votes: voteToChange.votes + 1
      }
      const newState = state.map(vote =>
        vote.id !== id ? vote : changedVote)
      return newState.sort((a, b) => b.votes - a.votes)
    case 'NEW_ANECDOTE':
      return state.concat(action.data)
    case 'INIT_ANECDOTES':
      return action.data  
    default:
      return state
  }
}

const notificationReducer = (state = '', action) => {

  switch(action.type) {
    case 'VOTE_ANECDOTE':
      return `You voted for '${action.data.content}'`
    case 'SHOW_NEW_ANECDOTE':
      return `You added '${action.data.content}'`
    case 'HIDE_NOTIFICATION':
        return action.data.content
    default:
      return state
  }
}

export { anecdoteReducer, notificationReducer }