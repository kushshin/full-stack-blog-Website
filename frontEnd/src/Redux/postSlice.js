import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {AllPost} from '../API Services/PostAPI'


// Async thunk for fetching posts
export const fetchPosts = createAsyncThunk("post/AllPost", async () => {
  const response = await AllPost();
//   const response = await axios.get('http://localhost:3001/api/post/AllPost');
  // console.log(response.data.post)
  return response.data.post;
});

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    loading: false,
    error: null
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export default postsSlice.reducer;
