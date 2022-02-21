const blog = require("../models/blog")
const user = require("../models/user")

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {

    let totalSum = 0

    if (blogs.length === 0) {
        return totalSum
    } else {
        blogs.map(n => totalSum = totalSum + n.likes)
        return totalSum
    }
}

const favoriteBlog = (blogs) => {

    if (blogs.length === 0) {
        return []
    } else {
        const sortedBlogList = blogs.sort((firstItem, secondItem) => secondItem.likes - firstItem.likes)
        return sortedBlogList[0]
    }
}

const blogsInDb = async () => {
    const blogs = await blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await user.find({})
    return users.map(user => user.toJSON())
}
  
module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    blogsInDb,
    usersInDb
}