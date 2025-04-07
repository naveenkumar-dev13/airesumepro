import { createSlice } from "@reduxjs/toolkit";

const initialState = {
<<<<<<< HEAD
<<<<<<< HEAD
  email: "klkj",
=======
  user: "naveen",
=======
>>>>>>> 08ae067037f1a86a4dd07be3ad398b788779bb69
  email: "",
>>>>>>> 5f15baeff7abf9dd39afe20d3995d40e5bb57b3f
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
<<<<<<< HEAD
    // updateName(state, action) {
    //   state.user = action.payload;
    // },
    updateEmail(state, action) {
      state.user = action.payload;
    },
=======
>>>>>>> 08ae067037f1a86a4dd07be3ad398b788779bb69
    updateEmail(state, action) {
      state.email = action.payload;
    },
  },
});

export const { updateEmail } = userSlice.actions;
export default userSlice.reducer;
