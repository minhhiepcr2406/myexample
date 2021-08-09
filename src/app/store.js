import { configureStore } from "@reduxjs/toolkit";
import commentsSlice from "../components/Container/ContainerMain/commentsSlice";
import postsSlice from "../components/Container/ContainerMain/postsSlice";
import notificationsSlice from "../components/Container/ContainerRight/notificationsSlice";
import lectureSlice from "../components/Container/Lecture/lectureSlice";
import userSlice from "../components/User/userSlice";

export default configureStore({
    reducer:{
        posts: postsSlice,
        comments: commentsSlice,
        notifications: notificationsSlice,
        user: userSlice,
        lectures: lectureSlice
    }
})