import { Typography } from '@material-ui/core'
import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Avatar } from '@material-ui/core'
import { deepOrange } from '@material-ui/core/colors';

const useStyles = makeStyles({
    comment_response_content : {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: '10px'
    },
    comment_response_content_para : {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: '15px',
        textAlign: 'left',
    },
    orange: {
        backgroundColor: deepOrange[500],
    }
})

const CommentResponse = ({res}) => {
    const classes = useStyles()
    return (
        <div className = {classes.comment_response_content}>
            {
                res.userava === null? <Avatar className={classes.orange}>{res.username[0]}</Avatar> :
                <Avatar alt = {res.username} src = {res.userava} />
            }
            <div className = {classes.comment_response_content_para}>
                <Typography variant = "inherit" style = {{fontSize : "13px"}}><b>{res.username}</b></Typography>
                <Typography variant = "inherit" style = {{fontSize : "14px", wordWrap:'break-word', wordBreak:'break-all'}}>{res.text}</Typography>
            </div>
         </div>
    )
}

export default CommentResponse
