import request from '../utils/request'
import { Login, Result, Register, User } from '../types/api'

export default {
  login(params: Login.Params) {
    return request.post<Result>('/login', params)
  },

  register(params: Register.Params) {
    return request.post<Register.Params>('/register', params)
  },

  getUserInfo() {
    return request.get<User.UserInfo[]>('/users')
  }
}
