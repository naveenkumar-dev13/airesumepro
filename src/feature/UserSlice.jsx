import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "klkj",
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

export const { updateName, updateEmail } = userSlice.actions;
export default userSlice.reducer;
