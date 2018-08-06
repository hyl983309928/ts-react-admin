/* eslint-disable */
import axios from 'axios'
const http = axios

http.interceptors.response.use(checkStatus)

http.interceptors.request.use((config: { headers: any }) => {
  const token = window.localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = 'JWT ' + window.localStorage.getItem('token')
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

if (process.env.NODE_ENV !== 'development') {
  http.defaults.baseURL = process.env.API_ROOT
}
http.defaults.validateStatus = (status) => {
  if (status === 401) {
    window.localStorage.removeItem('token')
    window.location.replace(`${window.location.origin + '/login'}`)
  }
  return status >= 200 && status < 300;
}

function checkStatus(response: any) {
  if (response.status >= 200 && response.status < 300) {
    return response.data
  } else {
    console.log(response)
    const error: any = new Error(response.data)
    error.response = response
    throw error
  }
}

function getUrl(url: string, param: any) {
  if (!param) {
    return url
  }
  url += '?'
  const list = []
  for (const key in param) {
    if (param.hasOwnProperty(key)) {
      const val: any = param[key]
      if (Object.prototype.toString.call(val) === '[object Array]') {
        for (let i = 0,length = val.length; i < length; i++) {
          if (val[i]) {
            const temp = encodeURIComponent(val[i])
            list.push(key + '=' + temp)
          }
        }
      } else {
        if (val) {
          const encodeVal = encodeURIComponent(val)
          list.push(key + '=' + encodeVal)
        }
      }
    }
  }
  url += list.join('&')
  return url
}
// const CancelToken = axios.CancelToken
// const source = CancelToken.source()


export function apiRequest(path: string, method = 'get', data = {}, isCancel = false): any {
  const url = path
  const headers = {
  }
  if (method === 'get') {
    return http.get(getUrl(url, data), { headers })
  } else if (method === 'delete') {
    return http.delete(getUrl(url, data), { headers })
  } else if (method === 'post') {
    headers['Content-type'] = 'application/json; charset=utf-8'
    return http.post(url, data, { headers })
  } else if (method === 'put') {
    headers['Content-type'] = 'application/json; charset=utf-8'
    return http.put(url, data, { headers })
  } else if (method === 'patch') {
    headers['Content-type'] = 'application/json; charset=utf-8'
    return http.patch(url, data, { headers })
  } else if (method === 'form') {
    headers['Content-type'] = ' application/x-www-form-urlencoded;charset=utf-8'
    return http.post(url, data, { headers })
  }
}
