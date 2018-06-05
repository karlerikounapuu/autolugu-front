/* global localStorage */

import axios from 'axios'

const API_URL = process.env.API_URL || 'https://api.autolugu.ee.dev.kreative.ee'

export default axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.token
  },
  withCredentials: false
})
