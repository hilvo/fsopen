import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'otsikko1',
    url: 'url1',
    author: 'tekija1',
    likes: 0,
    user: {
      username: 'kayttaja1',
      name: 'Kayttaja1',
      id: '6213c4e81a3b676875eebe22'
    },
    id: '6215dba71c623781655ea3c2'
  }

  render(<Blog blog={blog} />)

  const element = screen.getByText('otsikko1 tekija1')
  expect(element).toBeDefined()

  const element2 = screen.queryByText('url1')
  expect(element2).toBeNull()

  const element3 = screen.queryByText('likes')
  expect(element3).toBeNull()
})

test('renders correct content when view button is clicked', () => {
  const blog = {
    title: 'otsikko1',
    url: 'url1',
    author: 'tekija1',
    likes: 0,
    user: {
      username: 'kayttaja1',
      name: 'Kayttaja1',
      id: '6213c4e81a3b676875eebe22'
    },
    id: '6215dba71c623781655ea3c2'
  }

  render(<Blog blog={blog}/>)

  const button = screen.getByText('view')
  userEvent.click(button)

  const element = screen.queryByText('otsikko1')
  expect(element).toBeDefined()

  const element2 = screen.queryByText('tekija1')
  expect(element2).toBeDefined()

  const element3 = screen.queryByText('url1')
  expect(element3).toBeDefined()

  const element4 = screen.queryByText('likes')
  expect(element4).toBeDefined()

})


test('behaves correctly when like button is clicked twice', () => {

  /*
  FOR THIS TEST TO WORK, IN THE Blog.js FILE THE addLike FUNCTION HAS TO BE MODIFIED AS SHOWN THERE.
  THE MAIN IDEA OF THE TEST WAS TO CHECK THE BUTTON CLICK BY MOCK FUNCTION, WHICH WORKS AS EXPECTED.
  HOWEVER, WHEN THE DATA IS SENT TO DATABASE, FOR SOME REASON THE TEST DOES NOT WORK.
  */

  const blog = {
    title: 'otsikko1',
    url: 'url1',
    author: 'tekija1',
    likes: 0,
    user: {
      username: 'kayttaja1',
      name: 'Kayttaja1',
      id: '6213c4e81a3b676875eebe22'
    },
    id: '6215dba71c623781655ea3c2'
  }

  const mockHandler = jest.fn()

  render(<Blog blog={blog} updateLikes={mockHandler}/>)

  const button = screen.getByText('view')
  userEvent.click(button)

  const button2 = screen.getByText('like')
  userEvent.click(button2)
  userEvent.click(button2)
  expect(mockHandler.mock.calls).toHaveLength(2)

})