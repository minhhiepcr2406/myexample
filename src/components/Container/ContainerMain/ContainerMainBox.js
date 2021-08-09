import React from 'react'
import { useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import { Avatar, CircularProgress, TextField } from '@material-ui/core'
import { Button } from '@material-ui/core'
import { PhotoCamera } from '@material-ui/icons'
import { deepOrange } from '@material-ui/core/colors';
import { useDispatch } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import { addNewPost } from './postsSlice'

const useStyles = makeStyles((theme) => ({
    box_content: {
        display: "flex",
        flexDirection: 'column',
        margin: "20px 30px 0px 30px",
        marginBottom: "20px",
    },
    content: {
        width: "100%",
        padding: "10px 15px",
        backgroundColor: "#FFF",
        border: "1px solid #E8E8E8",
        borderRadius: "10px",
    },
    addForm: {
        marginBottom: '40px',
    },
    formControl: {
        margin: '20px 0px',
        '& label': {
            display: 'block'
        },
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    textBox: {
        width: "90%",
        fontSize: "15px",
        height: "80px",
        border: "2px solid white",
        borderRadius: "10px",
    },
    submit: {
        margin: '30px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    btn: {
        width: '110px',
        fontFamily: 'inherit'
    },
    orange: {
        backgroundColor: deepOrange[500],
    }
}));

const ContainerMainBox = ({ acc }) => {
    const classes = useStyles()
    const [text, setText] = useState('')
    const [picture, setPicture] = useState(null)
    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch()

    const onSubmit = async (e) => {
        e.preventDefault()

        if (text.length < 1 && picture === null) {
            alert("Please enter your comment.")
            return
        }
        try {
            setLoading(true)
            const account = acc.name
            const userava = acc.userava
            const resultAction = await dispatch(addNewPost({text, picture, account, userava}))
            unwrapResult(resultAction)
            setText('')
            setPicture(null)
        }
        catch (error) {
            console.log(error)
        }
        finally {
            setLoading(false)
        }
        
    }

    const onChangeImage = (event) => {
        const file = event.target.files[0]

        if (file) {
            // const reader = new FileReader()
            // reader.onload = () => {
            //     setPicture(reader.result)
            //     //setPicture(URL.createObjectURL(reader.result))
            // }
            // reader.readAsDataURL(file)
            // //reader.readAsBinaryString(file)
            setPicture(URL.createObjectURL(file))

        } else {
            // SHow loix ra man hinh
            console.log("Bạn chưa chọn file")
        }

        event.target.value = ''
    }

    return (
        <div className={classes.box_content}>
            <div className={classes.content}>
                <form className={classes.addForm} onSubmit={onSubmit}>
                    <label className={classes.formControl}>
                        {
                            acc.userava === null ? <Avatar className={classes.orange}>{acc.name[0]}</Avatar> :
                            <Avatar alt = {acc.name} src = {acc.userava} />
                        }
                        <TextField
                            id="outlined-required"
                            classes={{ root: classes.textBox }}
                            multiline
                            rows="3"
                            placeholder="Please enter your comment here."
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            variant="outlined"
                        >
                        </TextField>
                    </label>
                    <div className={classes.submit}>
                        <input accept="image/*" type="file" style={{ display: "none" }} id="button-upload-image"
                            onChange={onChangeImage}
                        />
                        <label htmlFor="button-upload-image">
                            <Button
                                className={classes.btn}
                                variant="outlined"
                                color="primary"
                                startIcon={<PhotoCamera />}
                                component="span"
                            >
                                Upload
                            </Button>
                        </label>
                        <input type="submit" id="submit-input" style={{ display: "none" }} />
                        {text !== "" || picture !== null ?
                            <label htmlFor="submit-input">
                                <Button
                                    className={classes.btn}
                                    variant="contained"
                                    color="primary"
                                    component="span"
                                    style={{ marginLeft: '15px' }}
                                >
                                    Post
                                </Button>
                            </label> :
                            <label>
                                <Button
                                    className={classes.btn}
                                    variant="contained"
                                    color="primary"
                                    style={{ marginLeft: '15px' }}
                                    disabled
                                >
                                    Post
                                </Button>
                            </label>
                        }
                    </div>
                </form>
            </div>
            {loading && <CircularProgress />}
        </div>
    )
}

export default ContainerMainBox
