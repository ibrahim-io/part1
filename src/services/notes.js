import axios from 'axios'
const baseUrl = 'http://localhost:3000/notes'


const getAll = () => {
  return axios.get(baseUrl)
}

const create = newObj => {
  return axios.post(baseUrl, newObj)
}

const update = (id, newObj) => {
  return axios.put(`${baseUrl}/${id}`, newObj)
} 


export default {
  getAll: getAll,
  create: create,
  update: update
}