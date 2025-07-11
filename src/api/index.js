import axios from 'axios'

function create(baseURL, options) {
  // const instance = axios.create({
  //   baseURL: baseURL,
  //   ...options,
  // })
  const instance = axios.create(Object.assign({ baseURL }, options))
  return instance
}

export const posts = create(`${import.meta.env.VITE_APP_API_URL}/posts/`, {
  timeout: 1000,
})
