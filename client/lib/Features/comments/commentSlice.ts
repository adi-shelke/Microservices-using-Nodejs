"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Comment {
  commentId: string;
  content: string;
  status: string;
}

interface CommentsState {
  [postId: string]: Comment[];
}

const initialState: CommentsState = {};

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    setComments(
      state,
      action: PayloadAction<{ postId: string; comments: Comment[] }>
    ) {
      state[action.payload.postId] = action.payload.comments;
    },

    addComment(
      state,
      action: PayloadAction<{ postId: string; comment: Comment }>
    ) {
      if (!state[action.payload.postId]) {
        state[action.payload.postId] = [];
      }
      state[action.payload.postId].push(action.payload.comment);
    },
  },
});

export const { setComments, addComment } = commentsSlice.actions;

// Export the reducer
export default commentsSlice.reducer;
