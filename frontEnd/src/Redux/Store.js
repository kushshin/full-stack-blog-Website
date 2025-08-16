import { configureStore } from "@reduxjs/toolkit";
import postsReducer from '../Redux/postSlice'
import usersReducer from '../Redux/userSlice'

export const store = configureStore({
  reducer: {
    posts : postsReducer,
    users: usersReducer
  }
});