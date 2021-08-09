import React from 'react'
import { MenuItem } from '@material-ui/core'
import { Menu } from '@material-ui/core'
import { IconButton } from '@material-ui/core'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, fetchUserWithId } from '../User/userSlice';

const HeaderAccount = () => {
    const [anchorEl, setAnchorEl] = React.useState(null)
    const open = Boolean(anchorEl)

    const dispatch = useDispatch()

    const handleClick = (e) =>{
        setAnchorEl(e.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const accList = useSelector(state => state.user.users)

    React.useEffect(() => {
        dispatch(fetchUsers())
    }, [dispatch])

    return (
        <div>
            <IconButton
                aria-label = 'more'
                aria-haspopup = 'true'
                onClick = {handleClick}
            >
                <AccountCircleIcon />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
            >
                {accList.length > 0 ? accList.map((acc) => <MenuItem onClick = {()=>(dispatch(fetchUserWithId(acc.user_id)))} key = {acc.user_id}>{acc.name}</MenuItem>) : ''}
            </Menu>
        </div>
    )
}

export default HeaderAccount
