import React from 'react'
import ContainerRightNoti from './ContainerRightNoti'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { fetchNotis } from './notificationsSlice'
import { CircularProgress } from '@material-ui/core'

const ContainerRightShowNoti = () => {
    const notifications = useSelector(state => state.notifications.notifications)

    const notificationsStatus = useSelector(state => state.notifications.status)
    const error = useSelector(state => state.notifications.error)

    const dispatch = useDispatch()

    useEffect(()=>{
        if(notificationsStatus === 'idle'){
            dispatch(fetchNotis())
        }
    },[notificationsStatus, dispatch])

    let content = ''

    if (notificationsStatus === 'loading') {
        content = <CircularProgress />
    }
    else if (notificationsStatus === "successed") {
        content = notifications.length > 0? notifications.map((noti) => (<ContainerRightNoti key = {noti.noti_id} noti = {noti}/>)) : ''
    }
    else if (notificationsStatus === 'failed'){
        content = {error}
    }

    return (
        <div> 
            {content}
        </div>
    )
}

export default ContainerRightShowNoti
