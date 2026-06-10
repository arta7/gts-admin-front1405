import axios from 'axios'
import { useContext, useState } from 'react'

export const useAxios = (progressHandler = () => {}) => {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const token = window.localStorage.getItem('accessToken')
  const headers =  { authorization: `bearer ${token}` }

  const _p = (url: any) => `${process.env.VITE_APP_API_URL}${url}`

  const get = (url: any) => {
    setLoading(true)
    axios
      .get(_p(url), {
        headers,
        // withCredentials: true,
        onUploadProgress: progressHandler,
      })
      .then((data: any) => {
        setData(data)
      })
      .catch((error:any) => {
        setError(error)

      })
      .finally(() => {
        setLoading(false)
      })
  }
  const post = (url: any, data: any) => {
    setLoading(true)
    axios
      .post(_p(url), data, {
        headers,
        withCredentials: true,
        onUploadProgress: progressHandler,
      })
      .then((data: any) => {
        setData(data)
      })
      .catch((error) => {
        setError(error)
      })
      .finally(() => {
        setLoading(false)
      })
  }
  const put = (url: any, data: any) => {
    setLoading(true)
    axios
      .put(_p(url), data, {
        headers,
        // withCredentials: true,
        onUploadProgress: progressHandler,
      })
      .then((data: any) => {
        setData(data)
      })
      .catch((error) => {
        setError(error)
      })
      .finally(() => {
        setLoading(false)
      })
  }
  const patch = (url: any, data: any) => {}
  const _delete = (url: any) => {
    setLoading(true)
    axios
      .delete(_p(url), {
        headers,
        withCredentials: true,
      })
      .then((data: any) => {
        setData(data)
      })
      .catch((error) => {
        setError(error)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return { loading, data, error, get, post, put, patch, remove: _delete }
}
