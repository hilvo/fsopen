const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')



blogsRouter.get('', async (request, response) => {

  const blogs = await Blog
  .find({}).populate('user', { username: 1, name: 1, id: 1 })

  response.json(blogs)

/*
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
      })
      */

})
  
blogsRouter.post('', async (request, response) => {

  
  const body = request.body
  /*
  const token = request.token
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)
  */
 const user = request.user

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  //const blog = new Blog(request.body)

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)

  /*
  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
    */
    
})

blogsRouter.delete('/:id', async (request, response) => {

  /*
  const token = request.token
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  */

  const blog = await Blog.findById(request.params.id)

  if (!request.user.id) {
    return response.status(401).json({ error: 'invalid user' })
  }
  else if ( blog.user.toString() === request.user.id.toString() ) {
      const result = await Blog.findByIdAndRemove(request.params.id)
      response.status(204).json(result)
  } else {
    return response.status(401).json({ error: 'invalid user' })
  }


  
})



module.exports = blogsRouter