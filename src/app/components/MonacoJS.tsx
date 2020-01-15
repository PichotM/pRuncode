import * as React from "react";
import { Component } from "react";
import MonacoEditor from 'react-monaco-editor';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';

import { connect } from 'react-redux'
import { setJsClientCode, setJsServerCode } from "../actions/editorActions";

const jsModel = monaco.editor.createModel(``, "javascript")

const MonacoJS = ({ jsCodes, client, setJsClientCode, setJsServerCode }) => {
    const [code, setCode] = React.useState('')

    const changeLanguage = (languageIndex: number) => {
        if (languageIndex === 1) {
            monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
                allowNonTsExtensions: true,
                target: monaco.languages.typescript.ScriptTarget.Latest
            })
        }
    }

    React.useEffect(() => {
        if (!client && code) {
            setJsClientCode(code)
        } else if (client && code) {
            setJsServerCode(code)
        }

        setCode(client ? jsCodes.client : jsCodes.server)
    }, [client])

    const editorWillMount = () => {
        changeLanguage(1)
    }

    const onChange = (e) => {
        setCode(e)
    }

    return <MonacoEditor
        language={'javascript'}
        theme="vs-dark"
        value={code}
        onChange={onChange}
        editorWillMount={editorWillMount}
        options={{
            selectOnLineNumbers: true,
            model: jsModel
        }}
    />
}

const mapStateToProps = state => ({
    jsCodes: state.editor.jsCodes,
    client: state.editor.client
})

export default connect(mapStateToProps, { setJsServerCode: setJsServerCode, setJsClientCode: setJsClientCode })(MonacoJS);