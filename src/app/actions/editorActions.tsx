// action types
export const SET_CLIENTSIDE = 'SET_CLIENTSIDE'
export const SET_LANGUAGE = 'SET_LANGUAGE'
export const SET_JS_SERVER_CODE = 'SET_JS_SERVER_CODE'
export const SET_JS_CLIENT_CODE = 'SET_JS_CLIENT_CODE'
export const SET_LUA_SERVER_CODE = 'SET_LUA_SERVER_CODE'
export const SET_LUA_CLIENT_CODE = 'SET_LUA_CLIENT_CODE'

// action creators
export const setClientSide = update => ({
  type: SET_CLIENTSIDE,
  payload: update,
})

export const setLanguage = update => ({
  type: SET_LANGUAGE,
  payload: update,
})

export const setJsServerCode = update => ({
  type: SET_JS_SERVER_CODE,
  payload: update,
})

export const setJsClientCode = update => ({
  type: SET_JS_CLIENT_CODE,
  payload: update,
})

export const setLuaServerCode = update => ({
  type: SET_LUA_SERVER_CODE,
  payload: update,
})

export const setLuaClientCode = update => ({
  type: SET_LUA_CLIENT_CODE,
  payload: update,
})
