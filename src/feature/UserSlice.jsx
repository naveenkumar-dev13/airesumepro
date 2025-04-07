import { createSlice } from "@reduxjs/toolkit";

const initialState = {
<<<<<<< HEAD
  email: "klkj",
=======
  user: "naveen",
  email: "",
>>>>>>> 5f15baeff7abf9dd39afe20d3995d40e5bb57b3f
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
    updateEmail(state, action) {
      state.email = action.payload;
    },
  },
});

export const { updateName, updateEmail } = userSlice.actions;
export default userSlice.reducer;
