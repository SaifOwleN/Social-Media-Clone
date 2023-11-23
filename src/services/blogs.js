import axios from 'axios'
const baseUrl =
  process.env.NODE_ENV === 'test'
    ? 'http://localhost:3003/api/blogs'
    : 'https://blogsite-api-uvky.onrender.com/api/blogs'
const userUrl =
  process.env.NODE_ENV === 'test'
    ? 'http://localhost:3003/api/users'
    : 'https://blogsite-api-uvky.onrender.com/api/users'
let token = ''

const setToken = (desToken) => {
  token = `Bearer ${desToken}`
}

const getAll = async () => {
  const config = {
    headers: { Authorization: token },
  }
  const request = await axios
    .get(baseUrl, config)
    .then((response) => response.data)
  return request
}

const create = async (blog) => {
  const config = {
    headers: { Authorization: token },
  }
  const result = await axios.post(baseUrl, blog, config).then((res) => res.data)
  return result
}

const incLikes = async (blog) => {
  const config = {
    headers: { Authorization: token },
  }
  console.log(blog)
  const res = await axios
    .put(`${baseUrl}/${blog.id}`, blog, config)
    .then((res) => res.data)
  return res
}

const getUsers = (id) => {
  const res = axios.get(`${userUrl}/${id}`).then((res) => res.data)
  return res
}

const User = (id) => {
  const res = axios.get(`${userUrl}/${id}`).then((res) => res.data)
  return res
}

const getAllUsers = async () => {
  return await axios.get(userUrl).then((res) => res.data)
}

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  await axios.delete(`${baseUrl}/${id}`, config)
}

const addComment = async ({ id, comment }) => {
  const config = {
    headers: { Authorization: token },
  }
  console.log('comment', comment)
  return await axios
    .post(`${baseUrl}/${id}/comments`, { comment: comment }, config)
    .then((res) => res.data)
}

const likeComment = async ({ id, comment }) => {
  const config = {
    headers: { Authorization: token },
  }
  return await axios.put(
    `${baseUrl}/${id}/comments/${comment._id}`,
    comment,
    config,
  )
}

const updateUser = async (details, id) => {
  const res = await axios
    .put(`${userUrl}/${id}`, details)
    .then((res) => res.data)
  return res
}

export default {
  getAll,
  setToken,
  create,
  getUsers,
  incLikes,
  deleteBlog,
  getAllUsers,
  User,
  addComment,
  updateUser,
  likeComment,
}
