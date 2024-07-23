"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Comment {
  commentId: string;
  content: string;
}

interface CommentState {
  comments: Comment[];
}

const initialState: CommentState = {
  comments: [],
};

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    setComments: (state, action: PayloadAction<Comment[]>) => {
      state.comments = action.payload;
    },
    addComment: (state, action: PayloadAction<Comment>) => {
      state.comments.push(action.payload);
    },
  },
});

export const { setComments, addComment } = commentsSlice.actions;

// Export the reducer
export default commentsSlice.reducer;
