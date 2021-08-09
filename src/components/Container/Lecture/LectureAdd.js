import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Typography, Paper, FormControl, FormHelperText } from '@material-ui/core'
import { OutlinedInput } from '@material-ui/core'
import { InputAdornment } from '@material-ui/core'
import AttachmentIcon from '@material-ui/icons/Attachment';
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateLectureLink } from './lectureSlice'

const useStyles = makeStyles({
    root: {
        background: '#e8e8e8',
        border: "1px solid #e8e8e8",
        height: "1007px",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    info: {
        display: 'flex',
        alignItems: 'center',
        height: '60px',
        padding: '20px',
        backgroundColor: "white",
        borderRadius: '3px',
        borderBottom: "1px solid #e8e8e8",
        width: '100%',
    },
    paper: {
        width: "90%",
        background: 'white',
        marginTop: '32px',
        padding: '32px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center'
    },
    form: {
        width: "100%",
        marginTop: '20px',
    },
    formHelper: {
        color: '#f44336',
        fontFamily: 'Poppins'
    }
})

const LectureAdd = () => {
    const classes = useStyles()

    const lecture = useSelector(state => state.lectures.lectureLink)
    
    const [lectureLink, setLectureLink] = useState(lecture)
    const [error, setError] = useState(false)
    const youtubeLink = 'https://www.youtube.com/watch?v='

    const dispatch = useDispatch()

    const handleChange = (event) => {
        if(!event.target.value.includes(youtubeLink)){
            setError(true)
        }
        else{
            setError(false)
        }
        setLectureLink(event.target.value)
        dispatch(updateLectureLink(event.target.value))
    }

    return (
        <div className = {classes.root}>
            <div className = {classes.info}>
                <Typography variant = "inherit" style = {{fontWeight: "bold"}}>
                    Lecture
                </Typography>
            </div>
            <Paper variant = "outlined" className = {classes.paper}>
                <Typography variant = "inherit" style = {{fontWeight: 'bold', fontSize: '18px'}}>
                    Create a new lecture from Youtube
                </Typography>
                <Typography variant = "inherit">
                    Multiple video lectures can be uploaded by entering link playlist from Youtube.
                </Typography>
                <FormControl className = {classes.form}>
                    <OutlinedInput
                        placeholder = "Enter your link youtube here."
                        startAdornment={
                            <InputAdornment position="start">
                                <AttachmentIcon />
                            </InputAdornment>
                        }
                        value = {lectureLink}
                        onChange = {handleChange}
                        error = {error}
                    />
                    {error ? <FormHelperText className = {classes.formHelper} >Invalid Youtube Link</FormHelperText>: ''}
                </FormControl>
            </Paper>
        </div>
    )
}

export default LectureAdd
