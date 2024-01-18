import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  hashOtp: "",
  email: ",",
  otpToken: "",
};

const otpSlice = createSlice({
  name: "otpSlice",
  initialState,
  reducers: {
    setHashOtp: (state, { payload }) => {
      state.hashOtp = payload;
    },
    setOtpEmail: (state, { payload }) => {
      state.email = payload;
    },
    setOtpToken: (state, { payload }) => {
      state.otpToken = payload;
    },
  },
});

export const { setHashOtp, setOtpEmail, setOtpToken } = otpSlice.actions;
export default otpSlice.reducer;
