import axios from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'

// create an axios instance
const service = axios.create({
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 500000000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {

    if (localStorage.getItem('token')) {
      config.headers['token'] = localStorage.getItem('token')
    }

    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(

  response => {
    const res = response.data

    // if the custom code is not 200, it is judged as an error.
    if (res.code !== 200) {
      ElMessage({
        type: 'error',
        message: res.msg,
        duration: 5 * 1000
      })

      return Promise.reject(new Error(res.msg || 'Error'))
    } else {
      if (res.token) {
        localStorage.setItem('token', res.token)
      }

      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    ElMessage({
      type: 'error',
      message: error.msg,
      duration: 5 * 1000
    })

    return Promise.reject(error.msg)
  }
)

export default service
