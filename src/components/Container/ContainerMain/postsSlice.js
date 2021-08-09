import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    posts: [],
    status: 'idle',
    error: null
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    // const response = await fetch(`http://localhost:5000/posts`)
    // const data = await response.json()

    const response = await axios.get('http://localhost:4000/posts')
    const data = response.data

    //return data.reverse()
    return data.reverse()
})

export const deletePosts = createAsyncThunk('posts/deletePost', async (id) => {
    // await fetch(`http://localhost:5000/posts/${id}`, {
    //     method: 'DELETE'
    // })
    await axios.delete(`http://localhost:4000/posts/${id}`,)
    return id
})

export const addNewPost = createAsyncThunk('posts/addNewPost', async (post) => {
    const date_str = new Date().toISOString()
    const newPost = {...post, date_str}
    // const response = await fetch(`http://localhost:5000/posts`,{
    //     method: "POST",
    //     headers: {
    //         'Content-type': 'application/json',
    //     },
    //     body: JSON.stringify(newPost)
    // })
    // const data = await response.json()
    const response = await axios.post(`http://localhost:4000/posts`, newPost)
    const data = response.data
    return data
})

export const updatePost = createAsyncThunk('posts/updatePost', async (post) => {
    const id = post.post_id
    await axios.put(`http://localhost:4000/posts/${id}`, post)

    return post
})

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchPosts.fulfilled]: (state, action) => {
            state.status = 'successed'
            state.posts = state.posts.concat(action.payload)
        },
        [fetchPosts.pending]: (state, action) => {
            state.status = 'loading'
        },
        [fetchPosts.rejected]: (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        },
        [deletePosts.fulfilled]: (state, action) => {
            const index = state.posts.findIndex(post => post.post_id === action.payload)
            state.posts.splice(index, 1)
        },
        [addNewPost.fulfilled]: (state, action) => {
            state.posts = [action.payload].concat(state.posts)
        },
        [updatePost.fulfilled]: (state, action) => {
            const {post_id, text, picture, account, date_str} = action.payload
            const existingPost = state.posts.find((post) => post.post_id === post_id)
            if (existingPost){
                existingPost.text = text
                existingPost.picture = picture
                existingPost.account = account
                existingPost.date_str = date_str
            }
        }
    }
})

export default postsSlice.reducer