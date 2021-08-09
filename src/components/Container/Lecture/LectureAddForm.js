import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Button, OutlinedInput, TextField, Typography } from '@material-ui/core'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addNewLecture, updateLectureLink } from './lectureSlice'

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection:'column',
        alignItems: 'center',
        height: '1007px',
        padding: '20px'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        width: "100%"
    },
    btnSubmit: {
        background: 'rgb(30,136,229)',
        color: 'white',
        width: '100%',
        marginTop: '20px'
    }
})

const LectureAddForm = () => {
    const classes = useStyles()

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')


    const lecture = useSelector(state => state.lectures.lectureLink)
    const dispatch = useDispatch()

    const onSubmit = async (e) => {
        e.preventDefault()

        await dispatch(addNewLecture({lecture, name, description}))
        setName('')
        setDescription('')
        dispatch(updateLectureLink(''))
    }

    return (
        <div className = {classes.root}>
            {
                lecture === '' || !lecture.includes('https://www.youtube.com/watch?v=') ? (
                    <Typography variant = "inherit">
                        Please enter your lecture link
                    </Typography>
                ) : (
                    <form className = {classes.form} onSubmit = {onSubmit}>
                        <Typography variant = "inherit" style = {{opacity: '70%', marginTop: '20px'}}>
                            Lecture Name:
                        </Typography>
                        <OutlinedInput 
                            required
                            placeholder = "Enter lecture name."
                            value = {name}
                            onChange = {(e) => setName(e.target.value)}
                        />
                        <Typography variant = "inherit" style = {{opacity: '70%', marginTop: '20px'}}>
                            Description:
                        </Typography>
                        <TextField 
                            multiline
                            placeholder = "Enter lecture's discription."
                            rows = '4'
                            variant = "outlined"
                            value = {description}
                            onChange = {e => setDescription(e.target.value)}
                        />
                        <input id = "submit-lecture" type = "submit" style = {{display: 'none'}} />
                        <label htmlFor="submit-lecture">
                            <Button
                                component = "span"
                                className = {classes.btnSubmit}
                            >
                                <Typography variant = "inherit" style = {{textTransform: 'none'}}>
                                    Submit
                                </Typography>
                            </Button>
                        </label>
                    </form>
                )
            }
        </div>
    )
}

export default LectureAddForm
