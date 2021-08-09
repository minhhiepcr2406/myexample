import React from 'react'
import { Button, makeStyles } from '@material-ui/core'
import { Home } from '@material-ui/icons'
import { LibraryAdd } from '@material-ui/icons'
import { Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'

const useStyles = makeStyles({
    root: {
        backgroundColor: 'white',
        position: "relative",
    },

    info: {
        display: 'flex',
        alignItems: 'center',
        height: '60px',
        padding: '20px',
    },

    btn: {
        display:'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        background: '#000',
        color: '#fff',
        padding: '10px 20px',
        borderRadius: '10px',
        fontSize: '15px',
        cursor: 'pointer',
        marginTop: '10px',
        width: '100%',
        '&:hover':{
            backgroundColor: 'rgb(21,14,112)'
        }
    },

    _btn: {
        background: "white",
        color: "rgb(30,136,229)",
        fontSize: '15px',
        borderRadius: "10px",
        cursor: "pointer",
        width: "100%",
        padding: '10px 20px',
        marginTop: '10px',
        '&:hover':{
            backgroundColor: '#e8e8e8'
        }
    }

})

const LeftContainer = () => {
    const classes = useStyles()
    return (
        <div className = {classes.root} style = {{position:'sticky', top: "5rem", zIndex : 0}}>
             <div className = {classes.info}>
                <Typography variant = "inherit"><b>Information</b></Typography>
            </div>
            <Link to = '/newsfeed'>
                <Button
                    className = {classes._btn}
                    startIcon = {<Home/>}
                >
                    <Typography variant = "inherit" style = {{textTransform: "none"}}>
                        Newsfeed
                    </Typography>
                </Button>
            </Link>
            <Link to = '/lecture'>
                <Button
                    className = {classes._btn}
                    startIcon = {<LibraryAdd/>}
                >
                    <Typography variant = "inherit" style = {{textTransform: "none", textDecoration: 'none'}}>
                        Lecture
                    </Typography>
                </Button>
            </Link>
        </div>
    )
}

export default LeftContainer
