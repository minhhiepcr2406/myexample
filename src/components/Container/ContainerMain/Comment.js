import React from 'react'
import { useState, useEffect } from 'react'
import CommentResponse from './CommentResponse'
import {BsPeopleCircle} from 'react-icons/bs'
import CommentInfo from './CommentInfo'
import { Button, makeStyles, TextField, Typography } from '@material-ui/core' 
import { OutlinedInput, Avatar } from '@material-ui/core'  
import { useDispatch, useSelector } from 'react-redux'
import { updatePost } from './postsSlice'
import { addNewCmt, fetchCmtWithPostId } from './commentsSlice'
import { deepOrange } from '@material-ui/core/colors';

const useStyle = makeStyles(() => ({
    comment: {
        display: "flex",
        flexDirection: "column",
        border: "1px solid #E8E8E8",
        borderRadius: "10px",
        backgroundColor: "white",
        margin: "20px 30px 0px 30px",
    },
    comment_content: {
        display: "flex",
        flexDirection: "column",
        textAlign: "left",
        padding: "15px",
    },
    comment_content_infor: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    comment_content_info_acc: {
        display: "flex",
        flexDirection: "row",
    },
    comment_response: {
        display: "flex",
        flexDirection: "column",
        margin: "15px",
    },
    comment_response_in: {
        display: "flex",
        flexDirection: "row",
        marginTop: "15px",
    },
    reponse_input: {
        marginLeft: '15px', 
        marginRight: '5px',
        height: '40px', 
        width : '100%', 
        border: '1px solid #E8E8E8', 
        borderRadius: '10px'
    },
    formEdit: {
        width: "100%"
    },
    maginBtn: {
        marginTop: "10px",
        marginBottom: "10px",
        marginLeft: "10px",
        width: "100px",
    },
    orange: {
        backgroundColor: deepOrange[500],
    }
}))

const Comment = ({cmt, acc}) => {
    const [text, setText] = useState("")
    const [textEdit, setTextEdit] = useState("")
    const [editCmt, setEditCmt] = useState(false)
    const classes =  useStyle()

    const dispatch = useDispatch()
    const commentStatus = useSelector(state => state.comments.status)
    const comments = useSelector(state => state.comments.comments)

    useEffect(()=>{
        // const getResWithCmt = async (id) => {
        //     const res = await fetch(`http://localhost:5000/resComment?cmtId=${id}`)
        //     const data = await res.json()

        //     setResList(data)
        // }
        // getResWithCmt(cmt.id)
        if (commentStatus === 'idle'){
            dispatch(fetchCmtWithPostId(cmt.post_id))
        }
    },[cmt.post_id, dispatch, commentStatus])


    //Submit new response
    const onSubmit = (e) =>{
        e.preventDefault()

        if(text.length < 1){
            alert("Please enter you comment")
            return
        }
        const username = acc.name
        const userava = acc.userava
        const post_id = cmt.post_id
        dispatch(addNewCmt({text, username, userava,post_id}))
        setText('')
    }

    const onHandleEditCmt = (e) => {
        e.preventDefault()
        
        const newPost = { ...cmt, text: textEdit}
        dispatch(updatePost(newPost))

        setTextEdit('')
        setEditCmt(!editCmt)
    }

    return (
        <div className = {classes.comment}>
            <div className = {classes.comment_content}>
                <div className = {classes.comment_content_infor}>
                    <div className = {classes.comment_content_info_acc}>
                        {
                            cmt.userava === null? <Avatar className={classes.orange}>{cmt.account[0]}</Avatar> :
                            <Avatar alt = {cmt.account} src = {cmt.userava} />
                        }
                        <div>
                            <Typography style = {{marginLeft: '10px'}}><b>{cmt.account}</b></Typography>
                            <Typography style = {{marginLeft: '10px', fontSize : '12px', opacity: '80%'}}><b>{cmt.date_str}</b></Typography>
                        </div>
                    </div>  
                    <CommentInfo id = {cmt.post_id} editCmt = {editCmt} setEditCmt = {setEditCmt} />
                </div>
                {
                    !editCmt ? (
                        <>
                            <Typography variant = "inherit" style = {{marginTop : '20px', wordBreak: 'break-word'}}>{cmt.text}</Typography>
                            {cmt.picture !== null ? <img style = {{width : '100%'}} src = {cmt.picture} alt = "" /> : ''}
                        </>
                    ) : (
                        <form className = {classes.formEdit} onSubmit = {onHandleEditCmt}>
                            <TextField
                                multiline
                                rows = "2"
                                placeholder = {cmt.text}
                                variant = "outlined"
                                value = {textEdit}
                                onChange = {(e) => setTextEdit(e.target.value)}
                                style = {{width : "100%"}}
                            >
                            </TextField>
                            <div>
                                <input id = "submit-edit-btn" type = "submit" style = {{display: "none"}} />
                                <label htmlFor = "submit-edit-btn">
                                    <Button
                                        className = {classes.maginBtn}
                                        color = "primary"
                                        variant = "outlined"
                                        component = "span"
                                    >
                                        Save
                                    </Button>
                                </label>
                                <Button
                                    className = {classes.maginBtn}
                                    color = "secondary"
                                    variant = "outlined"
                                    onClick = {() =>setEditCmt(!editCmt)}
                                >
                                    Cancle
                                </Button>
                            </div>
                            
                            {cmt.picture !== null ? <img style = {{width : '100%'}} src = {cmt.picture} alt = "" /> : ''}
                        </form>
                    )
                }
                
            </div>
            <hr style = {{margin: '5px', opacity: '50%'}}></hr>
            <div className = {classes.comment_response}>
                {comments.length < 1 ? '' : comments.map((res) => cmt.post_id === res.post_id && <CommentResponse key = {res.cmt_id} res = {res}/>)}
                <form className = {classes.comment_response_in} onSubmit = {onSubmit}>
                    {
                        acc.userava === null ? <Avatar className={classes.orange}>{acc.name[0]}</Avatar> :
                        <Avatar alt = {acc.name} src = {acc.userava} />
                    }
                    <OutlinedInput
                        className = {classes.reponse_input}
                        value = {text}
                        onChange = {(e) => setText(e.target.value)}
                        placeholder = "Please enter your response here."
                    />
                </form>
            </div>      
        </div>
    )
}

export default Comment
