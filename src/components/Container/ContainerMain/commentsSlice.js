import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    comments : [],
    status : 'idle',
    error : null
}

export const fetchCmtWithPostId = createAsyncThunk('comments/fetchCmtWithPostId', async (postID) => {
    const response = await axios.get(`http://localhost:4000/comments/${postID}`)

    const data = response.data

    return data
})

export const addNewCmt = createAsyncThunk('comments/addNewCmt', async (cmt) => {
    const response = await axios.post(`http://localhost:4000/comments`, cmt)

    const data = response.data

    return data
})

const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchCmtWithPostId.fulfilled]: (state, action) => {
            state.status = 'successed'
            state.comments = state.comments.concat(action.payload)
        },
        [fetchCmtWithPostId.pending]: (state, action) => {
            state.status = 'loading'
        },
        [fetchCmtWithPostId.rejected]: (state, action) => {
            state.status = 'faild'
            state.error = action.error.message
        },
        [addNewCmt.fulfilled]: (state,action) => {
            state.comments.push(action.payload)
        }
    }
})

export default commentsSlice.reducer