import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, updateLikes, deleteBlog, user, setMessage }) => {

  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const addLike = (event) => {
    event.preventDefault()

    const blogObject = {
      id: blog.id,
      user: blog.user,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }

    // FOR TESTING, UNCOMMENT THIS AND COMMENT THE blogService PART BELOW
    //updateLikes(blogObject)

    blogService
      .modify(blogObject)
      .then(returnedBlog => {
        updateLikes(returnedBlog)
      })
  }

  const removeBlog = (event) => {
    event.preventDefault()

    if (!blog.user) {
      setMessage('Only the user who has created the blog can remove it')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } else if (user.username !== blog.user.username) {
      setMessage('Only the user who has created the blog can remove it')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } else {
      const blogToRemove = blog

      if (window.confirm(`Remove ${blog.title} by ${blog.author}?`)) {
        blogService
          .remove(blog)
        deleteBlog(blogToRemove)
      }
    }
  }


  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  if (!visible) {
    return (
      <div style={blogStyle}>
        <div>
          {blog.title} {blog.author}
          <button onClick={toggleVisibility}>view</button>
        </div>
      </div>
    )
  } else {
    return (
      <div style={blogStyle}>
        <div>
          {blog.title}
          <button onClick={toggleVisibility}>hide</button><br/>
          {blog.url}<br/>
            likes {blog.likes}
          <button onClick={addLike}>like</button><br/>
          {blog.author}<br/>
          <button onClick={removeBlog}>remove</button><br/>
        </div>
      </div>
    )
  }

}

export default Blog