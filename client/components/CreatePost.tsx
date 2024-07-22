"use client";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { addPost } from "@/lib/Features/posts/postSlice";
import { useState } from "react";
import GenericCreateForm from "./GenericCreateForm";

const CreatePost = () => {
  //getting posts from the store
  const posts = useSelector((state: RootState) => state.posts.posts);
  const dispatch = useDispatch();
  const [postTitle, setpostTitle] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the default form submission
    try {
      const createdPost = await axios.post("http://localhost:4000/posts", {
        title: postTitle,
      });
      dispatch(addPost(createdPost.data));
      setpostTitle("");
    } catch (error) {
      console.error("Failed to create post:", error);
    }
  };

  return (
    // form for creating a post
    <GenericCreateForm
      title={"Post Title"}
      state={postTitle}
      setTitle={setpostTitle}
      onSubmit={handleSubmit}
      parentComponent="CreatePost"
    />
  );
};

export default CreatePost;
