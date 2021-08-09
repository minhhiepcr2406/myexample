import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    lectures : [],
    status: "idle",
    error: null,
    lectureLink: ""
}

export const fetchLectures = createAsyncThunk('lectures/fetchLectures', async () => {
    const response = await axios.get(`http://localhost:4000/lectures`)
    const data = response.data

    return data.reverse()
})

export const addNewLecture = createAsyncThunk('lectures/addNewLectures', async (lecture) => {
    const date_str = new Date().toISOString()
    const newLecture = {...lecture, date_str}
    const response = await axios.post(`http://localhost:4000/lectures`, newLecture)
    const data = response.data

    return data
})

const lecturesSlice = createSlice({
    name: "lectures",
    initialState,
    reducers: {
        updateLectureLink(state, action) {
            state.lectureLink = action.payload
        }
    },
    extraReducers: {
        [fetchLectures.fulfilled]: (state, action) => {
            state.status = "successed"
            state.lectures = state.lectures.concat(action.payload)
        },
        [fetchLectures.pending]: (state, action) => {
            state.status = 'loading'
        },
        [fetchLectures.rejected]: (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        },
        [addNewLecture.fulfilled]: (state, action) => {
            state.lectures = [action.payload].concat(state.lectures)
        }
    }
})

export const {updateLectureLink} = lecturesSlice.actions

export default lecturesSlice.reducer