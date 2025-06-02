// import { createSlice } from '@reduxjs/toolkit';

// const authSlice = createSlice({
//   name: 'auth',
//   initialState: {
//     user: null,
//     loading: false,
//     error: null,
//     verified: false,
//     loggedIn: false,
//   },
//   reducers: {
//     setUser(state, action) {
//       state.user = action.payload;
//     },
//     setLoading(state){
//       state.loading = true;
//     },
//     verifyEmailRequest(state) {
//       state.loading = true;
//       state.error = null;
//     },
//     verifyEmailSuccess(state) {
//       state.loading = false;
//       state.verified = true;
//       state.user = null;
//     },
//     verifyEmailError(state, action) {
//       state.loading = false;
//       state.error = action.payload;
//     },
//     loginSuccess(state, action) {
//       console.log(state+"\n"+action);
//       state.user = action.payload;
//       state.loggedIn = true;
//     },
//     loginFailure(state, action){
//       state.loading = false;
//       state.error = action.payload;
//     },
//     logout(state) {
//       state.user = null;
//       state.verified = false;
//       state.loggedIn = false;
//     },  
//   },
// });

// export const {
//   setUser,
//   setLoading,
//   verifyEmailRequest,
//   verifyEmailSuccess,
//   verifyEmailError,
//   loginSuccess,
//   loginFailure,
//   logout,
// } = authSlice.actions;

// export default authSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import { triggerEmailAPI, verifyCode, loginUser, updateUser } from './authApi';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    loading: false,
    error: null,
    verified: false,
    loggedIn: false,
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setLogin(state, action){
      console.log("action.payload: "+action.payload);
      state.loggedIn = action.payload;
    },
    logout(state) {
      state.user = null;
      state.verified = false;
      state.loggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(triggerEmailAPI.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(triggerEmailAPI.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(triggerEmailAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(verifyCode.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyCode.fulfilled, (state) => {
        state.loading = false;
        state.verified = true;
        state.user = null;
      })
      .addCase(verifyCode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.loggedIn = true;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        console.log(action.payload);
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.loggedIn = true;
        state.user.name = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export const { setUser, logout, setLogin } = authSlice.actions;
export default authSlice.reducer;
