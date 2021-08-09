import { Button, CircularProgress, TextField, Typography } from '@material-ui/core'
import React from 'react'
import { useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import { addNewNoti } from './notificationsSlice'
import { unwrapResult } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

const useStyles = makeStyles({
    addForm: {
        marginBottom: '40px',
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
    },
    formControl: {
        margin: '20px 0px',
        '& label': {
            display: 'block'
        }
    },
    inputText: {
        background: 'white',
        width: '90%',
        height: '40px',
        margin: '5px',
        padding: '3px 7px',
        fontSize: '15px',
    },
    btn_submit: {
        textAlign: "center",
        marginTop: "10px",
        width: "100%",
        padding: "10px 20px",
        borderRadius: "10px",
        cursor: "pointer",
        fontSize: "15px",
        color: "rgb(30,136,229)"
    }
})

const ContainerRightAddForm = () => {
    const classes = useStyles()

    const [text, setText] = useState('')
    const [submitting, setsubmitting] = useState(false)
    
    const dispatch = useDispatch()

    const onSubmit = async (e) => {
        e.preventDefault()

        if (text.length < 1) {
            alert("Please enter your notification")
            return
        }

        try {
            setsubmitting(true)
            const resultAction = await dispatch(addNewNoti({text}))
            unwrapResult(resultAction)
            setText('')
        }
        catch (error) {
            console.log(error)
        }
        finally{
            setsubmitting(false)
        }
        
    }

    return (
        <form className={classes.addForm} onSubmit={onSubmit}>
            <div className={classes.formControl}>
                <label style={{ float: 'left', marginLeft: "10px" }}>Please enter your notification:</label>
                <br />
                <TextField
                    classes={{ root: classes.inputText }}
                    id="filled-textarea"
                    maxrows="4"
                    variant="outlined"
                    placeholder="Enter your notification here"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
            </div>
            <input type="submit" value="Save" id="submit_btn" style={{ display: 'none' }} />
            <label htmlFor="submit_btn">
                <Button disabled={submitting} variant="outlined" color="primary" component="span" className={classes.btn_submit}>
                    <Typography variant = "inherit" style = {{textTransform: 'none', fontWeight: "bold"}}>
                        Save Notification
                    </Typography>
                </Button>
                {submitting && <CircularProgress />}
            </label>
        </form>
    )
}

export default ContainerRightAddForm
