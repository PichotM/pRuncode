import * as React from "react"
import { Component } from "react"
import { Provider } from 'react-redux'
import Runcode from './components/Runcode'
import store from './store/index'

export default class App extends Component<any, any> {
    render() {
        return (
            <Provider store={store}>
                <Runcode />
            </Provider>
        )
    }
}