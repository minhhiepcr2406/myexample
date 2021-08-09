import React from 'react'
import { makeStyles, Typography } from '@material-ui/core'
import LectureList from './LectureList'

const useStyles = makeStyles({
    root: {
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        minHeight: "1007px",
        border: '1px solid #e8e8e8',
    },
    info: {
        display: 'flex',
        alignItems: 'center',
        height: '60px',
        padding: '20px',
        backgroundColor: "white",
        borderRadius: '3px',
        borderBottom: "1px solid #e8e8e8"
    },
})

const LectureMain = () => {
    const classes = useStyles()
    return (
        <div className = {classes.root}>
            <div className = {classes.info}>
                <Typography variant = "inherit" style = {{fontWeight: "bold"}}>
                    Lecture
                </Typography>
            </div>
            <LectureList />
        </div>
    )
}

export default LectureMain
