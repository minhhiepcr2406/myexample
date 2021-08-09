import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Add, Close } from '@material-ui/icons'
import { Typography, Button } from '@material-ui/core'

const useStyles = makeStyles({
    btn: {
        padding: '10px 20px',
        borderRadius: '10px',
        fontSize: '15px',
        cursor: 'pointer',
        marginTop: '10px',
        width: '100%'
    }
})

const ContainerRightButton = ({onShowContent, showContent}) => {
    const classes = useStyles()
    return (
        <div>
            {showContent 
                ? 
                    <Button
                        className = {classes.btn}
                        color = "primary"
                        variant = "outlined"
                        startIcon = {<Add/>}
                        onClick = {onShowContent}
                    >
                        <Typography variant = "inherit" style = {{textTransform: 'capitalize', fontWeight: "bold", color: "rgb(30,136,229)"}}>
                            Make Notification
                        </Typography>
                    </Button>
                : 
                    <Button
                        className = {classes.btn}
                        color = "secondary"
                        variant = "outlined"
                        startIcon = {<Close/>}
                        onClick = {onShowContent}
                    >
                        <Typography variant = "inherit" style = {{textTransform: 'capitalize', fontWeight: "bold"}}>Cancle</Typography>
                    </Button>
            }
            
        </div>
    )
}

export default ContainerRightButton
