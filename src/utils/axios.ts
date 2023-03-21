import axios from 'axios'
import { apiConfig } from '@config'

const instance = axios.create({
  baseURL: apiConfig.baseApiUrl,
  params: {
    apikey: apiConfig.apiKey,
  },
})

instance.interceptors.request.use((config) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  config.params = config.params || {}
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  config.params['apikey'] = apiConfig.apiKey

  return config
})

export {instance};
