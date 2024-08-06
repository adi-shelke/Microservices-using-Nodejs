"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Comment{
  "commentId": string;
  "content": string;
}

interface Post {
  postId: string;
  title: string;
  comments: Comment[];
}

interface PostsState {
  posts: Record<string, Post>;
}

const initialState: PostsState = {
  posts: {},
};

export const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Record<string, Post>>) => {
      state.posts = action.payload;
    },
    addPost: (state, action: PayloadAction<Post>) => {
      const post = action.payload;
      state.posts[post.postId] = post;
    },
  },
});
export const { addPost, setPosts } = postSlice.actions;

export default postSlice.reducer;
