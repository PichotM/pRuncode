import * as React from "react";
import { Component } from "react";
import MonacoEditor from 'react-monaco-editor';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';

import { connect } from 'react-redux'
import { setLuaClientCode, setLuaServerCode } from "../actions/editorActions";

const defaultLuaCode = ``

const luaModel = monaco.editor.createModel(defaultLuaCode, "lua")

class MonacoLua extends Component<any, any> {
    private updateInterval;

    constructor(props) {
        super(props)

        this.state = {
            code : ''
        }

        this.onChange = this.onChange.bind(this)
        this.componentDidMount = this.componentDidMount.bind(this)
    }

    componentDidMount() {
        const client = this.props.client, luaCodes = this.props.luaCodes
        const code = client ? luaCodes.client : luaCodes.server

        this.setState({ code : code })

        // better idea?
        this.updateInterval = setInterval(() => {
            const client = this.props.client, luaCodes = this.props.luaCodes
            const code = client ? luaCodes.client : luaCodes.server

            if (this.state.code != code) {
                if (client) {
                    this.props.setLuaClientCode(this.state.code)
                } else {
                    this.props.setLuaServerCode(this.state.code)
                }
            }
        }, 1000)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.client != this.props.client) {
            const client = this.props.client, luaCodes = this.props.luaCodes
            this.setState({ code : client ? luaCodes.client : luaCodes.server })
        } 
    }

    componentWillUnmount() {
        if (this.updateInterval)
            clearInterval(this.updateInterval)
    }

    onChange(e) {
        this.setState({ code : e })
    }

    render() {
        return <MonacoEditor
            language={'lua'}
            theme="vs-dark"
            value={this.state.code}
            onChange={this.onChange}
            options={{
                selectOnLineNumbers: true,
                model: luaModel
            }}
        />
    }
}

const mapStateToProps = state => ({
    luaCodes: state.editor.luaCodes,
})

export default connect(mapStateToProps, { setLuaClientCode: setLuaClientCode, setLuaServerCode: setLuaServerCode })(MonacoLua);