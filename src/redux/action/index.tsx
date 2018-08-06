
import * as type from './type'

export const updateUserinfo = (userinfo: { id: string } ) => {
  return {
    type: type.UPDATE_USERINFO,
    userinfo
  }
}

export const updateToken = (token: string) => {
  return {
    type: type.UPDATE_TOKEN,
    token
  }
}

export const signOut = () => {
  return {
    type: type.SIGN_OUT
  }
}

export const updateSidebarOpen = () => {
  return {
    type: type.UPDATE_SIDEBAR_OPEN
  }
}