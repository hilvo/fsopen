import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const modify = async newObject => {
  const putUrl = `${baseUrl}/${newObject.id}`

  let userid = null

  if (newObject.user) {
    userid = newObject.user.id
  }

  const blogObject = {
    user: userid,
    likes: newObject.likes,
    author: newObject.author,
    title: newObject.title,
    url: newObject.url
  }
  const response = await axios.put(putUrl, blogObject)
  return response.data
}

const remove = async deleteObject => {

  const config = {
    headers: { Authorization: token },
  }

  const delUrl = `${baseUrl}/${deleteObject.id}`

  const response = await axios.delete(delUrl, config)
  return response.data
}

const exportedObject = { getAll, create, setToken, modify, remove }

export default exportedObject