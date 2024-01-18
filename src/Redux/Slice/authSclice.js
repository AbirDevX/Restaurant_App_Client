import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  accessToken: null,
  user: null,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setIsAuthenticate: (state, { payload }) => {
      state.isAuthenticated = payload;
    },
    setAccessToken: (state, { payload }) => {
      state.accessToken = payload;
    },
    setUser: (state, { payload }) => {
      state.user = payload;
    },
  },
});

export const { setIsAuthenticate, setAccessToken, setUser } = authSlice.actions;
export default authSlice.reducer;
