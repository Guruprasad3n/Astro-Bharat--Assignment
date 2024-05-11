import { createSlice } from "@reduxjs/toolkit";
export const astrologerSlice = createSlice({
  name: "astrologer",
  initialState: {
    toBeEdit: null,
  },
  reducers: {
    setToBeEdit: (state, action) => {
      state.toBeEdit = action.payload;
    },
  },
});

export const { setToBeEdit } = astrologerSlice.actions;
export default astrologerSlice.reducer;