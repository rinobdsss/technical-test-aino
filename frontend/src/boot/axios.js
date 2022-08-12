import axios from 'axios'
import { Cookies } from 'quasar'

const axiosConfig = {
  // baseUrl: process.env.API
  baseURL: 'http://localhost:8080/',
  transformRequest: [(data, headers) => {
    if (typeof Cookies.get('token') !== 'undefined' && Cookies.get('token') !== null && Cookies.get('token') !== '') {
      headers.Authorization = 'Bearer ' + Cookies.get('token')
    } else {
      headers.Authorization = null
    }
    if (headers.Accept === '*/*') {
      const querystring = require.resolve('querystring-es3')
      headers['Content-Type'] = 'application/x-www-form-urlencoded'

      return querystring.stringify(data)
    } else {
      const objFormData = new FormData()
      for (const index in data) {
        if (Array.isArray(data[index])) {
          for (const indexArray in data[index]) {
            objFormData.append(index + '[]', data[index][indexArray])
          }
        } else {
          objFormData.append(index, data[index])
        }
      }
      return objFormData
    }
  }]
}

if (typeof Cookies.get('token') !== 'undefined' && Cookies.get('token') !== null && Cookies.get('token') !== '') {
  axiosConfig.headers = {
    Authorization: 'Bearer ' + Cookies.get('token')
  }
}

const instance = axios.create(
  axiosConfig
)

instance.interceptors.request.use((config) => {
  if (config.method === 'put' || config.method === 'patch') {
    config.headers.Accept = '*/*'
  }
  return config
})

instance.interceptors.request.use((response) => {
  return response
}, (error) => {
  return Promise.reject(error.response.data)
})

export default ({ app }) => {
  app.config.globalProperties.$axios = instance
}

export { axios, instance }
