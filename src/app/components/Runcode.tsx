import * as React from "react"
import { Component } from "react"
import MonacoLua from './MonacoLua'
import MonacoJS from './MonacoJS'
import { connect } from 'react-redux'
import LanguageButton from './LanguageButton'
import { AppBar, Toolbar, Typography, Container, IconButton, ButtonGroup, Button } from "@material-ui/core";
import PlayArrow from '@material-ui/icons/PlayArrow'
import { setClientSide } from '../actions/editorActions'

class Runcode extends Component<any, any> {
    private keydownCB: (KeyboardEvent) => void = null

    constructor(props) {
        super(props)

        this.state = {
            hidden : process.env.NODE_ENV === 'production'
        }

        this.componentDidMount = this.componentDidMount.bind(this);
        this.onChangeSide = this.onChangeSide.bind(this)
        this.runCode = this.runCode.bind(this)
    }

    componentDidMount() {
        const t = this;

        // Todo use router/links
        const appHandlers = {
            showEditor(hide: boolean) {
                t.setState({ hidden : hide })
            },
            hideEditor(post: boolean) {
                t.setState({ hidden : true })
                
                if (post) {
                    fetch('http://pRuncode/nuiCallback', {
                        method: 'POST', body: JSON.stringify({
                            eventName: "hideEditor"
                        })
                    })
                }
            }
        };

        window.addEventListener('message', function (event) {
            if (appHandlers[event.data.eventName])
                appHandlers[event.data.eventName](event.data.eventData)
        })

        this.keydownCB = (e: KeyboardEvent) => {
            if (e.key === 'Escape' || e.key === 'F5')
                appHandlers.hideEditor(true)
        }

        document.addEventListener('keydown', this.keydownCB)
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.keydownCB)
    }

    runCode() {
        const client = this.props.editor.client, luaCodes = this.props.editor.luaCodes, jsCodes = this.props.editor.jsCodes, language = this.props.editor.language
        const code = client ? (language === 0 ? luaCodes.client : jsCodes.client) : (language === 0 ? luaCodes.server : jsCodes.server)

        fetch('http://pRuncode/nuiCallback', {
            method: 'POST', body: JSON.stringify({
                eventName: "runcode",
                client: client,
                language: this.props.editor.language,
                code: code
            })
        })
    }
    
    onChangeSide() {
        this.props.setClientSide()
    }

    render() {
        return (!this.state.hidden && (
            <Container fixed className="codeContainer">
                <AppBar position="relative" color="inherit">
                    <Toolbar>
                        <Typography variant="h6" color="inherit" noWrap style={{ flexGrow: 1 }}>
                            pRuncode
                        </Typography>

                        <ButtonGroup style={{ paddingRight: '10px' }}>
                            <Button disabled={this.props.editor.client} onClick={this.onChangeSide}>Client</Button>
                            <Button disabled={!this.props.editor.client} onClick={this.onChangeSide}>Server</Button>
                        </ButtonGroup>

                        <LanguageButton />

                        <IconButton color="inherit" onClick={this.runCode}>
                            <PlayArrow />
                        </IconButton>  
                    </Toolbar>
                </AppBar>
                {this.props.editor.language === 0 ? <MonacoLua client={this.props.editor.client} /> : <MonacoJS client={this.props.editor.client} />}
            </Container>
        ))
    }
}

const mapStateToProps = state => ({
    editor: state.editor
})

export default connect(mapStateToProps, { setClientSide: setClientSide })(Runcode);