import axiosClient from "./axiosClient"

const auth = {
  signup: params => axiosClient.post('/auth/register', params),
  login: params => axiosClient.post('/auth/login', params),
  info: () => axiosClient.get('/auth/info')
}

export default auth