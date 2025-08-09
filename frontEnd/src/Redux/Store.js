import { configureStore } from "@reduxjs/toolkit";
import postsReducer from '../Redux/postSlice'

export const store = configureStore({
  reducer: {
    posts : postsReducer
  }
});