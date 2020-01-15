import * as React from 'react'
import MonacoLua from './MonacoLua'
import MonacoJS from './MonacoJS'
import { connect } from 'react-redux'
import LanguageButton from './LanguageButton'
import { AppBar, Toolbar, Typography, Container, IconButton, ButtonGroup, Button } from "@material-ui/core";
import PlayArrow from '@material-ui/icons/PlayArrow'
import { setClientSide } from '../actions/editorActions'

const Runcode = ({ editor, setClientSide }) => {
    const [hidden, setHidden] = React.useState(process.env.NODE_ENV === 'production');

    const createPostMethods = () => {
        const appHandlers = {
            showEditor(hide: boolean) {
                setHidden(hide)
            },
            hideEditor(post: boolean) {
                setHidden(true)
                
                if (post) {
                    fetch('http://pRuncode/nuiCallback', { method: 'POST', body: JSON.stringify({ eventName: "hideEditor" }) })
                }
            }
        };

        window.addEventListener('message', function (event) {
            if (appHandlers[event.data.eventName])
                appHandlers[event.data.eventName](event.data.eventData)
        })

        const keydownCB = (e: KeyboardEvent) => {
            if (e.key === 'Escape' || e.key === 'F5')
                appHandlers.hideEditor(true)
        }

        document.addEventListener('keydown', keydownCB)
    }

    createPostMethods()

    const runCode = () => {
        const client = editor.client, luaCodes = editor.luaCodes, jsCodes = editor.jsCodes, language = editor.language
        const code = client ? (language === 0 ? luaCodes.client : jsCodes.client) : (language === 0 ? luaCodes.server : jsCodes.server)

        fetch('http://pRuncode/nuiCallback', {
            method: 'POST', body: JSON.stringify({
                eventName: "runcode",
                client: client,
                language: editor.language,
                code: code
            })
        })
    }
    
    const onChangeSide = () => {
        setClientSide()
    }

    return (!hidden && (
        <Container fixed className="codeContainer">
            <AppBar position="relative" color="inherit">
                <Toolbar>
                    <Typography variant="h6" color="inherit" noWrap style={{ flexGrow: 1 }}>
                        pRuncode
                    </Typography>

                    <ButtonGroup style={{ paddingRight: '10px' }}>
                        <Button disabled={editor.client} onClick={onChangeSide}>Client</Button>
                        <Button disabled={!editor.client} onClick={onChangeSide}>Server</Button>
                    </ButtonGroup>

                    <LanguageButton />

                    <IconButton color="inherit" onClick={runCode}>
                        <PlayArrow />
                    </IconButton>  
                </Toolbar>
            </AppBar>

            {/* Unfortunately, we can't change monaco's model in runtime so, we need two seperated components */}
            {editor.language === 0 ? <MonacoLua client={editor.client} /> : <MonacoJS client={editor.client} />}
        </Container>
    ))
}

const mapStateToProps = state => ({
    editor: state.editor
})

export default connect(mapStateToProps, { setClientSide: setClientSide })(Runcode);