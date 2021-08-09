import React from "react";
import { IconButton } from '@material-ui/core'
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import {Menu} from "@material-ui/core";
import {MenuItem} from "@material-ui/core";

const OutButton = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl)

    const handleClick = (e) => {
        setAnchorEl(e.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    return (
        <div style = {{display: 'flex'}}>
            <IconButton
                aria-label="more"
                aria-haspopup="true"
                onClick={handleClick}
            >
                <PowerSettingsNewIcon />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
        </div>
    );
}

export default OutButton
