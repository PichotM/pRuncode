import {SET_CLIENTSIDE, SET_LANGUAGE, SET_JS_SERVER_CODE, SET_JS_CLIENT_CODE, SET_LUA_SERVER_CODE, SET_LUA_CLIENT_CODE, EditorActionTypes} from '../actions/editorActions'

interface IEditorLanguageCodes {
    client: string,
    server: string
}

export interface EditorInitialState {
    language: number,
    client: boolean,
    luaCodes: IEditorLanguageCodes,
    jsCodes: IEditorLanguageCodes
}

const initialEditorState: EditorInitialState = {
    language : 0,
    client : true,
    luaCodes : {
        client : `-- Lua client
Citizen.CreateThread(function()
    Citizen.Trace('Hello world!')
end)`,
        server : `-- lua server
print('Hello server')`
    },
    jsCodes : {
        client : `// JS client
console.log('Hello world')`,
        server : `// JS server
console.log('Hello server')`
    }
}

const editorReducer = (state = initialEditorState, action: EditorActionTypes) => {
  switch (action.type) {
    case SET_CLIENTSIDE:
        return { ...state, client: !state.client };
    case SET_LANGUAGE:
        return { ...state, language: action.payload };
    case SET_JS_SERVER_CODE:
        return { ...state, jsCodes: { ...state.jsCodes, server: action.payload } };
    case SET_JS_CLIENT_CODE:
        return { ...state, jsCodes: { ...state.jsCodes, client: action.payload } };
    case SET_LUA_SERVER_CODE:
        return { ...state, luaCodes: { ...state.luaCodes, server: action.payload } };
    case SET_LUA_CLIENT_CODE:
        return { ...state, luaCodes: { ...state.luaCodes, client: action.payload } };
    default:
      return state
  }
}

export default editorReducer
