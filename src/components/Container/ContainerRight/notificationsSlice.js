import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from 'axios'

const initialState = {
    notifications: [],
    status: 'idle',
    error: null
}

export const fetchNotis = createAsyncThunk('notifications/fetchNotis', async () => {
    // const response = await fetch(`http://localhost:5000/notifications`)
    // const data = await response.json()
    const response = await axios.get(`http://localhost:4000/notifications`)
    const data = response.data

    return data.reverse()
})

export const deleteNoti = createAsyncThunk('notifications/deleteNoti', async (id) => {
    console.log(id)
    // await fetch(`http://localhost:4000/notifications/${id}`, {
    //     method: 'DELETE',
    // })
    await axios.delete(`http://localhost:4000/notifications/${id}`)

    return id
})

export const addNewNoti = createAsyncThunk('notifications/addNewNoti', async (noti) => {
    const date_str = new Date().toISOString()
    const noti_text = noti.text
    const newNoti = {noti_text, date_str}
    // const response = await fetch(`http://localhost:5000/notifications`, {
    //     method: 'POST',
    //     headers: {
    //         'Content-type': 'application/json',
    //     },
    //     body: JSON.stringify(newNoti)
    // })
    const response = await axios.post(`http://localhost:4000/notifications`, newNoti)
    const data = response.data

    return data
})

const notificationsSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchNotis.pending]: (state, action) => {
            state.status = 'loading'
        },
        [fetchNotis.fulfilled]: (state, action) => {
            state.status = 'successed'
            state.notifications = state.notifications.concat(action.payload)
        },
        [fetchNotis.rejected]: (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        },
        [deleteNoti.fulfilled]: (state, action) => {
            const index = state.notifications.findIndex(noti => noti.noti_id === action.payload)
            state.notifications.splice(index, 1)
        },
        [addNewNoti.fulfilled]: (state, action) => {
            state.notifications = [action.payload].concat(state.notifications)
        }
    }
})

export default notificationsSlice.reducer