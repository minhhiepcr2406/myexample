import React from 'react'
import { makeStyles, Typography } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import { useDispatch } from 'react-redux'
import { deleteNoti } from './notificationsSlice'

const useStyles = makeStyles({
    noti: {
        background: 'rgb(247,247,247)',
        margin: '10px',
        padding: '8px',
        borderRadius: '8px',
        border: '1px solid #E8E8E8',
        borderLeft: '4px solid rgb(30,136,229)',
        cursor: "pointer",
        display: 'flex',
        justifyContent: 'space-between',
    }
})

const ContainerRightNoti = ({noti}) => {
    const classes = useStyles()

    const dispatch = useDispatch()
    return (
        <div className = {classes.noti}>
            <div style = {{ display: 'flex', flexDirection: 'column'}}>
                <Typography variant = "inherit" style = {{textAlign: 'left',wordBreak: 'break-all', fontSize: '14px'}}>{noti.noti_text}</Typography>
                <Typography variant = "inherit" style = {{opacity: '70%', fontSize: '11px'}}>{noti.date_str}</Typography>
            </div>
            <Close fontSize = 'small' style = {{color: 'red'}} onClick = {()=>dispatch(deleteNoti(noti.noti_id))}/>
        </div>
    )
}

export default ContainerRightNoti
