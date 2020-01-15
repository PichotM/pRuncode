import * as React from "react";
import { Component } from "react";
import MonacoEditor from 'react-monaco-editor';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';

import { connect } from 'react-redux'
import { setLuaServerCode, setLuaClientCode } from "../actions/editorActions";

const luaModel = monaco.editor.createModel(``, "lua")

const MonacoLua = ({ luaCodes, client, setLuaClientCode, setLuaServerCode }) => {
    const [code, setCode] = React.useState('')

    React.useEffect(() => {
        if (!client && code) {
            setLuaClientCode(code)
        } else if (client && code) {
            setLuaServerCode(code)
        }

        setCode(client ? luaCodes.client : luaCodes.server)
    }, [client])

    const onChange = (e) => {
        setCode(e)
    }

    return <MonacoEditor
        language={'lua'}
        theme="vs-dark"
        value={code}
        onChange={onChange}
        options={{
            selectOnLineNumbers: true,
            model: luaModel
        }}
    />
}

const mapStateToProps = state => ({
    luaCodes: state.editor.luaCodes,
    client: state.editor.client
})

export default connect(mapStateToProps, { setLuaServerCode: setLuaServerCode, setLuaClientCode: setLuaClientCode })(MonacoLua);