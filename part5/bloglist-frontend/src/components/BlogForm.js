import React, { useState } from 'react'
import blogService from '../services/blogs'

const BlogForm = ({ setBlogs, setMessage, blogs, blogFormRef, user }) => {

  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    blogFormRef.current.toggleVisibility()
    const blogObject = {
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl,
      likes: 0
    }

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        returnedBlog.user = user
        setBlogs(blogs.concat(returnedBlog))
        setMessage(`a new blog ${newBlogTitle} by ${newBlogAuthor} added`)
        setNewBlogTitle('')
        setNewBlogAuthor('')
        setNewBlogUrl('')
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
  }

  const handleBlogTitle = (event) => {
    setNewBlogTitle(event.target.value)
  }

  const handleBlogAuthor = (event) => {
    setNewBlogAuthor(event.target.value)
  }

  const handleBlogUrl = (event) => {
    setNewBlogUrl(event.target.value)
  }

  return(
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            id='title'
            value={newBlogTitle}
            onChange={handleBlogTitle}
          />
        </div>
        <div>
          author:
          <input
            id='author'
            value={newBlogAuthor}
            onChange={handleBlogAuthor}
          />
        </div>
        <div>
          url:
          <input
            id='url'
            value={newBlogUrl}
            onChange={handleBlogUrl}
          />
        </div>
        <button type="submit" id='create'>create</button>
      </form>
    </div>
  )
}

export default BlogForm