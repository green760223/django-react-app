/**
 * API Interfaces and Types
 */

export interface Result<T = any> {
  access: string
  refresh: string
  data?: T
}

export namespace Login {
  export interface Params {
    username: string
    password: string
  }
}

export namespace Register {
  export interface Params extends Login.Params {
    email: string
    first_name: string
    last_name: string
  }
}

export namespace User {
  export interface UserInfo {
    id: number
    username: string
    email: string
    first_name: string
    last_name: string
  }
}
