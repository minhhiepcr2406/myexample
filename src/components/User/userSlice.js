import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    user_id : 0,
    name: "Default User",
    userava: null,
    users: []
}

export const fetchUsers = createAsyncThunk('user/fetchUsers', async (id) => {
    const response = await axios.get(`http://localhost:4000/users`)
    const data = response.data

    return data
})

export const fetchUserWithId = createAsyncThunk('user/fetchUserWithId', async (id) => {
    const response = await axios.get(`http://localhost:4000/users/${id}`)
    const user = response.data

    return user
})

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: {
        [fetchUserWithId.fulfilled]: (state, action) => {
            const {id, name, userava} = action.payload
            return {
                ...state,
                user_id: id,
                name: name,
                userava: userava
            }
        },
        [fetchUsers.fulfilled]: (state,action) => {
            state.users = state.users.concat(action.payload)
        }
    }
})

export default userSlice.reducer