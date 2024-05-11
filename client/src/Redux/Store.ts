import { configureStore } from "@reduxjs/toolkit";
import { astrologersApi } from "./api";
import { astrologerSlice } from "./reducer";

export const store = configureStore({
  reducer: {
    [astrologersApi.reducerPath]:astrologersApi.reducer,
    [astrologerSlice.name]:astrologerSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(astrologersApi.middleware),
});
