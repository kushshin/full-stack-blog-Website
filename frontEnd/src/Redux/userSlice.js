import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {AllUsers} from '../API Services/UserAPI'


// Async thunk for fetching posts
export const fetchUsers = createAsyncThunk("user/allUser", async () => {
  const response = await AllUsers();
//   const response = await axios.get('http://localhost:3001/api/user/allUser');
//   console.log(response)
  return response.data.user;
});

const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    loading: false,
    error: null
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export default usersSlice.reducer;
