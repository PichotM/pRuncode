import {createStore, combineReducers} from 'redux'

import editorReducer from '../reducer/editorReducer'

const reducers = combineReducers({
    editor: editorReducer
})

const store = createStore(reducers)

export default store