// 登录参数接口
export interface LoginParams {
  phone?: string
  username?: string
  password?: string
  verifyCode: string
}

// 用户信息接口
export interface UserInfo {
  id: number
  username: string
  avatar: string
  // 其他用户信息字段
}