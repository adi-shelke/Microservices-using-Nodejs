"use client";
import { configureStore } from "@reduxjs/toolkit";

import postReducer from "./Features/posts/postSlice";
import commentReducer from "./Features/comments/commentSlice";

export const store = configureStore({
  reducer: {
    posts: postReducer,
    comments: commentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
