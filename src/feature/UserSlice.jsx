import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  user: "naveen",

};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // updateName(state, action) {
    //   state.user = action.payload;
    // },
    updateEmail(state, action) {
      state.user = action.payload;
    },
  },
});

export const { updateEmail } = userSlice.actions;
export default userSlice.reducer;
