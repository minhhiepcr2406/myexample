import React from 'react'
import Comment from './Comment'
import { useSelector, useDispatch } from 'react-redux'
import { fetchPosts } from './postsSlice'
import { useEffect } from 'react'
import { CircularProgress } from '@material-ui/core'


const ContainerMainComment = ({acc}) => {
    const posts = useSelector(state => state.posts.posts)
    const postsStatus = useSelector(state => state.posts.status)
    const error = useSelector(state => state.posts.error)

    const dispatch = useDispatch()
    
    useEffect(()=> {
        if (postsStatus === 'idle'){
            dispatch(fetchPosts())
        }
    }, [postsStatus, dispatch])

    let content = ''
    if (postsStatus === 'loading') {
        content = <CircularProgress />
    }
    else if (postsStatus === 'successed'){
        content = posts.length < 1? 'No comment here.' : posts.map((cmt) => <Comment key = {cmt.post_id} cmt = {cmt} acc = {acc}/>)
    }
    else if (postsStatus === 'failed'){
        content = <div>{error}</div>
    }

    return (
        <div>
            {content}
        </div>
    )
}

export default ContainerMainComment
