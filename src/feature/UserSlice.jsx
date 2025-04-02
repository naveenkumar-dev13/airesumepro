import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: "naveen",
  email: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateName(state, action) {
      state.user = action.payload;
    },
    updateEmail(state, action) {
      state.email = action.payload;
    },
  },
});

export const { updateName, updateEmail } = userSlice.actions;
export default userSlice.reducer;
