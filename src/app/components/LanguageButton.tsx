import * as React from "react"
import { Component } from "react"
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { connect } from 'react-redux'
import { setLanguage } from '../actions/editorActions'

const allLanguages = ['Lua', 'Javascript'];

class LanguageButton extends Component<any, any> {
    private anchorRef: React.RefObject<any> = React.createRef()

    constructor(props) {
        super(props)

        this.state = {
            open : false
        }

        this.handleMenuItemClick = this.handleMenuItemClick.bind(this)
        this.handleToggle = this.handleToggle.bind(this)
        this.handleClose = this.handleClose.bind(this)
    }

    handleMenuItemClick(event, index) {
        this.setState({
            open : false
        })

        this.props.setLanguage(index)
    }

    handleToggle() {
        this.setState({ open : !this.state.open })
    }

    handleClose(event: React.MouseEvent<Document, MouseEvent>) {
        this.setState({ open : false })
    }

    render() {
        return (
            <div style={{ paddingRight: '10px' }}>
                <ButtonGroup ref={this.anchorRef}>
                    <Button>{allLanguages[this.props.editor.language]}</Button>
                    <Button
                        size="small"
                        aria-owns={open ? 'menu-list-grow' : undefined}
                        aria-haspopup="true"
                        onClick={this.handleToggle}
                    >
                        <ArrowDropDownIcon />
                    </Button>
                </ButtonGroup>
                <Popper open={this.state.open} anchorEl={this.anchorRef.current} transition disablePortal>
                    {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            style={{
                                transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
                            }}
                        >
                            <Paper id="menu-list-grow">
                                <ClickAwayListener onClickAway={this.handleClose}>
                                    <MenuList>
                                        {allLanguages.map((option, index) => (
                                            <MenuItem
                                                key={option}
                                                selected={index === this.props.editor.language}
                                                onClick={event => this.handleMenuItemClick(event, index)}
                                            >
                                                {option}
                                            </MenuItem>
                                        ))}
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    editor: state.editor,
})

export default connect(mapStateToProps, { setLanguage: setLanguage })(LanguageButton);