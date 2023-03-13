import axios from 'axios'
import { apiConfig } from '@config'

const instance = axios.create({
  baseURL: apiConfig.baseApiUrl,
  params: {
    apikey: apiConfig.apiKey,
  },
})

instance.interceptors.request.use((config) => {
  config.params = config.params || {}
  config.params['apikey'] = apiConfig.apiKey

  return config
})

export {instance};
