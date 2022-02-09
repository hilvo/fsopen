import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteOf, showVote} from '../reducers/anecdoteReducer'

const AnecdoteList = (props) => {
    const anecdotes = useSelector(state => state.anecdotes)
    const dispatch = useDispatch()

    const vote = (id) => {
        const anecdoteToShow = anecdotes.find(n => n.id === id)
        const anecdoteText = anecdoteToShow.content
        dispatch(voteOf(anecdoteToShow))
        dispatch(showVote(anecdoteText, 5))
    }

    return (
        <div>
            {anecdotes.map(anecdote =>
            <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => vote(anecdote.id)}>vote</button>
                </div>
            </div>
            )}
        </div>
    )
}

export default AnecdoteList