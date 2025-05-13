import axios from 'axios'
import { isRef, ref, unref, watchEffect } from 'vue'

axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL

const defaultConfig = {
  method: 'get',
}

const defaultOptions = {
  immediate: true,
}

export const useAxios = (url, config = {}, options = {}) => {
  const response = ref(null)
  const data = ref(null)
  const loading = ref(false)
  const error = ref(null)
  const { params } = config
  const { immediate, onSuccess, onError } = {
    ...defaultOptions,
    ...options,
  }

  const execute = body => {
    data.value = null
    error.value = null
    loading.value = true
    axios(url, {
      ...defaultConfig,
      ...config,
      params: unref(params),
      data: typeof body === 'object' ? body : {},
    })
      .then(res => {
        response.value = res
        data.value = res.data
        if (onSuccess) {
          onSuccess(res)
        }
      })
      .catch(err => {
        error.value = err
        if (onError) {
          onError(err)
        }
      })
      .finally(() => {
        loading.value = false
      })
  }

  if (isRef(params)) {
    watchEffect(execute)
  } else {
    if (immediate) {
      execute()
    }
  }

  return { response, data, error, loading, execute }

  // try {
  //   loading.value = true
  //   const { data, headers } = await getPosts(params.value)
  //   posts.value = data
  //   totalCount.value = headers['x-total-count']
  // } catch (err) {
  //   console.error(err)
  //   vAlert('네트워크 오류!')
  //   error.value = err
  // } finally {
  //   loading.value = false
  // }
}
