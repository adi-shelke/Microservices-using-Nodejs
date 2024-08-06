import React, { useState } from "react";
import GenericCreateForm from "./GenericCreateForm";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { addComment } from "@/lib/Features/comments/commentSlice";

const CreateComment: React.FC<{ postId: string }> = ({ postId }) => {
  const dispatch = useDispatch();
  const [commentText, setcommentText] = useState("");
  const addCommentTopost = async (
    event: React.FormEvent,
    postId?: string,
    content?: string
  ) => {
    event.preventDefault();
    const url = `http://localhost:4001/posts/${postId}/comments`;

    const response = await axios.post(url, { content: commentText });
    const newComment = response.data;
    newComment.status = "pending";


    if (!postId || !content) {
      console.error("Post ID and comment content are required.");
      return;
    }

    dispatch(addComment({ postId, comment: newComment}));

    setcommentText("");
  };
  return (
    <GenericCreateForm
      title=""
      state={commentText}
      setState={setcommentText}
      onSubmit={addCommentTopost}
      parentComponent="CreateComment"
      postId={postId}
    />
  );
};

export default CreateComment;
