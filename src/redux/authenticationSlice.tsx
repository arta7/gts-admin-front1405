import { createSlice } from "@reduxjs/toolkit";

const initialState={
  isAuthenticated: false,
  isInitialized: false,
  user: {},
};

const reducers = {
  setUser: (state:any, action:any) => {
    state.isAuthenticated = action.payload.isAuthenticated;
    state.isInitialized = action.payload.isInitialized;
    state.user = action.payload.user;
  },
  resetUser: (state:any) => {
    state.isInitialized = true;
    state.isAuthenticated = false;
    state.user = {};
  },
};

export const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers,
});

// Action creators are generated for each case reducer function
export const { setUser, resetUser } = authenticationSlice.actions;

export default authenticationSlice.reducer;
