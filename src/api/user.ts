import { get, post } from '../utils/request'
import type { LoginParams, UserInfo } from '../types/user'
// 用户相关接口
export const userApi = {
  // 获取验证码
  getCaptcha: () =>
    get<any>("/v1/auth/captcha"),
  // 发送验证码
  sendVerifyCode: (phone: string) => 
    post<void>('/user/verify-code', { phone }),

  // 登录
  login: (params: LoginParams) => 
    post<{ token: string; userInfo: UserInfo }>('/user/login', params),

  // 获取用户信息
  getUserInfo: () => 
    get<UserInfo>('/user/info'),

  // 退出登录
  logout: () => 
    post<void>('/user/logout')
}