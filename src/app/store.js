import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import chatReducer from "../features/chat/chatSlice"; // Import chatSlice
import appointmentReducer from "../features/appointment/appointmentSlice"; // Import chatSlice
import languageReducer from "../features/language/languageSlice"; // Import chatSlice
import otherReducer from "../features/others/otherSlices"; // 
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
const rootReducer = combineReducers({
  user: userReducer,
  chat: chatReducer, // chatSlice to the root reducer
  appointment: appointmentReducer,
  language: languageReducer,
  other: otherReducer,
});
const persistConfig = {
  key: "root",
  storage,
  version: 1,
  blacklist: ["chat"], // Don't persist chat slice
};

// Persist only the user slice
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check
    }),
});
export const persistor = persistStore(store);