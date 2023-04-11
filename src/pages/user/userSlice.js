import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
};
const userSlic = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

const { reducer, actions } = userSlic;

export const { setUser } = actions;

export default reducer;
