import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateEmail(state, action) {
      state.email = action.payload;
    },
  },
});

export const { updateEmail } = userSlice.actions;
export default userSlice.reducer;
