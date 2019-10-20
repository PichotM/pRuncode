import * as React from "react";
import { Component } from "react";
import MonacoEditor from 'react-monaco-editor';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';

import { connect } from 'react-redux'
import { setJsClientCode, setJsServerCode } from "../actions/editorActions";

const defaultJSCode = ``
const jsModel = monaco.editor.createModel(defaultJSCode, "javascript")

class MonacoJS extends Component<any, any> {
    private updateInterval;

    constructor(props) {
        super(props)

        this.state = {
            code : ''
        }

        this.changeLanguage = this.changeLanguage.bind(this)
        this.editorWillMount = this.editorWillMount.bind(this)
        this.onChange = this.onChange.bind(this)
        this.componentDidMount = this.componentDidMount.bind(this)
    }

    async changeLanguage(languageId: number) {
        if (languageId === 1) {
            monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
                allowNonTsExtensions: true,
                target: monaco.languages.typescript.ScriptTarget.Latest
            })
        }
    }

    async componentDidMount() {
        const client = this.props.client, jsCodes = this.props.jsCodes
        const code = client ? jsCodes.client : jsCodes.server
    
        this.setState({ code : code })

        this.updateInterval = setInterval(() => {
            const client = this.props.client, jsCodes = this.props.jsCodes
            const code = client ? jsCodes.client : jsCodes.server

            if (this.state.code != code) {
                if (client) {
                    this.props.setJsClientCode(this.state.code)
                } else {
                    this.props.setJsServerCode(this.state.code)
                }
            }
        }, 1000)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.client != this.props.client) {
            const client = this.props.client, jsCodes = this.props.jsCodes
            this.setState({ code : client ? jsCodes.client : jsCodes.server })
        }
    }
    
    componentWillUnmount() {
        if (this.updateInterval)
            clearInterval(this.updateInterval)
    }

    editorWillMount() {
        this.changeLanguage(1)
    }

    onChange(e) {
        this.setState({ code : e })
    }

    render() {
        return <MonacoEditor
            language={'javascript'}
            theme="vs-dark"
            value={this.state.code}
            onChange={this.onChange}
            options={{
                selectOnLineNumbers: true,
                model: jsModel
            }}
            editorWillMount={this.editorWillMount}
        />
    }
}

const mapStateToProps = state => ({
    jsCodes: state.editor.jsCodes,
})

export default connect(mapStateToProps, { setJsServerCode: setJsServerCode, setJsClientCode: setJsClientCode })(MonacoJS);