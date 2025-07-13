// redux/slices/languageSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialLang = localStorage.getItem('lang') || 'en';

const languageSlice = createSlice({
  name: 'language',
  initialState: {
    language: initialLang, // أو 'ar'
  },
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
  },
});

console.log("laaang ===> ",initialLang)

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
