import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from '../../utils/axiosClient.js';
import { GENERATEACCESSTOKEN, LOGINUSER, REGISTERUSER, UPDATEUSER, VERIFYBYEMAIL } from '../constant.js';
import { Navigate } from 'react-router-dom';

// Trigger email OTP
export const triggerEmailAPI = createAsyncThunk(
  'auth/triggerEmail',
  async (email, { rejectWithValue }) => {
    try {
      await axiosClient.post(VERIFYBYEMAIL, { email });
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || "Failed to send email");
    }
  }
);

// Verify OTP & Register
export const verifyCode = createAsyncThunk(
  'auth/verifyCode',
  async ({ code, user }, { rejectWithValue }) => {
    try {
      const res = await axiosClient.post(REGISTERUSER, { ...user, code });
      return res.data;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || "Invalid code");
    }
  }
);

// Login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (user, { rejectWithValue }) => {
    try {
      const res = await axiosClient.post(LOGINUSER, user);
      localStorage.setItem('accessToken', res.data.data.accessToken);
      return res.data.data.user;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || "Login failed");
    }
  }
);

export const generateAccessToken = async () => {
  try {
    const res = await axiosClient.get(GENERATEACCESSTOKEN);
    console.log("ACCESSSSS TOKENNN: " + res.data);
    localStorage.setItem('accessToken', res.data.data.accessToken);
  } catch (err) {
    console.error("OAuth Redirect failed:", err || err.message);
    // Handle error however you want (toast, alert, etc.)
  }
};


export const updateUser = createAsyncThunk(
  'auth/updateUser',
  async (updateUser, { rejectWithValue }) => {
    try{
      const res = await axiosClient.patch(UPDATEUSER, updateUser);
      console.log(res.data);
      return res.data;
    } catch(error){
      console.log(error);
      return rejectWithValue(err?.response?.data?.message || "Login failed");
    }
  }
)