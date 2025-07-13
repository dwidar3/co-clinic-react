// redux/slices/OtherSlices.js
import { createSlice } from '@reduxjs/toolkit';

const OtherSlices = createSlice({
  name: 'others',
  initialState: {
    sessionId: undefined,
  },
  reducers: {
    setOthers: (state, action) => {
      state.sessionId = action.payload;
    },

  },
});

export const { setOthers } = OtherSlices.actions;
export default OtherSlices.reducer;
