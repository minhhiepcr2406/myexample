import React from 'react'
import { IconButton } from '@material-ui/core'
import { Menu } from '@material-ui/core'
import { MenuItem } from '@material-ui/core'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useDispatch } from 'react-redux';
import { deletePosts } from './postsSlice';

const CommentInfo = ({id, editCmt, setEditCmt}) => {
    const [anchorEl, setAnchorEl] = React.useState(null)
    const open = Boolean(anchorEl)

    const dispatch = useDispatch()

    const handleClick = (e) => {
        setAnchorEl(e.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }
    return (
        <div style = {{display : 'flex'}}>
            <IconButton
                aria-label="more"
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVertIcon style = {{fontSize : 20}} />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
            >
                <MenuItem onClick = {() => dispatch(deletePosts(id))}>Delete this comment</MenuItem>
                <MenuItem onClick = {() => setEditCmt(!editCmt)}>Edit this comment</MenuItem>
            </Menu>
        </div>
    )
}

export default CommentInfo
