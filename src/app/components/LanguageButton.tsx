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

const LanguageButton = ({ language, setLanguage }) => {
    const anchorRef: React.RefObject<any> = React.useRef(null)
    const [open, setOpen] = React.useState(false)
    const allLanguages = ['Lua', 'Javascript'];

    const handleMenuItemClick = (event, index) => {
        setOpen(false)
        setLanguage(index)
    }

    const handleToggle = () => {
        setOpen(!open)
    }

    const handleClose = (event: React.MouseEvent<Document, MouseEvent>) => {
        setOpen(false)
    }

    return (
        <div style={{ paddingRight: '10px' }}>
            <ButtonGroup ref={anchorRef}>
                <Button>{allLanguages[language]}</Button>
                <Button size="small" aria-owns={open ? 'menu-list-grow' : undefined} aria-haspopup="true" onClick={handleToggle}>
                    <ArrowDropDownIcon />
                </Button>
            </ButtonGroup>

            <Popper open={open} anchorEl={anchorRef.current} transition disablePortal>
                {({ TransitionProps, placement }) => (
                    <Grow {...TransitionProps} style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}>
                        <Paper id="menu-list-grow">
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList>
                                    {allLanguages.map((option, index) => (
                                        <MenuItem key={option} selected={index === language} onClick={event => handleMenuItemClick(event, index)}>
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

const mapStateToProps = state => ({
    language: state.editor.language,
})

export default connect(mapStateToProps, { setLanguage: setLanguage })(LanguageButton);